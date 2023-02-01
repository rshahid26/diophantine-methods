import {chartData} from "./data.js"

const image = document.getElementById("image");

const chart = {
    origin: {
        x: 43,
        y: 48,
        xVal: 930,
        yVal: 25.23
    },
    dimensions: {
        x: 715,
        y: 1715
    },
    scale: {
        x: 14 * 60, // in MINUTES
        y: 2.82 // in DOLLARS
    }
}

let currData = [];
image.addEventListener("click", (e) => {
    let coordinate = {
        x: Math.abs(image.getBoundingClientRect().left - e.clientX) - chart.origin.x,
        y: Math.abs(image.getBoundingClientRect().bottom - e.clientY) - chart.origin.y,
    }

    let timeStamp = Math.round(coordinate.x / (chart.dimensions.x / (chart.scale.x)));
    let price = chart.origin.yVal + Math.round(coordinate.y / (chart.dimensions.y / chart.scale.y) * 100) / 100;

    console.log(timeStamp, price);
    currData.push([timeStamp, price]);
    console.log(currData);
})

console.log(chartData);
createChart(chartData);


function cleanData(data) {

    let previousTime = 0;
    for (let key in data) {

        data[key][1] = Number(data[key][1].toString().replace(/(\r\n|\n|\r|0000000000001|0000000000002|0000000000003|0000000000004|0000000000005|0000000000006|0000000000007|0000000000008|0000000000009)/gm, ""));

        if (Number(data[key][0]) === previousTime) delete data[key];
        else previousTime = Number(data[key][0]);

    }

    let tempData = [];
    data.forEach(n => tempData.push(n));
    data = tempData;

    return data;

}

function createChart(data) {

    let dataX = [];
    let dataY = [];
    for (let element of data) {
        dataX.push(element[0]);
        dataY.push(element[1]);
    }

    const ctx = document.getElementById("myChart");

    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataX,
            datasets: [{
                label: 'INAV',
                data: dataY,
                fill: false,
                borderColor: 'rgb(41,208,41)',
                tension: 0.1,
                pointRadius: 0
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

}

function oneToTwo(data) {

    let keyArray = [];
    for (let key in data) {

        for (let time of keyArray) {
            if (time === data[key][0]) console.log(time + "oneToTwo");
            if (time > data[key][0]) console.log(time + "non decreasing");

        }

        keyArray.push(data[key][0]);
    }

    return keyArray;
}