import SplitPane from "react-split-pane";
import FilesPane from "./FilesPane";
import { EditorPane } from "./EditorPane";

export default function MainPane() {
    return <SplitPane split="horizontal" minSize={50}
        defaultSize={parseInt(localStorage.getItem('splitPosMainPane')||50)}
        onChange={(size) => localStorage.setItem('splitPosMainPane', size)}>
        <div>Top Pane</div>
        <SplitPane split="vertical"
            minSize={230}
            defaultSize={parseInt(localStorage.getItem('splitPosBottomPane')||230)}
            onChange={(size) => localStorage.setItem('splitPosBottomPane', size)}>
            <FilesPane />
            <EditorPane />
        </SplitPane></SplitPane>;
}
