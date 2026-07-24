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

   Note that you can choose your own input file via the option `-i, --input`.
4. The script generates 2 files:

   - `enums.jsonld` contains the extracted enums.
   - `assertions.jsonld` contains the assertions related to the validation of the enums' definitions.

5. The script prints a human-readable version of `assertions.jsonld` to standard out.

## Example

You find an example in the folder `example`.

- The file `input.jsonld` contains the intermediary JSON-LD.
- The file `enums.jsonld` contains the enums when running the script on `input.jsonld`.
- The file `stdout.txt` contains the content the script writes to standard out
  when running the script on `input.jsonld`.
- The file `assertions.jsonld` contains the assertions when running the script on `input.jsonld`.

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
