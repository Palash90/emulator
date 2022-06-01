import { useContext } from "react";
import { Container, Navbar, Table } from "react-bootstrap";
import uuid from "react-uuid";
import SimulationContext from "./SimulationContext";

function OutputWindow(props) {
    const { simulationResult } = useContext(SimulationContext);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    if (simulationResult && Object.keys(simulationResult).length === 0 && Object.getPrototypeOf(simulationResult) === Object.prototype) {
        return <></>
    }

    if (simulationResult && simulationResult.error) {
        return <pre className="text-warning  border border-secondary" style={{ textAlign: 'left', wordWrap: 'break-word', whiteSpace: 'pre-wrap', overflowY: "scroll", width: (vw * 99 / 100 - props.editorWidth) + "px", marginTop: '10px', height: vh * 85 / 100 + "px" }} role="output">{simulationResult.errorMessage}</pre>
    } else {

        var inputs = [];

        function generateAllBinaryStrings(n, arr, i) {
            if (i == n) {
                var input = {};

                var counter = 0;

                simulationResult.ast.inputs.map(inp => {
                    input[inp] = arr[counter] === 1;
                    counter++;
                })
                inputs.push(input)
                return;
            }

            arr[i] = 0;
            generateAllBinaryStrings(n, arr, i + 1);

            arr[i] = 1;
            generateAllBinaryStrings(n, arr, i + 1);
        }

        let n = simulationResult.ast.inputs.length;

        let arr = new Array(n);
        arr.fill(0);

        generateAllBinaryStrings(n, arr, 0);

        const getTd = (obj) => {
            var values = []
            for (const key in obj) {
                values.push(obj[key])
            }
            simulationResult.ast.outputs.map(out => {
                values.push(simulationResult.ast.operations[out](obj))
            })
            return values.map(val => <td key={uuid()}>{JSON.stringify(val)}</td>)
        };

        return <>
            <Navbar variant="dark">
                <Container>
                    <Navbar.Brand href="#">{simulationResult.ast.chip + " Truth Table"}</Navbar.Brand>
                </Container>
            </Navbar>
            <Table responsive striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr>
                        {
                            simulationResult.ast.inputs.map(inp => {
                                return <th key={uuid()}>{inp}</th>
                            })
                        }
                        {
                            simulationResult.ast.outputs.map(el => {
                                return <th key={uuid()}>{el}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        inputs.map(inp => {
                            return <tr key={uuid()}>
                                {
                                    getTd(inp)
                                }
                            </tr>

                        })
                    }
                </tbody>
            </Table>
        </>

    }

}

export default OutputWindow;