import { addIDField } from "./handleMultipleIDFields.js";
import { scrollCheck } from "./scrollOperations.js";
import { enableDebug } from "./debugFunctions.js";
import { enableExtraPanel } from "./handleExtraPanel.js";
import { Colors } from "./constants.js";

const regexList = document.getElementById("regexList");
const customEntry = document.getElementById("customEntry");
const checkBoxMultiple = document.getElementById("checkBoxMultiple");
const multipleIDs = document.getElementById("multipleIDs");
const customEntries = document.getElementsByClassName("multiplesCustomEntry");
const checkBoxUseNewlines = document.getElementById("checkBoxUseNewlines");
const checkBoxNoDupes = document.getElementById("checkBoxNoDupes");
const checkBoxUseVerboseLogs = document.getElementById("checkBoxUseVerboseLogs");
const checkBoxScrollVerbose = document.getElementById("checkBoxScrollVerbose");
const checkBoxScrollBottom = document.getElementById("checkBoxScrollBottom");


/** Builds the custom share link from the current settings. Then copies it to clipboard. */
export function createShareLink() {

    const customURL = new URL(window.location.origin);

    customURL.searchParams.append("bot", regexList.value);
    customURL.searchParams.append("start", customEntry.value);

    if (checkBoxMultiple.checked) {
        customURL.searchParams.append("multiple", checkBoxMultiple.checked);
        customURL.searchParams.append("mulCount", document.querySelectorAll(".multiplesCustomEntry").length);
        customURL.searchParams.append("mul1", customEntries[0]?.value);
        customURL.searchParams.append("mul2", customEntries[1]?.value);
        customURL.searchParams.append("mul3", customEntries[2]?.value);
        customURL.searchParams.append("mul4", customEntries[3]?.value);
        customURL.searchParams.append("mul5", customEntries[4]?.value);
    }

    customURL.searchParams.append("newlines", checkBoxUseNewlines.checked);
    customURL.searchParams.append("dedupe", checkBoxNoDupes.checked);
    customURL.searchParams.append("verbose", checkBoxUseVerboseLogs.checked);
    customURL.searchParams.append("scrollVerbose", checkBoxScrollVerbose.checked);
    customURL.searchParams.append("scrollBottom", checkBoxScrollBottom.checked);
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

        // TODO: Update jQuery.animate to native JS
        // Color change, make green, then return to the non-hover color (by checking light mode status)
        $("#copyShareLinkButton").animate({ color: Colors.GREEN }, "swing");
        setTimeout(async () => {
            await $("#copyShareLinkButton").animate({ color: isLightMode ? "#4f5660" : "#b9bbbe" }, "swing").promise();
            // Remove the style to allow for the hover color again
            $("#copyShareLinkButton").removeAttr("style");
        }, 1000);
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
        if (mulCount) checkBoxMultiple.checked = true;

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
        // TODO: Still uses jQuery due to select2. Try removing this with the TS variant once that one has less issues. Then use window.select2.dataAdapter.triggerChange()
        $("#regexList").val(botSelected).change(); // This runs changeRegex() indirectly
        customEntry.value = firstNumber;
        if (customEntries[0]) customEntries[0].value = mul1;
        if (customEntries[1]) customEntries[1].value = mul2;
        if (customEntries[2]) customEntries[2].value = mul3;
        if (customEntries[3]) customEntries[3].value = mul4;
        if (customEntries[4]) customEntries[4].value = mul5;
        checkBoxUseNewlines.checked = checkNewlines === "true";
        checkBoxNoDupes.checked = checkDeduplicate === "true";
        checkBoxUseVerboseLogs.checked = checkVerbose === "true";
        checkBoxScrollVerbose.checked = checkScrollVerbose === "true";
        checkBoxScrollBottom.checked = checkScrollBottom === "true";

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