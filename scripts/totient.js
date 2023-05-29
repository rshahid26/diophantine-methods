import { trapezoidalRiemannSum } from "./integral.js"

/** Returns the exact number of primes up to some n using the sieve
 * of Eratosthenes, with time complexity of O(nlog(log(n))).
 */
export function countPrimesBelow(n) {
    const sieve = new Array(n + 1).fill(true);
    let primeCount = 0;

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (sieve[i]) {
            // Starts at mult=i as for all mult*i where mult<i,
            // sieve[mult*i] is already false!
            for (let mult = i; mult * i <= n; mult++)
                sieve[mult * i] = false;
        }
    }
    for (let i = 2; i <= n; i++) if (sieve[i]) primeCount++;
    return primeCount;
}

/** Returns an approximation for the number of primes up to n
 * using a trapezoidal Riemann sum of the function 1 / ln(n) from 2
 * to n, otherwise known as the logarithmic integral.
 *
 * This is the fastest converging sequence to countPrimesBelow(n)
 * with time complexity independent of n. (See
 * scripts/ContinuedFractions.js for info)
 */
export function approximatePrimesBelow(n, intervals) {
    return trapezoidalRiemannSum((x) => {return 1 / Math.log(x)}, 2, n, intervals);
}