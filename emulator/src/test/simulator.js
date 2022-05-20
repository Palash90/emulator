const expect = require('chai').expect;
const simulator = require('../simulator/simulator');
const fs = require('fs');
const path = require('path')
const getInputOutputPath = (input) => [path.join(__dirname, input + "_input.hdl"), path.join(__dirname, input + "_output.hdl")]

describe("HDL Simulator", function () {
    describe("Remove comments", function () {
        it("Removes multi-line comments", function () {
            var content = fs.readFileSync(getInputOutputPath("program1")[0], 'utf8');
            var expectedResult = fs.readFileSync(getInputOutputPath("program1")[1], 'utf8');
            var result = simulator.simulate(content);
            expect(expectedResult).to.equal(result);
        }
        );
    });


})