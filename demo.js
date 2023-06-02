import { continuedApproximation } from "./src/dirichlet.js";
import { dirichletApproximation } from "./src/dirichlet.js";
import { fareyApproximation } from "./src/farey.js";
import { solveDiophantineEquation } from "./src/LinearDiophantine.js";

document.getElementsByTagName("form")[0].addEventListener("submit", (e) => {
    e.preventDefault();

    const equation = document.getElementById("equation").value;
    const solutions = solveDiophantineEquation(equation);

    console.log(solutions);

    refreshChart();
    if (solutions.x === undefined) document.getElementById("chart_fallback").innerText = "No Solutions";
    else createChart(solutions, createLinePoints(solutions, 6));
});

function createLinePoints(solutions, n) {
    if (n % 2 === 1) n--;
    const linePoints = [];

    const xCoefficient = solutions.set.x.split(" ")[2][0];
    const yCoefficient = solutions.set.y.split(" ")[2][0];

    for (let t = -n/2; t <= n/2; t++) {
        if (t === 0) continue;
        const x = solutions.x + xCoefficient * t;
        const y = solutions.y + yCoefficient * t;
        linePoints.push({ x, y });
    }
    return linePoints;
}

function createChart(solutions, linePoints) {
    refreshChart();
    const ctx = document.getElementById('myChart').getContext('2d');

    const chart = new Chart(ctx, {
        type: "line",
        data: {
            datasets: [
                {
                    label: "Origin",
                    data: [{ x: solutions.x, y: solutions.y }],
                    backgroundColor: "red",
                    borderColor: "red",
                    borderWidth: 1,
                    pointRadius: 5,
                    order: 1
                },
                {
                    label: "Value",
                    data: linePoints,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                    fill: false,
                    order: 2
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    onClick: null,
                },
            },
            scales: {
                x: {
                    beginAtZero: true,
                    type: "linear",
                    position: "bottom",
                    ticks: {
                        stepSize: 1,
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                    },
                },
            },
        },
    });
}

function refreshChart() {
    document.getElementById("chart_fallback").innerText = "";
    document.getElementById("chart_container").innerHTML = `<canvas id="myChart"></canvas>`;
}
