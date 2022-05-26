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

function testChipDefinition() {
    describe("HDL chip definition Test", function () {
        describe("Should throw Chip Definition Error", function () {
            it("Should return error object for IN Statement instead of chip name", function () {
                var io = getInputOutput("CHIP_Interface_NO_DEF");
                expect(parser.parse("CHIP_Interface_NO_DEF", io.input, defaultFiles)).to.deep.equal(io.output.result);
            });
            it("Should return error object for only CHIP KEYWORD", function () {
                var io = getInputOutput("ONLY_CHIP_KEYWORD");
                expect(parser.parse("ONLY_CHIP_KEYWORD", io.input, defaultFiles)).to.deep.equal(io.output.result);
            });

        });


    });
}

module.exports = {
    testChipDefinition
}