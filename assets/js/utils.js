/**
 * Animates an object's CSS property.
 * @param {HTMLElement} element The element.
 * @param {string} property The CSS style property to animate in camelCase ("color", "colorBackground").
 * @param {string} value The value to animate the property to ("#bf2042", "0.4").
 * @param {Number} duration The duration in milliseconds.
 */
export const animateElement = (element, property, value, duration) => {

    const animation = [
        { [property]: element.style[property] },
        { [property]: value },
        { [property]: value },
        { [property]: element.style[property] }
    ];

    element.animate(animation, duration);
}

// Example to animate the box-shadow (border)
// [
//     { boxShadow: `0px 0px 0px 0px ${Colors.GREEN}` },
//     { boxShadow: `0px 0px 0px 3px ${Colors.GREEN}` },
//     { boxShadow: `0px 0px 0px 3px ${Colors.GREEN}` },
//     { boxShadow: `0px 0px 0px 0px ${Colors.GREEN}` }
// ]