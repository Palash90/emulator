function simulate(content) {
    if (!content || content.length < 1) {
        return handleFailure("No content to simulate");
    }
    var tokens = tokenize(content);
}

function tokenize(content) {
    var validTokens = getValidTokens();
}

const getSeparators = () => [" ", "\n"];

const getValidTokens = () => ['CHIP', 'IN', 'OUT', 'PARTS', 'CLOCK', 'IMPORT', '{', '}', ';', ':', '(', ')'];

function handleFailure(errorMessage) {
    return {
        error: true,
        errorMessage: errorMessage
    }
}



// Driver code, need to remove once done
const fs = require('fs');
var content = fs.readFileSync("./hdl_program", 'utf8');
console.log(content, content.length)
console.log(simulate(content));