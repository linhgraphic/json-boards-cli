# Installation

1 - Install `Node.js` if it hasn't been installed

2 - Install required packages: `npm install`

3 - Run `npm link`

# Run the script

1 - Run the test suit with `npm test`. It operates on `./mocks` directory which contains json-boards files. After running the test, an `output` folder is created in the directory and contain `output.json` file as a result.

2 - Inside this directory (`json-boards-cli`) run `npm start <directory>` to execute the script locally, for example, `npm start ./mocks`

3 - After running `npm link`, you can run the cli script globally with the command `json-boards-cli jbex <directory>`

# Implementation details

1 - `index.js` contains `jsonBoardExport` function which accepts a directory name of type string as an argurment. It read all json files in the directory, parse the data in to javascript object then combines, sorts and add metadata to the object and write the data to an `output.json` file. The function uses other functions in utils folder for file extention validation and schema validation.

- Happy path : If all or some of the input files in the directory are valid .json file with correct json-board schema, the function will proceed to create an `output` folder if hasn't existed and write the data to `<directory>/output/output.json`. The file is overitten everytime the function is called. In case some of the input files is invalid, a warning message will display the file names accordingly. The data from valid files is still processed and exported. Successful execution message is displayed in the end.
- Unhappy path: The catch block will display the error message where the function fails. In case none of the files in the directory is valid, the function will throw an error message and stop the write execution.

2 - Utils functions: The functions are placed under `Utils` folder

- `validateJsonFileExt` check if the file path is correct and the file has .json extention
- `customJsonParse` uses JSON.parse() under the hood, catching error from invalid json data, returning the parsed data for valid json and `null` for invalid json
- `validateSchema` Define `JsonBoardsSchema` and validate the parsed data against the schema, returning a boolean value

3 - Tests: Unit tests for utils functions and the main `jsonBoardExport`. The tests use mock json files inside mocks folder. The outcome of `index.test.js` is an output file `./mocks/output/output.json`
