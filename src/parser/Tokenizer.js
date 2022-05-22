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
    var Operators = ['=', '(', ')', '{', '}', '[', ']', ';', ':'];
    var Keywords = ['CHIP', 'IN', 'OUT', 'PARTS', 'CLOCK', 'IMPORT'];

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
        console.log(tokens)
        return analyzeTokens();
    }

    Tokenizer.tokenize = tokenize;

    const analyzeTokens = () => {
        var analyzedTokens = [];
        console.log(tokens)
        while (Peek() !== EOF) {
            var currToken = Peek();
            console.log(JSON.stringify(currToken) + " is under process")
            if (currToken.value === '=') {
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
                console.log("Operator token", currToken)
                var token = Peek();
                token.type = OPERATOR;
                analyzedTokens.push(token);
                Consume();
            }
            else if (isSeparator(currToken.value)) {
                console.log("Sparator token", currToken)
                var token = Peek();
                token.type = SEPARATOR;
                analyzedTokens.push(token);
                Consume();
            }
            else if (isKeyword(currToken.value)) {
                console.log("Keyword token", currToken)
                var token = Peek();
                token.type = KEYWORD;
                analyzedTokens.push(token);
                Consume();
            }
            else {
                console.log("Varable and literal token", currToken)
                CheckVariableAndLiterals(analyzedTokens);
            }
        }
    }

    const PeekLast = (tokens) => {
        if (tokens.Count > 0)
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

        var regex = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
        var match = token.value.match(regex);

        if (match) {
            var last = PeekLast(analyzedTokens);
            var next = PeekNext();

            if (last.value == "CHIP") {
                token.type = FUNCDEF;
            }
            else if (next.value == "(") {
                token.type = FUNC_INVOKE;
            }
            else {
                token.type = VARIABLE;
            }
        }
        else {
            var last = PeekLast(analyzedTokens);
            if (last.value == "CHIP") {
                throw new Error("Syntax error in chip name, line " + token.line + ", column " + token.column + ": " + token.value);
            }
            else {
                throw new Error("Syntax error in variable name, line " + token.line + ", column " + token.column + ": " + token.value);
            }

        }
        analyzedTokens.push(token);
        Consume();
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
    Tokenizer: Tokenizer
}
