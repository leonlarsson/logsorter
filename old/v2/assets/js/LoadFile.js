$("#files").on("change", function (evt) {
  let number = $("#numberValue").val(); // Get first ID numbers to match

  if ($("#regexList").val() == 1) { // Zeppelin - Join/Leave
    var regex = new RegExp(`\\[.+\\].+\\@.+\\(.+\\#\\d+,\\s+(${number}\\d+)`, `g`);
    console.log("[DEBUG] RegEx 1 was selected.");
  }

  if ($("#regexList").val() == 2) { // Zeppelin - Join
    var regex = new RegExp(`\\[.+\\].+inbox.+\\@.+\\(.+\\#\\d+,\\s+(${number}\\d+)`, `g`);
    console.log("[DEBUG] RegEx 2 was selected.");
  }

  if ($("#regexList").val() == 3) { // Zeppelin - Leave
    var regex = new RegExp(`\\[.+\\].+outbox.+\\@.+\\(.+\\#\\d+,\\s+(${number}\\d+)`, `g`);
    console.log("[DEBUG] RegEx 3 was selected.");
  }

  var file = evt.target.files[0];
  console.log(`[DEBUG] Received file "${file.name}" (${file.size} bytes), which is ${(file.size / 2000000 * 100).toFixed(1)}% of the size limit.`);
  $("#filename").text(file.name);

  var today = new Date(); // Gets date for Verbose logs
  var dateTime = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  // if ($(checkBoxCustomRegex).is(':checked')) { // Maybe figure out how to make this work without falling into an endless match loop
  //   console.log("It is checked indeed");
  // }

  if ($("#checkBoxUseNewlines").is(':checked')) { // If checked, use newlines instead of spaces as the ID separator
    idSeparator = "\n"
    idSeparatorText = "newlines"
  } else {
    idSeparator = " "
    idSeparatorText = "spaces"
  }

  if (file.type.match("text.*") && file.size < 2000000) { // If uploaded file is text and smaller than 2MB (roughly), proceed. If not, return and alert user
    var reader = new FileReader();
    reader.onload = function (evt) {

      str = evt.target.result; // str = contents of uploaded file
      match = regex.exec(str);
      matchesFound = 0;
      console.log(`[DEBUG] Attempting to use pattern: ${regex}`);

      if ($("#checkBoxUseVerboseLogs").is(":checked")) { // If checked, use more verbose logs

        if ($("#textBox").text() == "") { // If textarea is empty, add no newlines at the top
          $("#textBox").append(`Generated on ${dateTime}. Using pattern ${regex} on "${file.name}" separated with ${idSeparatorText}:\n`);
        } else { // If it isn't empty, add newlines
          $("#textBox").append(`\n\nGenerated on ${dateTime}. Using pattern ${regex} on "${file.name}" separated with ${idSeparatorText}:\n`);
        }
      }

      while (match != null) {
        matchesFound++; // Counts matches found
        // console.log(`[DEBUG] ${matchesFound}. ${match[1]}`); // Console.log match - disabled for performance
        $("#textBox").append(match[1] + idSeparator); // Add match to textarea with the selected separator
        match = regex.exec(str);
      }
      console.log(`[DEBUG] Matched ${matchesFound} lines.`); // Once done, console.log the amount of found matches
    };

    reader.readAsText(file);
  } else {
    alert(`Incorrect file type or file was too big.\n\nCheck the console for a hint :)`);
    return;
  }
});

// TODO: Make custom RegEx work.
