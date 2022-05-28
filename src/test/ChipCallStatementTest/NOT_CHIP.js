const Token = require("../../parser/Token")

const result = {
    error: false,
    ast: {
        file: "NOT_CHIP.hdl",
        chipDefinition: "Not",
        ast: [
            {
                type: Token.INPUT_VARIABLES,
                value: [
                    {
                        line: 2,
                        type: Token.VARIABLE,
                        value: 'a'
                    }
                ]
            }, {
                type: Token.OUTPUT_VARIABLES,
                value: [
                    {
                        line: 3,
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
                            type: Token.CHIP_INVOKE,
                            value: "Nor"
                        },
                        parameters: [
                            {
                                destination: {
                                    line: 7,
                                    type: Token.CHIP_INVOKE_PARAM,
                                    value: 'out'
                                },
                                source: {
                                    line: 7,
                                    type: Token.VARIABLE,
                                    value: 'out'
                                }
                            },
                            {
                                destination: {
                                    line: 7,
                                    type: Token.CHIP_INVOKE_PARAM,
                                    value: 'b'
                                },
                                source: {
                                    line: 7,
                                    type: Token.VARIABLE,
                                    value: 'a'
                                }
                            },
                            {
                                destination: {
                                    line: 7,
                                    type: Token.CHIP_INVOKE_PARAM,
                                    value: 'a'
                                },
                                source: {
                                    line: 7,
                                    type: Token.VARIABLE,
                                    value: 'a'
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