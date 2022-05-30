module.exports = [
    {
        chip: "Nor",
        inputs: ["a", "b"],
        outputs: ["out"],
        chips: {
            out: (valueOf) => !(valueOf('a') || valueOf('b'))
        }
    },
    {
        chip: "XAnd",
        inputs: ["a", "b"],
        outputs: ["out"],
        chips: {
            out: (valueOf) => (valueOf('a') && valueOf('b'))
        }
    }
];