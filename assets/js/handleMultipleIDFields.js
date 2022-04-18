const multipleIDs = document.getElementById("multipleIDs");

/** Removes one multiple IDs field */
export function addIDField() {

    // Increase the number when func is run. Used for the customEntryNUMBER id
    const nextCustomEntryNumber = document.querySelectorAll(".multiplesCustomEntry").length + 1;

    // If there are 5 ID Fields, don't add more
    if (document.querySelectorAll(".multiplesCustomEntry").length === 5) return;


    const template = document.createElement("template");
    template.innerHTML = `<label class="optionText ${window.isLightMode ? "lightMode" : ""}">&</label><input class="inputBox multiplesCustomEntry ${window.isLightMode ? "lightMode" : ""}" type="number" id="customEntry${nextCustomEntryNumber}" style="width: 60px; height: 20px; border-radius: 3px; margin-left: 5px; margin-right: 5px; border-color: #40444b; border: 0px; font-family: inherit;">`;
    multipleIDs.appendChild(template.content);
}

/** Removes one multiple IDs field */
export function removeIDField() {

    // If there are 2 ID Fields, don't remove more
    if (document.querySelectorAll(".multiplesCustomEntry").length === 2) return;

    // Remove 2. One ID Field and one & separator
    multipleIDs.removeChild(multipleIDs.lastElementChild);
    multipleIDs.removeChild(multipleIDs.lastElementChild);
}