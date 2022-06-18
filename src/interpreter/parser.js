
const nanoid = require("nanoid").nanoid;

const OPERATOR = 0;
const SEPARATOR = 1;
const VARIABLE = 2;
const KEYWORD = 3;
const START = 4;
const EOF = 5;
const CHIPDEF = 6;
const CHIP_INVOKE = 7;
const CHIP_INVOKE_PARAM = 8;
const INT_LITERAL = 9;
const Separators = [' ', '\t', '\n', ','];
const Operators = ['=', '(', ')', '{', '}', ';', ':', '/', '\\', '*'];
const Keywords = ['CHIP', 'IN', 'OUT', 'PARTS', 'CLOCK', 'import'];
const IMPORT = "IMPORT";
const INPUT_VARIABLES = "INPUT_VARIABLES";
const OUTPUT_VARIABLES = "OUTPUT_VARIABLES";
const PARTS = "PARTS"
const ICON = "ICON"
const busValueTracker = {};
const buffer = 'BUFFER'

const astMap = {};

const Tokenizer = () => {
    var tokens = [];
    var pointer = 0;

    const isSeparator = (value) => Separators.some(el => el === value);
    const isOperator = (value) => Operators.some(el => el === value);
    const isKeyword = (value) => Keywords.some(el => el === value);

    const tokenize = (text) => {
        var line = 1;
        var index = 0;
        var tokenPart = "";

        while (index < text.length) {
            var currChar = text[index];

            if (isSeparator(currChar) || isOperator(currChar)) {
                if (tokenPart !== '') {
                    var token = {
                        value: tokenPart,
                        line: line,
                        id: nanoid()
                    };
                    tokenPart = "";
                    tokens.push(token);
                }

                if (isOperator(currChar) || currChar === ',') {
                    var opearatorToken =
                    {
                        value: currChar,
                        line: line,
                        id: nanoid()
                    };
                    tokens.push(opearatorToken);
                }
                if (currChar === '\n') {
                    line++;

                    var newLineToken =
                    {
                        value: currChar,
                        line: line,
                        id: nanoid()
                    };
                    tokens.push(newLineToken);
                }
            } else {
                tokenPart = tokenPart + currChar;
                if (tokenPart !== '' && index === (text.length - 1)) {
                    var remainingToken =
                    {
                        value: tokenPart,
                        line: line,
                        id: nanoid()
                    };
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

            if (currToken.type === EOF) {
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
                        stop = commentCurrToken.type === EOF || (commentCurrToken.value === '*' && commentNextToken.value === '/');
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
                        stop = commentCurrToken.type === EOF || commentCurrToken.value === '\n';
                    }
                }
            } else if (currToken.value === '=') {
                var currToken;
                var nextToken = Peek();
                nextToken.type = OPERATOR;
                Consume();
                currToken = Peek();


                analyzedTokens.push(nextToken);
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
                var next = PeekNext();

                if (currToken.value === 'CLOCK') {
                    token.type = next.value === '=' ? CHIP_INVOKE_PARAM : VARIABLE;
                } else {
                    token.type = KEYWORD;
                }

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
            return { type: START };
    };

    const Peek = () => {
        if (pointer < tokens.length) {
            return tokens[pointer];
        } else {
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

        if (!isNaN(parseInt(token.value))) {
            token.type = INT_LITERAL;
        } else {
            var regex = /^[a-zA-Z_$][a-zA-Z_$.0-9]*$/;
            var matched = token.value.match(regex);
            var match = matched && matched.length > 0;

            if (match) {
                var last = PeekLast(analyzedTokens);
                var next = PeekNext();

                if (last.value === "CHIP") {
                    token.type = CHIPDEF;
                } else if (next.value === "(") {
                    token.type = CHIP_INVOKE;
                } else {
                    if (next.value === '=') {
                        token.type = CHIP_INVOKE_PARAM
                    } else {
                        token.type = VARIABLE;
                    }
                }
            }
            else {
                var last = PeekLast(analyzedTokens);
                if (last.value === "CHIP") {
                    tokens = [];
                    pointer = 0;
                    throw "Syntax error in chip name, line " + token.line + ": " + token.value;
                }
                else {
                    tokens = [];
                    pointer = 0;
                    throw "Syntax error in variable name, line " + token.line + ": " + token.value;
                }

            }
        }
        analyzedTokens.push(token);
        Consume();
    }
}
Tokenizer()

const builtInChips = [
    {
        chip: "Nor",
        inputs: ["a", "b"],
        outputs: ["out"],
        operations: {
            out: (norInput) => !(norInput['a'] || norInput['b'])
        }
    },
    {
        chip: "Buffer",
        inputs: ["in", "e"],
        outputs: ["out"],
        operations: {
            out: function (bufferInput) {
                var value;
                if (bufferInput['e']) {
                    value = bufferInput['in'];
                } else {
                    value = undefined;
                }

                return {
                    type: buffer,
                    value: value,
                    id: this.id
                }
            }
        }
    },
    {
        chip: "BusBit",
        inputs: ["in", 'num'],
        outputs: ["out"],
        operations: {
            out: function (busInput) {
                if (busInput['in'].type !== buffer) {
                    throw "Bus can only have buffers as input";
                }

                if (!busValueTracker[busInput['num']]) {
                    console.log("Adding new entry to bus")
                    busValueTracker[busInput['num']] = {};
                }

                busValueTracker[busInput['num']][busInput['in'].id] = busInput['in'].value;

                console.log("busValueTracker", busValueTracker)

                var activeBusConnections = Object.keys(busValueTracker[busInput['num']]).filter(el => busValueTracker[busInput['num']][el] !== undefined);

                if (activeBusConnections.length > 1) {
                    throw "More than one value on bus are active. Please check your circuit and check buffer conditions.";
                }

                return activeBusConnections.length === 1 ? busValueTracker[busInput['num']][activeBusConnections[0]] : undefined;
            }
        }
    },
    {
        chip: "DLatch",
        inputs: ["D", "E"],
        outputs: ["Q"],
        D: false,
        operations: {
            Q: function (latchInput) {
                if (latchInput['E']) {
                    this.D = latchInput['D'];
                    return this.D;
                } else {
                    return this.D;
                }
            }
        }
    },
    {
        chip: "JKFlipFlop",
        inputs: ["J", "K", "E"],
        outputs: ["Q"],
        D: false,
        operations: {
            Q: function (latchInput) {
                if (latchInput['E']) {
                    if (latchInput['J'] && latchInput['K']) {
                        this.D = !this.D;
                    } else if (latchInput['J'] && !latchInput['K']) {
                        this.D = true;
                    } else if (!latchInput['J'] && latchInput['K']) {
                        this.D = false;
                    } else {
                        this.D = this.D;
                    }
                    return this.D;
                } else {
                    return this.D;
                }
            }
        }
    }
];

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
                if (token.type === EOF) {
                    break;
                } else if (token.type === KEYWORD && token.value === 'import') {
                    handleImportStatement(getFileContent);
                } else if (token.type === KEYWORD && token.value === 'CHIP') {
                    handleChipDefinition();
                } else {
                    handleParseError("EOF", token);
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
        if (token.type !== CHIPDEF) {
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
            type: INPUT_VARIABLES,
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
            type: OUTPUT_VARIABLES,
            value: outputVariables
        };

        token = Peek();
        Consume();
        if (token.type !== KEYWORD || token.value !== 'PARTS') {
            handleParseError("PARTS", token);
        }

        token = Peek();
        Consume();
        if (token.type !== OPERATOR || token.value !== ':') {
            handleParseError(":", token);
        }

        var parts = handleChipCallStatements();
        var partsNode = {
            type: PARTS,
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
        if (token.type !== CHIP_INVOKE) {
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
        if (token.type === OPERATOR && token.value === ";") {
            Consume();


            var nextToken = Peek();
            if (nextToken.type === OPERATOR && nextToken.value === '}') {
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
        if (token.type !== CHIP_INVOKE_PARAM) {
            handleParseError("Chip Parameter", token);
        }

        parameter.destination = token;
        // CHIP_INVOKE_PARAM ensures = is present
        Consume();
        Consume();

        token = Peek();
        if (token.type !== VARIABLE && token.type !== INT_LITERAL) {
            handleParseError("Variable or integer literal", token);
        }

        parameter.source = token;
        Consume();

        token = Peek();
        if (token.type === SEPARATOR && token.value === ",") {
            Consume();
            parameters = parameters.concat(handleParameters());
        } else if (token.type === OPERATOR && token.value === ")") {
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

        if (token.type !== VARIABLE) {
            handleParseError("Variable Definition", token);
        }

        variables.push(token);
        Consume();

        token = Peek();

        if (token.type === SEPARATOR && token.value === ",") {
            Consume();
            var recursiveVariables = handleVariableDefinitions();
            variables = variables.concat(recursiveVariables);
        } else if (token.type === OPERATOR && token.value === ";") {
            Consume();
        }

        return variables;
    }

    var handleImportStatement = (getFileContent) => {
        Consume();

        // Next token should be the file name variable.
        var token = Peek();
        Consume();

        if (token.type !== VARIABLE) {
            handleParseError("File Name", token);
        }

        var importedFileContent = getFileContent(token.value);

        if (importedFileContent.error) {
            clear();
            throw importedFileContent.errorMessage;
        }

        if (token.value.split('.').pop() !== 'svg') {
            var importedFileTokens = Tokenizer.tokenize(importedFileContent)

            AstGenerator();
            var parsedHdlFileContent = AstGenerator.generate(token.value, importedFileTokens, getFileContent);

            ast.push({ type: IMPORT, importedAst: parsedHdlFileContent });
        } else {
            ast.push({ type: ICON, svg: importedFileContent });
        }

        // Next token should be the semicolon operator
        token = Peek();
        if (token.type !== OPERATOR || token.value !== ';') {
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
        var err = fileName + ":Expected " + exptected + ", but got '" + (token.type === EOF ? 'EOF' : token.value) + token.type;
        err = err + (token.type === EOF ? "'" : ("' at line:" + token.line));
        throw err;
    }

    const Peek = () => {
        if (pointer < tokens.length) {
            return tokens[pointer];
        }
        else {
            return { type: EOF };
        }
    }

    const Consume = () => pointer++;
}

AstGenerator();


const evaluate = (ast) => {

    var result = {};

    if (ast.error) {
        result.error = true;
        result.result = {
            ast: ast
        };
        result.errorMessage = "Could not evaluate due to parse error";
        return result;
    }

    try {
        result.ast = evaluateAst(ast.ast.file, ast.ast.chipDefinition, ast.ast.ast)
        result.error = false;
    } catch (err) {
        result.error = true;
        result.errorMessage = err;
    }
    return result;
}

const evaluateAst = (fileName, chipName, ast) => {

    var evaluationResult = {};

    var icons = ast.filter(el => el.type === ICON);

    if (icons && icons.length > 1) {
        throw fileName + ": One chip can have only one icon file"
    } else if (icons.length === 1) {
        evaluationResult.icon = icons[0]['svg'];
    }

    var parts = ast.filter(el => el.type === PARTS);


    return evaluationResult;
}



function handleFailure(errorMessage) {
    return {
        error: true,
        errorMessage: errorMessage
    }
}

function parse(file, content, files) {
    if (!content || content.length < 1) {
        return handleFailure("No content to simulate");
    }
    if (file.split('.').pop() === 'svg') {
        return content;
    }

    const getFileContent = (fileName) => {
        var matchedFiles = files.filter(el => el.name === fileName);
        if (matchedFiles.length < 1) {
            return handleFailure("File not found: " + fileName);
        }
        return matchedFiles[0].content
    }

    var tokens;
    try {
        tokens = Tokenizer.tokenize(content);
    } catch (error) {
        return handleFailure(file + ":" + error);
    }

    try {
        var ast = AstGenerator.generate(file, tokens, getFileContent);
        ast.id = nanoid();

        console.log(ast);

        var result = evaluate({ error: false, ast: ast })
        return result;
    } catch (error) {
        return handleFailure(error);
    }
}

module.exports = { parse }