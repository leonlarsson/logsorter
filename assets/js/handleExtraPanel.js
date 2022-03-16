const toggleButton = document.getElementById("openExtraPanelButton");
const extraPanel = document.getElementById("extraOptions");

export function toggleExtraPanel() {
    extraPanel.style.display === "none" ? enableExtraPanel() : disableExtraPanel();
}

export function enableExtraPanel() {
    extraPanelActive = true;
    // Rotate extra panel button
    toggleButton.style.transform = "rotate(90deg)";

    // Show panel
    extraPanel.style.display = null;
}

export function disableExtraPanel() {
    extraPanelActive = false;
    // Reset the rotation for the open extra panel button
    toggleButton.style.transform = null;

    // Hide panel
    extraPanel.style.display = "none";
}