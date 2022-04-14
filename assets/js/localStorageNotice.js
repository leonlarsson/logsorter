const notice = document.getElementById("localStorageConsentNotice");

/** Hides the localStorage notice and sets the key */
export function hideNotice() {
    localStorage.setItem("acknowledgedStorageNotice", "yup");
    notice.classList.add("hide");
    notice.classList.remove("show");
    setTimeout(() => notice.hidden = true, 200);
};

/** Shows the localStorage notice */
export function showNotice() {
    notice.hidden = false;
};