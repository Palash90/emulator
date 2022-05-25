const Token = require("../../parser/Token")

const result = {
    error: false,
    ast: [
        { type: Token.IMPORT, fileName: "And.hdl" },
        { type: Token.IMPORT, fileName: "Or.hdl" },
        { type: Token.IMPORT, fileName: "Not.hdl" }
    ]
}

module.exports = {
    result
}