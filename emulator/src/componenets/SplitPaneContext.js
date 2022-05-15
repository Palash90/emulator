import { createContext } from "react";

const savedContext = JSON.parse(localStorage.getItem('files'))?JSON.parse(localStorage.getItem('files')).settings:{};
const SplitPaneContext = createContext(savedContext);

export default SplitPaneContext;