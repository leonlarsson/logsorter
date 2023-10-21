import { editorRight } from "./createCodemirror.js";
import { animateElement } from "./utils.js";
import { Colors } from "./constants.js";

const checkboxUseNewlines = document.getElementById("checkboxUseNewlines");
const checkboxUseVerboseLogs = document.getElementById("checkboxUseVerboseLogs");
const removeDupesButton = document.getElementById("removeDupesButton");
const splitLinesButton = document.getElementById("splitLinesButton");
const copyOutputButton = document.getElementById("copyOutputButton");
const clearOutputButton = document.getElementById("clearOutputButton");
const outputStatusText = document.getElementById("outputStatusText");
const outputStatusTextCol = document.getElementById("outputStatusTextCol");
const editorRightElement = editorRight.getWrapperElement();

/** Removes duplicates in right editor. */
export function removeDuplicates() {

    // Return if output is empty
    if (!editorRight.getValue()) return;

    let idSeparator;
    let idSeparatorText;

    // If checked, use newlines instead of spaces as the ID separator
    if (checkboxUseNewlines.checked) {
        idSeparator = "\n";
        idSeparatorText = "newlines";
    } else {
        idSeparator = " ";
        idSeparatorText = "spaces";
    }

    // Gets date for Verbose logs - Deduplication
    const today = new Date().toISOString().substring(0, 19);
    const dateTime = today.replace("T", " ");

    if (checkboxUseVerboseLogs.checked) {
        editorRight.setValue(`Generated on ${dateTime} UTC. Duplicates removed, ${uniqueIDs_Const.size.toLocaleString("en")} unique IDs. Separated with ${idSeparatorText}:\n${[...uniqueIDs_Const].join(idSeparator) + idSeparator}`);
    } else {
        editorRight.setValue(`${[...uniqueIDs_Const].join(idSeparator) + idSeparator}`);
    }

    console.log(`[DEBUG] Removed duplicates. ${(currentIDs - uniqueIDs_Const.size).toLocaleString("en")} duplicates removed. ${uniqueIDs_Const.size.toLocaleString("en")} left.`);
    outputStatusText.textContent = ` (${(currentIDs - uniqueIDs_Const.size).toLocaleString("en")} duplicates removed. ${uniqueIDs_Const.size.toLocaleString("en")} left)`;
    outputStatusTextCol.textContent = ` (${(currentIDs - uniqueIDs_Const.size).toLocaleString("en")} duplicates removed. ${uniqueIDs_Const.size.toLocaleString("en")} left)`;

    // Adjust the total IDs length to the current value
    window.currentIDs = window.uniqueIDs_Const.size;

    animateElement(removeDupesButton, "backgroundColor", Colors.GREEN, 1800);
    animateElement(editorRightElement, "borderColor", Colors.GREEN, 1800);
}

/** Splits lines in right editor. */
export function splitLines() {

    // Return if output is empty
    if (!editorRight.getValue()) return;

    // Gets the number to split by
    const rawInput = prompt("After how many lines do you want to split?\n\nPlease enter a number higher than 0.", "100");

    // If no input, return
    if (!rawInput) return;

    // Make the input an int
    const splitEveryX = parseInt(rawInput);

    // If input is 0 or not a number, return
    if (splitEveryX == 0 || isNaN(splitEveryX)) return alert("Please enter a number higher than 0.");

    // Convert to newlines before proceeding
    convertNewlines();

    // Prevent the user from splitting into groups of X when X is bigger than the total amount of lines
    if (splitEveryX > editorRight.lineCount() - 2) {
        return alert(`Only found ${editorRight.lineCount() - 1} lines after converting to newlines. Please select a number smaller than the amount of lines.`);
    }

    // Sets the amount of splits needed based on the amount of lines and size of group
    const splitsNeeded = Math.trunc(editorRight.lineCount() / splitEveryX);

    // Sets the base while loop number
    let whileLoop = 0;

    // Selects the first line to enter a newline at. -1 because apparently it starts at 0
    let newlineAtLine = splitEveryX - 1;

    // Continue until the number of splits needed is reached
    while (splitsNeeded > whileLoop) {

        // Add a newline at line designated line number
        editorRight.replaceRange("\n", { line: newlineAtLine });
        whileLoop++;

        // Add the group size to the next line number that needs a newline
        newlineAtLine = newlineAtLine + splitEveryX;

        // +1 to keep up with the line being moved because of previous newline
        newlineAtLine++;
    }

    console.log(`[DEBUG] Splitting into groups of ${splitEveryX}.`);

    animateElement(splitLinesButton, "backgroundColor", Colors.GREEN, 1800);
    animateElement(editorRightElement, "borderColor", Colors.GREEN, 1800);
}

/** Copies contents of the right editor. */
export function copyText() {

    // Return if output is empty
    if (!editorRight.getValue()) return;

    // Attempt to copy the Output into the clipboard. If successful, run visual change. If failed, alert the user
    const clipboard = new ClipboardJS('#copyOutputButton', {
        text: () => editorRight.getValue()
    });

    clipboard.on('error', () => {
        clipboard.destroy();
        console.log(`%c[DEBUG] Failed to copy text.`, `color: ${Colors.RED}`);
        alert("Copy operation failed. Please copy manually.");
    });

    clipboard.on("success", () => {
        clipboard.destroy();
        console.log("[DEBUG] Copied text.");

        animateElement(copyOutputButton, "backgroundColor", Colors.GREEN, 1800);
        animateElement(editorRightElement, "borderColor", Colors.GREEN, 1800);
    });
}

/** Clears text of the right editor and resets global counting variables. */
export function clearText() {

    // Return if output is empty
    if (!editorRight.getValue()) return;

    // Clears all the values, sets, and arrays
    window.uniqueIDs.clear();
    window.uniqueIDs_Const.clear();
    window.allIDs.length = 0;
    window.currentIDs = 0;

    outputStatusText.textContent = "";
    outputStatusTextCol.textContent = "";
    editorRight.setValue("");

    console.log("[DEBUG] Cleared text");

    animateElement(clearOutputButton, "backgroundColor", Colors.GREEN, 1800);
    animateElement(editorRightElement, "borderColor", Colors.RED, 1800);
}

/** Convert the right editor to newlines. */
export function convertNewlines() {

    // Return if output is empty
    if (!editorRight.getValue()) return;

    // Gets date for Verbose logs - Deduplication
    const today = new Date().toISOString().substring(0, 19);
    const dateTime = today.replace("T", " ");

    const str = editorRight.getValue().replaceAll(/Generated.*:/g, "").replaceAll(/^\s/g, "").replace(/\s+$/g, "").replaceAll(/\s+/g, "\n");

    if (checkboxUseVerboseLogs.checked) {
        editorRight.setValue(`Generated on ${dateTime} UTC. ${currentIDs.toLocaleString("en")} IDs. Separated with newlines:\n${str}\n`);
    } else {
        editorRight.setValue(str + "\n");
    }
    console.log("[DEBUG] Converted to newlines.");
}

/** Convert the right editor to spaces. */
export function convertSpaces() {

    // Return if output is empty
    if (!editorRight.getValue()) return;

    // Gets date for Verbose logs - Deduplication
    const today = new Date().toISOString().substring(0, 19);
    const dateTime = today.replace("T", " ");

    const str = editorRight.getValue().replaceAll(/Generated.*:/g, "").replaceAll(/^\s/g, "").replace(/\s+$/g, "").replaceAll(/\s+/g, " ");

    if (checkboxUseVerboseLogs.checked) {
        editorRight.setValue(`Generated on ${dateTime} UTC. ${currentIDs.toLocaleString("en")} IDs. Separated with spaces:\n${str}\n`);
    } else {
        editorRight.setValue(str + "\n");
    }
    console.log("[DEBUG] Converted to spaces.");
}