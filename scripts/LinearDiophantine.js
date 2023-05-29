import { bezoutCoefficients, getBezoutHistory } from "./bezout.js";
import { euclideanAlgorithm } from "./factor.js";

/**
 * Wrap Linear Equation class with factory function
 */
export function returnLinearEquation(equation) {
    return new LinearEquation(equation);
}

export class LinearEquation {

    constructor(equation) {
        if (equation.match(/[!@#$%^&*(),?":{}|<>/_]/))
            throw new Error("An equation consists of numbers, letters, and [+,-,=,.] only.");

        const { variables, solution } = parseLinearEquation(equation);
        const coefficients = Object.values(variables);

        Object.keys(variables).forEach((v, index) => {
            this[v] = solveLinearEquation(coefficients, solution)[index]}
        );
        this.variables = variables;
        this.coefficients = coefficients;
        this.parameters = Array(coefficients.length - 1)
            .fill(1).map((e, index) => "t" + (e + index));
        this.solution = solution;
    }

    toEquationString() {

    }

    setParameters(parameterArray) {
        if (parameterArray.length !== this.parameters.length)
            throw new Error("This equation needs " + this.parameters.length + " parameters.");

        else this.parameters = parameterArray;
    }

    leastSquareSolutions() {}
    leastPositiveSolutions() {}
    solveFor() {} //param 1, param 2...

}

const equation = new LinearEquation("1x - 14y + 5z = 18");
console.log(equation);

//console.log(testLinearEquation(parameterization, coefficients, [1, 2, 4]))

function solveLinearEquation(coefficients, solution) {
    if (coefficients.length === 2)
        return solveLinearBinomialEquation(coefficients, solution);

    else {
        const gcd = euclideanAlgorithm(...coefficients.slice(0, 2));
        const [xBezout, yBezout] = bezoutCoefficients(...coefficients.slice(0, 2));
        let temp = solveLinearEquation([gcd, ...coefficients.slice(2)], solution);

        return [
            temp[0].map(c => c * xBezout).concat([coefficients[1]]),
            temp[0].map(c => c * yBezout).concat(-[coefficients[0]]),
            ...temp.slice(1)
        ]
    }
}

/**
 * Solves a Diophantine linear equation in the form ax + by = c,
 * where a, b, and c are integers.
 *
 * Returns the origin solution, being the Bezout Coefficients
 * scaled by (c / GCD), as well as the set of all solutions,
 * being a parameterized linear equation of degree 1.
 */
function solveLinearBinomialEquation(coefficients, solution) {
    const [xCoeff, yCoeff] = coefficients;
    const [xBezout, yBezout] = bezoutCoefficients(xCoeff, yCoeff);
    const gcd = euclideanAlgorithm(...coefficients);

    return [
        [(solution / gcd) * xBezout, yCoeff / gcd],
        [(solution / gcd) * yBezout, -xCoeff / gcd]
    ];
}

function testLinearEquation(parameterization, coefficients, values) {

    let sum = 0;
    for (let i = 0; i < parameterization.length; i++) {

        let variable = 0;
        for (let j = 0; j < parameterization[i].length; j++) {
            variable += parameterization[i][j] * values[j];
            console.log(parameterization[i], parameterization[i][j] + " * " + values[j]);
        }
        sum += variable * coefficients[i]
    }
    return sum;
}


function parameterizeLinearEquation() {
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


// object["set"][key] = `${keyOrigin} ${variables.d / gcd >= 0 ? "+" : "-"} ${Math.abs(Number(variables.d / gcd))}t`;

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

export function printLinearSolution(equation) {
    const { xCo, yCo, solution} = parseLinearEquation(equation);
    const { gcd, x, y } = bezoutCoefficients(xCo, yCo);

    console.log(
        xCo + "(" + Number(x * (solution / gcd)) + ") + " +
        yCo + "(" + (y * (solution / gcd)) + ") = " +
        solution
    );
}