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

    var operations = {};
    var chipDetails = {};

    parts.map(part => {

        var chipObject = {}

        part.value.map(chipCall => {
            var importedChip = evaluationResult.importedChips.filter(el => el.chip === chipCall.chip.value);
            var builtinChip = builtInChips.filter(el => el.chip === chipCall.chip.value);

            var chip;
            var imported;

            if (importedChip && importedChip.length > 0) {
                chip = Object.assign({}, importedChip[0]);
                imported = true;
            } else if (builtinChip && builtinChip.length > 0) {
                chip = Object.assign({}, builtinChip[0]);
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

            var partInputs = []
            var partOutputs = [];
            var partFunction;

            chipCall.parameters.map(el => {
                if (chip.inputs.includes(el.destination.value)) {
                    chipInputs = chipInputs.filter(input => input !== el.destination.value);
                    partInputs.push({ source: el.source.value, dest: el.destination.value });
                } else if (chip.outputs.includes(el.destination.value)) {
                    chipOutputs = chipOutputs.filter(output => output !== el.destination.value);
                    partOutputs.push({ source: el.source.value, dest: el.destination.value });
                    partFunction = chip.operations;
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

            chipObject = {
                partFunction, partInputs, partOutputs
            }
            partOutputs.map(part => chipDetails[part.source] = chipObject)

            partOutputs.map(output => {
                operations[output.source] = (input) => {
                    var returnValue = chip.operations[output.dest](getValues(input, output.source))
                    return returnValue;
                }
            })

            var getValues = (input, part) => {
                var values = {}
                chipDetails[part].partInputs.map(pi => {
                    if (pi.source in input) {
                        values[pi.dest] = input[pi.source]
                    } else if (pi.source in operations) {
                        values[pi.dest] = operations[pi.source](input)
                    } else {
                        throw fileName + ": Input or varible not found: " + pi.source + " while determining value of: " + part
                    }
                });
                return values
            }


        })
    });

    evaluationResult.operations = operations;
    return evaluationResult;
}

module.exports = {
    evaluate: evaluate
}