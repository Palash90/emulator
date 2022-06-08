import { useContext, useEffect, useState } from "react";
import SimulationContext from "./SimulationContext";
import SVG from 'react-inlinesvg';
import uuid from "react-uuid";

export default function ChipDesign() {
    const { simulationResult } = useContext(SimulationContext);
    const [result, setResult] = useState();
    const [inputs, setInputs] = useState();
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        var input = {}
        simulationResult.ast.inputs.map(inp => {
            input[inp] = false;
        });
        setInputs(input)
        try {
            var outputValues = simulationResult.getValues(input, simulationResult.ast);
            var ast = { ...simulationResult.ast };
            ast['inputValues'] = input;
            ast['outputValues'] = outputValues;
            setResult({ ast: ast })
        } catch (error) {
            setError(true);
            setErrorMsg(error);
        }
    }, [])

    const changeInput = (changedKey) => {
        var input = {}
        if (inputs) {
            for (var key in inputs) {
                input[key] = key === changedKey ? !inputs[key] : inputs[key]
            }
            setInputs(input)
            try {
                var outputValues = simulationResult.getValues(input, simulationResult.ast);
                var ast = { ...simulationResult.ast };
                ast['inputValues'] = input;
                ast['outputValues'] = outputValues;
                setResult({ ast: ast })
            } catch (error) {
                setError(true);
                setErrorMsg(error);
            }
        }
    };
    return error ? <div className="svg-container text-warning">{errorMsg}</div> : (result && result.ast ? <Chip error={error} errorMsg={errorMsg} changeInput={changeInput} chip={result.ast} /> : <></>)
}
function Chip(props) {
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    var iconStr;
    var chipHeight;
    var chipWidth = 100;

    useEffect(() => {
        function handleResize() {
            vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        }
        window.addEventListener('resize', handleResize);
        return _ => {
            window.removeEventListener('resize', handleResize);
        }
    })

    var inputLines = [];
    var outputLines = [];
    var inputValues = props.chip['inputValues'];
    var outputValues = props.chip.outputValues;

    var inputLength = 0, outputLength = 0;

    if (!props.error) {

        // Adding 2 to original length to make empty space on both sides
        inputLength = Object.entries(inputValues).length + 1;
        outputLength = Object.entries(outputValues).length + 1;

        chipHeight = (Math.max(inputLength, outputLength) < 5) ? 100 : (Math.max(inputLength, outputLength) * 20);

        var counter = 1;

        for (var key in inputValues) {
            inputLines.push({ value: inputValues[key], key: key, yPos: (counter * chipHeight / inputLength) + 15 });
            counter++;
        }

        counter = 1;

        for (var key in outputValues) {
            outputLines.push({ value: outputValues[key], key: key, yPos: (counter * chipHeight / outputLength) + 15 });
            counter = counter + 1;
        }
    }
    if (props.chip.icon) {
        iconStr = props.chip.icon;
        iconStr = iconStr.replace('$height', chipHeight);
        iconStr = iconStr.replace('$width', chipWidth);
        iconStr = iconStr.replace('$txtPosX', (chipWidth / 2));
        iconStr = iconStr.replace('$txtPosY', (chipHeight / 2));
    } else {
        iconStr = '<svg width="' + chipWidth + '" height="' + chipHeight + '">' +
            '<defs>' +
            '<linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">' +
            '<stop offset="10%" style="stop-color:#0c0c0c;stop-opacity:1" />' +
            '<stop offset="90%" style="stop-color:#4D4855;stop-opacity:1" />' +
            '</linearGradient>' +
            '</defs>' +
            '<g><rect width="100" height="' + chipHeight + '" style="fill:url(#grad3);fill-opacity=1;stroke-width:1;stroke:rgb(0,0,0)"/>' +
            '<text x="' + (chipWidth / 2) + '" y="' + (chipHeight / 2) + '" font-family="Verdana" font-size="10" fill="cyan" text-anchor="middle">' + props.chip.chip + '</text></g>' +
            '</svg>'
    }

    return <>
        <div className="svg-container" style={{ height: (Math.max(inputLength, outputLength) < 5) ? "60%" : "98%", maxHeight: (Math.max(inputLength, outputLength) < 5) ? "60%" : "98%" }}>
            <svg viewBox={"0 0 100 " + (chipHeight + 15)} onDoubleClick={() => props.chip.chipCallStack ? console.log(props.chip) : console.log("No Call Stac")}>
                <g>
                    <SVG src={iconStr} x='0' y='15' />
                    <text key={uuid()} x="115" y={8} fontFamily="Verdana" fontSize="10" fill="#BB86FC">Output</text>
                    <text key={uuid()} x="-30" y={8} fontFamily="Verdana" fontSize="10" fill="#03DAC6">Input</text>
                    {
                        inputLines.map(inputLine => {
                            return <g key={uuid()}>
                                <text key={uuid()} x="-15" y={inputLine.yPos - 6} fontFamily="Verdana" fontSize="8" fill="white">{inputLine.key}</text>
                                <line key={uuid()} x1="-30" x2="0" y1={inputLine.yPos} y2={inputLine.yPos} stroke={inputLine.value ? "green" : "darkred"} strokeWidth="1" />
                                <circle cx="-30" className="inputButton" cy={inputLine.yPos} r="5" stroke="black" strokeWidth="2" fill={inputLine.value ? "darkgreen" : "darkred"} onClick={() => props.changeInput(inputLine.key)} />
                            </g>
                        })
                    }
                    {
                        outputLines.map(outputLine => {
                            return <g key={uuid()}>
                                <text key={uuid()} x="115" y={outputLine.yPos - 6} fontFamily="Verdana" fontSize="8" fill="white">{outputLine.key}</text>
                                <line key={uuid()} x1="100" x2="130" y1={outputLine.yPos} y2={outputLine.yPos} stroke={outputLine.value ? "green" : "red"} strokeWidth="1" />
                                <circle cx="130" cy={outputLine.yPos} r="4" stroke="#fff5be" strokeWidth="1" fill={outputLine.value ? "green" : "red"} >
                                    <animate attributeName="fill" values={outputLine.value ? "#01A368;#32CD32;#01A368" : "#C51E3A;#ED2839;#C51E3A"} dur="3s" repeatCount="indefinite" />
                                </circle>

                            </g>
                        })
                    }
                </g>
            </svg>
        </div>
    </>
}