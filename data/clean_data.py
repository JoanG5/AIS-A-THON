from scipy import stats
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from scipy.stats import skew 

 
# Load the dataset
data = pd.read_csv("Healthcare-Diabetes.csv")


# Delete entries with empty values
# print(data.shape)
# data.dropna(inplace=True)
# print(data.shape)


for col in data:
    skewness = skew(data[col], axis=0, bias=True)
    if skewness > 1:
        print(f"Column: {col}")
        print(f"Skewness: {skewness}")
        print(f"Log Transforming {col}")
        data[col] = np.log(data[col] + 1)
        print(f"New Skewness: {skew(data[col], axis=0, bias=True)}")
        print("\n")

    if skewness < 0:
        print(f"Column: {col} has negative skewness")

print(data)
data.to_csv("clean_data.csv", index=False)

# print(skew(data, axis=0, bias=True))

# insulin = data['Insulin']
# print(skew(insulin, axis=0, bias=True))

# liInsulin = np.log(insulin + 1)

# print(skew(liInsulin, axis=0, bias=True))




# # Show original data
# sns.boxplot(data['Pregnancies'])
# plt.show()

# # Remove outliers
# removed_outliers = data[data['Pregnancies'] <= 10]

# sns.boxplot(removed_outliers['Pregnancies'])
# plt.title(f'Box Plot without Outliers of Pregnancies')
# plt.show()


# z = np.abs(stats.zscore(data['Pregnancies']))
# threshold_z = 2
# outlier_indices = np.where(z > threshold_z)[0]
# no_outliers = data.drop(outlier_indices)
# print("Original DataFrame Shape:", data.shape)
# print("DataFrame Shape after Removing Outliers:", no_outliers.shape)

# Q1 = np.percentile(data['Pregnancies'], 25, method='midpoint')
# Q3 = np.percentile(data['Pregnancies'], 75, method='midpoint')
# IQR = Q3 - Q1
# print(IQR)