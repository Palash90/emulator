import { Form } from "react-bootstrap";
import { useState } from "react";

export default function ClockModule(props) {
    const [manual, setManual] = useState();

    var clock = () => {
        if (manual)
            props.setClockState(!props.clockState);
    }

    var clockStyle = { border: "solid 1px " + (manual ? "white" : "gray"), height: "25", width: "40", cursor: manual ? "pointer" : "default" }

    return <div className="clock">
        <div>
            <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Manual"
                    value={manual}
                    onChange={(value) => setManual(value.target.checked)}
                />
            </Form>
        </div>
        <div>
            <svg style={clockStyle} onClick={() => clock()}>
                <line x1="5" x2="15" y1="20" y2="20" stroke={manual ? "white" : "gray"} strokeWidth="2" />
                <line x1="15" x2="15" y1="20" y2="5" stroke={manual ? "white" : "gray"} strokeWidth="2" />
                <line x1="15" x2="25" y1="5" y2="5" stroke={manual ? "white" : "gray"} strokeWidth="2" />
                <line x1="25" x2="25" y1="20" y2="5" stroke={manual ? "white" : "gray"} strokeWidth="2" />
                <line x1="25" x2="35" y1="20" y2="20" stroke={manual ? "white" : "gray"} strokeWidth="2" />
            </svg>
        </div>
    </div>
}