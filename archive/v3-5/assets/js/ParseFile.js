$("#files").on("change", function (evt) {
  var file = evt.target.files[0]; // Gets the selected file
  let customEntry = $("#customEntry").val(); // Get first ID numbers to match

  if ($("#regexList").val() == 1) { // Zeppelin/Aperture/Auttaja - Join/Leave
    var regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+(?:left|joined)`, `g`);
    console.log("[DEBUG] RegEx 1 was selected.");
  }

  if ($("#regexList").val() == 2) { // Zeppelin/Aperture/Auttaja - Join
    var regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+joined`, `g`);
    console.log("[DEBUG] RegEx 2 was selected.");
  }

  if ($("#regexList").val() == 3) { // Zeppelin/Aperture/Auttaja - Leave
    var regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+left`, `g`)
    console.log("[DEBUG] RegEx 3 was selected.");
  }

  if ($("#regexList").val() == 4) { // Utilibot - Join/Leave
    var regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+(?:left|joined)`, `g`);
    console.log("[DEBUG] RegEx 4 was selected.");
  }

  if ($("#regexList").val() == 5) { // Utilibot - Join
    var regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+joined`, `g`);
    console.log("[DEBUG] RegEx 5 was selected.");
  }

  if ($("#regexList").val() == 6) { // Utilibot - Leave
    var regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+left`, `g`)
    console.log("[DEBUG] RegEx 6 was selected.");
  }

  if ($("#regexList").val() == 98) { // Mee6/GiselleBot/Dyno/Carl-bot
    var regex = new RegExp(`.*ID:\\s(${customEntry}\\d+)`, `g`)
    console.log("[DEBUG] RegEx 98 was selected.");
  }

  if ($("#regexList").val() == 99) { // Custom - Group 1
    if (customEntry == "") {
      alert("Please provide a RegEx when using Custom RegEx. Capturing group 1 will be matched.");
      return;
    } else {
      var regex = new RegExp(customEntry, `g`);
      console.log("[DEBUG] Custom RegEx (99) was selected.");
    }
  }

  console.log(`[DEBUG] Received file "${file.name}" (${file.size} bytes), which is ${(file.size / 2000000 * 100).toFixed(1)}% of the size limit.`);
  $("#filename").text(file.name);

  if (file.type.match("text.*") && file.size < 2000000) { // If uploaded file is text and smaller than 2MB (roughly), proceed. If not, return and alert user

    if (customEntry == "") { // Warn about no IDs were selected
      alert("You did not select any ID to filter.\n\nBe aware that this includes every found ID.");
    }

    var today = new Date(); // Gets date for Verbose logs
    var dateTime = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    if ($("#checkBoxUseNewlines").is(':checked')) { // If checked, use newlines instead of spaces as the ID separator
      idSeparator = "\n"
      idSeparatorText = "newlines"
    } else {
      idSeparator = " "
      idSeparatorText = "spaces"
    }

    $("#outputStatusText").text(" (Working...)"); // Sets the status label to indicate that work has started
    var operationStart = new Date();
    var reader = new FileReader();
    reader.onload = function (evt) {

      str = evt.target.result; // str = contents of uploaded file
      match = regex.exec(str);
      matchesFound = 0;
      console.log(`[DEBUG] Attempting to use pattern: ${regex}`);

      if ($("#checkBoxUseVerboseLogs").is(":checked")) { // If checked, use more verbose logs

        if ($("#textBoxOutput").text() == "") { // Verbose logging. If textarea is empty, add no newlines at the top
          $("#textBoxOutput").append(`Generated on ${dateTime}. Using pattern ${regex} on "${file.name}" separated with ${idSeparatorText}:\n`);
        } else { // If it isn't empty, add newlines
          $("#textBoxOutput").append(`\n\nGenerated on ${dateTime}. Using pattern ${regex} on "${file.name}" separated with ${idSeparatorText}:\n`);
        }
      }

      while (match != null && match[1] != null && match[1].length > 0) {
        matchesFound++; // Counts matches found
        // console.log(`[New match] ${matchesFound}. ${match[1]}`); // Console.log match. Disabled for performance.
        $("#textBoxOutput").append(match[1] + idSeparator); // Add match to textarea with the selected separator
        match = regex.exec(str);
      }

      editorRight.setValue($("#textBoxOutput").text());
      var operationFinish = new Date();
      console.log(`%c[DEBUG] Matched ${matchesFound} lines in ` + ((operationFinish - operationStart) / 1000).toFixed(2) + ` seconds.`, `color: #43b581`); // Once done, console.log the amount of found matches
      $("#outputStatusText").text(` (${matchesFound} found)`); // Sets the status label to mention how many matches were found
    };

    reader.readAsText(file);
  } else {
    alert(`Incorrect file type or file was too big.\n\nCheck the console for a hint :)`);
    return;
  }
});