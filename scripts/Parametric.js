/**
 * Represents a linear Parametric Equation that generates the solution
 * set for some coordinate in a linear Diophantine equation.
 */
export class ParametricEquation {

    /**
     * Constructs a Parametric Equation object.
     * @param {Array.<number>} coefficients
     * @param {DiophantineEquation} DiophantineEquation
     */
    constructor(coefficients, DiophantineEquation) {
        while (coefficients.length !== DiophantineEquation._coefficients.length)
            coefficients.push(0);

        this._coefficients = coefficients;
        this._parameters = DiophantineEquation._parameters;
    }

    /**
     * Returns a string representation of the ParametricEquation
     * object.
     */
    toString() {
        let string = "";

        for (let i = 0; i < this._coefficients.length; i++) {
            if (this._coefficients[i] === 0) continue;
            string += this._coefficients[i].toString();
            string += this._parameters[i - 1] !== undefined ? this._parameters[i - 1].toString() : "";
            string += this._coefficients[i + 1] !== undefined ? " + " : "";
        }
        if (string.charAt(string.length - 2) !== "+") return string;
        else return string.substring(0, string.length - 3);
    }

    /**
     * Evaluates the Parametric Equation at a certain point in the
     * domain space.
     * @param {...number} values
     */
    evalWithParameters(...values) {
        let sum = this._coefficients[0];
        for (let i = 1; i < this._coefficients.length; i++)
            sum += this._coefficients[i] * values[i - 1];

        return sum;
    }
}