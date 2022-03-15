import createSelectMenu from "./createSelectMenu.js";

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
    $("#toggleThemeButton").attr("title", "Toggles light/dark theme.\n\nUses a non-tracking localStorage key to save your preference.\nPress the trash can to clear setting.");
    $("#deleteThemeSettingButton").attr("title", "Deletes the key that stores your theme preference and changes theme to system preference.");
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
    if ($("body").hasClass("lightMode")) {
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
    $("*").addClass("lightMode");
    $("#toggleThemeButton").addClass("fas fa-moon");
    $("#toggleThemeButton").removeClass("fa-sun");
    $("#toggleThemeButton").css("color", "#2f3136");
    $("#deleteThemeSettingButton").css("color", "#2f3136");
    window.bgColor = "#ffffff";
    $(".CodeMirror").css("border-color", bgColor);

    if (!localStorage.getItem("siteTheme")) {
        $("#deleteThemeSettingButton").hide();
    } else {
        $("#deleteThemeSettingButton").show();
    }

    // Makes the RegEx selector a searchable Select2 box
    createSelectMenu("default");
}

/** Enable dark theme. */
export function useDarkMode() {
    window.isLightMode = false;
    $("*").removeClass("lightMode");
    $("#toggleThemeButton").addClass("fas fa-sun");
    $("#toggleThemeButton").removeClass("fa-moon");
    $("#toggleThemeButton").css("color", "#f2f3f5");
    $("#deleteThemeSettingButton").css("color", "#f2f3f5");
    window.bgColor = "#36393f";
    $(".CodeMirror").css("border-color", bgColor);

    if (!localStorage.getItem("siteTheme")) {
        $("#deleteThemeSettingButton").hide();
    } else {
        $("#deleteThemeSettingButton").show();
    }

    // Makes the RegEx selector a searchable Select2 box
    createSelectMenu("mozzy");
}

/** Deletes the theme setting, hides the delete button and changes theme to system preference. */
export function deleteThemeSetting() {
    localStorage.removeItem("siteTheme");
    $("#deleteThemeSettingButton").hide();
    console.log("[DEBUG] Deleted theme setting. Setting to system preference.");
    checkSystemThemePref();
}