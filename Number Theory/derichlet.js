// Derichlet's Approximation Theorem
function findMultiples(realNum, limit, error) {

    let fractionals = new Array(limit);
    let answers = {};

    error = !error || error > 1 / 1_000_000 ? 1_000_000 : error;

    for (let i = 0; i < limit; i++) {
        fractionals[i] = (realNum * i) - Math.floor(realNum * i);
    }

    for (let i = 0; i < limit; i++) {
        for (let j = i + 1; j <= limit; j++) {

            if (Math.abs(fractionals[i] - fractionals[j]) < (1 / limit)) {

                const index = Math.abs(i - j);
                if (!answers[index]) answers[index] = Math.round(realNum * index * error) / error;
            }

        }
    }
    return answers;
}

// Approximates any real number using the smallest possible integers p / q
function findApproximate(realNum, error) {

    let approximates = {};
    let limit = Math.ceil(1 / error);

    while (Object.keys(approximates).length < 1) {
        const multiples = findMultiples(realNum, limit, error);

        console.log(limit, multiples);
        limit++;

        if (Object.keys(multiples).length !== 0) {

            const multiple = Object.keys(multiples)[0];

            if (multiples[multiple] - Math.floor(multiples[multiple]) > 0)
                return Math.floor(multiples[multiple]) + " / " + multiple +
                    " (within " + (1 / (Math.floor(multiples[multiple]) * limit)) + ")";

            else return Math.ceil(multiples[multiple]) + " / " + multiple;

        }
    }

    console.log(approximates);
}
console.log(findApproximate(Math.pow(2, 1/2), 0.00001));