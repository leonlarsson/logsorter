import { addIDField } from "./handleMultipleIDFields.js";
import { scrollCheck } from "./scrollOperations.js";
import { enableDebug } from "./debugFunctions.js";
import { enableExtraPanel } from "./handleExtraPanel.js";
import { Colors } from "./constants.js";

/** Builds the custom share link from the current settings. Then copies it to clipboard. */
export function createShareLink() {

    const customURL = new URL(window.location.origin);

    customURL.searchParams.append("bot", $("#regexList").val());
    customURL.searchParams.append("start", $("#customEntry").val());

    if ($("#checkBoxMultiple").is(":checked")) {
        customURL.searchParams.append("multiple", $("#checkBoxMultiple").is(":checked"));
        customURL.searchParams.append("mulCount", $("#multipleIDs").children("input").length);
        customURL.searchParams.append("mul1", $("#customEntry1").val());
        customURL.searchParams.append("mul2", $("#customEntry2").val());
        customURL.searchParams.append("mul3", $("#customEntry3").val());
        customURL.searchParams.append("mul4", $("#customEntry4").val());
        customURL.searchParams.append("mul5", $("#customEntry5").val());
    }

    customURL.searchParams.append("newlines", $("#checkBoxUseNewlines").is(":checked"));
    customURL.searchParams.append("dedupe", $("#checkBoxNoDupes").is(":checked"));
    customURL.searchParams.append("verbose", $("#checkBoxUseVerboseLogs").is(":checked"));
    customURL.searchParams.append("scrollVerbose", $("#checkBoxScrollVerbose").is(":checked"));
    customURL.searchParams.append("scrollBottom", $("#checkBoxScrollBottom").is(":checked"));
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
        text: () => {
            return customURL;
        }
    });

    clipboard.on('error', () => {
        clipboard.destroy();
        console.log("%c[DEBUG] Failed to copy settings link.", `color: ${Colors.RED}`);
    });

    clipboard.on("success", () => {
        clipboard.destroy();
        console.log(`%c[DEBUG] Copied settings link: ${customURL}`, `color: ${Colors.GREEN}`);

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
        if (mulCount) $("#checkBoxMultiple").prop("checked", true);

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
        $("#regexList").val(botSelected).change(); // This runs changeRegex() indirectly
        $("#customEntry").val(firstNumber);
        $("#customEntry1").val(mul1);
        $("#customEntry2").val(mul2);
        $("#customEntry3").val(mul3);
        $("#customEntry4").val(mul4);
        $("#customEntry5").val(mul5);
        $("#checkBoxUseNewlines").prop("checked", checkNewlines === "true");
        $("#checkBoxNoDupes").prop("checked", checkDeduplicate === "true");
        $("#checkBoxUseVerboseLogs").prop("checked", checkVerbose === "true");
        $("#checkBoxScrollVerbose").prop("checked", checkScrollVerbose === "true");
        $("#checkBoxScrollBottom").prop("checked", checkScrollBottom === "true");

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