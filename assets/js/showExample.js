import { editorLeft } from "./createCodemirror.js";
import { scrollCheck } from "./scrollOperations.js";

const customEntry = document.getElementById("customEntry");
const checkBoxUseNewlines = document.getElementById("checkBoxUseNewlines");
const checkBoxUseVerboseLogs = document.getElementById("checkBoxUseVerboseLogs");

/** Populates the website with some example settings. */
export function showExample() {

    // Populate left editor
    editorLeft.setValue(`📥 @Gamer Deluxe (Gamer Deluxe#9999, 649462446880518336) joined (created 2 years, 3 months ago)
📤 <@!736816352345563726> (EpicGamer#9129, 736816352345563726) left the server
📥 <@!945442324440556746> (Poggers#7856, 945442324440556746) joined (created 8 hours, 57 minutes ago)
📤 <@!550050618767156620> (Cow Pogging#4017, 550050618767156620) left the server
📥 <@!943243552187497252> (coolguy123#7825, 943243552187497252) joined (created 8 hours, 57 minutes ago)
📤 <@!584490524775616448> (loveminecraft#0666, 584490524775616448) left the server`);


    // Change bot, starting number, and checkboxes
    customEntry.value = "94";
    checkBoxUseNewlines.checked = true;
    checkBoxUseVerboseLogs.checked = true;
    // TODO: Still uses jQuery due to select2. Try removing this with the TS variant once that one has less issues. Then use window.select2.dataAdapter.triggerChange()
    $("#regexList").val(2).change();

    // Activate the Verbose scroll button
    scrollCheck();

}