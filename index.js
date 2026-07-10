import jsonld from "jsonld";
import fs from "fs-extra";

const inputObj = await fs.readJson("input.jsonld");
const context = await fs.readJson("context.json");

extract(inputObj);

/**
 * This method extracts the definitions of enums.
 * If the method doesn't find a definition for an enum,
 * it will look for the properties that use this enum, and
 * print the definitions of those properties.
 * @param {object} inputObj - The JSON-LD object of the intermediate representation.
 */
async function extract(inputObj) {
  const frame = {
    "@context": context,
    "assignedURI": "http://www.w3.org/2004/02/skos/core#Concept",
    "inverseRange": {
      "@explicit": true,
      "apDefinition": {},
      "assignedURI": {}
    }
  };

  const framed = await jsonld.frame(inputObj, frame);
  fs.writeJson("output.jsonld", framed, {
    spaces: 2
  });

  framed["@graph"].forEach(el => {
    let text = `Enum "${el.diagramLabel}". `;

    if (el.apDefinition) {
      const defs = el.apDefinition.map(d => `"${d["@value"]}"`).join(", ");
      text += defs;
    } else {
      text += "\n  No AP definition provided.\n";

      if (el.inverseRange) {
        if (!Array.isArray(el.inverseRange)) {
          el.inverseRange = [el.inverseRange];
        }

        for (let i = 0; i < el.inverseRange.length; i++){
          const p = el.inverseRange[i];
          if (i > 0) {
            text += "\n";
          }

          text += "  ";
          const prop = p.assignedURI || p.diagramLabel[0]["@value"];
          text += `${prop} uses this enum`;

          if (p.apDefinition && p.apDefinition.length > 0) {
            const propDefs = p.apDefinition.map(d => `"${d["@value"]}"`).join(", ");
            text += ": " + propDefs + " ";
          } else {
            text += ", but no AP definition provided for it.";
          }
        }
      } else {
        text += "No property found that uses this enum.";
      }
    }

    console.log(text);
  });
}
