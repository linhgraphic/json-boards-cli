# Installation

1 - Install `Node.js`

2 - Install required packages: `npm install`

3 - Run `npm run build` to compile

4 - Run `npm link`

# Run the script

1 - Run the test suit with `npm test`. It operates on `./mocks` directory which contains .json boards files. After running the test, an `output` folder is created in the directory and contain `output.json` file as a result.

2 - Inside this directory (`json-boards-cli`) run `npm start <directory>` to execute the script locally, for example, `npm start ./mocks`

3 - After running `npm link`, you can run the cli script globally with the command `json-boards-cli export <directory>`

# NPM package

The tool can be downloaded and installed from npm https://www.npmjs.com/package/json-boards-cli

# Implementation details

1 - `index.js` contains `jsonBoardExport` function which accepts a directory name of type string as an argurment. It reads all .json files in the directory and its subfolder and proceeds to parse, combine, sort, add metadata and write the data to an `output.json` file. The function uses helper functions in utils folder for navigating the target directory and validation tasks.

- Happy path : If all or some of the files in the target directory and all of its subfolders are valid .json file with correct json-board schema, the function proceeds to create an `output` folder if hasn't existed and writes the data to `<directory>/output/output.json`. The output file is overitten everytime the function is called. Successful execution message is displayed in the end.
- Unhappy path: The catch block displays the error message where the function fails. In case there is no .json files or none of the files in the target directory and its subfolder is valid, the function throws an error.

2 - Helper functions: The functions are placed under `utils` folder

- `directoryTraversalRecursive` returns all .json files from the target directory and its subfolders.
- `customJsonParse` uses JSON.parse() under the hood, catching error from invalid json data, returning the parsed data for valid json and `null` for invalid json.
- `validateSchema` defines `JsonBoardsSchema` and validates the parsed data against the schema, returning a boolean value.

3 - Tests: Unit tests for helper functions and the main `jsonBoardExport` function. The tests use mock .json files inside mocks folder. The outcome of `index.test.js` is an output file `./mocks/output/output.json`.
