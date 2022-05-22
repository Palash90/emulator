const Tokenizer = () => {
    const OPERATOR = 0;
    const SEPARATOR = 1;
    const VARIABLE = 2;
    const KEYWORD = 3;
    const START = 4;
    const EOF = 5;
    const INT_LITERAL = 6;
    const DOUBLE_LITERAL = 7;
    const STRING_LITERAL = 8;
    const FUNCDEF = 9;
    const FUNC_INVOKE = 10;
    const NA = 11
    const ASSIGNMENT = 12;
    var Separators = [' ', '\t', '\n', ','];
    var Operators = ['=', '(', ')', '{', '}', '[', ']', ';',];
    var Keywords = ['CHIP', 'IN', 'OUT', 'PARTS', 'CLOCK', 'IMPORT'];

    var tokens = [];
    var pointer = 0;

    const isSeparator = (value) => Separators.some(el => el === value);
    const isOperator = (value) => Operators.some(el => el === value);
    const isKeyword = (value) => Keywords.some(el => el === value);

    var tokenize = (text) => {
        var line = 1;
        var column = 0;
        var index = 0;
        var tokenStartColumn = 0;

        var tokenPart = "";

        while (index < text.length) {
            var currChar = text[index];
            column++;
            if (currChar == '\n') {
                column = 0;
            }

            if (isSeparator(currChar) || isOperator(currChar)) {
                var token = {
                    value: tokenPart,
                    line: line,
                    column: column
                };
                tokenPart = "";
                tokenStartColumn = column;
                tokens.push(token);

                if (isOperator(currChar) || currChar == ',') {
                    var opearatorToken =
                    {
                        value: currChar.ToString(),
                        line: line,
                        column: column
                    };
                    tokens.Add(opearatorToken);
                }
                if (currChar == '\n') {
                    line++;
                }
            } else {
                tokenPart = tokenPart + currChar;
            }
            index++;
        }
console.log('Returning tokens')
        return tokens;
    }

    /* Token Structure
    Token {
        public string value { get; set; }
            public int line { get; set; }
            public int column { get; set; }
            public Type type { get; set; }
            public double doubleValue { get; set; }
            public Meaning meaning { get; set; }
        }
        */
}

module.exports = {
    tokenize: Tokenizer.Tokenize
}
