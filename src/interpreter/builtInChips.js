module.exports = [
    {
        chip: "Nor",
        inputs: ["a", "b"],
        outputs: ["out"],
        operations: {
            out: (norInput) => {
                var norResult = !(norInput['a'] || norInput['b'])
                console.log("Received input in nor gate", norInput, "returning", norResult);
                return norResult;
            }
        }
    },
    {
        chip: "XAnd",
        inputs: ["a", "b"],
        outputs: ["out"],
        operations: {
            out: (input) => (input['a'] && input['b'])
        }
    }
];