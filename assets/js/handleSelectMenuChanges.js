const regexList = document.getElementById("regexList");
const dynamicRegexPrefixText = document.getElementById("dynamicRegexPrefixText");
const customEntry = document.getElementById("customEntry");
const dynamicRegexPrefix = document.getElementById("dynamicRegexPrefix");
const dynamicRegexSuffix = document.getElementById("dynamicRegexSuffix");
const checkBoxMultiple = document.getElementById("checkBoxMultiple");
const multipleIDs = document.getElementById("multipleIDs");
const multipleIDButtons = document.getElementById("multipleIDButtons");
const checkBoxMultipleText = document.getElementById("checkBoxMultipleText");


// Hides the custom regex prefix and suffix on start
dynamicRegexPrefix.hidden = true;
dynamicRegexSuffix.hidden = true;

/** Handles operations when user updates the select menu. Hides and shows elements, etc. */
export default () => {
    if (regexList.value === "99") {
        dynamicRegexPrefixText.textContent = "2. Custom RegEx:";
        dynamicRegexPrefixText.hidden = false;
        dynamicRegexPrefixText.setAttribute("title", "Enter the RegEx you want to use. / and /g are already included.\n\nThe contents of Capturing group 1 will be output.");
        customEntry.setAttribute("type", "text");
        customEntry.setAttribute("placeholder", "(\\d+)");
        customEntry.setAttribute("style", "height: 20px; border-radius: 3px");
        customEntry.disabled = false; // Enables the entry box because we do not use multiples for custom Regex
        dynamicRegexPrefix.hidden = false;
        dynamicRegexSuffix.hidden = false;
        checkBoxMultiple.checked = false; // Uncheck the Multiple checkbox
        multipleIDs.hidden = true;
        multipleIDButtons.hidden = true;
        checkBoxMultiple.hidden = true;
        checkBoxMultipleText.hidden = true;

    } else if (regexList.value === "100" || regexList.value === "101") {
        dynamicRegexPrefixText.textContent = "2. IDs begin with:";
        dynamicRegexPrefixText.setAttribute("title", "Select the beginning numbers of the IDs.\n\nExample: (991)82302885588992");
        customEntry.setAttribute("type", "number");
        customEntry.setAttribute("placeholder", "(0-9)");
        customEntry.setAttribute("style", "width: 60px; height: 20px; border-radius: 3px;");
        customEntry.disabled = false; // Enable entry box
        dynamicRegexPrefix.hidden = true;
        dynamicRegexSuffix.hidden = true;
        checkBoxMultiple.checked = false; // Uncheck the Multiple checkbox
        multipleIDs.hidden = true;
        multipleIDButtons.hidden = true;
        checkBoxMultiple.hidden = true;
        checkBoxMultipleText.hidden = true;

    } else {
        dynamicRegexPrefixText.textContent = "2. IDs begin with:";
        dynamicRegexPrefixText.setAttribute("title", "Select the beginning numbers of the IDs.\n\nExample: (991)82302885588992");
        customEntry.setAttribute("type", "number");
        customEntry.setAttribute("placeholder", "(0-9)");
        customEntry.setAttribute("style", "width: 60px; height: 20px; border-radius: 3px;");
        customEntry.disabled = false; // Enable entry box
        dynamicRegexPrefix.hidden = true;
        dynamicRegexSuffix.hidden = true;
        checkBoxMultiple.hidden = false;
        checkBoxMultipleText.hidden = false;

        // If not custom regex and multiples is checked, keep/disable the main entry box
        if (checkBoxMultiple.checked) {
            customEntry.disabled = true;
            multipleIDs.hidden = false;
            multipleIDButtons.hidden = false;
            dynamicRegexPrefixText.textContent = "2. IDs begin with:";
        }
    }
}