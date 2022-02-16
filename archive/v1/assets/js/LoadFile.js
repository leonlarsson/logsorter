$("#files").on("change", function (evt) {
  let number = $("#numberValue").val();
  let pattern = `\\[.+].+\\@.+\\(.+\\#\\d+,\\s+(${number}\\d+)`;
  var textType = /text.*/;
  var file = evt.target.files[0];

  if (file.type.match(textType)) {
    var reader = new FileReader();

    reader.onload = function (evt) {
      lines = evt.target.result.split("\r\n");

      lines.forEach((line) => {
        // console.log(line);
        try {
          $("#textBox").append(line.match(pattern)[1] + "\n");
          // console.log(`Matched ${line.match(pattern)[1]}`);
        } catch (e) {
          // console.log(`< Likely didn't match.`);
          return;
        }
      });
    };

    // start reading
    reader.readAsText(file);
  } else {
    alert("Incorrect file type.");

    return;
  }
});

// TODO: Fix the shit. Add save to txt. Add clear button.
