import pandas as pd
import numpy as np
data = pd.read_csv('./chatdata.csv', sep=';', dtype={'BillNo': str});
data.head();
data.isnull().sum();
data.dropna(subset=['Itemname'],inplace=True);
data.isnull().sum();
data.drop_duplicates(inplace=True);
df = pd.DataFrame(data);
transactions = df.groupby('Itemname').apply(','.join).reset_index();
transactions_str = '\n'.join(transactions.apply(lambda x: ','.join(x.dropna().astype(str)), axis=1));
transactions['Itemname'].head(30).str.replace(',', ', ').to_csv('output_last_test.csv', index=False)
