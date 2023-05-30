export class ParametricEquation {

    constructor(coefficients, linearEquation) {
        this.coefficients = coefficients;
        this._parameters = linearEquation.parameters;
    }

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

    solveFor(...values) {

        let sum = this.coefficients[0];

        for (let i = 1; i < this.coefficients.length; i++)
            sum += this.coefficients[i] * values[i - 1];

        return sum;
    }
}