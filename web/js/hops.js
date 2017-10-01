import {nowIndex} from "./config.js";
import productionData from '../data/production.js';

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

export function hopsAmountTrend(hopsData, recepieName) {
  const lastProductionAmount = productionData[0][recepieName];
  const productionPredict = hopsData.map(item => {
    return {
      time: item.time,
      amount: lastProductionAmount * item.h / 1000 // conversion to kg
    }
  });
  const hopsAmount = [];

  // grouping by months
  let lastPeriod = productionPredict[0].time.getYear();
  let monthlyAmount = productionPredict[0].amount;
  productionPredict.forEach(item => {
    const currentPeriod = item.time.getYear();

    if (currentPeriod !== lastPeriod) {
      hopsAmount.push({
        x: item.time,
        y: monthlyAmount
      });
      lastPeriod = currentPeriod;
      monthlyAmount = item.amount;
    } else {
      monthlyAmount += item.amount;
    }
  });

  return hopsAmount;
}