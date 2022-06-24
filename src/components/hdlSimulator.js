import parse from '../interpreter/parser';

export default function runSimulation(currFileId, files, callback) {
    var result;
    if (files && files.length > 0) {
        var file = files.find((el) => el.key === currFileId);
        if (!file || !file.content || file.content === '') {
            result = {
                error: true,
                errorMessage: 'Nothing to run. Please select a valid file and/or write some code.'
            }

        } else {
            var ast = parse(file.name, file.content, files);
            result = ast;
            if (typeof (result) !== 'string') {
                result['clearJKFlipFlop'] = ast.clearJKFlipFlop;
                result['clearBus'] = () => ast.clearBus();
                result['getValues'] = (input, ast) => getValues(input, ast)
                function getValues(obj, ast) {
                    var values = {};
                    try {
                        ast.outputs.map(out => {
                            var val = Array.isArray(ast.operations[out]) ? ast.operations[out].map(el => el(obj)) : ast.operations[out](obj);
                            values[out] = val;
                        });
                    } catch (error) {
                        result = {
                            error: true,
                            errorMessage: error
                        };
                        if (callback) {
                            callback(result)
                        } else {
                            console.log("No callback specified for simulator. Simulation result", result);
                        }
                    }
                    return values;
                }
            }
        }
    } else {
        result = {
            error: true,
            errorMessage: 'Nothing to run. Please select a valid file and/or write some code.'
        };
    }

    if (callback) {
        callback(result)
    } else {
        console.log("No callback specified for simulator. Simulation result", result);
    }
}