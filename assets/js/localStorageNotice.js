/** Hides the localStorage notice and sets the key */
export function hideNotice() {
    localStorage.setItem("acknowledgedStorageNotice", "yup");
    $("#localStorageConsentNotice").fadeOut(200);
};

/** Shows the localStorage notice and sets the key */
export function showNotice() {
    $("#localStorageConsentNotice").fadeIn(400);
};