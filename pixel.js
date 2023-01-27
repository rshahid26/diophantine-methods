import {chartData} from "./data.js"

const image = document.getElementById("image");
/*
function createCanvas() {
    let myImg = new Image();
    myImg.src = 'vxx%20vxxiv.PNG';
    let context = document.getElementById('image_canvas').getContext('2d');
    context.drawImage(myImg, 0, 0);
    let pixel = context.getImageData(x, y, 1, 1).data;
}
createCanvas();

 */

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

/*
let array = data.split("image.html?_ijt=kar3nu0klhfkcrargbp9dib3ai&_ij_reload=RELOAD_ON_SAVE:46 ").map(n => n.replace(/(\r\n|\n|\r|0000000000001|0000000000002|0000000000003|0000000000004|0000000000005|0000000000006|0000000000007|0000000000008|0000000000009)/gm, "")).map(n => [n.split(" ")[0], n.split(" ")[1]]);
let previousTime = 0;
for (let key in array) {

    if (Number(array[key][0]) === previousTime) delete array[key];
    else previousTime = Number(array[key][0]);

}
let newArray = [];
array.forEach(n => newArray.push(n));

 */

let chartData2 = cleanData(chartData);
console.log(chartData);

function oneToTwo(data) {

    let keyArray = [];
    for (let key in data) {

        for (let time of keyArray) {
            if (time === data[key][0]) console.log(time);
        }

        keyArray.push(data[key][0]);
    }
}


createChart(chartData2);

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

image.addEventListener("click", (e) => {
    image.addEventListener("mousemove", (e) => {

        let coordinate = {
            x: Math.abs(image.getBoundingClientRect().left - e.clientX) - chart.origin.x,
            y: Math.abs(image.getBoundingClientRect().bottom - e.clientY) - chart.origin.y,
        }

        let timeStamp = Math.round(coordinate.x / (chart.dimensions.x / (chart.scale.x)));
        let price = chart.origin.yVal + Math.round(coordinate.y / (chart.dimensions.y / chart.scale.y) * 100) / 100;

        console.log(timeStamp, price);
        //data.push([timeStamp, price]);
        cleanData();

        //console.log(data);

    });
})


function createChart(data) {

    const ctx = document.getElementById("myChart");

    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'first attempt',
                data: data,
                fill: false,
                borderColor: 'rgb(81,248,60)',
                tension: 0.1
            }]
        }
    });
}
