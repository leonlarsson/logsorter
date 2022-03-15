/**
 * Determines which Regex is to use.
 * @typedef {Object} ReturnObject
 * @property {RegExp} regex The regex selected. Null if checks failed.
 * @property {string} regexId The number of the regex selected.
 * @returns {ReturnObject} { regex, regexNum }
 */
export default () => {
  const customEntry1 = $("#customEntry1").val();
  const customEntry2 = $("#customEntry2").val();
  const customEntry3 = $("#customEntry3").val();
  const customEntry4 = $("#customEntry4").val();
  const customEntry5 = $("#customEntry5").val();
  let customEntry;
  let regex = null;
  const regexId = $("#regexList").val();

  if ($("#checkBoxMultiple").is(":checked")) {

    // If there are empty ID fields, retun (as null)
    if (customEntry1 === "" || customEntry2 === "" || customEntry3 === "" || customEntry4 === "" || customEntry5 === "") {
      alert("Please fill in all the fields or decrease the number of fields.");
      return { regex, regexId };
    }

    if ($("#multipleIDs").children("input").length === 2) {
      customEntry = `(?:${customEntry1}|${customEntry2})`;
    }
    if ($("#multipleIDs").children("input").length === 3) {
      customEntry = `(?:${customEntry1}|${customEntry2}|${customEntry3})`;
    }
    if ($("#multipleIDs").children("input").length === 4) {
      customEntry = `(?:${customEntry1}|${customEntry2}|${customEntry3}|${customEntry4})`;
    }
    if ($("#multipleIDs").children("input").length === 5) {
      customEntry = `(?:${customEntry1}|${customEntry2}|${customEntry3}|${customEntry4}|${customEntry5})`;
    }

  } else {
    // Get first ID numbers to match
    customEntry = $("#customEntry").val();
  }


  // Zeppelin/Aperture/Auttaja - Join/Leave
  if ($("#regexList").val() === "1") {
    regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+(?:left|joined)`, "g");
  }

  // Zeppelin/Aperture/Auttaja - Join
  if ($("#regexList").val() === "2") {
    regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+joined`, "g");
  }

  // Zeppelin/Aperture/Auttaja - Leave
  if ($("#regexList").val() === "3") {
    regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+left`, "g")
  }

  // Utilibot - Join/Leave
  if ($("#regexList").val() === "4") {
    regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+(?:left|joined)`, "g");
  }

  // Utilibot - Join
  if ($("#regexList").val() === "5") {
    regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+joined`, "g");
  }

  // Utilibot - Leave
  if ($("#regexList").val() === "6") {
    regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+left`, "g");
  }

  // Vortex - Join/Leave
  if ($("#regexList").val() === "7") {
    regex = new RegExp(`(?::inbox|:outbox).+#\\d+\\s\\(ID:(${customEntry}\\d+)`, "g");
  }

  // Vortex - Join
  if ($("#regexList").val() === "8") {
    regex = new RegExp(`:inbox.+#\\d+\\s\\(ID:(${customEntry}\\d+)`, "g");
  }

  // Vortex - Leave
  if ($("#regexList").val() === "9") {
    regex = new RegExp(`:outbox.+#\\d+\\s\\(ID:(${customEntry}\\d+)`, "g");
  }

  // Vortex - Kicks
  if ($("#regexList").val() === "10") {
    regex = new RegExp(`#\\d+\\skicked.+#\\d+\\s\\(ID:(${customEntry}\\d+)`, "g");
  }

  // Nexus - Join/Leave
  if ($("#regexList").val() === "95") {
    regex = new RegExp(`#+\\d+\\s\\[(${customEntry}\\d+)]\\s(?:joined|left)`, "g");
  }

  // Nexus - Join
  if ($("#regexList").val() === "96") {
    regex = new RegExp(`#+\\d+\\s\\[(${customEntry}\\d+)]\\sjoined`, "g");
  }

  // Nexus - Leave
  if ($("#regexList").val() === "97") {
    regex = new RegExp(`#+\\d+\\s\\[(${customEntry}\\d+)]\\sleft`, "g");
  }

  // Mee6/GiselleBot/Dyno/Carl-bot
  if ($("#regexList").val() === "98") {
    regex = new RegExp(`.*ID:\\s(${customEntry}\\d+)`, "g");
  }

  // Custom - Group 1
  if ($("#regexList").val() === "99") {
    if (customEntry == "") {
      alert("Please provide a RegEx when using Custom RegEx. Capturing group 1 will be matched.\n\nExamples:\n(\\d+)\nID: (\\d+)\n#\\d{4} \\((\\d{17,19})\\)");
    } else {
      regex = new RegExp(customEntry, "g");
    }
  }

  // TODO: Monitor the length of Discord IDs. Currently the majority are 17-18.
  // Update - Oct 20, 2021: Updated regexs below to support up to 19.

  // All IDs - First occurrence
  if ($("#regexList").val() === "100") {
    regex = new RegExp(`^.*?\\b(${customEntry}\\d{${17 - customEntry.length},${19 - customEntry.length}})\\b`, "gm");
  }

  // All IDs
  if ($("#regexList").val() === "101") {
    regex = new RegExp(`\\b(${customEntry}\\d{${17 - customEntry.length},${19 - customEntry.length}})\\b`, "g");
  }

  return { regex, regexId };
}