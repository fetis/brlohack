import {loadChart} from './load-chart.js';

export function load() {
  const selector = document.querySelector('#selRecepie');
  selector.addEventListener('change', (event) => {
    loadChart(event.target.value, trendChart);
  });

  const trendChart = new CanvasJS.Chart("trendChart", {
    axisY: {
      maximum: 100
    },
    data: []
  });

  loadChart(selector.value, trendChart);
}