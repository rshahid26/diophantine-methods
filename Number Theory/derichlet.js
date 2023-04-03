/**
 * Approximates any real number using integer values p, q where
 * p / q is within "error" distance of the real number.
 *
 * Uses Derichlet's Approximation Theorem to find the qth multiple of
 * the real number within 1/qN of the nearest integer. q's existence
 * is guaranteed by the pigeonhole principle.
 */
function derichletApproximation(realNum, error) {
    let limit = Math.round(1 / error);
    let fractionals = [];

    while (true) {
        for (let i = 0; i < limit; i++) fractionals[i] = (realNum * i) % 1;

        for (let i = 0; i < limit; i++) {
            for (let j = i + 1; j <= limit; j++) {
                if (Math.abs(fractionals[i] - fractionals[j]) < (Math.abs(i - j) / limit)) {
                    const q = j - i;
                    const p = Math.round(q * realNum);
                    return p + " / " + q + " (within " + error + ")";
                }
            }
        }
        limit++;
    }
}

/**
 * Finds the most optimal rational approximation of any real number using
 * a converging sequence of continued fractions.
 *
 * Terminates when the approximation is within "error" distance of the
 * real number.
 */
function continuedApproximation(realNum, error) {

    let notation = [];
    let fractional = realNum;
    notation.push(Math.floor(realNum));

    while (true) {
        fractional = 1 / (fractional - Math.floor(notation[notation.length - 1]));
        notation.push(Math.floor(fractional));

        const fraction = evaluateContinuedFraction(notation, 0);
        if (Math.abs(fraction[0] / fraction[1] - realNum) < error)
            return fraction[0] + " / " + fraction[1] + " (within " + error + ")";
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

function euclideanAlgorithm(a, b) {
    if (b === 0) return a;
    else return euclideanAlgorithm(b, a % b);
}



const x = Math.PI;
const t = .01;

console.log(derichletApproximation(x, t));
console.log(continuedApproximation(x, t));
