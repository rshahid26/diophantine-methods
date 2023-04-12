export function euclideanAlgorithm(a, b) {
    if (b === 0) return a;
    else return euclideanAlgorithm(b, a % b);
}

export function leastCommonMultiple(a, b) {
    return a * b / euclideanAlgorithm(a, b);
}

export function primeFactorizationBF(a) {
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

function factorial(n) {
    if (n === 0) return 1;
    else return n * factorial(n - 1);
}


export function primeFactorizationR(a, primeFactors = []) {
    if (a === 1) return primeFactors;
    else {
        let i = primeFactors.length === 0 ? 2 : primeFactors[primeFactors.length - 1];
        while ((a / i) % 1 !== 0) i++;

        primeFactors.push(i);
        return primeFactorizationR(a / i, primeFactors);
    }
}

console.log(primeFactorizationR(factorial(24)));