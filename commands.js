#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();
import inquirer from "inquirer";
import { jsonBoardExport } from "./index.js";

program.version("1.0.0").description("JSON boards cli");

program
  .command("jsonBoardExport <filename>")
  .alias("jbex")
  .description(
    "Export multiple input files containing Json boards data from a directory to a single output file inside `output` folder. The `output` folder is created under the same directory of the input files"
  )
  .action((filename) => jsonBoardExport(filename));

program.parse(process.argv);
