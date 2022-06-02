import { useContext, useEffect, useState } from "react";
import SimulationContext from "./SimulationContext";
import SVG from 'react-inlinesvg';
import uuid from "react-uuid";

export default function ChipDesign() {
    const { simulationResult } = useContext(SimulationContext);

    const [result, setResult] = useState();

    useEffect(() => {
        var input = {}
        simulationResult.ast.inputs.map(inp => {
            input[inp] = false;
        });
        var outputValues = simulationResult.getValues(input, simulationResult.ast);
        var ast = { ...simulationResult.ast };
        ast['inputValues'] = input;
        ast['outputValues'] = outputValues;
        setResult({ ast: ast })
    }, [simulationResult])
    return result && result.ast ? <Chip chip={result.ast} /> : <p>Hold your breath</p>
}
function Chip(props) {
    var iconStr;
    var chipHeight = 100;
    var chipWidth = 120;

    var inputLines = [];
    var outputLines = [];
    var inputValues = props.chip['inputValues'];
    var outputValues = props.chip.outputValues;

    // Adding 2 to original length to make empty space on both sides
    var inputLength = Object.entries(inputValues).length + 2;
    var outputLength = Object.entries(outputValues).length + 2;

    var counter = 1;

    for (var key in inputValues) {
        inputLines.push({ value: inputValues[key], key: key, yPos: counter * chipHeight / inputLength });
        counter++;
    }

    counter = 1;

    for (var key in outputValues) {
        outputLines.push({ value: outputValues[key], key: key, yPos: counter * chipHeight / outputLength });
        counter = counter + 1;
    }

    if (props.chip.icon) {
        iconStr = props.chip.icon;
    } else {
        iconStr = '<svg width="' + 120 + '" height="' + 100 + '">' +
            '<defs>' +
            '<linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">' +
            '<stop offset="10%" style="stop-color:#0c0c0c;stop-opacity:1" />' +
            '<stop offset="90%" style="stop-color:#4D4855;stop-opacity:1" />' +
            '</linearGradient>' +
            '</defs>' +
            '<g><rect width="100" height="80" style="fill:url(#grad3);fill-opacity=1;stroke-width:1;stroke:rgb(0,0,0)"/>' +
            '<text x="50" y="40" font-family="Verdana" font-size="10" fill="cyan" text-anchor="middle">' + props.chip.chip + '</text></g>' +
            '</svg>'
    }

    return <>
        <div className="svg-container">
            <svg viewBox="0 0 100 100">
                <g>
                    <SVG src={iconStr} />
                    {
                        inputLines.map(inputLine => {
                            return <g key={uuid()}>
                                <text key={uuid()} x="-15" y={inputLine.yPos - 2} fontFamily="Verdana" fontSize="5" fill="white">{inputLine.key}</text>
                                <line key={uuid()} x1="-30" x2="0" y1={inputLine.yPos} y2={inputLine.yPos} stroke={inputLine.value ? "green" : "red"} strokeWidth="2" />
                            </g>
                        })
                    }

                    {
                        outputLines.map(outputLine => {
                            return <g key={uuid()}>
                                <text key={uuid()} x="115" y={outputLine.yPos - 2} fontFamily="Verdana" fontSize="5" fill="white">{outputLine.key}</text>
                                <line key={uuid()} x1="100" x2="130" y1={outputLine.yPos} y2={outputLine.yPos} stroke={outputLine.value ? "green" : "red"} strokeWidth="2" />
                            </g>
                        })
                    }

                </g>
            </svg>
        </div>
    </>
}