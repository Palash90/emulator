const Token = require('./Token')

const Tokenizer = () => {
    var tokens = [];
    var pointer = 0;

    const isSeparator = (value) => Token.Separators.some(el => el === value);
    const isOperator = (value) => Token.Operators.some(el => el === value);
    const isKeyword = (value) => Token.Keywords.some(el => el === value);

    const tokenize = (text) => {
        var line = 1;
        var column = 0;

        var index = 0;
        var tokenStartColumn = 0;

        var tokenPart = "";

        while (index < text.length) {
            var currChar = text[index];
            console.log(currChar, line, column)
            column++;
            if (currChar === '\n') {
                console.log(column, currChar, line)
                column = 0;
              //  tokenStartColumn = 0;
            }

            if (isSeparator(currChar) || isOperator(currChar)) {
                if (tokenPart !== '') {
                    var token = {
                        value: tokenPart,
                        line: line,
                        column: column + 1
                    };
                    tokenPart = "";
                    tokenStartColumn = column;
                    console.log("38", token, line, column)
                    tokens.push(token);
                }

                if (isOperator(currChar) || currChar === ',') {
                    var opearatorToken =
                    {
                        value: currChar,
                        line: line,
                        column: column
                    };
                    console.log("49", token, line, column)
                    tokens.push(opearatorToken);
                }
                if (currChar === '\n') {
                    line++;
                    column = 0;
                    tokenStartColumn = 0;

                    var newLineToken =
                    {
                        value: currChar,
                        line: line,
                        column: column
                    };
                    console.log("63", newLineToken, line, column)
                    tokens.push(newLineToken);
                }
            } else {
                tokenPart = tokenPart + currChar;
                if (tokenPart !== '' && index === (text.length - 1)) {
                    var remainingToken =
                    {
                        value: tokenPart,
                        line: line,
                        column: tokenStartColumn
                    };
                    console.log("75", remainingToken, line, column)
                    tokens.push(remainingToken);
                }
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

            if (currToken.type === Token.EOF) {
                break;
            } else if (currToken.value === '\n') {
                Consume();
            } else if (currToken.value === '/') {
                Consume();
                var nextToken = Peek();

                if (nextToken.value === '*') {
                    var stop = false;
                    while (!stop) {
                        Consume();
                        var commentCurrToken = Peek();
                        var commentNextToken = PeekNext();
                        stop = commentCurrToken.type === Token.EOF || (commentCurrToken.value === '*' && commentNextToken.value === '/');
                        if (stop) {
                            Consume();
                        }
                    }
                }

                if (nextToken.value === '/') {
                    var stop = false;
                    while (!stop) {
                        Consume();
                        var commentCurrToken = Peek();
                        stop = commentCurrToken.type === Token.EOF || commentCurrToken.value === '\n';
                    }
                }
            } else if (currToken.value === '=') {
                var currToken;
                var nextToken = Peek();
                nextToken.type = Token.OPERATOR;
                Consume();
                currToken = Peek();

                if (currToken.value === "=") {
                    Consume();
                    //nextToken.value = newValue;
                    nextToken.type = Token.OPERATOR;
                }
                analyzedTokens.push(nextToken);
            } else if (isOperator(currToken.value)) {
                var token = Peek();
                token.type = Token.OPERATOR;
                analyzedTokens.push(token);
                Consume();
            }
            else if (isSeparator(currToken.value)) {
                var token = Peek();
                token.type = Token.SEPARATOR;
                analyzedTokens.push(token);
                Consume();
            }
            else if (isKeyword(currToken.value)) {
                var token = Peek();
                token.type = Token.KEYWORD;
                analyzedTokens.push(token);
                Consume();
            }
            else {
                CheckVariableAndLiterals(analyzedTokens);
            }
        }
        return analyzedTokens;
    }

    const PeekLast = (tokens) => {
        if (tokens.length > 0)
            return tokens[tokens.length - 1];
        else
            return { type: Token.START };
    };

    const Peek = () => {
        if (pointer < tokens.length) {
            return tokens[pointer];
        } else {
            return { type: Token.EOF };
        }
    }

    const PeekNext = () => {
        if (pointer + 1 < tokens.length) {
            return tokens[pointer + 1];
        }
        else {
            return { type: Token.EOF };
        }
    }

    const Consume = () => pointer++;


    const CheckVariableAndLiterals = (analyzedTokens) => {

        var token = Peek();

        if (!isNaN(parseInt(token.value))) {
            token.type = Token.INT_LITERAL;
        } else {
            var regex = /^[a-zA-Z_$][a-zA-Z_$.0-9]*$/;
            var matched = token.value.match(regex);
            var match = matched && matched.length > 0;

            if (match) {
                var last = PeekLast(analyzedTokens);
                var next = PeekNext();

                if (last.value === "CHIP") {
                    token.type = Token.CHIPDEF;
                } else if (next.value === "(") {
                    token.type = Token.CHIP_INVOKE;
                } else {
                    if (next.value === '=') {
                        token.type = Token.CHIP_INVOKE_PARAM
                    } else {
                        token.type = Token.VARIABLE;
                    }
                }
            }
            else {
                var last = PeekLast(analyzedTokens);
                if (last.value === "CHIP") {
                    tokens = [];
                    pointer = 0;
                    throw "Syntax error in chip name, line " + token.line + ", column " + token.column + ": " + token.value;
                }
                else {
                    tokens = [];
                    pointer = 0;
                    throw "Syntax error in variable name, line " + token.line + ", column " + token.column + ": " + token.value;
                }

            }
        }
        analyzedTokens.push(token);
        Consume();
    }
}
Tokenizer()
module.exports = {
    Tokenizer: Tokenizer
}
