const tokenize = require('./Tokenizer')

function simulate(content) {
    if (!content || content.length < 1) {
        return handleFailure("No content to simulate");
    }
    var program = content.replaceAll(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "");
    console.log(program);
    var tokens = tokenize(program)
    console.log(tokens)
    return program;
}


function handleFailure(errorMessage) {
    return {
        error: true,
        errorMessage: errorMessage
    }
}

module.exports = {
    simulate: simulate
}