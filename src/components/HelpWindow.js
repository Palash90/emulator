import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import raw from '../constants/markdown.md';

function HelpWindow(props) {

    const [markdown, setMarkdown] = useState("Help");
    fetch(raw)
        .then(r => r.text())
        .then(text => {
            setMarkdown(text);
        });

    return <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
}

export default HelpWindow;