/**
 * Calculates the remainder of a division between two integers
 * such that 0 <= remainder < b. No surprises unlike '%'
 */
export function mod(a, b) {
    return ((a % b) + b) % b;
}

/**
 * Returns the greatest common divisor (gcd) from a list of
 * integers.
 * @param {...number} values
 */
export function euclideanAlgorithm(...values) {
    function binaryEuclidean(a, b) {
        if (b === 0) return a;
        else return binaryEuclidean(b, mod(a, b));
    }

    let result = values[0];
    for (let i = 1; i < values.length; i++)
        result = binaryEuclidean(result, values[i]);

    return Math.abs(result);
}

/**
 * Returns the least common multiple (lcm) from a list of
 * integers.
 * @param {...number} values
 */
export function leastCommonMultiple(...values) {
    let result = values[0];
    for (let i = 1; i < values.length; i++)
        result = result * values[i] / euclideanAlgorithm(result, values[i]);

    return result;
}

/** Returns an array of prime factors for an integer n
 *with time complexity of O(sqrt(n)).
 * @param {number} a
 * @returns {Array<number>}
 */
export function primeFactorization(a) {
    let primeFactors = [];

    let i = 1;
    while (a !== 1) {
        i++;
        if ((a / i) % 1 === 0) {
            primeFactors.push(i);
            a /= i;
            i = 1;
        }
    }
    return primeFactors;
}

/** Recursive approach to prime factorization. Still
 * with time complexity of O(sqrt(n)).
 * @param {number} a
 * @param {Array<number>} primeFactors optional
 * @returns {Array<number>}
 */
function primeFactorizationR(a, primeFactors = []) {
    if (a === 1) return primeFactors;
    else {
        let i = primeFactors.length === 0 ? 2 : primeFactors[primeFactors.length - 1];
        while ((a / i) % 1 !== 0) i++;

        primeFactors.push(i);
        return primeFactorizationR(a / i, primeFactors);
    }
}

function factorial(n) {
    if (n === 0) return 1;
    else return n * factorial(n - 1);
}

/**
 * An implementation of Fermat Factorization using the one-to-one
 * correspondence of odd integers and differences of squares.
 *
 * Guaranteed to terminate as, for all n, n = 1 * n which equals
 * ((n-1)/2) * ((n+1)/2), a non-trivial factorization.
 */
export function fermatFactorization(n) {
    if (n % 2 === 0) return "Odd composite integers only."

    let x = Math.ceil(Math.sqrt(n))
    while (true) {
        const t = Math.sqrt(x * x - n);

        if (t === Math.floor(t)) return [x + t, x - t];
        else x++;
    }
}

function isPerfectSquare(num) {
    const sqrt = Math.sqrt(num);
    return sqrt === Math.floor(sqrt);
}

function fermatNumber(n) {
    return Math.pow(2, Math.pow(2, n)) + 1;
}
