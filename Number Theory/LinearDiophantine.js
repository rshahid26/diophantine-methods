import { euclideanAlgorithm } from "./factor.js";

function binaryEuclidean(a, b) {
    let gcfDividend = 1;
    if (b === 0) return a;
    else {
        gcfDividend = Math.floor(a / b);
        console.log(gcfDividend);
        return binaryEuclidean(b, a % b);

    }
}

function parseLinearEquation(equation) {

    let modifiedEquation = equation.replace(/[a-zA-Z]/g, (match, index) => {
        if (index === equation.indexOf(equation.match(/[a-zA-Z]/g)[0])) return "x";
        else if (index === equation.indexOf(equation.match(/[a-zA-Z]/g)[1])) return "y";
    });

    const cleanInput = modifiedEquation.match(/(-?\d*)x\s*([+\-]\s*\d*)y\s*=\s*(-?\d+)/);
    if (!cleanInput) throw new Error ("Invalid equation format.");

    console.log(cleanInput);

    const xCo = parseInt(cleanInput[1] || "1", 10);
    const yCo = parseInt(cleanInput[2].replace(/\s+/g, ""), 10);
    const solution = parseInt(cleanInput[3], 10);

    return [xCo, yCo, solution];
}

function solveLinearEquation(equation) {
    let [xCo, yCo, solution] = parseLinearEquation(equation);

    let s = 0, t = 1;
    while (xCo !== 0) {
        [s, t, xCo, yCo] = [t, s - Math.floor(yCo / xCo) * t, yCo % xCo, xCo];
    }

    return [yCo, -Math.floor((solution - xCo * t) / yCo)];
}

console.log(solveLinearEquation("23A + 10B = 10")); // 1, 7
//console.log(binaryEuclidean(51, 4));