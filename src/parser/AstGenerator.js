const Token = require("./Token");
const Tokenizer = require("./Tokenizer");

const AstGenerator = () => {
    var ast = [];
    var tokens;
    var pointer = 0;
    var fileName = '';

    var generate = (file, tokenArr, getFileContent) => {
        tokens = tokenArr;
        fileName = file;
        try {
            while (true) {
                var token = Peek();
                if (token.type === Token.EOF) {
                    break;
                } else if (token.type === Token.KEYWORD && token.value === 'import') {
                    handleImportStatement(getFileContent);
                } else if (token.type === Token.KEYWORD && token.value === 'CHIP') {
                    handleChipDefinition();
                } else {
                    Consume();
                }
            }
        } catch (err) {
            throw err;
        }

        var returnAst = JSON.parse(JSON.stringify(ast));
        clear();
        return { file: file, ast: returnAst };
    }

    AstGenerator.generate = generate;

    var handleChipDefinition = () => {
        Consume();
        var token = Peek();
        Consume();
        if (token.type !== Token.CHIPDEF) {
            handleParseError("Chip Name", token);
        }

        token = Peek();
        Consume();
        if (token.value !== '{') {
            handleParseError("{", token);
        }

        token = Peek();
        Consume();
        if (token.value !== 'IN') {
            handleParseError("IN", token);
        }

        var variables = handleVariableDefinitions();
    };

    var handleVariableDefinitions = () => {
        var variables = [];
        var token = Peek();

        if (token.type !== Token.VARIABLE) {
            handleParseError("Variable Definition", token);
        }

        variables.push(token);
        Consume();

        var token = Peek();

        if (token.type === Token.SEPARATOR && token.value === ",") {
            Consume();
            variables.push(handleVariableDefinitions()[0]);
        } else if (token.type === Token.OPERATOR && token.value === ";") {
            Consume();
        } else {
            handleParseError("Variable Definition or Semicolon", token);
        }

        return variables;
    }

    var handleImportStatement = (getFileContent) => {
        Consume();

        // Next token should be the file name variable.
        var token = Peek();
        Consume();

        if (token.type !== Token.VARIABLE) {
            handleParseError("File Name", token);
        }

        var importedFileContent = getFileContent(token.value);
        var importedFileTokens = Tokenizer.Tokenizer.tokenize(importedFileContent)

        AstGenerator();
        var parsedHdlFileContent = AstGenerator.generate(token.value, importedFileTokens, getFileContent);

        ast.push({ type: Token.IMPORT, ast: parsedHdlFileContent });

        // Next token should be the semicolon operator
        token = Peek();
        if (token.type !== Token.OPERATOR || token.value !== ';') {
            handleParseError(";", token);
        }
        Consume();
    };

    const clear = () => {
        pointer = 0;
        ast = [];
    }

    const handleParseError = (exptected, token) => {
        clear();
        var err = fileName + ":" + "Expected " + exptected + ", but got '" + (token.type === Token.EOF ? 'EOF' : token.value);
        err = err + (token.type === Token.EOF ? "'" : ("' at line:" + token.line + " column:" + token.column));
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