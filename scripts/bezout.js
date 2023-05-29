import { mod, euclideanAlgorithm } from "./factor.js";

/**
 * Returns a history of equations calculated through the Euclidean
 * Algorithm.
 */
function getEuclideanHistory(a, b, remainders = []) {
    if (b === 0) return remainders;
    else {
        remainders.push([mod(a, b), a, b, -Math.floor(a / b)]);
        return getEuclideanHistory(b, mod(a, b), remainders);
    }
}

/**
 * Calculates the Bezout coefficients of two integers by reversing
 * the Euclidean Algorithm. These coefficients form a linear combination
 * with the integers that equals the GCD.
 *
 * Returns an object containing the GCD and coefficients.
 */
function binaryBezoutCoefficients(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    else {
        const { gcd, x, y } = binaryBezoutCoefficients(b, mod(a, b));
        const sign = (gcd >= 0) ? 1 : -1;

        return {
            gcd: sign * gcd,
            x: sign * y,
            y: sign * (x - y * Math.floor(a / b))
        };
    }
}

/**
 * Calculates the Bezout coefficients of any n integers by reversing
 * the Extended Euclidean Algorithm.
 */
export function bezoutCoefficients(...values) {
    let result = values[0];
    let coefficients = values.length > 1 ? [] : 1;

    for (let i = 1; i < values.length; i++) {
        const { gcd, x, y } = binaryBezoutCoefficients(result, values[i]);
        result = gcd;

        if (coefficients.length < 1) coefficients.push(x, y);
        else {
            coefficients.forEach((n, index) => coefficients[index] = n * x)
            coefficients.push(y);
        }
    }
    return coefficients;
}


/**
 * Returns a history of equations calculated through the Bezout
 * Coefficients Algorithm.
 */
export function getBezoutHistory(...values) {
    let history = [];
    let result = values[0];

    for (let i = 1; i < values.length; i++) {
        history.push(binaryBezoutCoefficients(result, values[i]));
        result = history[history.length - 1].gcd;
    }
    return history;
}