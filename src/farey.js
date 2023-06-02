import { euclideanAlgorithm } from "./factor.js"
import { LinkedList, Node } from "./LinkedList.js";

// Asymptotic bound for the length of a Farey sequence of size n.
export const fareyAsymptote = (n) => Math.round(3 * Math.pow(n, 2) / Math.pow(Math.PI, 2));

/**
 * Brute forces the Farey sequence of size n. This is the set of all
 * fractions h / k where h, k are co-prime and 0 <= h <= k <= n.
 */
function getFareySequenceBF(n, order) {
    if (n < 1) return [];

    let sequence = [];
    for (let k = 0; k <= n; k++) {
        for (let h = 0; h <= k; h++) {

            // Excludes h = 0, k = 0 case
            if (euclideanAlgorithm(h, k) === 1) sequence.push([h, k]);
        }
    }
    return sequence.sort(order || fractionsAscending);
}

/**
 * Returns the Farey sequence of size n, this time using the mediant
 * property where fraction [h,k] is equal to the mediant of its
 * nearest neighbors.
 *
 * Meaning, for [...[a,b],[h,k],[c,d]...], h = a+c and k = b+d.
 */
export function getFareySequence(n) {
    if (n < 1) return [];
    let sequence = new LinkedList([0, 1], [1, 1]);

    let current = sequence.head;
    while (current.next !== null) {
        const [a, b] = current.data;
        const [c, d] = current.next.data;

        if (b + d <= n) current.next = new Node([a + c, b + d], current, current.next);
        else current = current.next;
    }

    return sequence;
}

export function fractionsAscending(frac1, frac2) {
    return (frac1[0] * frac2[1]) - (frac1[1] * frac2[0]);
}

export function fractionsDescending(frac1, frac2) {
    return (frac1[1] * frac2[0]) - (frac1[0] * frac2[1]);
}

/**
 * Recursive solution for Farey sequences of small n.
 */
function getFareySequenceR(n) {
    if (n === 0) return [];
    if (n === 1) return [[0, 1], [1, 1]];
    else {
        let sequence = getFareySequenceR(n-1);
        for (let index = 0; index < sequence.length - 1; index++) {
            const [a, b] = sequence[index];
            const [c, d] = sequence[index + 1];

            if (b + d <= n) sequence.splice(index + 1, 0, [a + c, b + d]);
        }
        return sequence;
    }
}

/**
 * Calculate the neighbors of a given fraction in a Farey sequence of
 * size n. Uses the fact that, for [...[a,b][h,k][c,d]...], ak-bh = 1
 * and hd-kc = -1.
 */
export function getFareyNeighbors(numerator, denominator, n) {
    let neighbors = {};

    for (let b = n; b > 0; b--) {
        for (let a = 0; a <= b; a++) {

            if (numerator * b - denominator * a === -1) neighbors["after"] = [a, b];
            if (numerator * b - denominator * a === 1) neighbors["before"] = [a, b];
            if (Object.keys(neighbors).length > 1) return neighbors;
        }
    }
}

/**
 * Maps a given number to the unit interval and approximates it using
 * the nearest Farey fraction. Brute force approach with complexity
 * O(n^2), space complexity O(n^2).
 */
export function fareyApproximationBF(realNum, epsilon) {
    const fractional = realNum - Math.floor(realNum);
    const distance = (fraction) => {return Math.abs(fraction[0] / fraction[1] - fractional);}

    const sequence = getFareySequence(Math.ceil(1 / epsilon));
    let record = Number.MAX_VALUE;
    let bestFraction = null;

    let current = sequence.head;
    while (current !== null && current.next !== null) {

        if (distance(current.data) < record) bestFraction = current.data;
        if (distance(current.data) < distance(current.next.data)) break;

        record = distance(current.data);
        current = current.next;
    }
    return [bestFraction[0] + Math.floor(realNum) * bestFraction[1], bestFraction[1]];
}

/** Uses a binary search for the farey fraction nearest some realNum
 * in a Farey Sequence of size 1 / epsilon. Has time complexity O(logn) and
 * space complexity O(1).
 */
export function nearestFareyFraction(realNum, epsilon) {
    const fractional = realNum - Math.floor(realNum);
    const distance = (fraction) => {return Math.abs(fraction[0] / fraction[1] - fractional);}

    let [left, right] = [[0, 1], [1,1]];
    while (true) {
        const mediant = [(left[0] + right[0]), (left[1] + right[1])];

        if (mediant[1] > Math.ceil(1 / epsilon)) {
            const bestFraction = distance(left) <= distance(right) ? left : right;
            return [bestFraction[0] + Math.floor(realNum) * bestFraction[1], bestFraction[1]];
        }

        if (distance(mediant) === 0) return [mediant[0] + Math.floor(realNum) * mediant[1], mediant[1]];
        if (mediant[0] / mediant[1] < fractional) left = mediant;
        else right = mediant;
    }
}

/** Uses a binary search for a farey fraction within epsilon distance
 * of realNum. Has worst case O(logn) where n is the length of the
 * minimum Farey Sequence required (being 1 / epsilon).
 */
export function fareyApproximation(realNum, epsilon) {
    const fractional = realNum - Math.floor(realNum);
    const distance = (fraction) => {return Math.abs(fraction[0] / fraction[1] - fractional);}

    let [left, right] = [[0, 1], [1,1]];
    while (true) {
        const mediant = [(left[0] + right[0]), (left[1] + right[1])];

        if (mediant[1] > Math.ceil(1 / epsilon)) {
            const bestFraction = distance(left) <= distance(right) ? left : right;
            return [bestFraction[0] + Math.floor(realNum) * bestFraction[1], bestFraction[1]];
        }

        if (distance(mediant) <= epsilon) return [mediant[0] + Math.floor(realNum) * mediant[1], mediant[1]];
        if (mediant[0] / mediant[1] < fractional) left = mediant;
        else right = mediant;
    }
}