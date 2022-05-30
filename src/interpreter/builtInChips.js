module.exports = [
    {
        chip: "Nor",
        inputs: ["a", "b"],
        outputs: ["out"],
        chips: {
            out: (getParameter) => !(getParameter('a') || getParameter('b'))
        }
    },
    {
        chip: "XAnd",
        inputs: ["a", "b"],
        outputs: ["out"],
        chips: {
            out: (getParameter) => (getParameter('a') && getParameter('b'))
        }
    }
];