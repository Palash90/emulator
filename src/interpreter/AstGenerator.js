const Token = require("./Token");
const Tokenizer = require("./Tokenizer");

const AstGenerator = () => {
    var ast = [];
    var tokens;
    var pointer = 0;
    var fileName = '';
    var chip;

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
                }
            }
        } catch (err) {
            throw err;
        }

        var returnAst = JSON.parse(JSON.stringify(ast));
        clear();
        var returnAst = { file: file, ast: returnAst };

        if (chip && chip.length > 0) {
            returnAst.chipDefinition = chip;
        }

        return returnAst;
    }

    AstGenerator.generate = generate;

    var handleChipDefinition = () => {
        Consume();
        var token = Peek();
        Consume();
        if (token.type !== Token.CHIPDEF) {
            handleParseError("Chip Name", token);
        }
        chip = token.value;

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

        var clockInOutputVariable = outputVariables.filter(el => el.value === 'CLOCK');
        if (clockInOutputVariable && clockInOutputVariable.length > 0) {
            handleParseError("No CLOCK in OUT", clockInOutputVariable[0]);
        }
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
        if (token.type !== Token.CHIP_INVOKE) {
            handleParseError("CHIP Name", token);
        }

        chipNode.chip = token;
        // CHIP_INVOKE ensures ( is present next
        Consume();
        Consume();

        var parameters = handleParameters();

        chipNode.parameters = parameters;

        chipCalls.push(chipNode);

        token = Peek();
        if (token.type === Token.OPERATOR && token.value === ";") {
            Consume();


            var nextToken = Peek();
            if (nextToken.type === Token.OPERATOR && nextToken.value === '}') {
                Consume();
                return chipCalls;
            } else {
                var nextChiipCalls = handleChipCallStatements();
                chipCalls = chipCalls.concat(nextChiipCalls);
            }

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
        // CHIP_INVOKE_PARAM ensures = is present
        Consume();
        Consume();

        token = Peek();
        if (token.type !== Token.VARIABLE) {
            handleParseError("Variable", token);
        }

        parameter.source = token;
        Consume();

        token = Peek();
        if (token.type === Token.SEPARATOR && token.value === ",") {
            Consume();
            parameters = parameters.concat(handleParameters());
        } else if (token.type === Token.OPERATOR && token.value === ")") {
            Consume();
        } else {
            handleParseError("Parameter or )", token)
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

        token = Peek();

        if (token.type === Token.SEPARATOR && token.value === ",") {
            Consume();
            var recursiveVariables = handleVariableDefinitions();
            variables = variables.concat(recursiveVariables);
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

        ast.push({ type: Token.IMPORT, importedAst: parsedHdlFileContent });

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
        var err = fileName + ":Expected " + exptected + ", but got '" + (token.type === Token.EOF ? 'EOF' : token.value);
        err = err + (token.type === Token.EOF ? "'" : ("' at line:" + token.line));
        throw err;
    }

    const Peek = () => {
        if (pointer < tokens.length) {
            return tokens[pointer];
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