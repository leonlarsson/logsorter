import changeRegex from "./handleSelectMenuChanges.js";
import multipleCheck from "./multipleCheck.js";
import { addIDField, removeIDField } from "./handleMultipleIDFields.js";

import parseTextBox from "./parseTextBox.js";
import loadFile from "./loadFile.js";
import saveFile from "./saveFile.js";
import { createShareLink } from "./shareLinkFunctions.js";
import { showExample } from "./showExample.js";
import { removeDuplicates, splitLines, copyText, clearText, convertNewlines, convertSpaces } from "./textOperations.js";

import { toggleDebug } from "./debugFunctions.js";
import { toggleLight, deleteThemeSetting } from "./themeFunctions.js";
import { hideNotice } from "./localStorageNotice.js";
import { scrollCheck } from "./scrollOperations.js";

// Regex list
document.getElementById("regexList").onchange = changeRegex;

// Checkboxes
document.getElementById("checkBoxMultiple").addEventListener("click", multipleCheck);
document.getElementById("checkBoxUseNewlines").addEventListener("click", scrollCheck);
document.getElementById("checkBoxUseVerboseLogs").addEventListener("click", scrollCheck);
document.getElementById("addIDFieldButton").addEventListener("click", addIDField);
document.getElementById("removeIDFieldButton").addEventListener("click", removeIDField);

// Match text and load file buttons
document.getElementById("matchTextButton").addEventListener("click", parseTextBox);
document.getElementById("files").addEventListener("change", evt => loadFile(evt));

// Other buttons
document.getElementById("saveFileButton").addEventListener("click", saveFile);
document.getElementById("removeDupesButton").addEventListener("click", removeDuplicates);
document.getElementById("splitLinesButton").addEventListener("click", splitLines);
document.getElementById("copyOutputButton").addEventListener("click", copyText);
document.getElementById("clearOutputButton").addEventListener("click", clearText);

// Buttons, 2nd row
document.getElementById("debugShowExample").addEventListener("click", showExample);
document.getElementById("debugCopyCustomURL").addEventListener("click", createShareLink);
document.getElementById("debugConvertNewlines").addEventListener("click", convertNewlines);
document.getElementById("debugConvertSpaces").addEventListener("click", convertSpaces);

// Toggle Debug
document.getElementById("titleLogSorter").addEventListener("dblclick", toggleDebug);
document.getElementById("buttonSeparator").addEventListener("dblclick", toggleDebug);

// Theme functions, including some local storage functions
document.getElementById("toggleThemeButton").addEventListener("click", toggleLight);
document.getElementById("deleteThemeSettingButton").addEventListener("click", deleteThemeSetting);

// Accept and remove the local storage notice
document.getElementById("localStorageOKButton").addEventListener("click", hideNotice);