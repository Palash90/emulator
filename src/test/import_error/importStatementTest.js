const expect = require('chai').expect;
const parser = require('../../parser/parser');
const fs = require('fs');
const path = require('path');
const { default: defaultFiles } = require('../../components/defaultFiles');

const getInputOutput = (input) => {
    var inputPath = path.join(__dirname, input + ".hdl");
    var output = require('./' + input + ".js");
    return {
        input: fs.readFileSync(inputPath, 'utf8'),
        output: output
    }
}

function testImport() {
    const testFile = (fileName) => {
        var io = getInputOutput(fileName);
        expect(parser.parse(fileName, io.input, defaultFiles)).to.deep.equal(io.output.result);
    }
    describe("HDL import statement Test", function () {
        describe("Should throw Import Error", function () {
            it("Should return error object for IN Statement instead of hdl file", () => testFile("import_KEYWORD_INSTEAD_OF_FILE"));

            it("Should return error object for missing file", () => testFile("import_MISSING_FILE"));

            it("Should return error object for no semicolon found", () => testFile("import_NOT_SEMICOLON"));

            it("Should return error when only import is used", () => testFile("ONLY_IMPORT"));
        });

        describe("Should return ast with file import", function () {
            it("Should return ast", testFile("import_NO_ERROR"));
        });
    });
}

module.exports = {
    testImport
}