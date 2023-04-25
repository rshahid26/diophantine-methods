import { mod, euclideanAlgorithm } from "./factor.js";

/**
 * Modified euclidean algorithm that pushes a history of operations
 * to the remainder variable.
 */
function getEuclideanHistory(a, b, remainders = []) {
    if (b === 0) return remainders;
    else {
        remainders.push([mod(a, b), a, b, -Math.floor(a / b)]);
        return getEuclideanHistory(b, mod(a, b), remainders);
    }
}

/**
 * Calculates the Bezout coefficients of two integers by
 * reversing the Euclidean Algorithm.
 *
 * Returns an object containing the GCD and coefficients.
 */
function binaryBezoutCoefficients(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    else {
        const { gcd, x, y } = binaryBezoutCoefficients(b, mod(a, b));
        // noinspection JSSuspiciousNameCombination
        return {gcd: gcd, x: y, y: x - y * Math.floor(a / b)};
    }
}

function getBezoutHistory(...values) {
    let history = [];
    let result = values[0];

    for (let i = 1; i < values.length; i++) {
        history.push(binaryBezoutCoefficients(result, values[i]));
        result = history[history.length - 1].gcd;
    }
    return history;
}

export function bezoutCoefficients(...values) {
    let result = values[0];
    let coefficients = [];

    for (let i = 1; i < values.length; i++) {
        const { gcd, x, y } = binaryBezoutCoefficients(result, values[i]);
        result = gcd;

        if (coefficients.length < 1) coefficients.push(x, y);
        else {
            coefficients.forEach((n, index) => coefficients[index] = n * x)
            coefficients.push(y);
        }
    }
    return coefficients;
}

/**
 * Takes a linear diophantine equation in the form of a string and
 * extracts the coefficients, variables, and solution.
 */
function parseLinearEquation(equation) {
    const rawTerms = equation.match(/(-?\s*\d*\s*[a-zA-Z])/g);
    let variables = {};

    for (let term of rawTerms) {
        term = term.match(/(-?\s*\d*)\s*([a-zA-Z])/);
        const coefficient = parseInt(term[1].replace(/\s+/g, "") || "1", 10);

        if (variables[term[2]] !== undefined) throw new Error("Please combine like terms.");
        variables[term[2]] = coefficient;
    }
    const solution = parseInt(equation.match(/=\s*(-?\d+)/)[1], 10);
    return { variables, solution };
}

/**
 * Solves a Diophantine linear equation of the form ax + by = c,
 * where a, b, and c are integers.
 *
 * Returns the origin solution, being the Bezout Coefficients
 * scaled by (c / GCD), as well as the set of all solutions,
 * being a parameterized linear equation.
 */
export function solveLinearEquation(equation) {
    const { variables, solution } = parseLinearEquation(equation);
    const bezoutArray = bezoutCoefficients(...Object.values(variables));
    const gcd = euclideanAlgorithm(...Object.values(variables));

    if (solution % gcd !== 0) return {};
    let object = {set: {}, leastPositive: {}};

    let index = 0;
    for (const key in variables) {
        const keyOrigin = Number(bezoutArray[index] * (solution / gcd));
        object[key] = keyOrigin;

        object["set"][key] = `${keyOrigin} ${variables.d / gcd >= 0 ? "+" : "-"} ${Math.abs(Number(variables.d / gcd))}t`;
        index++;
    }
    // const xOrigin = Number(x * (solution / gcd));
    // const yOrigin = Number(y * (solution / gcd));
    //
    // return {
    //     [xName]: xOrigin,
    //     [yName]: yOrigin,
    //     set: {
    //         [xName]: `${xOrigin} ${yCo / gcd >= 0 ? "+" : "-"} ${Math.abs(Number(yCo / gcd))}t`,
    //         [yName]: `${yOrigin} ${yCo / gcd >= 0 ? "-" : "+"} ${Math.abs(Number(xCo / gcd))}t`
    //     }
    // }
    return object;
}
console.log(solveLinearEquation("32a + 48b + 24c + 6d = 2"));

export function printLinearSolution(equation) {
    const { xCo, yCo, solution} = parseLinearEquation(equation);
    const { gcd, x, y } = bezoutCoefficients(xCo, yCo);

    console.log(
        xCo + "(" + Number(x * (solution / gcd)) + ") + " +
        yCo + "(" + (y * (solution / gcd)) + ") = " +
        solution
    );
}