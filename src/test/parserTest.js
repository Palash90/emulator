const parser = require('../parser/parser');
const fs = require('fs');
const path = require('path');
const { default: defaultFiles } = require('../components/defaultFiles');
const expect = require('chai').expect;

const getInputOutput = (input) => {
    var inputPath = path.join(__dirname, input + ".hdl");
    var output = require(__dirname + "/" + input + ".js");

    return {
        input: fs.readFileSync(inputPath, 'utf8'),
        output: output
    }
}

const getFilesFromPath = (path) => {
    let files = fs.readdirSync("./test/" + path);
    return files.filter(file => file.match(new RegExp(`.*\.(${'hdl'})`, 'ig')));
}

const pathsToTest = [
    {
        desc: "Import Stament Tests",
        dir: "ImportStatementTest"
    },
    {
        desc: "Chip Definition Stament Tests",
        dir: "ChipDefinitionTest"
    }

];

const testFiles = () => {

    for (var i = 0; i < pathsToTest.length; i++) {
        var files = getFilesFromPath(pathsToTest[i].dir);

        var testCallBack = () => {
            var fileName = currFile.substring(0, currFile.indexOf("."));
            var io = getInputOutput(pathsToTest[i].dir + "/" + fileName, currFile);
            var parsedResult = parser.parse(currFile, io.input, defaultFiles);
            var expectedResult = io.output.result;

            it(currFile, () => expect(parsedResult).to.deep.equal(expectedResult));
        }

        describe(pathsToTest[i].desc, () => {
            for (var j = 0; j < files.length; j++) {
                currFile = files[j];
                testCallBack()
            }
        });
    }
}

testFiles();