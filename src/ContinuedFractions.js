/**
 * Takes any real number and approximates it using a converging sequence
 * of continued fractions. Returns a shorthand notation containing just
 * the floored integers in the approximation.
 *
 * Terminates when the approximation is within "epsilon" distance of the
 * real number.
 */
export function getContinuedFraction(realNum, epsilon) {
    let notation = [];
    let fractional = realNum;

    notation.push(Math.floor(realNum));
    while (true) {
        fractional = 1 / (fractional - Math.floor(notation[notation.length - 1]));
        notation.push(Math.floor(fractional));

        const fraction = evaluateContinuedFraction(notation);
        if (Math.abs(fraction[0] / fraction[1] - realNum) < epsilon)
            return notation;
    }
}

/**
 * Takes a continued (but finite) fraction written in shorthand notation
 * and simplifies it recursively.
 */
export function evaluateContinuedFraction(notation, index = 0) {
    if (index === notation.length - 1) {
        return [notation[index], 1];
    } else {
        const fraction = evaluateContinuedFraction(notation, index + 1);
        return [notation[index] * fraction[0] + fraction[1], fraction[0]];
    }
}

/**
 * Returns the most optimal rational approximation of any real number
 * once it's within "epsilon" distance.
 */
export function continuedApproximation(realNum, epsilon) {
    return evaluateContinuedFraction(getContinuedFraction(realNum, epsilon));
}