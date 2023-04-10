/** Returns the number of primes up to some n using the sieve of
 * Eratosthenes, with time complexity of O(nlog(log(n))).
 */
export function countPrimes(n) {
    const sieve = new Array(n + 1).fill(true);
    let primeCount = 0;

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (sieve[i]) {
            for (let mult = 2; mult * i <= n; mult++) sieve[mult * i] = false;
        }
    }
    for (let i = 2; i <= n; i++) if (sieve[i]) primeCount++;
    return primeCount;
}


export const primeCountApproximation = (n) => {return n / Math.log(n)}

/** Returns a better approximation for the number of primes up to n
 * using a trapezoidal Riemann sum of the function 1 / ln(n) from 2
 * to n, otherwise known as the logarithmic integral.
 */
export function logarithmicIntegral(n, numSteps) {
    numSteps = numSteps || 100_000;
    const stepSize = (n - 2) / numSteps;

    let integral = 0;
    for (let i = 0; i < numSteps; i++) {
        const x1 = 2 + i * stepSize;
        const x2 = x1 + stepSize;

        const y1 = 1 / Math.log(x1);
        const y2 = 1 / Math.log(x2);

        integral += (y1 + y2) / 2 * stepSize;
    }

    return integral;
}

const n = 30000;
console.log("primes", countPrimes(n), primeCountApproximation(n), logarithmicIntegral(n));