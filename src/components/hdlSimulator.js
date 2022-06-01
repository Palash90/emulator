import { evaluate } from '../interpreter/AstEvaluator';
import { parse } from '../interpreter/parser';

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
            if (ast.error) {
                result = ast;
            } else {

                var manyValues = [{ a: false, b: false }, { a: false, b: true }, { a: true, b: false }, { a: true, b: true }]

                var resultstr = []
                for (var i = 0; i < 4; i++) {
                    var values = manyValues[i];

                    var evaluated = evaluate(ast, { a: values.a, b: values.b });
                    var chips = evaluated.result.evaluationResult.operations;

                    resultstr = resultstr.concat({ a: values.a, b: values.b, result: chips["out"]({ ora: values.a, orb: values.b }) })
                    console.log("Done calculation\n\n\n")
                }
                console.table(resultstr)
                result = resultstr;
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