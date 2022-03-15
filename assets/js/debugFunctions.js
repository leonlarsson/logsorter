import { editorRight } from "./createCodemirror.js";

// debugMode is a global variable set in index.html

/** Toggles debug mode. */
export function toggleDebug() {
    debugMode ? disableDebug() : enableDebug();
}

/** Enables debug mode. */
export function enableDebug() {
    debugMode = true;
    editorRight.setOption("readOnly", false);
    $("#debugOptions").show();
    console.log(`[DEBUG] Debug mode set to ${debugMode}.`);
}

/** Disables debug mode. */
export function disableDebug() {
    debugMode = false;
    editorRight.setOption("readOnly", true);
    // $("#debugCheckBoxScrollBottom").prop("checked", false) // Uncheck
    $("#debugOptions").hide();
    console.log(`[DEBUG] Debug mode set to ${debugMode}.`);
}