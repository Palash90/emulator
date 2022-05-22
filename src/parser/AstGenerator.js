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
            } else if (token.type === Token.CHIPDEF) {
                Consume();

                ast.push({

                });
            }
        }

        return ast;
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