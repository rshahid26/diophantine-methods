import {data} from "./data.js"

const image = document.getElementById("image");
const chart = {
    origin: {
        x: 43,
        y: 48,
        xVal: 930,
        yVal: 23.96
    },
    dimensions: {
        x: 715,
        y: 1765
    },
    scale: {
        x: 14 * 60, // in MINUTES
        y: 18.06 // in DOLLARS
    }
}

image.addEventListener("click", (e) => {

    let coordinate = {
        x: Math.abs(image.getBoundingClientRect().left - e.clientX) - chart.origin.x,
        y: Math.abs(image.getBoundingClientRect().bottom - e.clientY) - chart.origin.y,
    }

    let timeStamp = Math.round(coordinate.x / (chart.dimensions.x / (chart.scale.x)));
    let price = chart.origin.yVal + Math.round(coordinate.y / (chart.dimensions.y / chart.scale.y) * 100) / 100;

    let array = data.split("image.html?_ijt=kar3nu0klhfkcrargbp9dib3ai&_ij_reload=RELOAD_ON_SAVE:46 ").map(n => n.replace(/(\r\n|\n|\r|0000000000001|0000000000002|0000000000003|0000000000004|0000000000005|0000000000006|0000000000007|0000000000008|0000000000009)/gm, "")).map(n => [n.split(" ")[0], n.split(" ")[1]]);

    let previousTime = 0;
    for (let key in array) {

        if (Number(array[key][0]) === previousTime) delete array[key];
        else previousTime = Number(array[key][0]);

    }

    let newArray = [];
    array.forEach(n => newArray.push(n));

    console.log(newArray);
    console.log(timeStamp, price);

});