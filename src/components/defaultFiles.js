const defaultFiles = [{
    "key": 0,
    "name": "Not",
    "content": "/*\n* Not CHIP\n*/\n\nCHIP Not {\n    IN a;\n    OUT out;\n\n    PARTS:\n     \n     Nor(a=a, b=a, out=out); // If we short two inputs of nor gate, we essentially get a not gate.                                                                                         \n}\n"
}];

export default defaultFiles;