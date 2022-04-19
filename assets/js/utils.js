/**
 * 
 * @param {HTMLElement} element The element.
 * @param {Number} duration The duration in milliseconds.
 */
export const animateElementColor = (element, duration) => {

    // Transition to the chosen color after holding shortly on the element's original color
    const animation = [
        { color: element.style.color },
        { color: Colors.GREEN },
        { color: Colors.GREEN },
        { color: Colors.GREEN },
        { color: element.style.color }
    ];

    element.animate(animation, { duration });
}

/**
 * 
 * @param {HTMLElement} element The element.
 * @param {Number} duration The duration in milliseconds.
 */
export const animateElementBorderColor = (element, duration) => {
    element.animate(animation, { duration });
}

// Example below is for the copy button in shareLinkFunctions.js
// const animation = [
//     { color: Colors.GREEN },
//     { color: Colors.GREEN },
//     { color: Colors.GREEN },
//     { color: isLightMode ? "#4f5660" : "#b9bbbe" }
// ]

// copyShareLinkButton.animate(animation, { duration: 1000 })