function parseIDs() {

  if ($("#textBoxInput").val() == "") { // Returns if there is no text to match
    alert("Please input some text into the 'Input' textbox below or upload a file.");
    return;
  }

  var customEntry1 = $("#customEntry1").val();
  var customEntry2 = $("#customEntry2").val();
  var customEntry3 = $("#customEntry3").val();
  var customEntry4 = $("#customEntry4").val();
  var customEntry5 = $("#customEntry5").val();

  if ($("#checkBoxMultiple").is(":checked")) {
    if (customEntry1 == "" || customEntry2 == "" || customEntry3 == "" || customEntry4 == "" || customEntry5 == "") {
      alert("Please fill in all the fields or decrease the number of fields.")
      return;
    }
    if ($('#multipleIDs').children('input').length == 2) {
      var customEntry = `(?:${customEntry1}|${customEntry2})`;
    }
    if ($('#multipleIDs').children('input').length == 3) {
      var customEntry = `(?:${customEntry1}|${customEntry2}|${customEntry3})`;
    }
    if ($('#multipleIDs').children('input').length == 4) {
      var customEntry = `(?:${customEntry1}|${customEntry2}|${customEntry3}|${customEntry4})`;
    }
    if ($('#multipleIDs').children('input').length == 5) {
      var customEntry = `(?:${customEntry1}|${customEntry2}|${customEntry3}|${customEntry4}|${customEntry5})`;
    }

  } else {
    var customEntry = $("#customEntry").val(); // Get first ID numbers to match
  }


  if ($("#regexList").val() == 1) { // Zeppelin/Aperture/Auttaja - Join/Leave
    var regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+(?:left|joined)`, `g`);
    console.log("--------------------------------------\n[DEBUG] RegEx 1 was selected.");
  }

  if ($("#regexList").val() == 2) { // Zeppelin/Aperture/Auttaja - Join
    var regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+joined`, `g`);
    console.log("--------------------------------------\n[DEBUG] RegEx 2 was selected.");
  }

  if ($("#regexList").val() == 3) { // Zeppelin/Aperture/Auttaja - Leave
    var regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+left`, `g`)
    console.log("--------------------------------------\n[DEBUG] RegEx 3 was selected.");
  }

  if ($("#regexList").val() == 4) { // Utilibot - Join/Leave
    var regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+(?:left|joined)`, `g`);
    console.log("--------------------------------------\n[DEBUG] RegEx 4 was selected.");
  }

  if ($("#regexList").val() == 5) { // Utilibot - Join
    var regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+joined`, `g`);
    console.log("--------------------------------------\n[DEBUG] RegEx 5 was selected.");
  }

  if ($("#regexList").val() == 6) { // Utilibot - Leave
    var regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+left`, `g`)
    console.log("--------------------------------------\n[DEBUG] RegEx 6 was selected.");
  }

  if ($("#regexList").val() == 7) { // Vortex - Join/Leave
    var regex = new RegExp(`(?::inbox|:outbox).+#\\d+\\s\\(ID:(${customEntry}\\d+)`, `g`)
    console.log("--------------------------------------\n[DEBUG] RegEx 7 was selected.");
  }

  if ($("#regexList").val() == 8) { // Vortex - Join
    var regex = new RegExp(`:inbox.+#\\d+\\s\\(ID:(${customEntry}\\d+)`, `g`)
    console.log("--------------------------------------\n[DEBUG] RegEx 8 was selected.");
  }

  if ($("#regexList").val() == 9) { // Vortex - Leave
    var regex = new RegExp(`:outbox.+#\\d+\\s\\(ID:(${customEntry}\\d+)`, `g`)
    console.log("--------------------------------------\n[DEBUG] RegEx 9 was selected.");
  }

  if ($("#regexList").val() == 10) { // Vortex - Kicks
    var regex = new RegExp(`#\\d+\\skicked.+#\\d+\\s\\(ID:(${customEntry}\\d+)`, `g`)
    console.log("--------------------------------------\n[DEBUG] RegEx 10 was selected.");
  }

  if ($("#regexList").val() == 95) { // Nexus - Join/Leave
    var regex = new RegExp(`#+\\d+\\s\\[(${customEntry}\\d+)]\\s(?:joined|left)`, `g`)
    console.log("--------------------------------------\n[DEBUG] RegEx 95 was selected.");
  }

  if ($("#regexList").val() == 96) { // Nexus - Join
    var regex = new RegExp(`#+\\d+\\s\\[(${customEntry}\\d+)]\\sjoined`, `g`)
    console.log("--------------------------------------\n[DEBUG] RegEx 96 was selected.");
  }

  if ($("#regexList").val() == 97) { // Nexus - Leave
    var regex = new RegExp(`#+\\d+\\s\\[(${customEntry}\\d+)]\\sleft`, `g`)
    console.log("--------------------------------------\n[DEBUG] RegEx 97 was selected.");
  }

  if ($("#regexList").val() == 98) { // Mee6/GiselleBot/Dyno/Carl-bot
    var regex = new RegExp(`.*ID:\\s(${customEntry}\\d+)`, `g`)
    console.log("--------------------------------------\n[DEBUG] RegEx 98 was selected.");
  }

  if ($("#regexList").val() == 99) { // Custom - Group 1
    if (customEntry == "") {
      alert("Please provide a RegEx when using Custom RegEx. Capturing group 1 will be matched.");
      return;
    } else {
      var regex = new RegExp(customEntry, `g`);
      console.log("--------------------------------------\n[DEBUG] Custom RegEx (99) was selected.");
    }
  }

  if ($("#regexList").val() == 100) { // All IDs - First occurrence. 
    var regex = new RegExp(`^.*?\\b(${customEntry}\\d{${17 - customEntry.length},${18 - customEntry.length}})\\b`, `gm`);
    console.log("--------------------------------------\n[DEBUG] RegEx 100 was selected.");
  }

  if ($("#regexList").val() == 101) { // All IDs
    var regex = new RegExp(`\\b(${customEntry}\\d{${17 - customEntry.length},${18 - customEntry.length}})\\b`, `g`);
    console.log("--------------------------------------\n[DEBUG] RegEx 101 was selected.");
  }

  // if (customEntry == "") { // Warn about no IDs were selected -- Disabled in favor of placeholder text in customEntry box. Enable if unclear still
  //   alert("You did not select any ID to filter.\n\nBe aware that this includes every found ID.");
  // }

  var today = new Date().toISOString().substr(0, 19); // Gets date for Verbose logs
  dateTime = today.replace("T", " ")

  if ($("#checkBoxUseNewlines").is(':checked')) { // If checked, use newlines instead of spaces as the ID separator.
    idSeparator = "\n"
    idSeparatorText = "newlines"
  } else {
    idSeparator = " "
    idSeparatorText = "spaces"
  }

  $("#outputStatusText").text(" (Working...)"); // Sets the status label to indicate that work has started
  $(".CodeMirror").css({ borderColor: "#43b581" });  // Make the Output border green
  setTimeout(function () { // Setting a timeout of 0 milliseconds so that the above status text gets rendered

    var operationStart = new Date();
    str = $("#textBoxInput").val(); // str = contents of text box
    match = regex.exec(str);
    matchesFound = 0;
    uniqueIDs.clear();
    allIDs.length = 0;
    console.log(`[DEBUG] Attempting to use pattern: ${regex}`);

    if ($("#checkBoxUseVerboseLogs").is(":checked")) { // If checked, use verbose logs. Currently hidden by default

      if (editorRight.getValue() == "") { // Verbose logging. If textarea is empty, add no newlines at the top
        editorRight.replaceRange(`Generated on ${dateTime} UTC. Using pattern ${regex} on left text box separated with ${idSeparatorText}:\n`, CodeMirror.Pos(editorRight.lastLine()))
      } else { // If it isn't empty, add newlines
        editorRight.replaceRange(`\n\nGenerated on ${dateTime} UTC. Using pattern ${regex} on left text box separated with ${idSeparatorText}:\n`, CodeMirror.Pos(editorRight.lastLine()))
      }
    }

    while (match != null && match[1] != null && match[1].length > 0) {
      matchesFound++; // Counts matches found
      // console.log(`[New match] ${matchesFound}. ${match[1]}`); // Console.log match. Disabled for performance.

      uniqueIDs.add(match[1]);
      allIDs.push(match[1]);
      totalIDs.push(match[1]);
      match = regex.exec(str);
    }

    if (allIDs.length == 0 && uniqueIDs.size == 0) { // If no matches, return
      var operationFinish = new Date();
      $(".CodeMirror").css({ borderColor: "#36393f" }); // Reset the Output border
      console.log(`%c[DEBUG] Found ${matchesFound} matches (${uniqueIDs.size} unique) in ` + ((operationFinish - operationStart) / 1000).toFixed(2) + ` seconds.\n--------------------------------------`, `color: #f04747`); // Once done, console.log the amount of found matches
      $("#outputStatusText").text(` (${matchesFound} matches || ${uniqueIDs.size} unique)`); // Sets the status label to mention how many matches were found
      $("#outputStatusText").css({ color: "#f04747" });
      return;
    }

    if ($("#checkBoxNoDupes").is(":checked")) { // Append depending on checkbox. If no dupes, append the set.
      editorRight.replaceRange([...uniqueIDs].join(idSeparator) + idSeparator, CodeMirror.Pos(editorRight.lastLine()))
    } else {
      editorRight.replaceRange(allIDs.join(idSeparator) + idSeparator, CodeMirror.Pos(editorRight.lastLine()))
    }


    $(".CodeMirror").css({ borderColor: "#36393f" }); // Reset the Output border
    var operationFinish = new Date();
    console.log(`%c[DEBUG] Found ${matchesFound} matches (${uniqueIDs.size} unique) in ` + ((operationFinish - operationStart) / 1000).toFixed(2) + ` seconds.\n--------------------------------------`, `color: #43b581`); // Once done, console.log the amount of found matches
    $("#outputStatusText").text(` (${matchesFound} matches || ${totalIDs.length} total || ${uniqueIDs.size} unique)`); // Sets the status label to mention how many matches were found
    $("#outputStatusText").css({ color: "#43b581" });

  }, 0)
};

// stop snooping at the spaghetti