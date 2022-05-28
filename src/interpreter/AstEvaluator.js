const Token = require("./Token");

const evaluate = (ast) => {

    return {
        error: true,
        ast: ast,
        result: "eval",
        errorMessage:"Bad happened"
    }


}

module.exports = {
    evaluate: evaluate
}