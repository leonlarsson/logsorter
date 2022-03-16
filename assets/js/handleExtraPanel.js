const toggleButton = document.getElementById("openExtraPanelButton");
const extraPanel = document.getElementById("extraOptions");

export function toggleExtraPanel() {
    extraPanel.style.display === "none" ? enableExtraPanel() : disableExtraPanel();
}

export function enableExtraPanel() {
    // Rotate extra panel button
    toggleButton.style.transform = "rotate(90deg)";

    // Show panel
    extraPanel.style.display = null;
}

export function disableExtraPanel() {
    // Reset the rotation for the open extra panel button
    toggleButton.style.transform = null;

    // Hide panel
    extraPanel.style.display = "none";
}