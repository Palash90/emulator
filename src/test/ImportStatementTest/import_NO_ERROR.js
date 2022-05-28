const Token = require("../../parser/Token")

const result = {

    "error": false,
    "ast": {
        "file": "import_NO_ERROR.hdl",
        "ast": [
            {
                "type": "IMPORT",
                "ast": {
                    "file": "And.hdl",
                    "ast": [
                        {
                            "type": "IMPORT",
                            "ast": {
                                "file": "Not.hdl",
                                "ast": [
                                    {
                                        "type": "INPUT_VARIABLES",
                                        "value": [
                                            {
                                                "value": "a",
                                                "line": 6,
                                                "type": 2
                                            }
                                        ]
                                    },
                                    {
                                        "type": "OUTPUT_VARIABLES",
                                        "value": [
                                            {
                                                "value": "out",
                                                "line": 7,
                                                "type": 2
                                            }
                                        ]
                                    },
                                    {
                                        "type": "PARTS",
                                        "value": [
                                            {
                                                "chip": {
                                                    "value": "Nor",
                                                    "line": 11,
                                                    "type": 7
                                                },
                                                "parameters": [
                                                    {
                                                        "destination": {
                                                            "value": "out",
                                                            "line": 11,
                                                            "type": 8
                                                        },
                                                        "source": {
                                                            "value": "out",
                                                            "line": 11,
                                                            "type": 2
                                                        }
                                                    },
                                                    {
                                                        "destination": {
                                                            "value": "b",
                                                            "line": 11,
                                                            "type": 8
                                                        },
                                                        "source": {
                                                            "value": "a",
                                                            "line": 11,
                                                            "type": 2
                                                        }
                                                    },
                                                    {
                                                        "destination": {
                                                            "value": "a",
                                                            "line": 11,
                                                            "type": 8
                                                        },
                                                        "source": {
                                                            "value": "a",
                                                            "line": 11,
                                                            "type": 2
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            "type": "INPUT_VARIABLES",
                            "value": [
                                {
                                    "value": "a",
                                    "line": 7,
                                    "type": 2
                                },
                                {
                                    "value": "b",
                                    "line": 7,
                                    "type": 2
                                }
                            ]
                        },
                        {
                            "type": "OUTPUT_VARIABLES",
                            "value": [
                                {
                                    "value": "out",
                                    "line": 8,
                                    "type": 2
                                }
                            ]
                        },
                        {
                            "type": "PARTS",
                            "value": [
                                {
                                    "chip": {
                                        "value": "Not",
                                        "line": 11,
                                        "type": 7
                                    },
                                    "parameters": [
                                        {
                                            "destination": {
                                                "value": "out",
                                                "line": 11,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "nota",
                                                "line": 11,
                                                "type": 2
                                            }
                                        },
                                        {
                                            "destination": {
                                                "value": "a",
                                                "line": 11,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "a",
                                                "line": 11,
                                                "type": 2
                                            }
                                        }
                                    ]
                                },
                                {
                                    "chip": {
                                        "value": "Not",
                                        "line": 12,
                                        "type": 7
                                    },
                                    "parameters": [
                                        {
                                            "destination": {
                                                "value": "out",
                                                "line": 12,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "notab",
                                                "line": 12,
                                                "type": 2
                                            }
                                        },
                                        {
                                            "destination": {
                                                "value": "a",
                                                "line": 12,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "b",
                                                "line": 12,
                                                "type": 2
                                            }
                                        }
                                    ]
                                },
                                {
                                    "chip": {
                                        "value": "Nor",
                                        "line": 13,
                                        "type": 7
                                    },
                                    "parameters": [
                                        {
                                            "destination": {
                                                "value": "out",
                                                "line": 13,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "out",
                                                "line": 13,
                                                "type": 2
                                            }
                                        },
                                        {
                                            "destination": {
                                                "value": "b",
                                                "line": 13,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "notb",
                                                "line": 13,
                                                "type": 2
                                            }
                                        },
                                        {
                                            "destination": {
                                                "value": "a",
                                                "line": 13,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "nota",
                                                "line": 13,
                                                "type": 2
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "type": "IMPORT",
                "ast": {
                    "file": "Or.hdl",
                    "ast": [
                        {
                            "type": "IMPORT",
                            "ast": {
                                "file": "Not.hdl",
                                "ast": [
                                    {
                                        "type": "INPUT_VARIABLES",
                                        "value": [
                                            {
                                                "value": "a",
                                                "line": 6,
                                                "type": 2
                                            }
                                        ]
                                    },
                                    {
                                        "type": "OUTPUT_VARIABLES",
                                        "value": [
                                            {
                                                "value": "out",
                                                "line": 7,
                                                "type": 2
                                            }
                                        ]
                                    },
                                    {
                                        "type": "PARTS",
                                        "value": [
                                            {
                                                "chip": {
                                                    "value": "Nor",
                                                    "line": 11,
                                                    "type": 7
                                                },
                                                "parameters": [
                                                    {
                                                        "destination": {
                                                            "value": "out",
                                                            "line": 11,
                                                            "type": 8
                                                        },
                                                        "source": {
                                                            "value": "out",
                                                            "line": 11,
                                                            "type": 2
                                                        }
                                                    },
                                                    {
                                                        "destination": {
                                                            "value": "b",
                                                            "line": 11,
                                                            "type": 8
                                                        },
                                                        "source": {
                                                            "value": "a",
                                                            "line": 11,
                                                            "type": 2
                                                        }
                                                    },
                                                    {
                                                        "destination": {
                                                            "value": "a",
                                                            "line": 11,
                                                            "type": 8
                                                        },
                                                        "source": {
                                                            "value": "a",
                                                            "line": 11,
                                                            "type": 2
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            "type": "INPUT_VARIABLES",
                            "value": [
                                {
                                    "value": "a",
                                    "line": 7,
                                    "type": 2
                                },
                                {
                                    "value": "b",
                                    "line": 7,
                                    "type": 2
                                }
                            ]
                        },
                        {
                            "type": "OUTPUT_VARIABLES",
                            "value": [
                                {
                                    "value": "out",
                                    "line": 8,
                                    "type": 2
                                }
                            ]
                        },
                        {
                            "type": "PARTS",
                            "value": [
                                {
                                    "chip": {
                                        "value": "Nor",
                                        "line": 11,
                                        "type": 7
                                    },
                                    "parameters": [
                                        {
                                            "destination": {
                                                "value": "out",
                                                "line": 11,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "norOut",
                                                "line": 11,
                                                "type": 2
                                            }
                                        },
                                        {
                                            "destination": {
                                                "value": "b",
                                                "line": 11,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "b",
                                                "line": 11,
                                                "type": 2
                                            }
                                        },
                                        {
                                            "destination": {
                                                "value": "a",
                                                "line": 11,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "a",
                                                "line": 11,
                                                "type": 2
                                            }
                                        }
                                    ]
                                },
                                {
                                    "chip": {
                                        "value": "Not",
                                        "line": 12,
                                        "type": 7
                                    },
                                    "parameters": [
                                        {
                                            "destination": {
                                                "value": "out",
                                                "line": 12,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "out",
                                                "line": 12,
                                                "type": 2
                                            }
                                        },
                                        {
                                            "destination": {
                                                "value": "a",
                                                "line": 12,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "norOut",
                                                "line": 12,
                                                "type": 2
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "type": "IMPORT",
                "ast": {
                    "file": "Not.hdl",
                    "ast": [
                        {
                            "type": "INPUT_VARIABLES",
                            "value": [
                                {
                                    "value": "a",
                                    "line": 6,
                                    "type": 2
                                }
                            ]
                        },
                        {
                            "type": "OUTPUT_VARIABLES",
                            "value": [
                                {
                                    "value": "out",
                                    "line": 7,
                                    "type": 2
                                }
                            ]
                        },
                        {
                            "type": "PARTS",
                            "value": [
                                {
                                    "chip": {
                                        "value": "Nor",
                                        "line": 11,
                                        "type": 7
                                    },
                                    "parameters": [
                                        {
                                            "destination": {
                                                "value": "out",
                                                "line": 11,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "out",
                                                "line": 11,
                                                "type": 2
                                            }
                                        },
                                        {
                                            "destination": {
                                                "value": "b",
                                                "line": 11,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "a",
                                                "line": 11,
                                                "type": 2
                                            }
                                        },
                                        {
                                            "destination": {
                                                "value": "a",
                                                "line": 11,
                                                "type": 8
                                            },
                                            "source": {
                                                "value": "a",
                                                "line": 11,
                                                "type": 2
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "type": "INPUT_VARIABLES",
                "value": [
                    {
                        "value": "a1",
                        "line": 11,
                        "type": 2
                    },
                    {
                        "value": "b1",
                        "line": 11,
                        "type": 2
                    }
                ]
            },
            {
                "type": "OUTPUT_VARIABLES",
                "value": [
                    {
                        "value": "out16",
                        "line": 12,
                        "type": 2
                    }
                ]
            },
            {
                "type": "PARTS",
                "value": [
                    {
                        "chip": {
                            "value": "Not",
                            "line": 15,
                            "type": 7
                        },
                        "parameters": [
                            {
                                "destination": {
                                    "value": "out",
                                    "line": 15,
                                    "type": 8
                                },
                                "source": {
                                    "value": "nota0",
                                    "line": 15,
                                    "type": 2
                                }
                            },
                            {
                                "destination": {
                                    "value": "a",
                                    "line": 15,
                                    "type": 8
                                },
                                "source": {
                                    "value": "a1",
                                    "line": 15,
                                    "type": 2
                                }
                            }
                        ]
                    },
                    {
                        "chip": {
                            "value": "Not",
                            "line": 16,
                            "type": 7
                        },
                        "parameters": [
                            {
                                "destination": {
                                    "value": "out",
                                    "line": 16,
                                    "type": 8
                                },
                                "source": {
                                    "value": "notb",
                                    "line": 16,
                                    "type": 2
                                }
                            },
                            {
                                "destination": {
                                    "value": "a",
                                    "line": 16,
                                    "type": 8
                                },
                                "source": {
                                    "value": "b",
                                    "line": 16,
                                    "type": 2
                                }
                            }
                        ]
                    },
                    {
                        "chip": {
                            "value": "And",
                            "line": 17,
                            "type": 7
                        },
                        "parameters": [
                            {
                                "destination": {
                                    "value": "out",
                                    "line": 17,
                                    "type": 8
                                },
                                "source": {
                                    "value": "anotb",
                                    "line": 17,
                                    "type": 2
                                }
                            },
                            {
                                "destination": {
                                    "value": "b",
                                    "line": 17,
                                    "type": 8
                                },
                                "source": {
                                    "value": "notb",
                                    "line": 17,
                                    "type": 2
                                }
                            },
                            {
                                "destination": {
                                    "value": "a",
                                    "line": 17,
                                    "type": 8
                                },
                                "source": {
                                    "value": "a",
                                    "line": 17,
                                    "type": 2
                                }
                            }
                        ]
                    },
                    {
                        "chip": {
                            "value": "And",
                            "line": 18,
                            "type": 7
                        },
                        "parameters": [
                            {
                                "destination": {
                                    "value": "out",
                                    "line": 18,
                                    "type": 8
                                },
                                "source": {
                                    "value": "bnota",
                                    "line": 18,
                                    "type": 2
                                }
                            },
                            {
                                "destination": {
                                    "value": "b",
                                    "line": 18,
                                    "type": 8
                                },
                                "source": {
                                    "value": "nota",
                                    "line": 18,
                                    "type": 2
                                }
                            },
                            {
                                "destination": {
                                    "value": "a",
                                    "line": 18,
                                    "type": 8
                                },
                                "source": {
                                    "value": "b",
                                    "line": 18,
                                    "type": 2
                                }
                            }
                        ]
                    },
                    {
                        "chip": {
                            "value": "Or",
                            "line": 19,
                            "type": 7
                        },
                        "parameters": [
                            {
                                "destination": {
                                    "value": "out",
                                    "line": 19,
                                    "type": 8
                                },
                                "source": {
                                    "value": "out",
                                    "line": 19,
                                    "type": 2
                                }
                            },
                            {
                                "destination": {
                                    "value": "b",
                                    "line": 19,
                                    "type": 8
                                },
                                "source": {
                                    "value": "bnota",
                                    "line": 19,
                                    "type": 2
                                }
                            },
                            {
                                "destination": {
                                    "value": "a",
                                    "line": 19,
                                    "type": 8
                                },
                                "source": {
                                    "value": "anotb",
                                    "line": 19,
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