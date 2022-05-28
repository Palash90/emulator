const result = {

    "error": false,
    "ast": {
        "file": "New File",
        "ast": [
            {
                "type": "INPUT_VARIABLES",
                "value": [
                    {
                        "value": "CLOCK",
                        "line": 2,
                        "type": 2
                    },
                    {
                        "value": "d",
                        "line": 2,
                        "type": 2
                    }
                ]
            },
            {
                "type": "OUTPUT_VARIABLES",
                "value": [
                    {
                        "value": "dout",
                        "line": 3,
                        "type": 2
                    },
                    {
                        "value": "dnot",
                        "line": 3,
                        "type": 2
                    }
                ]
            },
            {
                "type": "PARTS",
                "value": [
                    {
                        "chip": {
                            "value": "Dff",
                            "line": 6,
                            "type": 7
                        },
                        "parameters": [
                            {
                                "destination": {
                                    "value": "dnot",
                                    "line": 6,
                                    "type": 8
                                },
                                "source": {
                                    "value": "dnot",
                                    "line": 6,
                                    "type": 2
                                }
                            },
                            {
                                "destination": {
                                    "value": "CLOCK",
                                    "line": 6,
                                    "type": 8
                                },
                                "source": {
                                    "value": "CLOCK",
                                    "line": 6,
                                    "type": 2
                                }
                            },
                            {
                                "destination": {
                                    "value": "ddout",
                                    "line": 6,
                                    "type": 8
                                },
                                "source": {
                                    "value": "dout",
                                    "line": 6,
                                    "type": 2
                                }
                            },
                            {
                                "destination": {
                                    "value": "d",
                                    "line": 6,
                                    "type": 8
                                },
                                "source": {
                                    "value": "d",
                                    "line": 6,
                                    "type": 2
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
};


module.exports = {
    result
}