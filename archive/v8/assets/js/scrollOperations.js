import { editorRight } from "./createCodemirror.js";

/**
 * Scrolls the right editor to the bottom, or verbose.
 * @param {Number} lastLine The last line of the editor.
 */
export function scrollText(lastLine) {
    // Make this only available with newlines checked. Add button to scroll to last pos
    if ($("#checkBoxScrollBottom").is(":checked")) {
        scrollBottom();
    }

    // Make this only available with newlines checked. Add button to scroll to last pos
    if ($("#checkBoxScrollVerbose").is(":checked")) {
        scrollVerbose(lastLine);
    }
}

/** Handles the visibility and status of the scroll checkboxes. */
export function scrollCheck() {
    if ($("#checkBoxUseNewlines").is(":checked") && $("#checkBoxUseVerboseLogs").is(":checked")) {
        $("#checkBoxScrollVerboseText").show();
    } else {
        $("#checkBoxScrollVerboseText").hide();
        $("#checkBoxScrollVerbose").prop("checked", false);
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