import torch
import torch.nn as nn
import torch.optim as optim
import joblib
import pandas as pd
from tqdm import tqdm
from torch.utils.data import random_split, DataLoader

from auto_encoder.make_torch import stdScaling, df2torch
from model.load_and_arange import loadArange
from model.preprocess import preProcess
from model.split import split_data
from auto_encoder.model import AutoEncoder

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

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
Y_FILTER = ['real_normal']

# 🔧 하이퍼파라미터
input_dim = len(X_FILTER)
latent_dim = 8
hidden_dim = 32
batch_size = 8
learning_rate = 5e-3

if __name__ == "__main__":
    df = loadArange().load_arange()
    df = preProcess(df).preprocess()
    train_df, test_df = split_data(df)
    df = test_df.copy()

    # 학습 시 저장된 스케일러 로드 및 스케일링 적용
    scaler = joblib.load('scaler.joblib')
    df[X_FILTER] = scaler.scaling(df[X_FILTER])

    dataset = df2torch(df[X_FILTER])

    # 저장된 모델 로드 (학습 시와 동일한 구조로 정의)
    model = AutoEncoder(input_dim, hidden_dim, latent_dim).to(device)
    model.load_state_dict(torch.load('normal_train.model'))
    model.to(device)
    model.eval()

    test_loader = DataLoader(dataset, batch_size=1, shuffle=False, num_workers=4, pin_memory=True)

    pred_df = pd.DataFrame(columns=X_FILTER)

    with torch.no_grad():
        for batch in tqdm(test_loader):
            batch = batch.to(device)
            latent, outputs = model(batch)
            outputs = outputs.cpu()[0].numpy().tolist()
            pred_df.loc[len(pred_df)] = outputs

    df.to_csv('y_true.csv', encoding='utf-8-sig', index=False)
    pred_df.to_csv('y_pred.csv', encoding='utf-8-sig', index=False)

    # pred_df = pd.DataFrame(columns=X_FILTER)
    # latent_df = pd.DataFrame(columns=['x', 'y'])

    # with torch.no_grad():
    #     for batch in tqdm(test_loader):
    #         batch = batch.to(device)
    #         latent, outputs = model(batch)
    #         result_latent = latent.cpu()[0].numpy().tolist()
    #         result_outputs = outputs.cpu()[0].numpy().tolist()
    #         latent_df.loc[len(latent_df)] = result_latent
    #         pred_df.loc[len(pred_df)] = result_outputs

    # df.to_csv('y_true.csv', encoding='utf-8-sig', index=False)
    # pred_df.to_csv('y_pred.csv', encoding='utf-8-sig', index=False)
    # latent_df.to_csv('latent_vec.csv', encoding='utf-8-sig', index=False)