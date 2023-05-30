/**
 * Represents a Parametric Equation that generates the solution
 * set for a given coordinate of a Linear Diophantine equation.
 */
export class ParametricEquation {

    /**
     * Constructs a linear equation object.
     * @param {Array.<number>} coefficients
     * @param {LinearEquation} linearEquation
     */
    constructor(coefficients, linearEquation) {
        this.coefficients = coefficients;
        this._parameters = linearEquation.parameters;
    }

    /**
     * Returns a string representation of the ParametricEquation
     * object.
     */
    toString() {
        let string = "";

        for (let i = 0; i < this.coefficients.length; i++) {
            if (this.coefficients[i] === 0) continue;
            string += this.coefficients[i].toString();
            string += this._parameters[i - 1] !== undefined ? this._parameters[i - 1].toString() : "";
            string += this.coefficients[i + 1] !== undefined ? " + " : "";
        }
        return string;
    }

    /**
     * Evaluates the ParametricEquation at a certain point in the
     * domain space.
     * @param {...number} values
     */
    solveFor(...values) {
        let sum = this.coefficients[0];
        for (let i = 1; i < this.coefficients.length; i++)
            sum += this.coefficients[i] * values[i - 1];

        return sum;
    }
}