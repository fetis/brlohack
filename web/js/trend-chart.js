import {nowIndex} from "./config.js";

export function updateTrendChart(data, chart) {
  const confidenceBand = data
    .slice(nowIndex - data.length)
    .map(item => {
      return {
        x: item.time,
        y: [item.yhat_lower, item.yhat_upper]
      };
    });

  const prediction = data
    .slice(nowIndex - data.length)
    .map(item => {
      return {
        x: item.time,
        y: item.yhat
      }
    });

  const historical = data.map(item => {
    return {
      x: item.time,
      y: item.y_hist
    }
  });

  const now = [
    {
      x: data[nowIndex].time,
      y: 100
    }
  ];

  chart.options.data = [
    {
      type: "rangeArea",
      showInLegend: true,
      legendText: 'Confidence Band',
      dataPoints: confidenceBand
    }, {
      type: 'spline',
      showInLegend: true,
      legendText: 'Prediction',
      dataPoints: prediction
    }, {
      type: 'spline',
      showInLegend: true,
      legendText: 'Historical data',
      dataPoints: historical
    }, {
      type: 'column',
      dataPoints: now
    }
  ];

  chart.render();
}