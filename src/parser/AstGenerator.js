const Token = require("./Token");

const AstGenerator = () => {
    var ast = [];
    var tokens;
    var pointer = 0;

    var generate = (tokenArr) => {
        tokens = tokenArr;

        while (true) {
            var token = Peek();
            if (token.type === Token.EOF) {
                break;
            } else if (token.type === Token.KEYWORD && token.value === 'CHIP') {
                handleChipDefinition();
            } else {
                Consume();
            }
        }

        return ast;

        function handleChipDefinition() {
            Consume();

            var chipName = Peek();
            Consume();

            if (chipName.type !== Token.CHIPDEF) {
                throw new Error("Incorrect syntax at line " + chipName.line + " column " + chipName.column + ". Expected CHIP name, got " + chipName.value);
            }

            var l_brace = Peek();
            Consume();
            if (l_brace.type !== Token.OPERATOR || l_brace.value != '{') {
                throw new Error("Incorrect syntax at line " + l_brace.line + " column " + l_brace.column + ". Expected '{', got " + l_brace.value);
            }

            var in_statement = Peek();
            Consume();
            if (in_statement.type !== Token.KEYWORD || in_statement.value !== 'IN') {
                throw new Error("Incorrect syntax at line " + in_statement.line + " column " + in_statement.column + ". Expected 'IN', got " + in_statement.value);
            }

            var inputs = [];
            while (true) {
                var input_variable_token = Peek();
                if (input_variable_token.type === Token.EOF) {
                    throw new Error("Incorrect syntax at line " + in_statement.line + " column " + in_statement.column + ". Expected ';', got EOF");
                }

                if (input_variable_token.type === Token.OPERATOR && input_variable_token.value === ';') {
                    break;
                }

                if(input_variable_token.type !== Token.VARIABLE){
                    throw new Error("Incorrect syntax at line " + in_statement.line + " column " + in_statement.column + ". Expected ';', got EOF");
                }

                Consume();
            }

            var node = {
                name: chipName.value,
                type: 'CHIP'
            };

            ast.push(node);
        }
    }



    AstGenerator.generate = generate;


    const PeekLast = (tokens) => {
        if (tokens.length > 0)
            return tokens[tokens.length - 1];
        else
            return { type: Token.START };
    };

    const Peek = () => {
        if (pointer < tokens.length) {
            return tokens[pointer];
        }
        else {
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
}

AstGenerator();
module.exports = {
    AstGenerator
}