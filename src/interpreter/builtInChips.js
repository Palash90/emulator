module.exports = [
    {
        chip: "Nor",
        inputs: ["a", "b"],
        outputs: ["out"],
        func: (a, b) => {
            console.log("a Nor b")
            return !(a || b);
        }
    }
];