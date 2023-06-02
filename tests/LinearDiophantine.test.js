import { returnDiophantineEquation } from "../scripts/LinearDiophantine.js";

describe("DiophantineEquation", () => {
    testCases.forEach((testCase, index) => {
        const equation = returnDiophantineEquation(testCase.equation);

        describe(`Test case #${index + 1}`, () => {
            test("evalWithParameters", () => {
                const expected = equation.getSolution();
                const actual = equation.evalWithParameters(testCase.parameterValues);
                expect(actual).toEqual(expected);
            });

            test("evalWithVariables", () => {
                const expected = equation.getSolution();
                const actual = equation.evalWithVariables(testCase.variableValues);
                expect(actual).toEqual(expected);
            });

            test("randomSolution", () => {
                const solution = equation.randomSolution();
                const actual = equation.evalWithVariables(solution);
                const expected = equation.getSolution();
                expect(actual).toEqual(expected);
            });

            test("leastPositiveSolution", () => {
                const solution = equation.leastPositiveSolution();
                const actual = equation.evalWithVariables(solution);
                const expected = equation.getSolution();
                expect(actual).toEqual(expected);
            });

            test("leastPositiveMagnitude", () => {
                const solution = equation.leastPositiveMagnitude();
                const actual = equation.evalWithVariables(solution);
                const expected = equation.getSolution();
                expect(actual).toEqual(expected);
            });

            test("getRatios", () => {
                const ratios = equation.getRatios();
                expect(ratios).toBeTruthy();
            });
        });
    });
});

const testCases = [
    {
        equation: "5n + 10d + 25q = 200",
        variableValues: [4, 0, 8],
        parameterValues: [1, 1, 1],
    },
    {
        equation: "5a + 10b + 25c = 200",
        variableValues: [4, 0, 8],
        parameterValues: [1, 1, 1],
    },
    {
        equation: "2d + 8e + 15f = 100",
        variableValues: [10, 5, 2],
        parameterValues: [1, 1, 1],
    },
    {
        equation: "7g + 12h + 22i = 500",
        variableValues: [20, 30, 10],
        parameterValues: [1, 1, 1],
    },
    {
        equation: "3j + 9k + 27l = 75",
        variableValues: [10, 2, 1],
        parameterValues: [1, 1, 1],
    },
    // Edge case: no coins
    {
        equation: "4m + 8n + 16o = 0",
        variableValues: [0, 0, 0],
        parameterValues: [1, 1, 1],
    },
    // Edge case: only first type
    {
        equation: "6p + 12q + 24r = 100",
        variableValues: [20, 0, 0],
        parameterValues: [1, 1, 1],
    },
    // Edge case: only second type
    {
        equation: "5s + 10t + 30u = 100",
        variableValues: [0, 10, 0],
        parameterValues: [1, 1, 1],
    },
    // Edge case: only third type
    {
        equation: "2v + 4w + 8x = 100",
        variableValues: [0, 0, 4],
        parameterValues: [1, 1, 1],
    },
    // Edge case: negative values
    {
        equation: "3y + 6z + 9aa = 200",
        variableValues: [-4, -8, -16],
        parameterValues: [1, 1, 1],
    }
];
