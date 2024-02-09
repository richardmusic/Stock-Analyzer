// Global trend direction flags and counter for ES and NQ
let trendInfoES = { trendDirection: Math.random() < 0.5 ? 1 : -1, counter: 0, changeAfter: 14 };
let trendInfoNQ = { trendDirection: Math.random() < 0.5 ? 1 : -1, counter: 0, changeAfter: 14 };

function adjustTrend(trendInfo) {
    trendInfo.counter++;
    // Reverse trend direction after specified updates (7 seconds)
    if (trendInfo.counter >= trendInfo.changeAfter) {
        trendInfo.trendDirection *= -1; // Reverse trend
        trendInfo.counter = 0; // Reset counter
    }
}

function getRandomStockPrice(symbol) {
    let basePrice, variation, trendInfo;
    if (symbol === 'ES') {
        basePrice = 4850;
        variation = 200;
        trendInfo = trendInfoES;
    } else if (symbol === 'NQ') {
        basePrice = 17300;
        variation = 500;
        trendInfo = trendInfoNQ;}

    // Adjust trend
    adjustTrend(trendInfo);

    // Apply a consistent trend adjustment, making the price move in the trend direction more noticeably
    let priceAdjustment = trendInfo.trendDirection * (Math.floor(Math.random() * 50) + 1);
    let price = basePrice + priceAdjustment;

    // Ensure price stays within a reasonable range to simulate a trending market
    price = Math.min(Math.max(price, basePrice - variation), basePrice + variation);

    return parseFloat(price.toFixed(2));
}

// The rest of your chart updating function remains the same


// The rest of your chart updating function remains the same

function createAndUpdateLineChart(canvasId, yAxisMin, yAxisMax) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    let chart; // Declare a variable to hold the chart instance
    const chartData = {
        labels: [],
        datasets: [{
            label: '',
            data: [],
            borderColor: canvasId === 'es-chart' ? '#6b6b6b' : 'red',
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
            pointBorderWidth: 1,
            lineTension: 0.2,
        }],
    };

    function updateLineChart() {
        if (chart) {chart.destroy();}
        const stockPrice = getRandomStockPrice(canvasId === 'es-chart' ? 'ES' : 'NQ');
        const currentTime = new Date().toLocaleTimeString();
        chartData.labels.push(currentTime);
        chartData.datasets[0].data.push(stockPrice);
        context.clearRect(0, 0, canvas.width, canvas.height);
        let yAxisTitle = canvasId === 'es-chart' ? 'S&P500' : 'Nasdaq';
        chart = new Chart(context, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {legend: {display: false}},
                animations: {y: { duration: 0 }},
                scales: {
                    x: {display: false,
                        title: {display: true,text: 'Time',},
                        ticks: {color: 'rgba(0, 0, 0, 0.3)'}},
                    y: {display: true,
                        title: {display: true,
                            text: yAxisTitle,},
                        suggestedMin: yAxisMin,
                        suggestedMax: yAxisMax,
                        ticks: {font: {}, color: '#525252', // Change the font color if needed
                        },
                    },
                },
            },
        });
        setTimeout(updateLineChart, 300);
    }

    updateLineChart();
}

// Create and update the line charts for 'ES' and 'NQ'
createAndUpdateLineChart('es-chart', 4800, 4940);
createAndUpdateLineChart('nq-chart', 17100, 17600);



//   function getRandomStockPrice(symbol) {   let price;
//     if (symbol === 'ES') {
//       price = (Math.random() * (4950 - 4850) + 4850).toFixed(2);
//     } else if (symbol === 'NQ') {
//       price = (Math.random() * (17400 - 17300) + 17300).toFixed(2);
//     }
//     return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
  
//   function updateStockPrices() {
//     const stockSymbols = ['ES', 'NQ'];
//     const stockData = {};
//     stockSymbols.forEach((symbol) => {
//       stockData[symbol] = getRandomStockPrice(symbol);});
  
//     const stockDataDiv = document.getElementById('stock-data');
//     stockDataDiv.innerHTML = 
//      `<p>ES: $${stockData['ES']}</p>
//       <p>NQ: $${stockData['NQ']}</p>`;
  
//     setTimeout(updateStockPrices, 1000);
  
//     console.log(stockData);
//   }
  
//   // Start updating stock prices
//   updateStockPrices();
  
