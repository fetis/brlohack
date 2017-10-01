import {nowIndex} from "./config.js";
import hopsTrender, {hopsAmountTrend} from './hops.js'

import recepies from '../data/recepies.js';

export function updateHopsChart(data, chart, hopsTrendChart) {
  const recepie = getCurrentRecepie();

  const series = [];

  recepie.hops.forEach(hopsItem => {
    const hopsData = hopsTrender(hopsItem, data);

    series.push({
      type: 'column',
      showInLegend: true,
      legendText: hopsItem.name + ' Amount',
      axisYindex: 0,
      dataPoints: hopsAmountTrend(hopsData, document.querySelector("#selRecepie").value)
    }
      );
  });

  chart.options = {
    axisX: {
      minimum: data[0].time
    },
    data: series
  };

  chart.render();

  // hops trend in % is same for all hops.
  // todo: remove 2 runs of trender
  const hop = recepie.hops[0];
  const hopsSerie = hopsTrender(hop, data)
    .map(item => {
      return {
        x: item.time,
        y: (item.h / hop.amount - 1) * 100
      }
    });

  hopsTrendChart.options = {
    axisX: {
      minimum: data[0].time
    },
    data: [{
      type: 'spline',
      showInLegend: true,
      legendText: 'Percentage',
      dataPoints: hopsSerie
    }
    ]
  };

  hopsTrendChart.render();
}

function getCurrentRecepie() {
  const selValue = document.querySelector("#selRecepie").value;
  return recepies[selValue];
}