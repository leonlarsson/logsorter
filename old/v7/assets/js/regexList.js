function getRegex() {
    customEntry1 = $("#customEntry1").val();
    customEntry2 = $("#customEntry2").val();
    customEntry3 = $("#customEntry3").val();
    customEntry4 = $("#customEntry4").val();
    customEntry5 = $("#customEntry5").val();
  
    if ($("#checkBoxMultiple").is(":checked")) {
      if (customEntry1 == "" || customEntry2 == "" || customEntry3 == "" || customEntry4 == "" || customEntry5 == "") {
        alert("Please fill in all the fields or decrease the number of fields.")
        return;
      }
      if ($('#multipleIDs').children('input').length == 2) {
        customEntry = `(?:${customEntry1}|${customEntry2})`;
      }
      if ($('#multipleIDs').children('input').length == 3) {
        customEntry = `(?:${customEntry1}|${customEntry2}|${customEntry3})`;
      }
      if ($('#multipleIDs').children('input').length == 4) {
        customEntry = `(?:${customEntry1}|${customEntry2}|${customEntry3}|${customEntry4})`;
      }
      if ($('#multipleIDs').children('input').length == 5) {
        customEntry = `(?:${customEntry1}|${customEntry2}|${customEntry3}|${customEntry4}|${customEntry5})`;
      }
  
    } else {
      customEntry = $("#customEntry").val(); // Get first ID numbers to match
    }
  
  
    if ($("#regexList").val() == 1) { // Zeppelin/Aperture/Auttaja - Join/Leave
      regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+(?:left|joined)`, `g`);
      console.log("--------------------------------------\n[DEBUG] RegEx 1 was selected.");
    }
  
    if ($("#regexList").val() == 2) { // Zeppelin/Aperture/Auttaja - Join
      regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+joined`, `g`);
      console.log("--------------------------------------\n[DEBUG] RegEx 2 was selected.");
    }
  
    if ($("#regexList").val() == 3) { // Zeppelin/Aperture/Auttaja - Leave
      regex = new RegExp(`#.+[^\\d](${customEntry}\\d+)\\).+left`, `g`)
      console.log("--------------------------------------\n[DEBUG] RegEx 3 was selected.");
    }
  
    if ($("#regexList").val() == 4) { // Utilibot - Join/Leave
      regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+(?:left|joined)`, `g`);
      console.log("--------------------------------------\n[DEBUG] RegEx 4 was selected.");
    }
  
    if ($("#regexList").val() == 5) { // Utilibot - Join
      regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+joined`, `g`);
      console.log("--------------------------------------\n[DEBUG] RegEx 5 was selected.");
    }
  
    if ($("#regexList").val() == 6) { // Utilibot - Leave
      regex = new RegExp(`ID:\\s(${customEntry}\\d+)[^#]+#[^#]+left`, `g`)
      console.log("--------------------------------------\n[DEBUG] RegEx 6 was selected.");
    }
  
    if ($("#regexList").val() == 7) { // Vortex - Join/Leave
      regex = new RegExp(`(?::inbox|:outbox).+#\\d+\\s\\(ID:(${customEntry}\\d+)`, `g`)
      console.log("--------------------------------------\n[DEBUG] RegEx 7 was selected.");
    }
  
    if ($("#regexList").val() == 8) { // Vortex - Join
      regex = new RegExp(`:inbox.+#\\d+\\s\\(ID:(${customEntry}\\d+)`, `g`)
      console.log("--------------------------------------\n[DEBUG] RegEx 8 was selected.");
    }
  
    if ($("#regexList").val() == 9) { // Vortex - Leave
      regex = new RegExp(`:outbox.+#\\d+\\s\\(ID:(${customEntry}\\d+)`, `g`)
      console.log("--------------------------------------\n[DEBUG] RegEx 9 was selected.");
    }
  
    if ($("#regexList").val() == 10) { // Vortex - Kicks
      regex = new RegExp(`#\\d+\\skicked.+#\\d+\\s\\(ID:(${customEntry}\\d+)`, `g`)
      console.log("--------------------------------------\n[DEBUG] RegEx 10 was selected.");
    }
  
    if ($("#regexList").val() == 95) { // Nexus - Join/Leave
      regex = new RegExp(`#+\\d+\\s\\[(${customEntry}\\d+)]\\s(?:joined|left)`, `g`)
      console.log("--------------------------------------\n[DEBUG] RegEx 95 was selected.");
    }
  
    if ($("#regexList").val() == 96) { // Nexus - Join
      regex = new RegExp(`#+\\d+\\s\\[(${customEntry}\\d+)]\\sjoined`, `g`)
      console.log("--------------------------------------\n[DEBUG] RegEx 96 was selected.");
    }
  
    if ($("#regexList").val() == 97) { // Nexus - Leave
      regex = new RegExp(`#+\\d+\\s\\[(${customEntry}\\d+)]\\sleft`, `g`)
      console.log("--------------------------------------\n[DEBUG] RegEx 97 was selected.");
    }
  
    if ($("#regexList").val() == 98) { // Mee6/GiselleBot/Dyno/Carl-bot
      regex = new RegExp(`.*ID:\\s(${customEntry}\\d+)`, `g`)
      console.log("--------------------------------------\n[DEBUG] RegEx 98 was selected.");
    }
  
    if ($("#regexList").val() == 99) { // Custom - Group 1
      if (customEntry == "") {
        alert("Please provide a RegEx when using Custom RegEx. Capturing group 1 will be matched.");
        return;
      } else {
        regex = new RegExp(customEntry, `g`);
        console.log("--------------------------------------\n[DEBUG] Custom RegEx (99) was selected.");
      }
    }
  
    //TODO: Monitor the length of Discord IDs. Currently the majority are 17-18.
    if ($("#regexList").val() == 100) { // All IDs - First occurrence. 
      regex = new RegExp(`^.*?\\b(${customEntry}\\d{${17 - customEntry.length},${18 - customEntry.length}})\\b`, `gm`);
      console.log("--------------------------------------\n[DEBUG] RegEx 100 was selected.");
    }
  
    if ($("#regexList").val() == 101) { // All IDs
      regex = new RegExp(`\\b(${customEntry}\\d{${17 - customEntry.length},${18 - customEntry.length}})\\b`, `g`);
      console.log("--------------------------------------\n[DEBUG] RegEx 101 was selected.");
    }

    parseIDs();
}