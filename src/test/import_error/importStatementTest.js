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
    describe("HDL import statement Test", function () {
        describe("Should throw Import Error", function () {
            it("Should return error object for IN Statement instead of hdl file", function () {
                var io = getInputOutput("import_KEYWORD_INSTEAD_OF_FILE");
                expect(parser.parse("import_KEYWORD_INSTEAD_OF_FILE", io.input, defaultFiles)).to.deep.equal(io.output.result);
            });

            it("Should return error object for missing file", function () {
                var io = getInputOutput("import_MISSING_FILE");
                expect(parser.parse("import_MISSING_FILE", io.input, defaultFiles)).to.deep.equal(io.output.result);
            });

            it("Should return error object for no semicolon found", function () {
                var io = getInputOutput("import_NOT_SEMICOLON");
                expect(parser.parse("import_MISSING_FILE", io.input, defaultFiles)).to.deep.equal(io.output.result);
            });
        });

        describe("Should return ast with file import", function () {
            it("Should return ast", function () {
                var io = getInputOutput("import_NO_ERROR");
                expect(parser.parse("import_NO_ERROR", io.input, defaultFiles)).to.deep.equal(io.output.result);
            });
        });
    });
}

module.exports = {
    testImport
}