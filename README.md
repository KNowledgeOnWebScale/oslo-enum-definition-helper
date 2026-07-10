# OSLO Enum definition helper

This script extracts the definitions of enums.
If the script doesn't find a definition for an enum,
it will look for the properties that use this enum, and
print the definitions of those properties.

## Usage

1. Install dependencies via

   ```shell
   npm i
   ```

2. Store the intermediary JSON-LD in `input.jsonld`.
3. Run the script via

   ```shell
   npm start
   ```

4. You find the enum, properties, and definitions in the terminal output.

## Example output

```text
Enum "InputType". 
  No AP definition provided.
  dcterms:type uses this enum: "Nature of the input.", "Aard van de input." 
Enum "Afleverpunttype". "Classificatie van Afleverpunt."
Enum "Concept". "Idee of begrip."
Enum "Aansturingproceduretype". 
  No AP definition provided.
  dcterms:type uses this enum: "Aard van de Aansturingsprocedure." 
Enum "Objecttype". 
  No AP definition provided.
  dcterms:type uses this enum: "Aard van het Domeinobject." 
Enum "Aansturingstype". 
  No AP definition provided.
  dcterms:type uses this enum: "Het soort Aansturing." 
Enum "ObservatieCollectietype". 
  No AP definition provided.
  dcterms:type uses this enum, but no AP definition provided for it.
Enum "Systeemtype". 
  No AP definition provided.
  dcterms:type uses this enum: "Aard vh Systeem." 
  dcterms:type uses this enum, but no AP definition provided for it.
Enum "Nutsvoorzieningnetwerktype". "Classificatie van typen nutsvoorzieningnetwerken.", "Classification of utility network types."
Enum "Toebehorentype". 
  No AP definition provided.
  https://vocab.belgif.be/ns/utility-services#Connection.appurtenanceType uses this enum: "Aard van het Toebehoren." 
Enum "Observatietype". 
  No AP definition provided.
  dcterms:type uses this enum: "Het soort Observatie." 
  dcterms:type uses this enum, but no AP definition provided for it.
Enum "OutputType". 
  No AP definition provided.
  dcterms:type uses this enum: "Nature of the Output.", "Aard van de Output." 
Enum "Observatieproceduretype". 
  No AP definition provided.
  dcterms:type uses this enum: "Nature of the Observation Procedure.", "Aard van de Observatieprocedure." 
Enum "Platformtype". 
  No AP definition provided.
  dcterms:type uses this enum: "Aard vh Platform." 
```

## Linters

Run the JavaScript linter via

```shell
npm run lint:js
```

If you want to automatically fix the issues where possible, run

```shell
npm run lint:js:fix
```

Run the Markdown linter via

```shell
npm run lint:markdown
```

If you want to automatically fix the issues where possible, run

```shell
npm run lint:markdown:fix
```
