import pandas as pd
from sklearn.model_selection import train_test_split

X_FILTER = [
    'time_rms', 'time_skewness', 'time_kurtosis', 'time_crest_factor',
    'time_shape_factor', 'time_mean', 'time_std', 'time_peak',
    'time_mean_diff', 'time_std_diff', 'time_min_diff', 'time_max_diff',
    'fft_centroid', 'fft_bandwidth', 'fft_peak_freq', 'fft_over_env',
    'fft_amp_1x', 'fft_amp_2x', 'fft_amp_3x', 'fft_amp_4x', 'fft_amp_5x', 
    'cD1_rms', 'cD1_kurtosis', 'cD2_rms', 'cD2_kurtosis', 
    'cD3_rms', 'cD3_kurtosis', 'cD4_rms', 'cD4_kurtosis', 
    'cD5_rms', 'cD5_kurtosis', 'cD6_rms', 'cD6_kurtosis', 
    'cD7_rms', 'cD7_kurtosis', 'normal', 'anomaly',
    'bearing', 'misalignment', 'unbalance', 'rotor', 'cavitation',
    'real_normal'
]
Y_FILTER = ['real_normal']

ALL_FILTER = [
    'time_rms', 'time_skewness', 'time_kurtosis', 'time_crest_factor',
    'time_shape_factor', 'time_mean', 'time_std', 'time_peak',
    'time_mean_diff', 'time_std_diff', 'time_min_diff', 'time_max_diff',
    'fft_centroid', 'fft_bandwidth', 'fft_peak_freq', 'fft_over_env',
    'fft_amp_1x', 'fft_amp_2x', 'fft_amp_3x', 'fft_amp_4x', 'fft_amp_5x', 
    'cD1_rms', 'cD1_kurtosis', 'cD2_rms', 'cD2_kurtosis', 
    'cD3_rms', 'cD3_kurtosis', 'cD4_rms', 'cD4_kurtosis', 
    'cD5_rms', 'cD5_kurtosis', 'cD6_rms', 'cD6_kurtosis', 
    'cD7_rms', 'cD7_kurtosis', 'normal', 'anomaly',
    'bearing', 'misalignment', 'unbalance', 'rotor', 'cavitation',
    'real_normal'
]

def split_data(df):
    """
    정상인 데이터를 학습용으로 사용하고, 전체 데이터를 섞어 평가용 데이터셋으로 구성함.

    Parameters
    ----------
    df : pandas.DataFrame
        Full feature dataframe after preprocessing
    
    Returns
    -------
    train_df : pandas.DataFrame
        Subset of df where normal dataset (used for training)
    test_df : pandas.DataFrame
        Shuffled full dataset (used for evaluation or inference)
    """
    train_df = df[df.real_normal==1].reset_index(drop=True)
    test_df = df.sample(frac=1).reset_index(drop=True)
    return train_df, test_df
