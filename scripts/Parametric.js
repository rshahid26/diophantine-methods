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
        while (coefficients.length !== DiophantineEquation.coefficients.length)
            coefficients.push(0);

        this.coefficients = coefficients;
        this._parameters = DiophantineEquation.parameters;
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
        if (string.charAt(string.length - 2) !== "+") return string;
        else return string.substring(0, string.length - 3);
    }

    /**
     * Evaluates the Parametric Equation at a certain point in the
     * domain space.
     * @param {...number} values
     */
    evaluateAt(...values) {
        let sum = this.coefficients[0];
        for (let i = 1; i < this.coefficients.length; i++)
            sum += this.coefficients[i] * values[i - 1];

        return sum;
    }
}