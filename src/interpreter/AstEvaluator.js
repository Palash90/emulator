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

    result.error = false;
    result.result = {
        evaluationResult: evaluateAst(ast.ast.file, ast.ast.chipDefinition, ast.ast.ast),
        ast: ast
    }

    return result;
}

const evaluateAst = (fileName, chipName, ast) => {
    console.log("Processing", fileName, chipName, ast)
    var evaluationResult = {
        fileName: fileName,
        chip: chipName
    }


    var importedChips = [];

    var imports = ast.filter(el => el.type === Token.IMPORT)

    console.log("imports", imports)

    imports.map(el => importedChips.push(evaluateAst(el.importedAst.file, el.importedAst.chipDefinition, el.importedAst.ast)))

    evaluationResult.importedChips = importedChips;

    return evaluationResult;
}

module.exports = {
    evaluate: evaluate
}