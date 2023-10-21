import { addIDField } from "./handleMultipleIDFields.js";
import { scrollCheck } from "./scrollOperations.js";
import { enableDebug } from "./debugFunctions.js";
import { enableExtraPanel } from "./handleExtraPanel.js";
import { animateElement } from "./utils.js";
import { Colors } from "./constants.js";

const copyShareLinkButton = document.getElementById("copyShareLinkButton");
const regexList = document.getElementById("regexList");
const customEntry = document.getElementById("customEntry");
const checkboxMultiple = document.getElementById("checkboxMultiple");
const multipleIDs = document.getElementById("multipleIDs");
const customEntries = document.getElementsByClassName("multiplesCustomEntry");
const checkboxUseNewlines = document.getElementById("checkboxUseNewlines");
const checkboxNoDupes = document.getElementById("checkboxNoDupes");
const checkboxUseVerboseLogs = document.getElementById("checkboxUseVerboseLogs");
const checkboxScrollLogText = document.getElementById("checkboxScrollLogText");
const checkboxScrollBottom = document.getElementById("checkboxScrollBottom");


/** Builds the custom share link from the current settings. Then copies it to clipboard. */
export function createShareLink() {

    const customURL = new URL(window.location.origin);

    customURL.searchParams.append("bot", regexList.value);
    customURL.searchParams.append("start", customEntry.value);

    if (checkboxMultiple.checked) {
        customURL.searchParams.append("multiple", checkboxMultiple.checked);
        customURL.searchParams.append("mulCount", document.querySelectorAll(".multiplesCustomEntry").length);
        customURL.searchParams.append("mul1", customEntries[0]?.value);
        customURL.searchParams.append("mul2", customEntries[1]?.value);
        customURL.searchParams.append("mul3", customEntries[2]?.value);
        customURL.searchParams.append("mul4", customEntries[3]?.value);
        customURL.searchParams.append("mul5", customEntries[4]?.value);
    }

    customURL.searchParams.append("newlines", checkboxUseNewlines.checked);
    customURL.searchParams.append("dedupe", checkboxNoDupes.checked);
    customURL.searchParams.append("verbose", checkboxUseVerboseLogs.checked);
    customURL.searchParams.append("scrollVerbose", checkboxScrollLogText.checked);
    customURL.searchParams.append("scrollBottom", checkboxScrollBottom.checked);
    customURL.searchParams.append("debug", debugMode);
    customURL.searchParams.append("extra", extraPanelActive);

    // Delete any param that is empty, false, or undefined
    const keyToDelete = [];
    customURL.searchParams.forEach((value, key) => {
        if (!value || value === "false" || value === "undefined") keyToDelete.push(key);
    });
    keyToDelete.forEach(x => customURL.searchParams.delete(x));

    // Copy the URL created
    const clipboard = new ClipboardJS('#copyShareLinkButton', {
        text: () => customURL
    });

    clipboard.on('error', () => {
        clipboard.destroy();
        console.log("%c[DEBUG] Failed to copy settings link.", `color: ${Colors.RED}`);
    });

    clipboard.on("success", () => {
        clipboard.destroy();
        console.log(`%c[DEBUG] Copied settings link: ${customURL}`, `color: ${Colors.GREEN}`);
        animateElement(copyShareLinkButton, "color", Colors.GREEN, 1800);
    });
}

/** Reads the URL params, and sets any settings. */
export function readUrlParams() {

    // Run if URL has params
    if (window.location.search) {
        console.log("[DEBUG] URL params found. Applying.");

        // Get the params
        const params = new URLSearchParams(window.location.search);

        // Read params
        const botSelected = params.get("bot");
        const firstNumber = params.get("start");
        const mulCount = params.get("mulCount");
        const mul1 = params.get("mul1");
        const mul2 = params.get("mul2");
        const mul3 = params.get("mul3");
        const mul4 = params.get("mul4");
        const mul5 = params.get("mul5");
        const checkNewlines = params.get("newlines");
        const checkDeduplicate = params.get("dedupe");
        const checkVerbose = params.get("verbose");
        const checkScrollVerbose = params.get("scrollVerbose");
        const checkScrollBottom = params.get("scrollBottom");
        const debugEnabled = params.get("debug");
        const extraPanelEnabled = params.get("extra");

        // Activate the Multiple checkbox if the mulCount param exists (exists when Multiples checkbox is checked)
        if (mulCount) checkboxMultiple.checked = true;

        // Adds ID fields based on the setting. Starting from 2
        if (mulCount === "3") {
            addIDField();
        }
        if (mulCount === "4") {
            addIDField();
            addIDField();
        }
        if (mulCount === "5") {
            addIDField();
            addIDField();
            addIDField();
        }

        // Apply changes
        regexList.value = botSelected;
        window.select2.dataAdapter.triggerChange();
        customEntry.value = firstNumber;
        if (customEntries[0]) customEntries[0].value = mul1;
        if (customEntries[1]) customEntries[1].value = mul2;
        if (customEntries[2]) customEntries[2].value = mul3;
        if (customEntries[3]) customEntries[3].value = mul4;
        if (customEntries[4]) customEntries[4].value = mul5;
        checkboxUseNewlines.checked = checkNewlines === "true";
        checkboxNoDupes.checked = checkDeduplicate === "true";
        checkboxUseVerboseLogs.checked = checkVerbose === "true";
        checkboxScrollLogText.checked = checkScrollVerbose === "true";
        checkboxScrollBottom.checked = checkScrollBottom === "true";

        // If "debug=1/true", activate debug mode
        if (debugEnabled === "1" || debugEnabled === "true") enableDebug();

        // If "extra=1/true", activate debug mode
        if (extraPanelEnabled === "1" || extraPanelEnabled === "true") enableExtraPanel();

        // Runs the check to show the Verbose scroll
        scrollCheck();

        // Strips URL of the params
        history.pushState({}, null, "./");
    }
}