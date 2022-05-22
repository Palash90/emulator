const tokenizer = require('./Tokenizer')
const astGenerator = require('./AstGenerator')


function parse(content) {
    if (!content || content.length < 1) {
        return handleFailure("No content to simulate");
    }
    var program = content.replaceAll(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "");
    console.log(program);

    var tokens = tokenizer.Tokenizer.tokenize(program)
    console.log(tokens);

    return program;
}


function handleFailure(errorMessage) {
    return {
        error: true,
        errorMessage: errorMessage
    }
}

module.exports = {
    parse
}