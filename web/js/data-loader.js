import parseCSV from './csv.js';

function loadCSV(filename) {
  return fetch(filename)
    .then(response => {
      return response.text();
    })
    .then(text => {
      let arr = parseCSV(text, {});
      // skip headers section and broken last row
      arr = arr.slice(1);
      arr = arr.slice(0, arr.length - 1);

      return arr;
    })
}

export function loadData(filename) {
  return Promise.all([
    loadHistoricalData(filename),
    loadPredictionData(filename)
  ])
    .then(values => {
      const historical = values[0];
      const predictions = values[1];

      const data = predictions.map(value => {
        return {
          time: value.time,
          yhat_lower: value.yhat_lower,
          yhat_upper: value.yhat_upper,
          yhat: value.yhat
        }
      });

      historical.forEach((value, index) => {
        data[index].y_hist = value
      });

      return data;
    })
}

export function loadPredictionData(filename) {
  return loadCSV(`data/${filename}.csv`)
    .then(arr => {
      const data = arr.map(item => {
        return {
          time: new Date(item[1]),
          yhat_lower: parseFloat(item[8]),
          yhat_upper: parseFloat(item[9]),
          yhat: parseFloat(item[14])
        }
      });

      return data;
    });
}

export function loadHistoricalData(filename) {
  return loadCSV(`data/${filename}_y.csv`)
    .then(arr => {
      return arr.map(item => parseFloat(item[0]))
    })
}