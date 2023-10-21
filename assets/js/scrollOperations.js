import { editorRight } from "./createCodemirror.js";

const checkboxUseNewlines = document.getElementById("checkboxUseNewlines");
const checkboxUseVerboseLogs = document.getElementById("checkboxUseVerboseLogs");
const checkboxScrollBottom = document.getElementById("checkboxScrollBottom");
const checkboxScrollLogText = document.getElementById("checkboxScrollLogText");
const checkboxScrollBottomGroup = document.getElementById("checkboxScrollBottomGroup");

/**
 * Scrolls the right editor to the bottom, or verbose.
 * @param {Number} lastLine The last line of the editor.
 */
export function scrollText(lastLine) {
    // Make this only available with newlines checked. Add button to scroll to last pos
    if (checkboxScrollBottom.checked) scrollBottom();

    // Make this only available with newlines checked. Add button to scroll to last pos
    if (checkboxScrollLogText.checked) scrollVerbose(lastLine);
}

/** Handles the visibility and status of the scroll checkboxes. */
export function scrollCheck() {
    if (checkboxUseNewlines.checked && checkboxUseVerboseLogs.checked) {
        checkboxScrollBottomGroup.hidden = false;
    } else {
        checkboxScrollBottomGroup.hidden = true;
        checkboxScrollLogText.checked = false;
    }
}

/** Scrolls the right editor to the bottom. */
export function scrollBottom() {
    editorRight.scrollTo(0, "9999999999999999999999999999999999999");
}

/** Scrolls the right editor to the verbose text. Or, tries to... */
export function scrollVerbose(lastLine) {
    editorRight.scrollIntoView({ line: lastLine }, 200);
}