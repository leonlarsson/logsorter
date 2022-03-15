import getRegex from "./getRegex.js";
import { editorLeft, editorRight } from "./createCodemirror.js";
import { scrollText } from "./scrollOperations.js";
import { Colors } from "./constants.js";

/** Matches the left editor and parses to the right editor according to the regex selected. */
export default () => {

  const regex = getRegex();

  if (editorLeft.getValue() == "") { // Returns if there is no text to match
    alert("Please input some text into the 'Input' textbox below or upload a file.");
    return;
  }

  const today = new Date().toISOString().substring(0, 19); // Gets date for Verbose logs
  const dateTime = today.replace("T", " ");

  let idSeparator;
  let idSeparatorText;
  if ($("#checkBoxUseNewlines").is(':checked')) { // If checked, use newlines instead of spaces as the ID separator.
    idSeparator = "\n";
    idSeparatorText = "newlines";
  } else {
    idSeparator = " ";
    idSeparatorText = "spaces";
  }

  $("#outputStatusText").text(" (Working...)"); // Sets the status label to indicate that work has started
  $("#outputStatusText").css({ color: "" }); // Reset color
  $("#outputStatusTextCol").text(" (Working...)"); // Sets the status label to indicate that work has started
  $("#outputStatusTextCol").css({ color: "" }); // Reset color
  $(".CodeMirror.cm-s-right").css({ borderColor: Colors.GREEN });  // Make the Output border green

  setTimeout(() => { // Setting a timeout of 0 milliseconds so that the above status text gets rendered

    const operationStart = new Date();
    const str = editorLeft.getValue();
    let match = regex.exec(str);
    uniqueIDs.clear();
    allIDs.length = 0;
    console.log(`[DEBUG] Attempting to use pattern: ${regex}`);

    // MATCH FUNCTION
    while (match != null && match[1] != null && match[1].length > 0) {
      // console.log(`[New match] ${matchesFound}. ${match[1]}`); // Console.log match. Disabled for performance.

      uniqueIDs.add(match[1]);
      uniqueIDs_Const.add(match[1]); // So I can use this for removing duplicates without it being cleared
      allIDs.push(match[1]);
      match = regex.exec(str);
    }

    // NO MATCHES
    if (!allIDs.length && !uniqueIDs.size) { // If no matches, return

      if ($("#checkBoxUseVerboseLogs").is(":checked")) { // If checked, use verbose logs. Currently hidden by default
        if (editorRight.getValue() == "") { // Verbose logging. If textarea is empty, add no newlines at the top
          editorRight.replaceRange(`Generated on ${dateTime} UTC. Found ${allIDs.length} matches using pattern ${regex} separated with ${idSeparatorText}:\n`, CodeMirror.Pos(editorRight.lastLine()));
        } else { // If it isn't empty, add newlines
          editorRight.replaceRange(`\n\nGenerated on ${dateTime} UTC. Found ${allIDs.length} matches using pattern ${regex} separated with ${idSeparatorText}:\n`, CodeMirror.Pos(editorRight.lastLine()));
        }
      }

      const lastLine = editorRight.lastLine();
      const operationFinish = new Date();
      console.log(`%c[DEBUG] Found ${allIDs.length} matches (${uniqueIDs.size} unique) in ` + ((operationFinish - operationStart) / 1000).toFixed(2) + ` seconds. ${currentIDs} current IDs.\n--------------------------------------`, `color: ${Colors.RED}`); // Once done, console.log the amount of found matches
      $("#outputStatusText").text(` (${allIDs.length} matches || ${uniqueIDs.size} unique || ${currentIDs} total)`); // Sets the status label to mention how many matches were found
      $("#outputStatusText").css({ color: Colors.RED }); // Set status to red
      $("#outputStatusTextCol").text(` (${allIDs.length} matches || ${uniqueIDs.size} unique || ${currentIDs} total)`); // Sets the status label to mention how many matches were found
      $("#outputStatusTextCol").css({ color: Colors.RED }); // Set status to red
      $(".CodeMirror.cm-s-right").css({ borderColor: bgColor }); // Reset the Output border

      // Perform the scroll
      scrollText(lastLine);
      return; // Return and do not continue
    }

    // MATCHES FOUND
    let lastLine;
    if ($("#checkBoxNoDupes").is(":checked")) { // Append depending on checkbox. If no dupes, append the set.

      currentIDs += uniqueIDs.size;

      if ($("#checkBoxUseVerboseLogs").is(":checked")) { // If checked, use verbose logs. Currently hidden by default
        if (editorRight.getValue() == "") { // Verbose logging. If textarea is empty, add no newlines at the top
          editorRight.replaceRange(`Generated on ${dateTime} UTC. Found ${uniqueIDs.size} unique matches using pattern ${regex} separated with ${idSeparatorText}:\n`, CodeMirror.Pos(editorRight.lastLine()));
        } else { // If it isn't empty, add newlines
          editorRight.replaceRange(`\n\nGenerated on ${dateTime} UTC. Found ${uniqueIDs.size} unique matches using pattern ${regex} separated with ${idSeparatorText}:\n`, CodeMirror.Pos(editorRight.lastLine()));
        }
        lastLine = editorRight.lastLine();
      }

      editorRight.replaceRange([...uniqueIDs].join(idSeparator) + idSeparator, CodeMirror.Pos(editorRight.lastLine()));
      $("#outputStatusText").text(` (${allIDs.length} matches || ${uniqueIDs.size} unique posted || ${currentIDs} total)`); // Sets the status label to mention how many matches were found
      $("#outputStatusTextCol").text(` (${allIDs.length} matches || ${uniqueIDs.size} unique posted || ${currentIDs} total)`); // Sets the status label to mention how many matches were found
    } else {

      currentIDs += allIDs.length;

      if ($("#checkBoxUseVerboseLogs").is(":checked")) { // If checked, use verbose logs. Currently hidden by default
        if (editorRight.getValue() == "") { // Verbose logging. If textarea is empty, add no newlines at the top
          editorRight.replaceRange(`Generated on ${dateTime} UTC. Found ${allIDs.length} matches using pattern ${regex} separated with ${idSeparatorText}:\n`, CodeMirror.Pos(editorRight.lastLine()));
        } else { // If it isn't empty, add newlines
          editorRight.replaceRange(`\n\nGenerated on ${dateTime} UTC. Found ${allIDs.length} matches using pattern ${regex} separated with ${idSeparatorText}:\n`, CodeMirror.Pos(editorRight.lastLine()));
        }
        lastLine = editorRight.lastLine();
      }

      editorRight.replaceRange(allIDs.join(idSeparator) + idSeparator, CodeMirror.Pos(editorRight.lastLine()));
      $("#outputStatusText").text(` (${allIDs.length} matches posted || ${uniqueIDs.size} unique || ${currentIDs} total)`); // Sets the status label to mention how many matches were found
      $("#outputStatusTextCol").text(` (${allIDs.length} matches posted || ${uniqueIDs.size} unique || ${currentIDs} total)`); // Sets the status label to mention how many matches were found
    }

    // REGARDLESS OF MATCHES FOUND
    const operationFinish = new Date();
    console.log(`%c[DEBUG] Found ${allIDs.length} matches (${uniqueIDs.size} unique) in ` + ((operationFinish - operationStart) / 1000).toFixed(2) + ` seconds. ${currentIDs} current IDs.\n--------------------------------------`, `color: ${Colors.GREEN}`); // Once done, console.log the amount of found matches
    $("#outputStatusText").css({ color: "" }); // Set status to default depending on light theme. Removes the style.
    $("#outputStatusTextCol").css({ color: "" }); // Set status to default depending on light theme. Removes the style.
    $(".CodeMirror.cm-s-right").css({ borderColor: bgColor }); // Reset the Output border

    // Perform the scroll
    scrollText(lastLine);
  }, 0)
};

// stop snooping at the spaghetti