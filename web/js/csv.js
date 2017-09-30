/*
The MIT License (MIT)
Copyright (c) 2016 Rawikitua Isherwood
Parse module creates an object or set of arrays from a csv file by splitting the text at each new
line and splitting each line at comma marks.*/

export default function parse (input, option){
  try
  {
    // output object
    var data = {},
      // output no columns array
      container = [],
      // output array
      records = [],
      // splits csv data at each new line
      lines =input.split(/\r\n|\r|\n/),
      // creates columns by splitting first line of csv
      columns = lines[0].split(',');
    // creates objects from csv data if column option included
    if (option === true){

      // loop through each line of csv file
      for (var l = 1; l <= lines.length-1; l++)
      {
        // splits each line of csv by comma
        var words = lines[l].split(',');

        // builds object based on column headers
        for (var cell in columns)
        {
          data[columns[cell]] = words[cell];
        }
        // pushes object to output array
        records.push(data);
        // resets object in order to add another
        data = {};
      }
    }
    else {
      // creates nested arrays from csv data if column option omitted,false or not true
      for (var l = 0; l <= lines.length-1; l++)
      {
        // splits each line of csv by comma
        var words = lines[l].split(',');
        // creates objects from csv data
        for (var cell in words)
        {
          container.push(words[cell]);
        }
        // push array to output array
        records.push(container);
        // reset array in order to add another
        container = [];
      }
    }
    // returns output array
    return records
  }
  catch(err){
    return err
  }
};
