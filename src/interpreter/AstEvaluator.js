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


    var chips = [];

    parts.map(part => {
        part.value.map((chipCall) => {
            var importedChip = evaluationResult.importedChips.filter(el => el.chip === chipCall.chip.value);
            var builtinChip = builtInChips.filter(el => el.chip === chipCall.chip.value);

            var chip;
            var imported;

            if (importedChip && importedChip.length > 0) {
                console.log("Using imported chip for", chipCall.chip.value, importedChip[0]);
                chip = Object.assign({ variableMapping: [] }, importedChip[0]);
                imported = true;
            } else if (builtinChip && builtinChip.length > 0) {
                console.log("Using built in chip for", chipCall.chip.value, builtinChip[0]);
                chip = Object.assign({ variableMapping: [] }, builtinChip[0]);
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

            var chipInputs = [...chip.inputs];
            var chipOutputs = [...chip.outputs];

            chipCall.parameters.map(el => {
                if (chip.inputs.includes(el.destination.value)) {
                    chipInputs = chipInputs.filter(input => input !== el.destination.value);
                    chip.variableMapping.push({ type: Token.INPUT_VARIABLE_MAPPING, source: el.source.value, dest: el.destination.value });
                } else if (chip.outputs.includes(el.destination.value)) {
                    chipOutputs = chipOutputs.filter(output => output !== el.destination.value);
                    chip.variableMapping.push({ type: Token.OUTPUT_VARIABLE_MAPPING, source: el.source.value, dest: el.destination.value });
                } else {
                    throw fileName + ":Chip argument not resolved, '" + el.destination.value + "' at line:" + el.destination.line;
                }
            });

            if (chipInputs.length > 0) {
                throw fileName + ":Chip parameter not passed for '" + chip.chip + "' at line:" + chipCall.chip.line + " - " + chipInputs;
            }
            if (chipOutputs.length > 0) {
                throw fileName + ":Chip parameter not passed for '" + chip.chip + "' at line:" + chipCall.chip.line + " - " + chipOutputs;
            }
            console.log(chip)
            chips.push(chip);
        })
    });

    console.log(chips)

    evaluationResult.variables = chips;

    return evaluationResult;
}

module.exports = {
    evaluate: evaluate
}