const Token = require("../../parser/Token")

const result = {
    error: false,
    ast: {
        file: "import_NO_ERROR",
        ast: [
            { type: Token.IMPORT, ast: { file: "And.hdl", ast: [{ type: Token.IMPORT, ast: { file: "Not.hdl", ast: [] } }] } },
            { type: Token.IMPORT, ast: { file: "Or.hdl", ast: [{ type: Token.IMPORT, ast: { file: "Not.hdl", ast: [] } }] } },
            { type: Token.IMPORT, ast: { file: "Not.hdl", ast: [] } }
        ]
    }
}

module.exports = {
    result
}