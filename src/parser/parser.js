function simulate(content) {
    if (!content || content.length < 1) {
        return handleFailure("No content to simulate");
    }
    var program = content.replaceAll(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "");
    return program;
}

function tokenize(content) {
    var validTokens = getValidTokens();
}

const getSeparators = () => [" ", "\n"];

const getValidTokens = () => ['CHIP', 'IN', 'OUT', 'PARTS', 'CLOCK', 'IMPORT', '{', '}', ';', ':', '(', ')', "//", "/*", '*/'];

function handleFailure(errorMessage) {
    return {
        error: true,
        errorMessage: errorMessage
    }
}

module.exports = {
    simulate: simulate
}