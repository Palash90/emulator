import uuid from "react-uuid";
import { useContext } from "react";
import { Container, Navbar, Table } from "react-bootstrap";
import SimulationContext from "./SimulationContext";


export default function ChipDesign() {
    const { simulationResult } = useContext(SimulationContext);

    console.log(simulationResult);

    return <>
        <div className="svg-container">
            <svg viewBox="0 0 60 100">
                <path fill="#ABABAB" d="M59.717,50.177c0-13.252-3.631-25.945-10.495-36.82l2.998-1.873L39.891,0.667l4.318,15.823l3.1-1.937 c6.64,10.515,10.152,22.797,10.152,35.624c0,12.927-3.56,25.284-10.294,35.848l-2.959-1.849L39.891,100L52.22,89.183l-3.14-1.962 C56.037,76.298,59.717,63.529,59.717,50.177z" />
            </svg>
        </div>
    </>
}