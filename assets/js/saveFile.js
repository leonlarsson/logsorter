import { editorRight } from "./createCodemirror.js";

/** Saves the contents of the right editor as a text file. */
export default () => {

    // Return if output is empty
    if (!editorRight.getValue()) return;

    const promptFilename = prompt("Save file as:\n'IDs'_LogSorter.txt", "IDs")
    if (promptFilename) {
        const textBlob = new Blob([editorRight.getValue()], { type: "text/plain" });
        window.saveAs(textBlob, promptFilename + "_LogSorter.txt");
    }
}