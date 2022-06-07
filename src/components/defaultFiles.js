
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
    "content": "<svg width=\"120\" height=\"100\">\n                    <defs>\n                        <linearGradient id=\"grad3\" x1=\"0%\" y1=\"100%\" x2=\"100%\" y2=\"0%\">\n                            <stop offset=\"10%\" style=\"stop-color:#09203F;stop-opacity:1\" />\n                            <stop offset=\"90%\" style=\"stop-color:#367588;stop-opacity:1\" />\n                        </linearGradient>\n                    </defs>\n                    <g>\n                        <rect width=\"100\" height=\"80\" style=\"fill:url(#grad3);fill-opacity=1;stroke-width:1;stroke:rgb(0,0,0)\" />\n                        <text x=\"50\" y=\"40\" font-family=\"Verdana\" text-anchor=\"middle\" font-size=\"10\" fill=\"yellow\">And\n                        </text></g>\n                </svg>\n"
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
  },
  {
    "key": 9,
    "name": "D_Latch.hdl",
    "content": "import Not.hdl;\n\nCHIP D_Latch {\n  IN d;\n  OUT q, qnot;\n\n  PARTS:\n    Not(a=d, out=r);\n    Nor(a=d, b=q, out=qnot);\n    Nor(a=r, b=qnot, out=q);\n}"
  }
]

var _default = defaultFiles;
exports.default = _default;