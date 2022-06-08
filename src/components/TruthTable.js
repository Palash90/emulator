import uuid from "react-uuid";
import { useContext, useState } from "react";
import { Container, Navbar, Table } from "react-bootstrap";
import SimulationContext from "./SimulationContext";

export default function TruthTable(props) {
    const { simulationResult } = useContext(SimulationContext);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    var inputs = [];

    function generateAllBinaryCombinations(n, arr, i) {
        if (i === n) {
            var input = {};

            var counter = 0;

            simulationResult.ast.inputs.map(inp => {
                input[inp] = arr[counter] === 1;
                counter++;
            });
            inputs.push(input);
            return;
        }

        arr[i] = 0;
        generateAllBinaryCombinations(n, arr, i + 1);

        arr[i] = 1;
        generateAllBinaryCombinations(n, arr, i + 1);
    }

    let n = simulationResult.ast.inputs.length;

    let arr = new Array(n);
    arr.fill(0);

    generateAllBinaryCombinations(n, arr, 0);

    const getTd = (obj) => {
        var values = [];
        for (const key in obj) {
            values.push(obj[key]);
        }
        try {
            var outputValues = simulationResult.getValues(obj, simulationResult.ast);

            for (var key in outputValues) {
                values.push(outputValues[key])
            }

            return values.map(val => <td key={uuid()}>{val ? 1 : 0}</td>);
        } catch (error) {
            setError(true);
            setErrorMsg(error)
        }

    };

    return <>
        <Navbar variant="dark">
            <Container>
                <Navbar.Brand href="#">{simulationResult.ast.chip + " Truth Table"}</Navbar.Brand>
            </Container>
        </Navbar>
        {
            error ? <p className="text-warning">{JSON.stringify(errorMsg)}</p> : <div className="tableFixHead ">
                <Table responsive striped bordered hover size="sm" variant="dark">
                    <thead>
                        <tr>
                            {simulationResult.ast.inputs.map(inp => {
                                return <th key={uuid()}>{inp}</th>;
                            })}
                            {simulationResult.ast.outputs.map(el => {
                                return <th key={uuid()}>{el}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {inputs.map(inp => {
                            return <tr key={uuid()}>
                                {getTd(inp)}
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        }
    </>
}

