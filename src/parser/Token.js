const OPERATOR = 0;
const SEPARATOR = 1;
const VARIABLE = 2;
const KEYWORD = 3;
const START = 4;
const EOF = 5;
const CHIPDEF = 6;
const CHIP_INVOKE = 7;
const CHIP_INVOKE_PARAM = 8;
const INT_LITERAL = 9;
const Separators = [' ', '\t', '\n', ','];
const Operators = ['=', '(', ')', '{', '}', ';', ':', '/', '\\', '*'];
const Keywords = ['CHIP', 'IN', 'OUT', 'PARTS', 'CLOCK', 'import'];
const IMPORT = "IMPORT";
const INPUT_VARIABLES = "INPUT_VARIABLES";
const OUTPUT_VARIABLES = "OUTPUT_VARIABLES";


module.exports = {
    OPERATOR,
    SEPARATOR,
    VARIABLE,
    KEYWORD,
    START,
    EOF,
    CHIPDEF,
    CHIP_INVOKE,
    Separators,
    Operators,
    Keywords,
    CHIP_INVOKE_PARAM,
    INT_LITERAL,
    IMPORT,
    INPUT_VARIABLES,
    OUTPUT_VARIABLES
}