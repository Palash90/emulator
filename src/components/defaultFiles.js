const defaultFiles = [
  {
    "key": 2,
    "name": "And.hdl",
    "content": "/*\n* Applying De' Morgan's law.\n*/\nimport Not.hdl;\n\nCHIP And {\n  IN a, b;\n  OUT out;\n  \n  PARTS:\n    Not(a=a, out=notA);\n    Not(a=b, out=notB);\n    Nor(a=notA, b=notB, out=out);\n}"
  },
  {
    "key": 5,
    "name": "Nand.hdl",
    "content": "/*\n* Nand Chip\n*/\n\nimport And.hdl;\nimport Not.hdl\n\nCHIP Nand {\n  IN a, b;\n  OUT out;\n  \n  PARTS:\n    And(a=a, b=b, out=and);\n    Not(a=and, out=out);\n}"
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
  },
  {
    "key": 4,
    "name": "Xnor.hdl",
    "content": "/*\n* Xnor Chip\n*/\n\nimport Xor.hdl;\n\nCHIP Xnor {\n  IN a, b;\n  OUT out;\n  \n  PARTS:\n    Xor(a=a, b=b, out=xor);\n    Not(a=xor, out=out);\n}"
  },
  {
    "key": 3,
    "name": "Xor.hdl",
    "content": "/*\n* Xor Chip\n* Xor(a,b) = a And Not(b) Or b And Not(a)\n*/\n\nimport And.hdl;\nimport Or.hdl;\nimport Not.hdl;\n\nCHIP Xor {\n  IN a, b;\n  OUT out;\n\n  PARTS:\n    Not(a=a, out=nota);\n    Not(a=b, out=notb);\n    And(a=a, b=notb, out=anotb);\n    And(a=b, b=nota, out=bnota);\n    Or(a=anotb, b=bnota, out=out);\n}"
  }
];

export default defaultFiles;