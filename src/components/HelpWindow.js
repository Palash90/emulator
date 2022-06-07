import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import raw from '../constants/README.md';

function HelpWindow(props) {

    const [markdown, setMarkdown] = useState("Help");
    fetch(raw)
        .then(r => r.text())
        .then(text => {
            setMarkdown(text);
        });

    return <div style={{ textAlign: "left" }}><ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} /></div>
}

export default HelpWindow;