import { Col, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function ClockModule(props) {
    const [manual, setManual] = useState();
    const [freq, setFreq] = useState(100);
    const pulseWidth = 20;

    var clock = () => {
        if (manual) {
            props.setClockState(true);
            setTimeout(() => props.setClockState(false), pulseWidth);
        }
    }

    useEffect(() => {
        const interval = !manual ? setInterval(() => {
            props.setClockState(true);
            setTimeout(() => props.setClockState(false), pulseWidth);
        }, freq) : null;
        return () => clearInterval(interval);
    }, [manual, freq, props]);

    var clockStyle = { border: "solid 1px " + (manual ? "white" : "gray"), height: "25", width: "40", cursor: manual ? "pointer" : "default" }

    return <div className="clock">
        <Row>
            <Col>
                Clock Controls
            </Col>
            <Col>
                <Form>
                    <Form.Group sm={12}>
                        <Row>
                            <Col>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Manual"
                                    value={manual}
                                    onChange={(value) => setManual(value.target.checked)}
                                />
                            </Col>
                            <Col>
                                {manual ? <></> : <Form.Range disabled={manual} value={freq} step={100} min={100} max={2500} onChange={(value) => setFreq(value.target.value)} />}
                            </Col>
                            <Col>
                                {manual ? <></> : <Form.Label>{parseFloat(1000 / freq).toFixed(2) + " Hz"}</Form.Label>}
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Col>
            <Col>
                <svg style={clockStyle} onClick={() => clock()}>
                    <line x1="5" x2="15" y1="20" y2="20" stroke={manual ? "white" : "gray"} strokeWidth="2" />
                    <line x1="15" x2="15" y1="20" y2="5" stroke={manual ? "white" : "gray"} strokeWidth="2" />
                    <line x1="15" x2="25" y1="5" y2="5" stroke={manual ? "white" : "gray"} strokeWidth="2" />
                    <line x1="25" x2="25" y1="20" y2="5" stroke={manual ? "white" : "gray"} strokeWidth="2" />
                    <line x1="25" x2="35" y1="20" y2="20" stroke={manual ? "white" : "gray"} strokeWidth="2" />
                </svg>
            </Col>
            <Col>
                <svg style={{ border: "dashed 1px gray", height: "25", width: "22", cursor: manual ? "pointer" : "default" }}>
                    <circle cx="10" cy="12" r="8" stroke="black" strokeWidth="1" fill={props.clockState ? "blue" : "transparent"} />
                </svg>
            </Col>
        </Row >
    </div>
}