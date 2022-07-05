// Hides the custom regex prefix and suffix on start
$("#dynamicRegexPrefix").hide();
$("#dynamicRegexSuffix").hide();

/** Handles operations when user updates the select menu. Hides and shows elements, etc. */
export default () => {
    if ($("#regexList").val() == 99) {
        $("#dynamicRegexPrefixText").text("2. Custom RegEx:");
        $("#dynamicRegexPrefixText").show();
        $("#dynamicRegexPrefixText").prop({ title: "Enter the RegEx you want to use. / and /g are already included.\n\nThe contents of Capturing group 1 will be output." });
        $("#customEntry").prop({ type: "text" });
        $("#customEntry").prop({ placeholder: "" });
        $("#customEntry").attr("style", "height: 20px; border-radius: 3px");
        $("#dynamicRegexPrefix").show();
        $("#dynamicRegexSuffix").show();
        $("#customEntry").prop("disabled", false); // Enables the entry box because we do not use multiples for custom Regex
        $("#checkBoxMultiple").prop("checked", false); // Systemetically uncheck it for the main script
        $("#multipleIDs, #multipleIDButtons, #checkBoxMultiple, #checkBoxMultipleText").hide(); // Hide!

    } else if ($("#regexList").val() == 100 || $("#regexList").val() == 101) {
        $("#dynamicRegexPrefixText").text("2. IDs begin with:");
        $("#dynamicRegexPrefixText").prop({ title: "Select the beginning numbers of the IDs.\n\nExample: (991)82302885588992" });
        $("#customEntry").prop({ type: "number" });
        $("#customEntry").prop({ placeholder: "(0-9)" });
        $("#customEntry").attr("style", "width: 60px; height: 20px; border-radius: 3px;");
        $("#dynamicRegexPrefix").hide();
        $("#dynamicRegexSuffix").hide();
        $("#customEntry").prop("disabled", false); // Show entry box
        $("#checkBoxMultiple").prop("checked", false); // Systemetically uncheck it for the main script
        $("#multipleIDs, #multipleIDButtons, #checkBoxMultiple, #checkBoxMultipleText").hide(); // Hide!

    } else {
        $("#dynamicRegexPrefixText").text("2. IDs begin with:");
        $("#dynamicRegexPrefixText").prop({ title: "Select the beginning numbers of the IDs.\n\nExample: (991)82302885588992" });
        $("#customEntry").prop({ type: "number" });
        $("#customEntry").prop({ placeholder: "(0-9)" });
        $("#customEntry").attr("style", "width: 60px; height: 20px; border-radius: 3px;");
        $("#dynamicRegexPrefix").hide();
        $("#dynamicRegexSuffix").hide();
        $("#customEntry").prop("disabled", false); // Show entry box if not custom Regex
        $("#checkBoxMultiple, #checkBoxMultipleText").show(); // Show the checkbox

        // If not custom regex and multiples is checked, keep/disable the main entry box
        if ($('#checkBoxMultiple').is(':checked')) {
            $("#customEntry").prop("disabled", true);
            $("#multipleIDs, #multipleIDButtons").show();
            $("#dynamicRegexPrefixText").text("2. IDs begin with:");
        }
    }
}