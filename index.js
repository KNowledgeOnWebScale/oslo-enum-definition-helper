import jsonld from "jsonld";
import fs from "fs-extra";

const context = await fs.readJson("context.json");

/**
 * This method extracts the definitions of enums.
 * If the method doesn't find a definition for an enum,
 * it will look for the properties that use this enum, and
 * print the definitions of those properties.
 * @param {string} pathToIntermediateJsonLdFile - Path to the JSON-LD file with the intermediate representation.
 */
export default async function extract(pathToIntermediateJsonLdFile) {
  const inputObj = await fs.readJson(pathToIntermediateJsonLdFile);
  const frame = {
    "@context": context,
    "inverseRange": {
      "@explicit": true,
      "apDefinition": {},
      "vocDefinition": {},
      "assignedURI": {}
    }
  };

  // Frame frist with http URI of skos:Concept.
  frame.assignedURI = "http://www.w3.org/2004/02/skos/core#Concept";
  const framed = await jsonld.frame(inputObj, frame);

  // Frame a second time with https URI of skos:Concept.
  frame.assignedURI = "https://www.w3.org/2004/02/skos/core#Concept";
  const framed2 = await jsonld.frame(inputObj, frame);

  // Merge results of the two framing operations.
  if (framed2["@graph"]) {
    framed2["@graph"].forEach(el => {
      console.error(`Enum "${el.diagramLabel}" uses incorrect URI for skos:Concept (https://www.w3.org/2004/02/skos/core#Concept)`);
    });

    framed["@graph"] = framed["@graph"].concat(framed2["@graph"]);
  }

  fs.writeJson("enums.jsonld", framed, {
    spaces: 2
  });

  const testSubjects = [];

  framed["@graph"].forEach(el => {
    let text = `Enum "${el.diagramLabel}". `;

    if (el.apDefinition) {
      const defs = el.apDefinition.map(d => `"${d["@value"]}"`).join(", ");
      text += defs;
      testSubjects.push({
        "@type": "TestSubject",
        "@id": el["@id"],
        "dcterms:title": `${el.diagramLabel}`,
        "assertion": {
          "@type": "Assertion",
          "test": "_:definition-test",
          "result": {
            "@type": "TestResult",
            "outcome": "passed"
          }
        }
      });
    } else {
      text += "\n  No AP definition provided.\n";
      const testSubject = {
        "@type": "TestSubject",
        "@id": el["@id"],
        "dcterms:title": `${el.diagramLabel}`,
        "assertion": {
          "@type": "Assertion",
          "test": "_:definition-test",
          "result": {
            "@type": "TestResult",
            "dcterms:description": "No AP definition provided.",
            "outcome": "failed"
          }
        }
      };

      if (el.inverseRange) {
        if (!Array.isArray(el.inverseRange)) {
          el.inverseRange = [el.inverseRange];
        }

        let potentialFix = "";

        for (let i = 0; i < el.inverseRange.length; i++) {
          const p = el.inverseRange[i];
          if (i > 0) {
            text += "\n";
            potentialFix += "\n";
          }

          text += "  ";
          const prop = p.assignedURI || p.diagramLabel[0]["@value"];
          text += `${prop} uses this enum`;
          potentialFix += `${prop} uses this enum`;

          if (p.apDefinition && p.apDefinition.length > 0) {
            const propDefs = p.apDefinition.map(d => `"${d["@value"]}"`).join(", ");
            text += ": " + propDefs + " ";
            potentialFix += ": " + propDefs + " ";
          } else if (p.vocDefinition && p.vocDefinition.length > 0) {
            const propDefs = p.vocDefinition.map(d => `"${d["@value"]}"`).join(", ");
            text += ": " + propDefs + " ";
            potentialFix += ": " + propDefs + " ";
          } else {
            text += ", but no AP or VOC definition provided for it.";
            potentialFix += ", but no AP or VOC definition provided for it.";
          }
        }

        testSubject.assertion.potentialFix = potentialFix;
      } else {
        const temp = "No property found that uses this enum.";
        text += temp;
        testSubject.assertion.potentialFix = temp;
      }

      testSubjects.push(testSubject);
    }

    console.log(text);
  });

  testSubjects.push({
    "@type": ["TestCriterion", "TestRequirement"],
    "@id": "_:definition-test",
    "dcterms:title": "An enum should have an AP definition."
  });

  const assertionsJsonLD = {
    "@context": {
      "@vocab": "http://www.w3.org/ns/earl#",
      "dcterms": "http://purl.org/dc/terms/",
      "ex": "http://example.com#",
      "potentialFix": "ex:potentialFix",
      "assertion": {"@reverse": "subject"},
      "test": {"@type": "@id"},
      "outcome": {
        "@type": "@id"
      }
    },
    "@graph": testSubjects
  };

  fs.writeJson("assertions.jsonld", assertionsJsonLD, {
    spaces: 2
  });
}
