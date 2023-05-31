import { bezoutCoefficients } from '../scripts/LinearDiophantine.js';
import { solveDiophantineEquation } from '../scripts/LinearDiophantine.js';

test('bezoutCoefficients returns the correct result', () => {
    const result = bezoutCoefficients(10, 6);
    expect(result).toEqual({ gcd: 2, x: -1, y: 2 });
});

describe('bezoutCoefficients', () => {
    test('it should return the correct result', () => {
        const result = bezoutCoefficients(10, 6);
        expect(result).toEqual({ gcd: 2, x: -1, y: 2 });
    });
});

describe('solveDiophantineEquation', () => {
    test('it should solve a Diophantine linear equation', () => {
        const result = solveDiophantineEquation("4x + 10y = 22");
        expect(result).toEqual({
            x: -9,
            y: 4,
            set: {
                x: "-9 + 5t",
                y: "4 - 2t",
            },
        });
    });

    test('it should throw an error if equation is invalid', () => {
        expect(() => solveDiophantineEquation("invalid equation")).toThrow();
    });
});
