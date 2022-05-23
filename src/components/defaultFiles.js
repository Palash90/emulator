const defaultFiles = [
  {
    "key": 2,
    "name": "And.hdl",
    "content": "/*\n* Applying De' Morgan's law.\n*/\nimport Not.hdl;\n\nCHIP And {\n  IN a, b;\n  OUT out;\n  \n  PARTS:\n    Not(a=a, out=notA);\n    Not(a=b, out=notB);\n    Nor(a=notA, b=notB, out=out);\n}"
  },
  {
    "key": 0,
    "name": "Not.hdl",
    "content": "/*\n* Not CHIP\n*/\n\nCHIP Not {\n    IN a;\n    OUT out;\n\n    PARTS:\n     \n     Nor(a=a, b=a, out=out); // If we short two inputs of nor gate, we essentially get a not gate.                                                                                         \n}\n"
  },
  {
    "key": 1,
    "name": "Or.hdl",
    "content": "/*\n* The Nor output needs to go through the Not gate to get Or gate\n*/\nimport Not.hdl;\n\nCHIP Or {\n  IN a, b;\n  OUT out;\n  \n  PARTS:\n    Nor(a=a, b=b, out=norOut);\n    Not(a=norOut, out=out);\n}"
  }
];

export default defaultFiles;