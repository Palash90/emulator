module.exports = [
    {
        chip: "Nor",
        inputs: ["a", "b"],
        outputs: ["out"],
        operations: {
            out: (input) => {
                var norResult = !(input['a'] || input['b'])
                console.log("Received input in nor gate", input, "returning", norResult);
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