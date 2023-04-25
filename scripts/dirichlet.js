import { euclideanAlgorithm } from "./factor.js"

/**
 * Approximates any real number using integer values p, q where
 * p / q is within "epsilon" distance of the real number.
 *
 * Uses dirichlet's Approximation Theorem to find the qth multiple of
 * the real number within 1/qN of the nearest integer. q's existence
 * is guaranteed by the pigeonhole principle.
 */
export function dirichletApproximation(realNum, epsilon) {
    let limit = Math.round(1 / epsilon);
    let fractionals = [];

    while (true) {
        for (let i = 0; i < limit; i++) fractionals[i] = (realNum * i) % 1;

        for (let i = 0; i < limit; i++) {
            for (let j = i + 1; j <= limit; j++) {
                if (Math.abs(fractionals[i] - fractionals[j]) < (Math.abs(i - j) / limit))
                    return [Math.round((j - i) * realNum), j - i];
            }
        }
        limit++;
    }
}

/**
 * Finds the most optimal rational approximation of any real number using
 * a converging sequence of continued fractions.
 *
 * Terminates when the approximation is within "epsilon" distance of the
 * real number.
 */
export function continuedApproximation(realNum, epsilon) {
    let notation = [];
    let fractional = realNum;

    notation.push(Math.floor(realNum));

    while (true) {
        fractional = 1 / (fractional - Math.floor(notation[notation.length - 1]));
        notation.push(Math.floor(fractional));

        const fraction = evaluateContinuedFraction(notation, 0);
        if (Math.abs(fraction[0] / fraction[1] - realNum) < epsilon)
            return fraction;
    }
}

/**
 * Takes a continued (but finite) fraction written in shorthand notation
 * and simplifies it recursively.
 */
function evaluateContinuedFraction(notation, index) {
    if (index === notation.length - 1) {
        return [notation[index], 1];
    } else {
        const fraction = evaluateContinuedFraction(notation, index + 1);
        return [notation[index] * fraction[0] + fraction[1], fraction[0]];
    }
}
