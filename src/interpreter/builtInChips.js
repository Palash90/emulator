module.exports = [
    {
        chip: "Nor",
        inputs: ["norIna", "norInb"],
        outputs: ["norOut"],
        operations: {
            out: (norInput) => {
                var norResult = !(norInput['norIna'] || norInput['norInb'])
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