import { bezoutCoefficients, getBezoutHistory } from "./bezout.js";
import { euclideanAlgorithm } from "./factor.js";
import { ParametricEquation } from "./Parametric.js";

/**
 * Wrap Linear Equation class with factory function
 */
export function returnLinearEquation(equation) {
    return new LinearEquation(equation);
}

export class LinearEquation {

    constructor(equation) {
        const { coefficients, variables, solution } = parseLinearEquation(equation);
        this.coefficients = coefficients;
        this.variables = variables;
        this.solution = solution;

        this.parameters = Array(coefficients.length - 1)
            .fill(1).map((e, index) => "t" + (String.fromCodePoint(0x2080 + e + index)));

        variables.forEach((v, index) => {
            this[v] = new ParametricEquation(
                solveLinearEquation(coefficients, solution)[index], this)
        });
    }

    toString() {
        let string = "";

        for (let i = 0; i < this.coefficients.length; i++) {
            string +=
                this.coefficients[i].toString() +
                this.variables[i].toString();

            string +=
                this.coefficients[i + 1] !== undefined ? " + " : " = " + this.solution;
        }
        return string;
    }

    setCoefficients(array) {
        if (array.length !== this.coefficients.length)
            throw new Error("This equation needs " + this.coefficients.length + " coefficients.");

        else this.coefficients = array;
        this.variables.forEach((v, index) => {
            this[v] = solveLinearEquation(this.coefficients, this.solution)[index]}
        );
    }

    setParameters(charArray) {
        if (charArray.length !== this.parameters.length)
            throw new Error("This equation needs " + this.parameters.length + " parameters.");

        else this.parameters = charArray;
    }

    setVariables(charArray) {
        if (charArray.length !== this.variables.length)
            throw new Error("This equation needs " + this.variables.length + " variables.");

        else {
            this.variables.forEach((v, index) => {
                delete Object.assign(this, {[charArray[index]]: this[v]})[v];
            });
            this.variables = charArray;
        }
    }

    solveFor(...values) {
        if (values.length !== this.parameters.length)
            throw new Error("This equation needs a list of " + this.parameters.length +
                " values for " + this.parameters.length + " parameters.");

        let sum = 0;
        this.variables.forEach((v, index) => {
            sum += this[v].solveFor(...values) * this.coefficients[index];
        });
        return sum;
    }

    evaluateAtPoint(...values) {
        if (values.length !== this.variables.length)
            throw new Error("This equation needs a list of " + this.variables.length +
                " values for " + this.variables.length + " variables.");

        let sum = 0;
        for (let i = 0; i < this.coefficients.length; i++)
            sum += this.coefficients[i] * values[i];
        return sum;
    }
}

function solveLinearEquation(coefficients, solution) {
    if (solution % euclideanAlgorithm(...coefficients) !== 0)
        throw new Error("This equation has no integral solutions");

    if (coefficients.length === 2)
        return solveLinearBinomialEquation(coefficients, solution);
    else {
        const gcd = euclideanAlgorithm(...coefficients.slice(0, 2));
        const [xBezout, yBezout] = bezoutCoefficients(...coefficients.slice(0, 2));
        let collapsedEquation = solveLinearEquation([gcd, ...coefficients.slice(2)], solution);

        return [
            collapsedEquation[0].map(c => c * xBezout).concat([coefficients[1]]),
            collapsedEquation[0].map(c => c * yBezout).concat(-[coefficients[0]]),
            ...collapsedEquation.slice(1)
        ]
    }
}

const equation = new LinearEquation("2x - 14y + 5z + 6f = 16");
const parameters = [1, 5, 7];

console.log(equation);
console.log(equation.toString());

console.log(equation.x.toString(), equation.x.solveFor(...parameters));
console.log(equation.y.toString(), equation.y.solveFor(...parameters));
console.log(equation.z.toString(), equation.z.solveFor(...parameters));
console.log(equation.solveFor(...parameters));


/**
 * Solves a Diophantine linear equation in the form ax + by = c,
 * where a, b, and c are integers.
 *
 * Returns the original solution, being the Bezout Coefficients
 * scaled by (c / GCD), as the origin in the set of all solutions,
 * being a parametric linear equation of degree 1.
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

function parameterizeLinearEquation() {
}

/**
 * Takes a linear diophantine equation in the form of a string and
 * extracts the coefficients, variables, and solution.
 *
 * Checks for type mismatch, bad characters, repeated variables,
 * and more. Add more checks to this!
 */
function parseLinearEquation(equation) {
    if (equation.match(/[!@#$%^&*(),?":{}|<>/_]/))
        throw new Error("An equation consists of numbers, letters, and [+,-,=,.] only.");

    const rawTerms = equation.match(/(-?\s*\d*\s*[a-zA-Z])/g);
    let variables = {};

    for (let term of rawTerms) {
        term = term.match(/(-?\s*\d*)\s*([a-zA-Z])/);
        const coefficient = parseInt(term[1].replace(/\s+/g, "") || "1", 10);

        if (variables[term[2]] !== undefined) throw new Error("Please combine like terms.");
        variables[term[2]] = coefficient;
    }

    const coefficients = Object.values(variables);
    variables = Object.keys(variables);
    const solution = parseInt(equation.match(/=\s*(-?\d+)/)[1], 10);

    if (coefficients.length !== variables.length)
        throw new Error("There must be an equal number of coefficients and variables.");
    else return { coefficients, variables, solution };
}