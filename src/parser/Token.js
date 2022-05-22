const OPERATOR = 0;
const SEPARATOR = 1;
const VARIABLE = 2;
const KEYWORD = 3;
const START = 4;
const EOF = 5;
const CHIPDEF = 6;
const CHIP_INVOKE = 7;
var Separators = [' ', '\t', '\n', ','];
var Operators = ['=', '(', ')', '{', '}', '[', ']', ';', ':'];
var Keywords = ['CHIP', 'IN', 'OUT', 'PARTS', 'CLOCK', 'import'];

module.exports = {
    OPERATOR, SEPARATOR, VARIABLE, KEYWORD, START, EOF, CHIPDEF, CHIP_INVOKE, Separators, Operators, Keywords
}