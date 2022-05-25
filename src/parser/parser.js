const tokenizer = require('./Tokenizer')
const astGenerator = require('./AstGenerator')


function parse(content) {
    if (!content || content.length < 1) {
        return handleFailure("No content to simulate");
    }

    var tokens = tokenizer.Tokenizer.tokenize(content)

    //console.log(tokens);

    try {
        var ast = astGenerator.AstGenerator.generate(tokens);
        return {
            error: false,
            ast: ast
        };
    } catch (error) {
        return handleFailure(error);
    }
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