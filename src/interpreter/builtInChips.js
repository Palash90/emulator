module.exports = [
    {
        chip: "Nor",
        inputs: ["a", "b"],
        outputs: ["out"],
        operations: {
            out: (norInput) => !(norInput['a'] || norInput['b'])
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