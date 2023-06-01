import { bezoutCoefficients } from "./bezout.js";
import { euclideanAlgorithm } from "./factor.js";
import { ParametricEquation } from "./Parametric.js";

/**
 * Represents a linear Diophantine Equation. Every variable in the
 * equation has a key-value pair between its character and an
 * object of the ParametricEquation class.
 */
export class DiophantineEquation {

    /**
     * Constructs a Diophantine Equation object.
     * @param {string} equation
     */
    constructor(equation) {
        const { coefficients, variables, solution } = parseDiophantineEquation(equation);

        this._coefficients = coefficients;
        this._variables = variables;
        this._solution = solution;

        // Initialize parameters as t_1, t_2, ... t_n-1
        this._parameters = Array(this._coefficients.length - 1)
            .fill(1).map((e, index) => "t" + (String.fromCodePoint(0x2080 + e + index)));
        this._updateParametrics();
    }


    /**
     * Copy old Parametric Equations to a new set of user-defined
     * variables. Must be one character each.
     * @param {Array.<string>} charArray
     */
    setVariables(charArray) {
        if (charArray.length !== this._variables.length)
            throw new Error("This equation needs " + this._variables.length + " variables.");

        else {
            this._variables.forEach((v, index) => {
                delete Object.assign(this, {[charArray[index]]: this[v]})[v];
            });
            this._variables = charArray;
        }
    }

    /**
     * Set new coefficients and update ParametricEquation objects.
     * @param {Array.<number>} array
     */
    setCoefficients(array) {
        if (array.length !== this._coefficients.length)
            throw new Error("This equation needs " + this._coefficients.length + " coefficients.");

        else this._coefficients = array;
        this._updateParametrics();
    }

    /**
     * Set new parameters and update ParametricEquation objects.
     * @param {Array.<string>} charArray
     */
    setParameters(charArray) {
        if (charArray.length !== this._parameters.length)
            throw new Error("This equation needs " + this._parameters.length + " parameters.");

        else this._parameters = charArray;
        this._updateParametrics();
    }

    /**
     * Set new solution and update ParametricEquation objects.
     * @param {number} solution
     */
    setSolution(solution) {
        if (typeof(solution) !== "number" || solution % 1 !== 0)
            throw new Error("The solution must be an integer.")

        else this._solution = solution;
        this._updateParametrics();
    }


    /**
     * Re-assign variable keys to a new set of Parametric Equation
     * objects.
     */
    _updateParametrics() {
        const parametricEquations = solveDiophantineEquation(this._coefficients, this._solution);
        this._variables.forEach((v, index) => {
            this[v] = new ParametricEquation(parametricEquations[index], this);
            replaceNegativeZeroes(this[v]._coefficients);
        });
    }

    /**
     * Evaluates the equation by plugging in an integer for every
     * parameter. This will always be equal to this._solution.
     * @param {...number} values
     */
    evalWithParameters(...values) {
        if (values.length !== this._parameters.length)
            throw new Error("This equation needs a list of " + this._parameters.length +
                " values for " + this._parameters.length + " parameters.");

        let sum = 0;
        this._variables.forEach((v, index) => {
            sum += this[v].evalWithParameters(...values) * this._coefficients[index];
        });
        return sum;
    }

    /**
     * Evaluates the equation by plugging in an integer for every
     * variable. This will not always be equal to this._solution.
     * @param {...number} values
     */
    evalWithVariables(...values) {
        if (values.length !== this._variables.length)
            throw new Error("This equation needs a list of " + this._variables.length +
                " values for " + this._variables.length + " variables.");

        let sum = 0;
        for (let i = 0; i < this._coefficients.length; i++)
            sum += this._coefficients[i] * values[i];
        return sum;
    }

    /**
     * Returns a randomly chosen set of integers that make the
     * Diophantine Equation true.
     */
    generateValues(min = 0, max = 100) {
        // TODO: Change from bounds on the parameters to bounds on the integers returned

        let variableValues = [];
        const parameterValues = [1].concat(Array(this._parameters.length).fill(1)
            .map(e => Math.floor(Math.random() * (max - min + 1)) + min));

        this._variables.forEach(v => {
            let sum = 0;
            for (let i = 0; i < this[v]._coefficients.length; i++) {
                sum += this[v]._coefficients[i] * parameterValues[i];
            }
            variableValues.push(sum);
        });
        return variableValues;
    }

    /**
     * Returns a string representation of the DiophantineEquation
     * object.
     */
    toString() {
        let string = "";

        for (let i = 0; i < this._coefficients.length; i++) {
            string +=
                this._coefficients[i].toString() +
                this._variables[i].toString();
            string +=
                this._coefficients[i + 1] !== undefined ? " + " : " = " + this._solution;
        }
        return string;
    }
}

/**
 * Wrap Diophantine Equation class with factory function
 */
export function returnDiophantineEquation(equation) {
    return new DiophantineEquation(equation);
}

/**
 * Takes a linear diophantine equation in the form of a string and
 * extracts the coefficients, _variables, and solution.
 *
 * Checks for type mismatch, bad characters, repeated variables,
 * and more. Add more checks to this!
 */
function parseDiophantineEquation(equation) {
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

/**
 * Solves a linear diophantine equation of n variables recursively
 * by repeatedly projecting it onto a subspace with 1 less
 * dimension.
 *
 * @param {Array.<number>} coefficients
 * @param {number} solution
 */
function solveDiophantineEquation(coefficients, solution) {
    if (solution % euclideanAlgorithm(...coefficients) !== 0)
        throw new Error("This equation has no integer solutions");

    if (coefficients.length === 2)
        return solveLinearBinomialEquation(coefficients, solution);
    else {
        const gcd = euclideanAlgorithm(...coefficients.slice(0, 2));
        const [xBezout, yBezout] = bezoutCoefficients(...coefficients.slice(0, 2));
        let collapsedEquation = solveDiophantineEquation([gcd, ...coefficients.slice(2)], solution);

        return [
            collapsedEquation[0].map(c => c * xBezout).concat([coefficients[1]]),
            collapsedEquation[0].map(c => c * yBezout).concat(-[coefficients[0]]),
            ...collapsedEquation.slice(1)
        ]
    }
}

/**
 * Solves a linear Diophantine Equation in the form of ax + by = c,
 * where a, b, and c are integers.
 *
 * Returns the set of all integer solutions for x and y where
 * x and y equal parametric equations in terms of some t.
 *
 * @param {Array.<number>} coefficients
 * @param {number} solution
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

/**
 * Replace all instances of -0 with 0. Caused by alternating
 * signs when calculating Parametric Equation coefficients. 
 * @param {Array.<number>} values
 */
function replaceNegativeZeroes(values) {
    for (let i = 0; i < values.length; i++) {
        if (values[i] === -0) values[i] = 0;
    }
}

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


const equation = new DiophantineEquation("4x - 8y - 6z = -4");

// console.log(equation);
console.log(equation.x.toString())
console.log(equation.y.toString())
console.log(equation.z.toString())
console.log(equation.generateValues());