import createSelectMenu from "./createSelectMenu.js";

const toggleThemeButton = document.getElementById("toggleThemeButton");
const deleteThemeSettingButton = document.getElementById("deleteThemeSettingButton");

// Checks for theme setting on load, then sets theme accordingly. If no setting, check system preference and set to that
if (localStorage.getItem("siteTheme") === "light") {
    console.log("[DEBUG] Detected light theme setting.");
    useLightMode();
} else if (localStorage.getItem("siteTheme") === "dark") {
    console.log("[DEBUG] Detected dark theme setting.");
    useDarkMode();
} else {
    checkSystemThemePref();
}

// Set the theme button titles here to avoid the text flash
window.onload = () => {
    toggleThemeButton.setAttribute("title", "Toggles light/dark theme.\n\nUses a non-tracking localStorage key to save your preference.\nPress the trash can to clear setting.");
    deleteThemeSettingButton.setAttribute("title", "Deletes the key that stores your theme preference and changes theme to system preference.");
};

// Detects changes in the system theme preference. Ignores if localStorage setting exists
window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", e => {
    if (localStorage.getItem("siteTheme")) {
        console.log("[DEBUG] System theme changed but setting overrides it.")
        return;
    }

    // If system theme changed to dark
    if ((e.matches ? "dark" : "light") === "dark") {
        console.log("[DEBUG] No setting. System preference changed to dark theme.");
        useDarkMode();
    }

    // If system theme changed to light
    if ((e.matches ? "dark" : "light") === "light") {
        console.log("[DEBUG] No setting. System preference changed to light theme.");
        useLightMode();
    }
});

/** Toggles the theme. */
export function toggleLight() {

    // If light mode is active, set to dark mode
    if (document.body.classList.contains("lightMode")) {
        localStorage.setItem("siteTheme", "dark");
        useDarkMode();
    } else {
        localStorage.setItem("siteTheme", "light");
        useLightMode();
    }
}

/** Run check on system theme and apply that. */
export function checkSystemThemePref() {

    // If system theme is dark when LS key is deleted
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log("[DEBUG] System theme preference is dark.");
        useDarkMode();
    }

    // If system theme is light when LS key is deleted
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        console.log("[DEBUG] System theme preference is light.");
        useLightMode();
    }
}

/** Enable light theme. */
export function useLightMode() {
    window.isLightMode = true;
    window.bgColor = "#ffffff";
    toggleThemeButton.classList.add("fas", "fa-moon");
    toggleThemeButton.classList.remove("fa-sun");
    toggleThemeButton.style.color = "#2f3136";
    deleteThemeSettingButton.style.color = "#2f3136";
    document.querySelectorAll("*").forEach(element => element.classList.add("lightMode"));
    document.querySelectorAll(".CodeMirror").forEach(element => element.style.borderColor = window.bgColor);

    deleteThemeSettingButton.hidden = localStorage.getItem("siteTheme") ? false : true;

    // Makes the RegEx selector a searchable Select2 box
    createSelectMenu("default");
}

/** Enable dark theme. */
export function useDarkMode() {
    window.isLightMode = false;
    window.bgColor = "#36393f";
    toggleThemeButton.classList.add("fas", "fa-sun");
    toggleThemeButton.classList.remove("fa-moon");
    toggleThemeButton.style.color = "#f2f3f5";
    deleteThemeSettingButton.style.color = "#f2f3f5";
    document.querySelectorAll("*").forEach(element => element.classList.remove("lightMode"));
    document.querySelectorAll(".CodeMirror").forEach(element => element.style.borderColor = window.bgColor);

    deleteThemeSettingButton.hidden = localStorage.getItem("siteTheme") ? false : true;

    // Makes the RegEx selector a searchable Select2 box
    createSelectMenu("mozzy");
}

/** Deletes the theme setting, hides the delete button and changes theme to system preference. */
export function deleteThemeSetting() {
    localStorage.removeItem("siteTheme");
    deleteThemeSettingButton.hidden = true;
    console.log("[DEBUG] Deleted theme setting. Setting to system preference.");
    checkSystemThemePref();
}