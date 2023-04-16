import { euclideanAlgorithm } from "./factor.js";

function getEuclideanHistory(a, b, remainders = []) {
    if (b === 0) return remainders;
    else {
        remainders.push([a % b, a, b, -Math.floor(a / b)]);
        return getEuclideanHistory(b, a % b, remainders);
    }
}

function bezoutCoefficients(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    else {
        const { gcd, x, y } = bezoutCoefficients(b, a % b);
        // noinspection JSSuspiciousNameCombination
            return {
            gcd: gcd,
            x: y,
            y: x - y * Math.floor(a / b),
        };
    }
}

function parseLinearEquation(equation) {
    let modifiedEquation = equation.replace(/[a-zA-Z]/g, (match, index) => {
        if (index === equation.indexOf(equation.match(/[a-zA-Z]/g)[0])) return "x";
        else if (index === equation.indexOf(equation.match(/[a-zA-Z]/g)[1])) return "y";
    });

    const cleanInput = modifiedEquation.match(/(-?\d*)x\s*([+\-]\s*\d*)y\s*=\s*(-?\d+)/);
    if (!cleanInput) throw new Error ("Invalid equation format.");

    const xCo = parseInt(cleanInput[1] || "1", 10);
    const yCo = parseInt(cleanInput[2].replace(/\s+/g, ""), 10);
    const solution = parseInt(cleanInput[3], 10);

    return [xCo, yCo, solution];
}

function solveLinearEquation(equation) {
    const [xCo, yCo, solution] = parseLinearEquation(equation);
    const { gcd, x, y } = bezoutCoefficients(xCo, yCo);

    if (solution % gcd !== 0) return "No solutions";
    return [parseInt(x * (solution / gcd)), parseInt(y * (solution / gcd))];
}

console.log(solveLinearEquation("15A - 10B = 25"));