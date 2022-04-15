const checkBoxMultiple = document.getElementById("checkBoxMultiple");
const multipleIDs = document.getElementById("multipleIDs");
const multipleIDButtons = document.getElementById("multipleIDButtons");
const customEntry = document.getElementById("customEntry");

/** Shows and hides the extra ID Fields based on the multiples checkbox. */
export default () => {
    if (checkBoxMultiple.checked) {
        multipleIDs.hidden = false;
        multipleIDButtons.hidden = false;
        customEntry.disabled = true;
    } else {
        multipleIDs.hidden = true;
        multipleIDButtons.hidden = true;
        customEntry.disabled = false;
    }
}