import {loadData} from './data-loader.js';
import {updateTrendChart} from "./trend-chart.js";
import {updateHopsChart} from "./hops-chart.js";

export function loadChart(filename, chart, hopsChart) {
  loadData(filename)
    .then(data => {
      updateTrendChart(data, chart);
      updateHopsChart(data, hopsChart);
    });
}

