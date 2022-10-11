// Select2/Creates a custom matcher for Select2. Thanks to user 'willbradley' on SO for providing this custom matcher
function modelMatcher(params, data) {
    data.parentText = data.parentText || "";

    // Always return the object if there is nothing to compare
    if (!params.term?.trim()) return data;

    // Do a recursive check for options with children
    if (data.children && data.children.length > 0) {
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        const matchRegex = $.extend(true, {}, data);

        // Check each child of the option
        for (let c = data.children.length - 1; c >= 0; c--) {
            const child = data.children[c];
            child.parentText += data.parentText + " " + data.text;

            const matchesRegex = modelMatcher(params, child);

            // If there wasn't a match, remove the object in the array
            if (matchesRegex == null) matchRegex.children.splice(c, 1);
        }

        // If any children matched, return the new object
        if (matchRegex.children.length > 0) return matchRegex;

        // If there were no matching children, check just the plain object
        return modelMatcher(params, matchRegex);
    }

    // If the typed-in term matches the text of this term, or the text from any
    // parent term, then it's a match.
    const original = (data.parentText + " " + data.text).toUpperCase();
    const term = params.term.toUpperCase();

    // Check if the text contains the term
    if (original.indexOf(term) > -1) return data;

    // If it doesn't contain the term, don't return anything
    return null;
}

/**
 * Creates the Select2 menu on the exisiting select element.
 * @param {string} theme The theme. "mozzy" or "default".
 */
export default theme => {
    const selectElement = document.getElementById("regexList");
    window.select2 = new TsSelect2(selectElement, {
        placeholder: "Select a bot",
        dropdownAutoWidth: true,
        width: "style",
        matcher: modelMatcher,
        theme: theme
    });
}