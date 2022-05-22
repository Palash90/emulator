const tokenizer = require('./Tokenizer')
const astGenerator = require('./AstGenerator')


function parse(content) {
    if (!content || content.length < 1) {
        return handleFailure("No content to simulate");
    }
    
    var program = content.replaceAll(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "");
    console.log(content);

    var tokens = tokenizer.Tokenizer.tokenize(content)
    console.log(tokens);

    var ast = astGenerator.AstGenerator.generate(tokens);
    //console.log(ast);

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