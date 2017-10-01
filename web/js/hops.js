import {nowIndex} from "./config.js";

// calculate hops in x point according trend
function hopsFormula(hops0, hopsInRecepie, trendX) {
  return hopsInRecepie * trendX / hops0;
}

export default function hopsTrend(hops, trend) {
  const H0 = trend[nowIndex].yhat;

  const result = trend
    .slice(nowIndex - trend.length)
    .map(item => {
      return {
        time: item.time,
        h: hopsFormula(H0, hops.amount, item.yhat)
      }
    });

  return result;
}