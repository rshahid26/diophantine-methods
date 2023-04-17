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
function bezoutCoefficients(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    else {
        const { gcd, x, y } = bezoutCoefficients(b, mod(a, b));
        // noinspection JSSuspiciousNameCombination
            return {
            gcd: gcd,
            x: y,
            y: x - y * Math.floor(a / b),
        };
    }
}

/**
 * Takes a linear diophantine equation in the form of a string and
 * extracts the coefficients, variables, and solutions.
 */
function parseLinearEquation(equation) {
    const cleanInput = equation
        .match(/(-?\d*)([a-zA-Z])\s*([+\-]\s*\d*)([a-zA-Z])\s*=\s*(-?\d+)/);

    if (!cleanInput) throw new Error("Invalid equation format.");
    else return {
        xCo: parseInt(cleanInput[1] || "1", 10),
        xName: cleanInput[2],
        yCo: parseInt(cleanInput[3].replace(/\s+/g, ""), 10),
        yName: cleanInput[4],
        solution: parseInt(cleanInput[5], 10),
    };
}

/**
 * Solves a Diophantine linear equation of the form ax + by = c,
 * where a, b, and c are integers.
 *
 * Returns the origin solution, being the Bezout Coefficients
 * scaled by (c / GCD), as well as the set of all solutions,
 * being a parameterized linear equation.
 */
function solveLinearEquation(equation) {
    const { xCo, xName, yCo, yName, solution} = parseLinearEquation(equation);
    const { gcd, x, y } = bezoutCoefficients(xCo, yCo);

    if (solution % gcd !== 0) return "No solutions";
    const xOrigin = parseInt(x * (solution / gcd));
    const yOrigin = parseInt(y * (solution / gcd));

    return {
        [xName]: xOrigin,
        [yName]: yOrigin,
        set: {
            [xName]: `${xOrigin} ${yCo / gcd >= 0 ? "+" : "-"} ${Math.abs(parseInt(yCo / gcd))}t`,
            [yName]: `${yOrigin} ${yCo / gcd >= 0 ? "+" : "-"} ${Math.abs(parseInt(xCo / gcd))}t`
        }
    }
}

function printLinearSolution(equation) {
    const { xCo, xName, yCo, yName, solution} = parseLinearEquation(equation);
    const { gcd, x, y } = bezoutCoefficients(xCo, yCo);

    console.log(
        xCo + "(" + parseInt(x * (solution / gcd)) + ") + " +
        yCo + "(" + parseInt(y * (solution / gcd)) + ") = " +
        solution
    );
}