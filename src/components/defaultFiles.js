
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const defaultFiles = [
  {
    "key": 2,
    "name": "And.hdl",
    "content": "/*\n* Applying De' Morgan's law.\n*/\nimport Not.hdl;\nimport And.svg;\n\n\nCHIP And {\n  IN a, b;\n  OUT out;\n  \n  PARTS:\n    Not(a=a, out=nota); \n    Not(a=b, out=notb);\n    Nor(a=nota, b=notb, out=out);\n}"
  },
  {
    "key": 8,
    "name": "And.svg",
    "content": "<svg width=\"120\" height=\"100\">\n                    <defs>\n                        <linearGradient id=\"grad3\" x1=\"0%\" y1=\"100%\" x2=\"100%\" y2=\"0%\">\n                            <stop offset=\"10%\" style=\"stop-color:#09203F;stop-opacity:1\" />\n                            <stop offset=\"90%\" style=\"stop-color:#367588;stop-opacity:1\" />\n                        </linearGradient>\n                    </defs>\n                    <g>\n                        <rect width=\"$width\" height=\"$height\" style=\"fill:url(#grad3);fill-opacity=1;stroke-width:1;stroke:rgb(0,0,0)\" />\n                        <text x=\"$txtPosX\" y=\"$txtPosY\" font-family=\"Verdana\" text-anchor=\"middle\" font-size=\"10\" fill=\"yellow\">And\n                        </text></g>\n                </svg>\n"
  },
  {
    "key": 10,
    "name": "EightBitAdder.hdl",
    "content": "import FourBitAdder.hdl;\n\nCHIP EightBitAdder {\n  IN cin, \n     a8, a7, a6, a5, a4, a3, a2, a1,\n     b8, b7, b6, b5, b4, b3, b2, b1;\n  OUT cout, s8, s7, s6, s5, s4, s3, s2, s1;\n\n  PARTS:\n    FourBitAdder(a1=a1, a2=a2, a3=a3, a4=a4, b1=b1, b2=b2, b3=b3, b4=b4, cin=cin, s1=s1, s2=s2, s3=s3, s4=s4, cout=c1);\n    FourBitAdder(a1=a5, a2=a6, a3=a7, a4=a7, b1=b5, b2=b6, b3=b7, b4=b8, cin=c1, s1=s5, s2=s6, s3=s7, s4=s8, cout=cout);\n}"
  },
  {
    "key": 9,
    "name": "FourBitAdder.hdl",
    "content": "import FullAdder.hdl;\nimport Xor.hdl;\n\nCHIP FourBitAdder{\n  IN cin, a4, a3, a2, a1, b4, b3, b2, b1;\n  OUT cout, s4, s3, s2, s1;\n\n  PARTS:\n    Xor(a=b1, b=cin, out=xorb1);\n    Xor(a=b2, b=cin, out=xorb2);\n    Xor(a=b3, b=cin, out=xorb3);\n    Xor(a=b4, b=cin, out=xorb4);\n    FullAdder(a=a1, b=xorb1, cin=cin, s=s1, cout=c1);\n    FullAdder(a=a2, b=xorb2, cin=c1, s=s2, cout=c2);\n    FullAdder(a=a3, b=xorb3, cin=c2, s=s3, cout=c3);\n    FullAdder(a=a4, b=xorb4, cin=c3, s=s4, cout=cout); \n}"
  },
  {
    "key": 7,
    "name": "FullAdder.hdl",
    "content": "import HalfAdder.hdl;\nimport And.hdl;\nimport Or.hdl;\n\nCHIP FullAdder {\n\n  IN a, b, cin;\n  OUT s, cout;\n\n  PARTS:\n    HalfAdder(a=a, b=b, s=intermediateSum, c=intermediateCarry);\n    HalfAdder(a=intermediateSum, b=cin, s=s, c=c1);\n    Or(a=intermediateCarry, b=c1, out=cout);\n}"
  },
  {
    "key": 6,
    "name": "HalfAdder.hdl",
    "content": "import Xor.hdl;\nimport And.hdl;\n\nCHIP HalfAdder{\n  IN a, b;\n  OUT s, c;\n\n  PARTS:\n    Xor(a=a, b=b, out=s);\n    And(a=a, b=b, out=c);\n}"
  },
  {
    "key": 5,
    "name": "Nand.hdl",
    "content": "/*\n* Nand Chip\n*/\n\nimport And.hdl;\nimport Not.hdl;\n\nCHIP Nand {\n  IN a, b;\n  OUT out;\n  \n  PARTS:\n    And(a=a, b=b, out=and);\n    Not(a=and, out=out);\n}"
  },
  {
    "key": 0,
    "name": "Not.hdl",
    "content": "/*\n* Not CHIP\n*/\n\nCHIP Not {\n    IN a;\n    OUT out;\n\n    PARTS:\n     \n     Nor(a=a, b=a, out=out); // If we short two inputs of nor gate, we essentially get a not gate.                                                                                         \n}\n"
  },
  {
    "key": 1,
    "name": "Or.hdl",
    "content": "/*\n* The Nor output needs to go through the Not gate to get Or gate\n*/\nimport Not.hdl;\n\nCHIP Or {\n  IN a, b;\n  OUT out;\n  \n  PARTS:\n    Nor(a=a, b=b, out=norOut);\n    Not(a=norOut, out=out); \n}"
  },
  {
    "key": 4,
    "name": "Xnor.hdl",
    "content": "/*\n* Xnor Chip\n*/\n\nimport Xor.hdl;\nimport Not.hdl;\n\nCHIP Xnor {\n  IN a, b;\n  OUT out;\n  \n  PARTS:\n    Xor(a=a, b=b, out=xor);\n    Not(a=xor, out=out);\n}"
  },
  {
    "key": 3,
    "name": "Xor.hdl",
    "content": "/*\n* Xor Chip\n* Xor(a,b) = a And Not(b) Or b And Not(a)\n*/\n\nimport And.hdl;\nimport Or.hdl;\nimport Not.hdl;\n\nCHIP Xor {\n  IN a, b;\n  OUT out;\n\n  PARTS:\n    Not(a=a, out=nota);\n    Not(a=b, out=notb);\n    And(a=a, b=notb, out=anotb);\n    And(a=b, b=nota, out=bnota);\n    Or(a=anotb, b=bnota, out=out);\n}"
  }
]

var _default = defaultFiles;
exports.default = _default;