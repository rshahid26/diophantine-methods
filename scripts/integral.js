/**
 * Implementations of Riemann sums. Used to integrate asymptotic functions.
 *
 * @param f the one-variable function to be integrated
 * @param a left bound
 * @param b right bound
 *
 * @param intervals the number of steps or bars in the approximation.
 * Defaults to 100_000.
 */

export function leftRiemannSum(f, a, b, intervals = 100_000) {
    const dx = (b - a) / intervals;
    let sum = 0;

    for (let i = 0; i < intervals; i++)
        sum += f(a + i * dx) * dx;

    return sum;
}

export function rightRiemannSum(f, a, b, intervals = 100_000) {
    const dx = (b - a) / intervals;
    let sum = 0;

    for (let i = 1; i <= intervals; i++)
        sum += f(a + i * dx) * dx;

    return sum;
}

export function midpointRiemannSum(f, a, b, intervals = 100_000) {
    const dx = (b - a) / intervals;
    let sum = 0;

    for (let i = 0; i < intervals; i++)
        sum += f(((a + i * dx) + (a + (i + 1) * dx)) / 2) * dx;

    return sum;
}

export function trapezoidalRiemannSum(f, a, b, intervals = 100_000) {
    const dx = (b - a) / intervals;
    let sum = 0;

    for (let i = 0; i < intervals; i++) {

        const y1 = f(2 + i * dx);
        const y2 = f(2 + (i + 1) * dx);

        sum += (y1 + y2) / 2 * dx;
    }
    return sum;
}