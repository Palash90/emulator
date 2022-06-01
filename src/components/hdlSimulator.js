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
            result['getValueAndStack'] = (input, ast) => getValueCallStack(input, ast)
            function getValueCallStack(obj, ast) {
                var values = {};
                var callStacks = {};
                ast.outputs.map(out => {
                    values[out] = ast.operations[out](obj);
                    callStacks[out] = parse.getCallStack();
                });
                return { values, callStacks };
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