/**
 * Approximates any real number using integer values p, q where
 * p / q is within "epsilon" distance of the real number.
 *
 * Uses dirichlet's Approximation Theorem to find the qth multiple of
 * the real number within 1/qN of the nearest integer. q's existence
 * is guaranteed by the pigeonhole principle.
 */
export function dirichletApproximation(realNum, epsilon) {
    let limit = Math.round(1 / epsilon);
    let fractionals = [];

    while (true) {
        for (let i = 0; i < limit; i++) fractionals[i] = (realNum * i) % 1;

        for (let i = 0; i < limit; i++) {
            for (let j = i + 1; j <= limit; j++) {
                if (Math.abs(fractionals[i] - fractionals[j]) < (Math.abs(i - j) / limit))
                    return [Math.round((j - i) * realNum), j - i];
            }
        }
        limit++;
    }
}