module.exports = [
    {
        chip: "Nor",
        inputs: ["a", "b"],
        outputs: ["out"],
        func: (getParameter) => !(getParameter('a') && getParameter('b'))
    }
];