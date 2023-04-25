import fs from 'fs';
import { continuedApproximation } from "../scripts/dirichlet.js";
import { dirichletApproximation } from "../scripts/dirichlet.js";
import { fareyApproximation } from "../scripts/farey.js";
import { nearestFareyFraction } from "../scripts/farey.js";

const testData = "bench/testdata.txt";
const output = "bench/output.txt";

function generateRealNums(count, min, max) {
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

function length(fraction) {
    return fraction[0].toString().length + fraction[1].toString().length;
}

function simulate(method, realNums, epsilon, sample = realNums.length) {
    const lengths = [];

    for (let i = 0; i < sample; i++) {
        lengths.push(length(method(realNums[i], epsilon)));
        //console.log(method(realNums[i], epsilon));
    }
    const sum = lengths.reduce((sum, value) => sum + value);
    return sum / sample;
}

function publish(lengths, epsilon, sample) {

    const line = "\nn: " + sample + " ε: " + epsilon + " | " + lengths;
    fs.appendFile(output, line, (err) => {
        if (err) console.error(err);
        else console.log('lengths saved to', output);
    });
}

fs.readFile(testData, 'utf-8', (err, data) => {
    if (err) console.error(err);
    else {
        const realNums = data.split('\n').map(Number);
        const epsilon = 0.000001;
        const sample = 10000;

        const lengths = [];
        lengths.push(simulate(continuedApproximation, realNums, epsilon, sample));
        lengths.push(simulate(dirichletApproximation, realNums, epsilon, sample));
        lengths.push(simulate(fareyApproximation, realNums, epsilon, sample));
        //lengths.push(simulate(nearestFareyFraction, realNums, epsilon, sample));
        
        publish(lengths, epsilon, sample);
    }
});


