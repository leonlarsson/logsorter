// Creates both CodeMirrors and exports them
export const editorRight = CodeMirror.fromTextArea(document.getElementById("textBoxOutput"), {
    mode: "text/html",
    theme: "right",
    lineNumbers: true,
    readOnly: true, // was "noCursor"
    lineWrapping: true,
    styleSelectedText: true,
    viewportMargin: 10,
});

export const editorLeft = CodeMirror.fromTextArea(document.getElementById("textBoxInput"), {
    mode: "text/html",
    theme: "left",
    lineNumbers: true,
    readOnly: false, // was "noCursor"
    lineWrapping: true,
    styleSelectedText: true,
    viewportMargin: 10,
});