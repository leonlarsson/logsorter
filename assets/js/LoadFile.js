$("#files").on("change", evt => {
  const file = evt.target.files[0]; // Gets the selected file

  // Infinite file size if debug mode is active
  const maxFileSize = debugMode ? Infinity : 5000000;

  console.log(`[DEBUG] Received file "${file.name}" (${file.size} bytes), which is ${(file.size / maxFileSize * 100).toFixed(1)}% of the size limit.`);

  if (file.type.match("text.*") && file.size < maxFileSize && file.size !== 0) { // If uploaded file is text, smaller than 5MB (roughly) and not empty, proceed. If not, return and alert user

    const reader = new FileReader();
    reader.onload = evt => {
      editorLeft.setValue(evt.target.result);
      getRegex(); // Might want to make this optional in the future
    };

    reader.readAsText(file);

  } else {
    alert(`Incorrect file type, file was too big, or the file is empty.\n\nCheck the console for a hint :)`);
    return;
  }
});