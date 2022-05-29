const builtInChips = require("./builtInChips");
const Token = require("./Token");

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

    result.result = {}

    var evaluationResult;
    try {
        result.result.evaluationResult = evaluateAst(ast.ast.file, ast.ast.chipDefinition, ast.ast.ast)
        result.error = false;
    } catch (err) {
        result.error = true;
        result.errorMessage = err;
    }

    return result;
}

const evaluateAst = (fileName, chipName, ast) => {
    console.log("Processing", fileName, chipName, ast)
    var evaluationResult = {
        fileName: fileName,
        chip: chipName,
        importedChips: [],
        inputs: [],
        outputs: []
    }

    ast.filter(el => el.type === Token.IMPORT).map(el => evaluationResult.importedChips.push(evaluateAst(el.importedAst.file, el.importedAst.chipDefinition, el.importedAst.ast)))
    ast.filter(el => el.type === Token.INPUT_VARIABLES).map(el => el.value.map(v => evaluationResult.inputs.push(v.value)));
    ast.filter(el => el.type === Token.OUTPUT_VARIABLES).map(el => el.value.map(v => evaluationResult.outputs.push(v.value)));

    var parts = ast.filter(el => el.type === Token.PARTS);

    var variables = [];

    parts.map(part => {
        part.value.map((chipCall) => {
            var importedChip = evaluationResult.importedChips.filter(el => el.chip === chipCall.chip.value);
            var builtinChip = builtInChips.filter(el => el.chip === chipCall.chip.value);

            var chip;
            var imported;

            if (importedChip && importedChip.length > 0) {
                console.log("Using imported chip for", chipCall.chip.value, importedChip[0]);
                chip = importedChip[0];
                imported = true;
            } else if (builtinChip && builtinChip.length > 0) {
                console.log("Using built in chip for", chipCall.chip.value, builtinChip[0]);
                chip = builtinChip[0];
                imported = false;
            } else {
                throw fileName + ":Chip Not found - '" + chipCall.chip.value + "' at line:" + chipCall.chip.line;
            }

            if ((chip.inputs.length + chip.outputs.length) != chipCall.parameters.length) {
                throw fileName +
                ":Mismatch in chip arguments and parameters at line:" +
                chipCall.chip.line + " chip '" +
                chip.chip +
                "'(" + (imported ? "imported" : "built in") + ") arguments are input:" +
                JSON.stringify(chip.inputs) +
                " output:" +
                JSON.stringify((chip.outputs));
            }

            chipCall.parameters.map(el => {
                console.log(el)
                if (chip.inputs.includes(el.destination.value)) {
                    variables.push({
                        chip: chip,
                        type: Token.INPUT,
                        name: el.destination.value
                    });
                } else if (chip.outputs.includes(el.destination.value)) {
                    variables.push({
                        chip: chip,
                        type: Token.OUTPUT,
                        name: el.destination.value
                    });
                } else {
                    throw "Chip argument not resolved, '" + el.destination.value + "' at line:" + el.destination.line;
                }

            });

        })
    });

    evaluationResult.variables = variables;

    return evaluationResult;
}

module.exports = {
    evaluate: evaluate
}