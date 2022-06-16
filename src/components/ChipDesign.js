import { useContext, useState } from "react";
import SimulationContext from "./SimulationContext";
import SVG from 'react-inlinesvg';
import uuid from "react-uuid";
import { Table } from "react-bootstrap";

export default function ChipDesign(props) {
    const { simulationResult } = useContext(SimulationContext);

    const changeInput = (changedKey) => {
        var input = {}
        if (props.inputs) {
            for (var key in props.inputs) {
                input[key] = key === changedKey ? !props.inputs[key] : props.inputs[key]
            }
            input['CLOCK'] = props.clockState;
            props.setInputs(input)
            try {
                var outputValues = simulationResult.getValues(input, simulationResult.ast);
                simulationResult.clearBus();
                var ast = { ...simulationResult.ast };
                ast['inputValues'] = input;
                ast['outputValues'] = outputValues;
                props.setResult({ ast: ast })
            } catch (error) {
                props.setError(true);
                props.setErrorMsg(error);
            }
        }
    };
    return props.error ? <div className="svg-container text-warning">{props.errorMsg}</div> : (props.result && props.result.ast ? <Chip error={props.error} errorMsg={props.errorMsg} changeInput={changeInput} chip={props.result.ast} /> : <></>)
}
function Chip(props) {
    var iconStr;
    var chipHeight;
    var chipWidth = 100;
    var inputLines = [];
    var outputLines = [];
    var inputValues = props.chip['inputValues'];
    var outputValues = props.chip.outputValues;
    var maxGroupLength = 0;

    inputValues = (({ CLOCK, ...o }) => o)(inputValues);

    const [selected, setSelected] = useState("");
    const [reveal, setReveal] = useState(false);

    const groupIt = (array) => {
        let resultObj = {};

        for (let i = 0; i < array.length; i++) {
            let currentWord = array[i];
            let firstChar = currentWord[0];
            let innerArr = [];
            if (resultObj[firstChar] === undefined) {
                innerArr.push(currentWord);
                resultObj[firstChar] = innerArr
            } else {
                resultObj[firstChar].push(currentWord)
            }
        }
        return resultObj
    }

    var inputGroups = groupIt(Object.keys(inputValues));
    var outputGroups = groupIt(Object.keys(outputValues));
    var inputValuesGroup = {};
    var outputValuesGroup = {};

    for (var inputGroupKey in inputGroups) {
        var group = inputGroups[inputGroupKey];
        group = group.length > 1 ? group.map(el => parseInt(el.replace(inputGroupKey, ''))) : group;
        group = group.sort((a, b) => a - b);

        var value = 0;
        if (group.length > 1) {
            group.map((el, index) => {
                if (index === group.length - 1)
                    value = value - (inputValues[inputGroupKey + el] ? 1 : 0) * Math.pow(2, index)
                else
                    value = value + (inputValues[inputGroupKey + el] ? 1 : 0) * Math.pow(2, index)
            });
        } else {
            value = inputValues[group[0]] ? 1 : 0;
        }
        maxGroupLength = group.length > maxGroupLength ? group.length : maxGroupLength;

        inputValuesGroup[group.length > 1 ? inputGroupKey : group[0]] = value;
    }

    for (var outputGroupKey in outputGroups) {
        var group = outputGroups[outputGroupKey];
        group = group.length > 1 ? group.map(el => parseInt(el.replace(outputGroupKey, ''))) : group;
        group = group.sort((a, b) => a - b);
        var value = 0;
        if (group.length > 1) {
            group.map((el, index) => {
                if (index === group.length - 1)
                    value = value - (outputValues[outputGroupKey + el] ? 1 : 0) * Math.pow(2, index)
                else
                    value = value + (outputValues[outputGroupKey + el] ? 1 : 0) * Math.pow(2, index)
            });
        } else {
            value = outputValues[group[0]] ? 1 : 0;
        }
        maxGroupLength = group.length > maxGroupLength ? group.length : maxGroupLength;

        outputValuesGroup[group.length > 1 ? outputGroupKey : group[0]] = value;
    }

    var inputLength = 0, outputLength = 0;

    if (!props.error) {
        inputLength = Object.entries(inputValues).length + 1;

        outputLength = Object.entries(outputValues).length + 1;
        chipHeight = (Math.max(inputLength, outputLength) < 5) ? 100 : (Math.max(inputLength, outputLength) * 20);

        var horizontal = false;

        if (Math.max(inputLength, outputLength) > 10) {
            chipHeight = 100;
            chipWidth = (Math.max(inputLength, outputLength) * 20);
            chipWidth = chipWidth < 375 ? 375 : chipWidth;
            horizontal = true;
        }
        var counter = 1;

        for (var key in inputValues) {
            if (horizontal) {
                inputLines.push({ value: inputValues[key], key: key, yPos: 150, xPos: (counter * chipWidth / inputLength) + 5 });
            } else {
                inputLines.push({ value: inputValues[key], key: key, xPos: "-15", yPos: (counter * chipHeight / inputLength) + 15 });
            }

            counter++;
        }

        counter = 1;

        for (var key in outputValues) {
            if (horizontal) {
                outputLines.push({ value: outputValues[key], key: key, yPos: 0, xPos: (counter * chipWidth / outputLength) + 5 });
            } else {
                outputLines.push({ value: outputValues[key], key: key, xPos: "105", yPos: (counter * chipHeight / outputLength) + 15 });
            }
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
            '<g><rect width="' + chipWidth + '" height="' + chipHeight + '" style="fill:url(#grad3);fill-opacity=1;stroke-width:1;stroke:rgb(0,0,0)"/>' +
            '<text class="svgtxt" x="' + (chipWidth / 2) + '" y="' + (chipHeight / 2) + '" font-family="Verdana" font-size="10" fill="cyan" text-anchor="middle">' + (typeof (props.chip.chip) === 'string' ? props.chip.chip : props.chip.chip.chip) + '</text></g>' +
            '</svg>'
    }

    return <>
        <div className="svg-container" style={{ height: (Math.max(inputLength, outputLength) < 5) ? "60%" : "85%", maxHeight: (Math.max(inputLength, outputLength) < 5) ? "60%" : "90%" }} onDoubleClick={() => { console.log(props.chip); setReveal(false); }}>
            {(!reveal || !props.chip.chipCallStack) ? <svg viewBox={"0 " + (horizontal ? -30 : 0) + " " + (chipWidth + 15) + " " + (chipHeight + (horizontal ? 100 : 15))}>
                <g>
                    <SVG src={iconStr} x='0' y='15' />
                    <text className="svgtxt" key={uuid()} x={horizontal ? chipWidth / 2 : "115"} y={horizontal ? -20 : 8} fontFamily="Verdana" fontSize="10" fill="#BB86FC" textAnchor="middle">Output</text>
                    <text className="svgtxt" key={uuid()} x={horizontal ? chipWidth / 2 : "-30"} y={horizontal ? 162 : 8} fontFamily="Verdana" fontSize="10" fill="#03DAC6" textAnchor="middle">Input</text>
                    {
                        inputLines.map((inputLine, index) => {
                            return <g key={uuid()}>
                                <text className="svgtxt" key={uuid()} x={inputLine.xPos} y={horizontal ? inputLine.yPos : inputLine.yPos - 6} fontFamily="Verdana" fontSize="8" fill="white">{inputLine.key}</text>
                                <line key={uuid()} x1={horizontal ? inputLine.xPos : -30} x2={horizontal ? inputLine.xPos : "0"} y1={horizontal ? 135 : inputLine.yPos} y2={horizontal ? 115 : inputLine.yPos} stroke={inputLine.value ? "green" : "red"} strokeWidth="1" />
                                <svg key={uuid()} x={(horizontal ? inputLine.xPos : -30) - 6} y={(horizontal ? 135 : inputLine.yPos) - 6} className="inputButton" onMouseOver={() => setSelected('inpBut-' + index)} onMouseLeave={() => setSelected('')} onClick={() => { props.changeInput(inputLine.key); }}>
                                    <rect width="12" height="12" rx="1.5" ry="1.5" fill="gray" strokeWidth="2" />
                                    <rect x=".75" y=".75" width="10.5" height="10.5" rx="1.5" ry="1.5" fill="#cacaca" />
                                    <linearGradient id={"grad-up" + index} x1="0" x2="1" y1="0" y2="1">
                                        <stop stopColor="#ffffff" offset="0" />
                                        <stop stopColor={inputLine.value ? "green" : "red"} offset="0.3" />
                                        <stop stopColor={inputLine.value ? "green" : "red"} offset="0.5" />
                                        <stop offset="1" />
                                    </linearGradient>
                                    <g fill="#1b1b1b">
                                        <circle cx="1.767" cy="1.7916" r=".37" />
                                        <circle cx="10.161" cy="1.7916" r=".37" />
                                        <circle cx="10.161" cy="10.197" r=".37" />
                                        <circle cx="1.767" cy="10.197" r=".37" />
                                    </g>

                                    <circle className={selected === 'inpBut-' + index ? "button-contour" : ""} cx="6" cy="6" r="3.8" fill={"url(#grad-up" + index + ")"} />
                                    <circle cx="6" cy="6" r="2.9" fill={inputLine.value ? "green" : "red"} stroke="#2f2f2f" strokeOpacity=".47" strokeWidth=".08" />
                                    <circle cx="6" cy="6" r="2.9" fill={inputLine.value ? "green" : "red"} stroke="blue" strokeOpacity=".47" strokeWidth=".08" />
                                </svg>
                            </g>
                        })
                    }
                    {
                        outputLines.map(outputLine => {
                            return <g key={uuid()}>
                                <text className="svgtxt" key={uuid()} x={outputLine.xPos} y={outputLine.yPos - 6} fontFamily="Verdana" fontSize="8" fill="white">{outputLine.key}</text>
                                <line key={uuid()} x1={horizontal ? outputLine.xPos : 100} x2={horizontal ? outputLine.xPos : "130"} y1={horizontal ? -2 : outputLine.yPos} y2={horizontal ? 15 : outputLine.yPos} stroke={outputLine.value === undefined ? "blue" : outputLine.value ? "green" : "red"} strokeWidth="1" />
                                <circle cx={horizontal ? outputLine.xPos : "130"} cy={horizontal ? outputLine.yPos + 2 : outputLine.yPos} r="4" stroke="#fff5be" strokeWidth="1" fill={outputLine.value ? "green" : "red"} >
                                    <animate attributeName="fill" values={outputLine.value === undefined ? "blue;darkblue;blue" :outputLine.value ? "#01A368;#32CD32;#01A368" : "#C51E3A;#ED2839;#C51E3A"} dur="3s" repeatCount="indefinite" />
                                </circle>

                            </g>
                        })
                    }
                </g>
            </svg> : Object.keys(props.chip.chipCallStack).map(el => <Chip key={uuid()} chip={props.chip.chipCallStack[el]} />)
            }
        </div>
        {
            maxGroupLength < 4 ? <></> : <Table responsive striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr>
                        {Object.keys(inputValuesGroup).map(el => {
                            return <th className="svgtxt" key={uuid()}>{el}</th>;
                        })}
                        {Object.keys(outputValuesGroup).map(el => {
                            return <th className="svgtxt" key={uuid()}>{el}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        {
                            Object.keys(inputValuesGroup).map(el => {
                                return <td className="svgtxt" key={uuid()}>{inputValuesGroup[el]}</td>
                            })
                        }
                        {
                            Object.keys(outputValuesGroup).map(el => {
                                return <td className="svgtxt" key={uuid()}>{outputValuesGroup[el]}</td>
                            })
                        }
                    </tr>

                </tbody>
            </Table>
        }
    </>
}