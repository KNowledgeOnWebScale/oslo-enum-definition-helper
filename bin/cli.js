import { program } from 'commander';
import extract from "../index.js";

program
  .option('-i, --input <path>', 'Path to intermediate JSON-LD', 'input.jsonld');

program.parse();
extract(program.opts().input);
