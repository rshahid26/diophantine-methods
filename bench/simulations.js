import fs from 'fs';
import { getContinuedFraction, continuedApproximation } from "../src/ContinuedFractions.js"
import { dirichletApproximation } from "../src/dirichlet.js";
import { fareyApproximation } from "../src/farey.js";
import { nearestFareyFraction } from "../src/farey.js";

const testData = "bench/testdata.txt";
const output = "bench/output.txt";

function generateRealNums(count, min = 0, max = 1) {
    const set = [];
    for (let i = 0; i < count; i++)
        set.push(Math.random() * (max - min) + min);

    return set;
}

function updateTestData(count, min, max) {
    const realNums = generateRealNums(count, min, max);
    const storedRealNums = realNums.join('\n');

    fs.writeFile(testData, storedRealNums, (err) => {
        if (err) console.error(err);
        else console.log('Random numbers saved to', testData);
    });
}

function len(fraction) {
    return fraction[0].toString().length + fraction[1].toString().length;
}

function approximation(realNum, epsilon) {
    if (epsilon < 1) return [Math.trunc(realNum / epsilon), 1 / epsilon];
    if (epsilon >= 1) return [Math.trunc(realNum / epsilon) * epsilon, 1];
}

function simulate(method, realNums, epsilon, sample = realNums.length) {
    const lengths = [];

    for (let i = 0; i < sample; i++) {
        lengths.push(len(method(realNums[i], epsilon)));
    }
    const sum = lengths.reduce((sum, value) => sum + value);
    return sum / sample;
}

function publish(sample, epsilon, averageLengths) {

    const line = "\nn: " + sample + " ε: " + epsilon + " | " + averageLengths;
    fs.appendFile(output, line, (err) => {
        if (err) console.error(err);
        else console.log('lengths saved to', output);
    });
}

/**
 * Returns average time complexity of continued fraction approximations,
 * which has complexity O(k^2). Use this to calculate k/n where n=1/epsilon,
 * the typical input for time complexities in this package.
 *
 * Also measures the distribution of realNums elements. Low (<0.01%) rate
 * of convergence means the sample is skewed towards small rationals and
 * quadratic irrationals.
 */
function getRateOfConvergence(realNums, epsilon, sample = realNums.length) {
    const lengths = [];

    for (let i = 0; i < sample; i++) {
        lengths.push(getContinuedFraction(realNums[i], epsilon).length ** 2);
        //if (lengths[i] > 100) console.log(lengths[i], realNums[i], getContinuedFraction(realNums[i], epsilon), continuedApproximation(realNums[i], epsilon));
    }

    return lengths.reduce((sum, value) => sum + value) / sample;
}

// fs.readFile(testData, 'utf-8', (err, data) => {
//     if (err) console.error(err);
//     else {
//         const realNums = data.split('\n').map(Number);
//         const epsilon = 0.000001;
//         const sample = 100000;
//
//         const averageLengths = [];
//         averageLengths.push(simulate(continuedApproximation, realNums, epsilon, sample));
//         averageLengths.push(simulate(dirichletApproximation, realNums, epsilon, sample));
//         averageLengths.push(simulate(fareyApproximation, realNums, epsilon, sample));
//         // averageLengths.push(simulate(nearestFareyFraction, realNums, epsilon, sample));
//
//         publish(sample, epsilon, averageLengths);
//     }
// });

// fs.readFile(testData, 'utf-8', (err, data) => {
//     if (err) console.error(err);
//     else {
//         const realNums = data.split('\n').map(Number);
//         const epsilon = 0.000001;
//         const sample = 100000;
//         console.log(getRateOfConvergence(realNums, epsilon, sample));
//     }
// });