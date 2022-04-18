/** Removes one multiple IDs field */
export function addIDField() {

    // Increase the number when func is run. Used for the customEntryNUMBER id
    let number = $('#multipleIDs').children('input').length + 1;

    // If there are 5 ID Fields, don't add more
    if ($('#multipleIDs').children('input').length == 5) {
        number = 5;
        return;
    }

    if (window.isLightMode) {
        $("#multipleIDs").append(`<label class="optionText lightMode">&</label><input class="inputBox multiplesCustomEntry lightMode" type="number" id="customEntry${number}" style="width: 60px; height: 20px; border-radius: 3px; margin-left: 5px; margin-right: 5px; border-color: #40444b; border: 0px; font-family: inherit;">`);
    } else {
        $("#multipleIDs").append(`<label class="optionText">&</label><input class="inputBox multiplesCustomEntry" type="number" id="customEntry${number}" style="width: 60px; height: 20px; border-radius: 3px; margin-left: 5px; margin-right: 5px; border-color: #40444b; border: 0px; font-family: inherit;">`);
    }
}

/** Removes one multiple IDs field */
export function removeIDField() {

    // If there are 2 ID Fields, don't remove more
    if ($('#multipleIDs').children('input').length == 2) {
        number = 2;
        return;
    }
    let idFields = document.getElementById('multipleIDs');

    // Remove 2. One ID Field and one & separator
    idFields.removeChild(idFields.lastElementChild);
    idFields.removeChild(idFields.lastElementChild);
}