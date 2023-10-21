const checkboxMultiple = document.getElementById("checkboxMultiple");
const multipleIDs = document.getElementById("multipleIDs");
const multipleIDButtons = document.getElementById("multipleIDButtons");
const customEntry = document.getElementById("customEntry");

/** Shows and hides the extra ID Fields based on the multiples checkbox. */
export default () => {
    if (checkboxMultiple.checked) {
        multipleIDs.hidden = false;
        multipleIDButtons.hidden = false;
        customEntry.disabled = true;
    } else {
        multipleIDs.hidden = true;
        multipleIDButtons.hidden = true;
        customEntry.disabled = false;
    }
}