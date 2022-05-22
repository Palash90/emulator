const Tokenizer = () => {
    const OPERATOR = 0;
    const SEPARATOR = 1;
    const VARIABLE = 2;
    const KEYWORD = 3;
    const START = 4;
    const EOF = 5;
    const CHIPDEF = 9;
    const CHIP_INVOKE = 10;
    var Separators = [' ', '\t', '\n', ','];
    var Operators = ['=', '(', ')', '{', '}', '[', ']', ';', ':'];
    var Keywords = ['CHIP', 'IN', 'OUT', 'PARTS', 'CLOCK', 'import'];

    var tokens = [];
    var pointer = 0;

    const isSeparator = (value) => Separators.some(el => el === value);
    const isOperator = (value) => Operators.some(el => el === value);
    const isKeyword = (value) => Keywords.some(el => el === value);

    const tokenize = (text) => {
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
                if (tokenPart !== '') {
                    var token = {
                        value: tokenPart,
                        line: line,
                        column: column
                    };
                    tokenPart = "";
                    tokenStartColumn = column;
                    tokens.push(token);
                }

                if (isOperator(currChar) || currChar == ',') {
                    var opearatorToken =
                    {
                        value: currChar,
                        line: line,
                        column: column
                    };
                    tokens.push(opearatorToken);
                }
                if (currChar == '\n') {
                    line++;
                }
            } else {
                tokenPart = tokenPart + currChar;
            }
            index++;
        }
        return analyzeTokens();
    }

    Tokenizer.tokenize = tokenize;

    const analyzeTokens = () => {
        var analyzedTokens = [];
        while (true) {
            var currToken = Peek();
            if (currToken.type === EOF) {
                break;
            } else if (currToken.value === '=') {
                var currToken;
                var tempToken = Peek();
                tempToken.type = OPERATOR;
                Consume();
                currToken = Peek();

                if (currToken.value == "=") {
                    Consume();
                    tempToken.value = newValue;
                    tempToken.type = OPERATOR;
                }
                analyzedTokens.push(tempToken);
            } else if (isOperator(currToken.value)) {
                var token = Peek();
                token.type = OPERATOR;
                analyzedTokens.push(token);
                Consume();
            }
            else if (isSeparator(currToken.value)) {
                var token = Peek();
                token.type = SEPARATOR;
                analyzedTokens.push(token);
                Consume();
            }
            else if (isKeyword(currToken.value)) {
                var token = Peek();
                token.type = KEYWORD;
                analyzedTokens.push(token);
                Consume();
            }
            else {
                CheckVariableAndLiterals(analyzedTokens);
            }
        }

        console.log(analyzedTokens);
        return analyzedTokens;
    }

    const PeekLast = (tokens) => {
        if (tokens.length > 0)
            return tokens[tokens.length - 1];
        else
            return { type: START };
    };

    const Peek = () => {
        if (pointer < tokens.length) {
            return tokens[pointer];
        }
        else {
            return { type: EOF };
        }
    }

    const PeekNext = () => {
        if (pointer + 1 < tokens.length) {
            return tokens[pointer + 1];
        }
        else {
            return { type: EOF };
        }
    }

    const Consume = () => pointer++;


    const CheckVariableAndLiterals = (analyzedTokens) => {

        var token = Peek();

        var regex = /^[a-zA-Z_$][a-zA-Z_$.0-9]*$/;
        var match = token.value.match(regex).length>0;

        console.log("checking type of " + token.value + ", matched regex " + match)

        if (match) {
            var last = PeekLast(analyzedTokens);
            var next = PeekNext();

            if (last.value === "CHIP") {
                token.type = CHIPDEF;
            }
            else if (next.value === "(") {
                token.type = CHIP_INVOKE;
            } else {
                token.type = VARIABLE;
            }
        }
        else {
            var last = PeekLast(analyzedTokens);
            if (last.value === "CHIP") {
                throw new Error("Syntax error in chip name, line " + token.line + ", column " + token.column + ": " + token.value);
            }
            else {
                throw new Error("Syntax error in variable name, line " + token.line + ", column " + token.column + ": " + token.value);
            }

        }
        analyzedTokens.push(token);
        Consume();
    }
}

module.exports = {
    Tokenizer: Tokenizer
}