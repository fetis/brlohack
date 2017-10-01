import {loadChart} from './load-chart.js';

export function load() {
  const selector = document.querySelector('#selRecepie');
  selector.addEventListener('change', (event) => {
    loadChart(event.target.value, trendChart, hopsChart, hopsTrendChart);
  });

  const trendChart = new CanvasJS.Chart("trendChart", {
    axisY: {
      maximum: 100
    },
    data: []
  });

  const hopsChart = new CanvasJS.Chart("hopsChart", {
    data: []
  });

  const hopsTrendChart = new CanvasJS.Chart("hopsTrendChart", {
    data: []
  });

  loadChart(selector.value, trendChart, hopsChart, hopsTrendChart);
}