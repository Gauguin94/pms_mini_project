import torch
from tqdm import tqdm
from sklearn.preprocessing import StandardScaler

X_FILTER = [
    'time_rms', 'time_skewness', 'time_kurtosis', 'time_crest_factor',
    'time_shape_factor', 'time_mean', 'time_std', 'time_peak',
    'time_mean_diff', 'time_std_diff', 'time_min_diff', 'time_max_diff',
    'fft_centroid', 'fft_bandwidth', 'fft_peak_freq', 'fft_over_env',
    'fft_amp_1x', 'fft_amp_2x', 'fft_amp_3x', 'fft_amp_4x', 'fft_amp_5x',
    'cD1_rms', 'cD1_kurtosis', 'cD2_rms', 'cD2_kurtosis', 
    'cD3_rms', 'cD3_kurtosis', 'cD4_rms', 'cD4_kurtosis', 
    'cD5_rms', 'cD5_kurtosis', 'cD6_rms', 'cD6_kurtosis', 
    'cD7_rms', 'cD7_kurtosis'
]

class stdScaling:
    """
    StandardScaler를 사용해 입력 데이터의 feature 값을 표준 정규화(z-score)하는 클래스

    Parameters
    ----------
    df : pandas.DataFrame
        Input feature dataframe used to fit the scaler
    
    Attributes
    ----------
    scaler : sklearn.preprocessing.StandardScaler
        Scaler object fitted on training data feature
    """
    def __init__(self, df):
        self.scaler = StandardScaler()
        self.scaler.fit(df[X_FILTER])

    def scaling(self, df):
        """
        입력 DataFrame의 feature 컬럼을 표준 정규화하여 반환

        Parameters
        ----------
        df : pandas.DataFrame
            Feature DataFrame to transform
        
        Returns
        -------
        self.scaler.transform(df[X_FILTER]) : np.ndarray
            Standardized feature array
        """
        return self.scaler.transform(df[X_FILTER])

def df2torch(df):
    """
    DataFrame을 PyTorch 텐서로 변환.

    Parameters
    ----------
    df : pandas.DataFrame
        DataFrame containing only input features
    
    Returns
    -------
    torch.tensor(arr, dtype=torch.float32) : torch.FloatTensor
        Tensor with shape (N, num_features), dtype float32
    """
    arr = df[X_FILTER].values
    return torch.tensor(arr, dtype=torch.float32)