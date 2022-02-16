$("#files").on("change", function (evt) {
  var file = evt.target.files[0]; // Gets the selected file

  console.log(`[DEBUG] Received file "${file.name}" (${file.size} bytes), which is ${(file.size / 2000000 * 100).toFixed(1)}% of the size limit.`);

  if (file.type.match("text.*") && file.size < 2000000 && file.size !== 0) { // If uploaded file is text, smaller than 2MB (roughly) and not empty, proceed. If not, return and alert user

    var reader = new FileReader();
    reader.onload = function (evt) {

      $("#textBoxInput").val(evt.target.result);
      parseIDs(); // Might want to make this optional in the future
    };

    reader.readAsText(file);
  } else {
    alert(`Incorrect file type, file was too big, or the file is empty.\n\nCheck the console for a hint :)`);
    return;
  }
});