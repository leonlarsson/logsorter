/** Shows and hides the extra ID Fields based on the multiples checkbox. */
export default () => {
    if ($('#checkBoxMultiple').is(':checked')) {
        $("#multipleIDs, #multipleIDButtons").show();
        $("#customEntry").prop("disabled", true);
    } else {
        $("#multipleIDs, #multipleIDButtons").hide();
        $("#customEntry").prop("disabled", false);
    }
}