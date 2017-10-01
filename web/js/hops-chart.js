import {nowIndex} from "./config.js";
import hopsTrender from './hops.js'

import recepies from '../data/recepies.js';

export function updateHopsChart(data, chart) {
  const recepie = getCurrentRecepie();

  const series = [];

  recepie.hops.forEach(hopsItem => {
    const hopsData = hopsTrender(hopsItem, data);
    const hopsSerie = hopsData.map(item => {
      return {
        x: item.time,
        y: item.h
      }
    });

    series.push({
      type: 'spline',
      showInLegend: true,
      legendText: hopsItem.name,
      dataPoints: hopsSerie
    });
  });

  chart.options = {
    axisX: {
      minimum: data[0].time
    },
    data: series
  };

  chart.render();
}

function getCurrentRecepie() {
  const selValue = document.querySelector("#selRecepie").value;
  return recepies[selValue];
}