import uuid from "react-uuid";
import { useContext } from "react";
import { Container, Navbar, Table } from "react-bootstrap";
import SimulationContext from "./SimulationContext";


export default function ChipDesign() {
    const { simulationResult } = useContext(SimulationContext);

    console.log(simulationResult);

    return <>
        <div className="svg-container">
            <svg viewBox="0 0 100 100">
                
            </svg>
        </div>
    </>
}