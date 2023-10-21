import changeRegex from "./handleSelectMenuChanges.js";
import multipleCheck from "./multipleCheck.js";
import { addIDField, removeIDField } from "./handleMultipleIDFields.js";

import parseTextBox from "./parseTextBox.js";
import loadFile from "./loadFile.js";
import saveFile from "./saveFile.js";
import { createShareLink } from "./shareLinkFunctions.js";
import { showExample } from "./showExample.js";
import { removeDuplicates, splitLines, copyText, clearText, convertNewlines, convertSpaces } from "./textOperations.js";

import { toggleExtraPanel } from "./handleExtraPanel.js";
import { toggleDebug } from "./debugFunctions.js";
import { toggleLight, deleteThemeSetting } from "./themeFunctions.js";
import { scrollCheck } from "./scrollOperations.js";

// Regex list
document.getElementById("regexList").onchange = changeRegex;

// Checkboxes and copy button
document.getElementById("checkboxMultiple").addEventListener("click", multipleCheck);
document.getElementById("checkboxUseNewlines").addEventListener("click", scrollCheck);
document.getElementById("checkboxUseVerboseLogs").addEventListener("click", scrollCheck);
document.getElementById("copyShareLinkButton").addEventListener("click", createShareLink);

// Match text and load file buttons
document.getElementById("matchTextButton").addEventListener("click", parseTextBox);
document.getElementById("files").addEventListener("change", evt => loadFile(evt));

// Other buttons
document.getElementById("saveFileButton").addEventListener("click", saveFile);
document.getElementById("removeDupesButton").addEventListener("click", removeDuplicates);
document.getElementById("splitLinesButton").addEventListener("click", splitLines);
document.getElementById("copyOutputButton").addEventListener("click", copyText);
document.getElementById("clearOutputButton").addEventListener("click", clearText);
document.getElementById("addIDFieldButton").addEventListener("click", addIDField);
document.getElementById("removeIDFieldButton").addEventListener("click", removeIDField);

// Toggle extra panel button
document.getElementById("openExtraPanelButton").addEventListener("click", toggleExtraPanel);

// Buttons, extra panel
document.getElementById("showExampleButton").addEventListener("click", showExample);
document.getElementById("convertNewlinesButton").addEventListener("click", convertNewlines);
document.getElementById("convertSpacesButton").addEventListener("click", convertSpaces);

// Toggle Debug
document.getElementById("titleLogSorter").addEventListener("dblclick", toggleDebug);
document.getElementById("buttonSeparator").addEventListener("dblclick", toggleDebug);

// Theme functions, including some local storage functions
document.getElementById("toggleThemeButton").addEventListener("click", toggleLight);
document.getElementById("deleteThemeSettingButton").addEventListener("click", deleteThemeSetting);