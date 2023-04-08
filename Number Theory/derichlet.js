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

/**
 * Returns the Farey sequence of size n. These are all fractions
 * h / k where h, k are co-prime and 0 <= h <= k <= n.
 */
function listFareySequenceBF(n, order) {
    if (n < 1) return [];

    let list = [];
    for (let k = 0; k <= n; k++) {
        for (let h = 0; h <= k; h++) {

            // Excludes h = 0, k = 0 case
            if (euclideanAlgorithm(h, k) === 1) list.push([h, k]);
        }
    }
    return list.sort(order || fractionsAscending);
}
function listFareySequenceR(n) {

}
/**
 * Returns the Farey Sequence of size n, this time using the mediant
 * property where fraction [h,k] is equal to the mediant of its
 * nearest neighbors [... [a,b],[h,k],[c,d]...].
 */
function listFareySequence(n) {
    if (n < 1) return [];
    let list = [[0, 1], [1, 1]];

    let index = 0;
    while (index < list.length - 1) {

        const [a, b] = list[index];
        const [c, d] = list[index + 1];



        if (b + d <= n) list.splice(index + 1, 0, [a + c, b + d]);
        else index++;
    }
    return list;
}

function findFareyNeighbors(numerator, denominator, n) {
}

const fareyAsymptote = (n) => Math.round(3 * Math.pow(n, 2) / Math.pow(Math.PI, 2));

function fractionsAscending(frac1, frac2) {
    return (frac1[0] * frac2[1]) - (frac1[1] * frac2[0]);
}

function fractionsDescending(frac1, frac2) {
    return (frac1[1] * frac2[0]) - (frac1[0] * frac2[1]);
}

function factorial(n) {
    if (n === 0) return 1;
    else return n * factorial(n - 1);
}

// for (let n = 0; n < 10; n++) {
//     console.log(n, listFareySequence(n).length, fareyAsymptote(n));
// }

listFareySequence(13);
