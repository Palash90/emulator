import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ScreenSizeContext from './ScreenSizeContext';
import raw from '../constants/README.md';

function HelpWindow(props) {

    const [markdown, setMarkdown] = useState("Help");
    const { vh } = useContext(ScreenSizeContext);
    fetch(raw)
        .then(r => r.text())
        .then(text => {
            setMarkdown(text);
        });

    return <div style={{ textAlign: "left", margin:"8px", overflowY: "auto", height: vh * 95 / 100 }}><ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} /></div>
}

export default HelpWindow;