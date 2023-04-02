/**
 * Approximates any real number using the smallest possible integers p, q
 * where p / q is within "error" distance of a real number.
 */
function derichletApproximation(realNum, error) {
    let limit = Math.round(1 / error);

    while (true) {
        const multiples = findMultiple(realNum, limit, error);

        if (multiples !== undefined) {

            const multiple = Object.keys(multiples)[0];
            return Math.round(multiples[multiple]) + " / " + multiple +
                " (within " + error + ")";
        }
        limit++;
    }
}
/**
 * Finds qth multiple of a real number using Derichlet's approximation theorem.
 */
function findMultiple(realNum, limit, error) {

    let fractionals = new Array(limit);
    error = !error || error > 1 / 1_000_000 ? 1_000_000 : Math.round(1 / error);

    for (let i = 0; i < limit; i++) fractionals[i] = (realNum * i) % 1;

    for (let i = 0; i < limit; i++) {
        for (let j = i + 1; j <= limit; j++) {

            if (Math.abs(fractionals[i] - fractionals[j]) < (Math.abs(i - j) / limit))
                return {[Math.abs(i - j)] : Math.round(realNum * Math.abs(i - j) * error) / error};
        }
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

console.log(derichletApproximation(Math.PI, 0.00009));
console.log(continuedApproximation(Math.PI, 0.00009));
