import pandas as pd
from fbprophet import Prophet

def predict(filename, filename_out, colname, periods=52, conf_int=0.95, ws=False, ms=False, predfreq='W'):
    '''
    filename: string, csv-file with data
    filename_out: string, output file
    colname: string, name of column
    periods: int, number of periods used
    conf_int: float, confidence interval
    ws: bool, weekly seasonality
    ms: bool, monthly seasonality
    predfreq: string, 'M' for months, 'W' for weeks etc.
    
    returns: csv
    '''
    df = pd.read_csv(filename)
    
    if predfreq == 'W':
        time = 'Week'
    if predfreq == 'M':
        time = 'Month'
    
    df = df.rename(columns={time: 'ds',
                        colname: 'y'})
    # required by prophet-package
    
    my_model = Prophet(interval_width=conf_int, weekly_seasonality=ws)#, monthly_seasonality=ms)
    my_model.fit(df)
    
    future_dates = my_model.make_future_dataframe(periods=periods, freq=predfreq)
    #future_dates = Prophet.make_future_dataframe(my_model, periods=8, freq='day')
    forecast = my_model.predict(future_dates)
    
    my_model.plot(forecast,
              uncertainty=True)
    
    forecast.to_csv(path_or_buf=filename_out)