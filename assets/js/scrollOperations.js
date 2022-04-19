import { editorRight } from "./createCodemirror.js";

const checkBoxUseNewlines = document.getElementById("checkBoxUseNewlines");
const checkBoxUseVerboseLogs = document.getElementById("checkBoxUseVerboseLogs");
const checkBoxScrollBottom = document.getElementById("checkBoxScrollBottom");
const checkBoxScrollVerbose = document.getElementById("checkBoxScrollVerbose");
const checkBoxScrollVerboseText = document.getElementById("checkBoxScrollVerboseText");

/**
 * Scrolls the right editor to the bottom, or verbose.
 * @param {Number} lastLine The last line of the editor.
 */
export function scrollText(lastLine) {
    // Make this only available with newlines checked. Add button to scroll to last pos
    if (checkBoxScrollBottom.checked) scrollBottom();

    // Make this only available with newlines checked. Add button to scroll to last pos
    if (checkBoxScrollVerbose.checked) scrollVerbose(lastLine);
}

/** Handles the visibility and status of the scroll checkboxes. */
export function scrollCheck() {
    if (checkBoxUseNewlines.checked && checkBoxUseVerboseLogs.checked) {
        checkBoxScrollVerboseText.hidden = false;
    } else {
        checkBoxScrollVerboseText.hidden = true;
        checkBoxScrollVerbose.checked = false;
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