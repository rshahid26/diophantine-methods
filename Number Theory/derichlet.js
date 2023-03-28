// Approximates any real number using the smallest possible integers p / q
function findApproximate(realNum, error) {

    let limit = Math.round(1 / error);
    while (true) {

        const multiples = findMultiple(realNum, limit, error);

        if (Object.keys(multiples).length !== 0) {

            const multiple = Object.keys(multiples)[0];
            return Math.round(multiples[multiple]) + " / " + multiple +
                " (within " + error + ")";
        }
        limit++;
    }
}

// Derichlet's Approximation Theorem
function findMultiple(realNum, limit, error) {

    let fractionals = new Array(limit);
    error = !error || error > 1 / 1_000_000 ? 1_000_000 : Math.round(1 / error);

    for (let i = 0; i < limit; i++) {
        fractionals[i] = (realNum * i) - Math.floor(realNum * i);
    }

    for (let i = 0; i < limit; i++) {
        for (let j = i + 1; j <= limit; j++) {

            if (Math.abs(fractionals[i] - fractionals[j]) < (Math.abs(i - j) / limit))
                return {[Math.abs(i - j)] : Math.round(realNum * Math.abs(i - j) * error) / error};
        }
    }
}

console.log(findApproximate(Math.pow(59, 7/9), 0.000001));