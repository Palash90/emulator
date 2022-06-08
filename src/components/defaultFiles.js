
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
    "key": 11,
    "name": "Demultiplexer.hdl",
    "content": "import Not.hdl;\n\nCHIP Demultiplexer{\n  IN a, b, c;\n  OUT o1, o2, o3, o4, o5, o6, o7, o8;\n  PARTS:\n    Not(a=a, out=o1);\n  Not(a=a, out=o2);\n  Not(a=a, out=o3);\n  Not(a=a, out=o4);\n  Not(a=a, out=o5);\n  Not(a=a, out=o6);\n  Not(a=a, out=o7);\n  Not(a=a, out=o8);\n}"
  },
  {
    "key": 10,
    "name": "EightBitAdder.hdl",
    "content": "import Xor.hdl;\nimport FullAdder.hdl;\n\nCHIP EightBitAdder {\n  IN cin, \n     a8, a7, a6, a5, a4, a3, a2, a1,\n     b8, b7, b6, b5, b4, b3, b2, b1;\n  OUT cout, s8, s7, s6, s5, s4, s3, s2, s1;\n\n  PARTS:\n    Xor(a=b1, b=cin, out=xorb1);\n    Xor(a=b2, b=cin, out=xorb2);\n    Xor(a=b3, b=cin, out=xorb3);\n    Xor(a=b4, b=cin, out=xorb4);\n    Xor(a=b5, b=cin, out=xorb5);\n    Xor(a=b6, b=cin, out=xorb6);\n    Xor(a=b7, b=cin, out=xorb7);\n    Xor(a=b8, b=cin, out=xorb8);\n    FullAdder(a=a1, b=xorb1, cin=cin, s=s1, cout=c1);\n    FullAdder(a=a2, b=xorb2, cin=c1, s=s2, cout=c2);\n    FullAdder(a=a3, b=xorb3, cin=c2, s=s3, cout=c3);\n    FullAdder(a=a4, b=xorb4, cin=c3, s=s4, cout=c4);\n    FullAdder(a=a5, b=xorb5, cin=c4, s=s5, cout=c5);\n    FullAdder(a=a6, b=xorb6, cin=c5, s=s6, cout=c6);\n    FullAdder(a=a7, b=xorb7, cin=c6, s=s7, cout=c7);\n    FullAdder(a=a8, b=xorb8, cin=c7, s=s8, cout=cout);\n}"
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
    "key": 12,
    "name": "SixteenBitAdder.hdl",
    "content": "import Xor.hdl;\nimport FullAdder.hdl;\n\nCHIP SixteenBitAdder {\n  IN cin, \n     a16, a15, a14, a13, a12, a11, a10, a9, a8, a7, a6, a5, a4, a3, a2, a1,\n     b16, b15, b14, b13, b12, b11, b10, b9, b8, b7, b6, b5, b4, b3, b2, b1;\n  OUT cout, s16, s15, s14, s13, s12, s11, s10, s9, s8, s7, s6, s5, s4, s3, s2, s1;\n\n  PARTS:\n    Xor(a=b1, b=cin, out=xorb1);\n    Xor(a=b2, b=cin, out=xorb2);\n    Xor(a=b3, b=cin, out=xorb3);\n    Xor(a=b4, b=cin, out=xorb4);\n    Xor(a=b5, b=cin, out=xorb5);\n    Xor(a=b6, b=cin, out=xorb6);\n    Xor(a=b7, b=cin, out=xorb7);\n    Xor(a=b8, b=cin, out=xorb8);\n    Xor(a=b9, b=cin, out=xorb9);\n    Xor(a=b10, b=cin, out=xorb10);\n    Xor(a=b11, b=cin, out=xorb11);\n    Xor(a=b12, b=cin, out=xorb12);\n    Xor(a=b13, b=cin, out=xorb13);\n    Xor(a=b14, b=cin, out=xorb14);\n    Xor(a=b15, b=cin, out=xorb15);\n    Xor(a=b16, b=cin, out=xorb16);\n    FullAdder(a=a1, b=xorb1, cin=cin, s=s1, cout=c1);\n    FullAdder(a=a2, b=xorb2, cin=c1, s=s2, cout=c2);\n    FullAdder(a=a3, b=xorb3, cin=c2, s=s3, cout=c3);\n    FullAdder(a=a4, b=xorb4, cin=c3, s=s4, cout=c4);\n    FullAdder(a=a5, b=xorb5, cin=c4, s=s5, cout=c5);\n    FullAdder(a=a6, b=xorb6, cin=c5, s=s6, cout=c6);\n    FullAdder(a=a7, b=xorb7, cin=c6, s=s7, cout=c7);\n    FullAdder(a=a8, b=xorb8, cin=c7, s=s8, cout=c8);\n    FullAdder(a=a9, b=xorb9, cin=c8, s=s9, cout=c9);\n    FullAdder(a=a10, b=xorb10, cin=c9, s=s10, cout=c10);\n    FullAdder(a=a11, b=xorb11, cin=c10, s=s11, cout=c11);\n    FullAdder(a=a12, b=xorb12, cin=c11, s=s12, cout=c12);\n    FullAdder(a=a13, b=xorb13, cin=c12, s=s13, cout=c13);\n    FullAdder(a=a14, b=xorb14, cin=c13, s=s14, cout=c14);\n    FullAdder(a=a15, b=xorb15, cin=c14, s=s15, cout=c15);\n    FullAdder(a=a16, b=xorb16, cin=c15, s=s16, cout=cout);\n}"
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