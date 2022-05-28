const Token = require("../../parser/Token")

const result = {
    error: false,
    ast: {
        file: "NOT_CHIP.hdl",
        ast: [
            {
                type: Token.INPUT_VARIABLES,
                value: [
                    {
                        line: 2,
                        column: 8,
                        type: Token.VARIABLE,
                        value: 'a'
                    }
                ]
            }, {
                type: Token.OUTPUT_VARIABLES,
                value: [
                    {
                        line: 3,
                        column: 9,
                        type: Token.VARIABLE,
                        value: 'out'
                    }
                ]
            }, {
                type: Token.PARTS,
                value: [
                    {
                        "chip": {
                            line: 7,
                            column: 6,
                            type: Token.CHIP_INVOKE,
                            value: "Nor"
                        },
                        parameters: [
                            {
                                destination: {
                                    column: 12,
                                    line: 7,
                                    type: Token.CHIP_INVOKE_PARAM,
                                    value: 'a'
                                },
                                source: {
                                    column: 10,
                                    line: 7,
                                    type: Token.VARIABLE,
                                    value: 'a'
                                }
                            },
                            {
                                destination: {
                                    column: 15,
                                    line: 7,
                                    type: Token.VARIABLE,
                                    value: 'b'
                                },
                                source: {
                                    column: 17,
                                    line: 7,
                                    type: Token.VARIABLE,
                                    value: 'a'
                                }
                            },
                            {
                                destination: {
                                    column: 24,
                                    line: 7,
                                    type: Token.CHIP_INVOKE_PARAM,
                                    value: 'out'
                                },
                                source: {
                                    column: 20,
                                    line: 7,
                                    type: Token.VARIABLE,
                                    value: 'out'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

module.exports = {
    result
}