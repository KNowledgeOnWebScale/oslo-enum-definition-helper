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
