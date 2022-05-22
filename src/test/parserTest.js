const expect = require('chai').expect;
const parser = require('../parser/parser');
const fs = require('fs');
const path = require('path')
const getInputOutput = (input) => {
    var inputPath = path.join(__dirname, input + "_input.hdl");
    var outputPath = path.join(__dirname, input + "_output.hdl");
    return {
        input: fs.readFileSync(inputPath, 'utf8'),
        output: fs.readFileSync(outputPath, 'utf8')
    }
}

describe("HDL Interpreter Test", function () {
    describe("Remove comments", function () {
        it("Removes multi-line comments", function () {
            var io = getInputOutput("program1");
            var result = parser.parse(io.input);
            expect(io.output).to.equal(result);
        }
        );
    });
})