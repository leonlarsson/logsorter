const botList = document.getElementById("regexList");
const checkBoxMultiple = document.getElementById("checkBoxMultiple");

/**
 * Determines which Regex is to use.
 * @typedef {Object} ReturnObject
 * @property {RegExp} regex The regex selected. Null if checks failed.
 * @property {string} regexId The number of the regex selected.
 * @returns {ReturnObject} { regex, regexNum }
 */
export default () => {

  let customEntry;
  let regex = null;
  const regexId = botList.value;

  // Return if no bot was selected
  if (!botList.value) {
    alert("Please select a bot first.");
    return { regex, regexId };
  }

  // If multiples checkbox is checked, build the customEntry from the multiples
  if (checkBoxMultiple.checked) {

    // Get the values. Empty string if not filled in. Undefined if the element does not exist
    const customEntry1 = document.getElementById("customEntry1")?.value;
    const customEntry2 = document.getElementById("customEntry2")?.value;
    const customEntry3 = document.getElementById("customEntry3")?.value;
    const customEntry4 = document.getElementById("customEntry4")?.value;
    const customEntry5 = document.getElementById("customEntry5")?.value;

    // Get the amount of active custom entries
    const amountOfCustomEntries = document.querySelectorAll(".multiplesCustomEntry").length;

    // If there are empty ID fields, retun (as null)
    if (customEntry1 === "" || customEntry2 === "" || customEntry3 === "" || customEntry4 === "" || customEntry5 === "") {
      alert("Please fill in all the fields or decrease the number of fields.");
      return { regex, regexId };
    }

    if (amountOfCustomEntries === 2) {
      customEntry = `(?:${customEntry1}|${customEntry2})`;
    }
    if (amountOfCustomEntries === 3) {
      customEntry = `(?:${customEntry1}|${customEntry2}|${customEntry3})`;
    }
    if (amountOfCustomEntries === 4) {
      customEntry = `(?:${customEntry1}|${customEntry2}|${customEntry3}|${customEntry4})`;
    }
    if (amountOfCustomEntries === 5) {
      customEntry = `(?:${customEntry1}|${customEntry2}|${customEntry3}|${customEntry4}|${customEntry5})`;
    }

  } else {
    // Get first ID numbers to match
    customEntry = document.getElementById("customEntry").value;
  }

  /* ASSIGN REGEX PATTERNS */

  // Zeppelin/Aperture/GearBot/Auttaja - Join/Leave
  if (botList.value === "1") {
    regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+(?:left|joined)`, "g");
  }

  // Zeppelin/Aperture/GearBot/Auttaja - Join
  if (botList.value === "2") {
    regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+joined`, "g");
  }

  // Zeppelin/Aperture/GearBot/Auttaja - Leave
  if (botList.value === "3") {
    regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+left`, "g")
  }

  // Utilibot - Join/Leave
  if (botList.value === "4") {
    regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+(?:left|joined)`, "g");
  }

  // Utilibot - Join
  if (botList.value === "5") {
    regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+joined`, "g");
  }

  // Utilibot - Leave
  if (botList.value === "6") {
    regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+left`, "g");
  }

  // Vortex - Join/Leave
  if (botList.value === "7") {
    regex = new RegExp(`(?::inbox|:outbox).+#\\d+\\s\\(ID:(${customEntry}\\d+)`, "g");
  }

  // Vortex - Join
  if (botList.value === "8") {
    regex = new RegExp(`:inbox.+#\\d+\\s\\(ID:(${customEntry}\\d+)`, "g");
  }

  // Vortex - Leave
  if (botList.value === "9") {
    regex = new RegExp(`:outbox.+#\\d+\\s\\(ID:(${customEntry}\\d+)`, "g");
  }

  // Vortex - Kicks
  if (botList.value === "10") {
    regex = new RegExp(`#\\d+\\skicked.+#\\d+\\s\\(ID:(${customEntry}\\d+)`, "g");
  }

  // Nexus - Join/Leave
  if (botList.value === "95") {
    regex = new RegExp(`#+\\d+\\s\\[(${customEntry}\\d+)]\\s(?:joined|left)`, "g");
  }

  // Nexus - Join
  if (botList.value === "96") {
    regex = new RegExp(`#+\\d+\\s\\[(${customEntry}\\d+)]\\sjoined`, "g");
  }

  // Nexus - Leave
  if (botList.value === "97") {
    regex = new RegExp(`#+\\d+\\s\\[(${customEntry}\\d+)]\\sleft`, "g");
  }

  // Mee6/GiselleBot/Dyno/Carl-bot
  if (botList.value === "98") {
    regex = new RegExp(`.*ID:\\s(${customEntry}\\d+)`, "g");
  }

  // Custom - Group 1
  if (botList.value === "99") {
    if (!customEntry) {
      alert("Please provide a RegEx when using Custom RegEx. Capturing group 1 will be matched.\n\nExamples:\n(\\d+)\nID: (\\d+)\n#\\d{4} \\((\\d{17,19})\\)");
    } else {
      regex = new RegExp(customEntry, "g");
    }
  }

  // TODO: Monitor the length of Discord IDs. Currently the majority are 17-18.
  // Update - Oct 20, 2021: Updated regexs below to support up to 19.

  // All IDs - First occurrence
  if (botList.value === "100") {
    regex = new RegExp(`^.*?\\b(${customEntry}\\d{${17 - customEntry.length},${19 - customEntry.length}})\\b`, "gm");
  }

  // All IDs
  if (botList.value === "101") {
    regex = new RegExp(`\\b(${customEntry}\\d{${17 - customEntry.length},${19 - customEntry.length}})\\b`, "g");
  }

  return { regex, regexId };
}