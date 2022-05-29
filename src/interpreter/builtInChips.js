module.exports = [
    {
        chip: "Nor",
        inputs: ["a", "b"],
        outputs: ["out"],
        func: (a, b) => !(a || b)
    }
];