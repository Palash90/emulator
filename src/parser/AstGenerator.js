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

        token = Peek();

        var inputVariables = [];

        if (token.type === Token.KEYWORD && token.value === 'CLOCK') {
            Consume();
            token = Peek();

            if (token.type !== Token.SEPARATOR || token.value !== ',') {
                handleParseError(",", token);
            } else {
                Consume();
            }

            inputVariables.push(token);
        }

        inputVariables = inputVariables.concat(handleVariableDefinitions());
        var inputVariablesNode = {
            type: Token.INPUT_VARIABLES,
            value: inputVariables
        };


        token = Peek();
        Consume();
        if (token.value !== 'OUT') {
            handleParseError("OUT", token);
        }

        var outputVariables = handleVariableDefinitions();
        var outputVariablesNode = {
            type: Token.OUTPUT_VARIABLES,
            value: outputVariables
        };

        token = Peek();
        Consume();
        if (token.type !== Token.KEYWORD || token.value !== 'PARTS') {
            handleParseError("PARTS", token);
        }

        token = Peek();
        Consume();
        if (token.type !== Token.OPERATOR || token.value !== ':') {
            handleParseError(":", token);
        }

        var parts = handleChipCallStatements();
        var partsNode = {
            type: Token.PARTS,
            value: parts
        };

        ast.push(inputVariablesNode);
        ast.push(outputVariablesNode);
        ast.push(partsNode);
    };

    var handleChipCallStatements = () => {
        var chipCalls = [];

        var chipNode = {};

        var token = Peek();
        Consume();

        console.log(fileName, "handleChipCallStatements", token)

        if (token.type !== Token.CHIP_INVOKE) {
            handleParseError("CHIP Name", token);
        }

        chipNode.chip = token;


        var token = Peek();
        Consume();

        if (token.type !== Token.OPERATOR && token.value !== '(') {
            handleParseError("(", token);
        }

        var parameters = handleParameters();

        chipNode.parameters = parameters;

        chipCalls.push(chipNode);

        var token = Peek();
        if (token.type === Token.OPERATOR && token.value === ";") {
            Consume();
            console.log("Calling handle parameters recusively")
            variables.push(handleChipCallStatements()[0]);
        } else if (token.type === Token.OPERATOR && token.value === "}") {
            Consume();
        }

        return chipCalls;
    }


    var handleParameters = () => {
        var parameters = [];

        var parameter = {};
        var token = Peek();
        if (token.type !== Token.CHIP_INVOKE_PARAM) {
            handleParseError("Chip Parameter", token);
        }

        parameter.destination = token;
        Consume();

        token = Peek();
        if (token.type !== Token.OPERATOR && token.value !== '=') {
            handleParseError("=", token);
        }

        Consume();

        token = Peek();
        if (token.type !== Token.VARIABLE) {
            handleParseError("Variable", token);
        }

        parameter.source = token;


        token = Peek();
        if (token.type === Token.SEPARATOR && token.value === ",") {
            Consume();
            console.log("Calling handle parameters recusively")
            parameters.push(handleParameters()[0]);
        } else if (token.type === Token.OPERATOR && token.value === ")") {
            Consume();
        }

        parameters.push(parameter)
        return parameters;
    }

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