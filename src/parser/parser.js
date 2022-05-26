const tokenizer = require('./Tokenizer')
const astGenerator = require('./AstGenerator')


function parse(file, content, files) {
    if (!content || content.length < 1) {
        return handleFailure("No content to simulate");
    }

    var tokens = tokenizer.Tokenizer.tokenize(content);

    const getFileContent = (fileName) => files.filter(el => el.name === fileName)[0].content;

    console.log(tokens);

    try {
        var ast = astGenerator.AstGenerator.generate(file, tokens, getFileContent);
        console.log(ast)
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