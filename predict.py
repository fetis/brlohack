import pandas as pd
from fbprophet import Prophet

def predict(filename, filename_out, conf_int=0.95, ws=False, ms=False, predfreq='MS'):
    '''
    filename: string, csv-file with data
    filename_out: string, output file
    conf_int: float, confidence interval
    ws: bool, weekly seasonality
    ms: bool, monthly seasonality
    predfreq: string, 'MS' for months (I think!)
    
    returns: csv
    '''
    df = pd.read_csv('passengers.csv')
    
    df = df.rename(columns={'Month': 'ds',
                        'AirPassengers': 'y'})
    # required by prophet-package
    
    my_model = Prophet(interval_width=conf_int, weekly_seasonality=ws)#, monthly_seasonality=ms)
    my_model.fit(df)
    
    future_dates = my_model.make_future_dataframe(periods=36, freq=predfreq)
    forecast = my_model.predict(future_dates)
    
    forecast.to_csv(path_or_buf=filename_out)