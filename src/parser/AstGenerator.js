const Token = require("./Token");
const Tokenizer = require("./Tokenizer");

const AstGenerator = () => {
    var ast = [];
    var tokens;
    var pointer = 0;

    var generate = (file, tokenArr, getFileContent) => {
        tokens = tokenArr;

        while (true) {
            var token = Peek();
            if (token.type === Token.EOF) {
                break;
            } else if (token.type === Token.KEYWORD && token.value === 'import') {
                handleImportStatement(getFileContent);
            } else {
                Consume();
            }
        }

        var returnAst = JSON.parse(JSON.stringify(ast));
        clear();
        return { file: file, ast: returnAst };
    }

    AstGenerator.generate = generate;

    var handleImportStatement = (getFileContent) => {
        Consume();

        // Next token should be the file name variable.
        var token = Peek();
        Consume();

        if (token.type !== Token.VARIABLE) {
            reset("Expected variable but got '" + token.value + "', line number:" + token.line + ", column:" + token.column);
        }

        var importedFileContent = getFileContent(token.value);
        var importedFileTokens = Tokenizer.Tokenizer.tokenize(importedFileContent)

        AstGenerator();
        var parsedHdlFileContent = AstGenerator.generate(token.value, importedFileTokens, getFileContent);

        ast.push({ type: Token.IMPORT, ast: parsedHdlFileContent });

        // Next token should be the semicolon operator
        token = Peek();
        if (token.type !== Token.OPERATOR || token.value !== ';') {
            reset("Expected ';' but got '" + token.value + "', line number:" + token.line + ", column:" + token.column);
        }
        Consume();
    };

    const clear = () => {
        pointer = 0;
        ast = [];
    }

    const reset = (err) => {
        clear();
        throw err;
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