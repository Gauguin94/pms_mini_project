import torch
import torch.nn as nn
import torch.optim as optim
from joblib import dump
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
num_epochs = 100
learning_rate = 5e-3

if __name__ == "__main__":
    """
    정상 데이터를 기반으로 AutoEncoder 모델을 학습하는 전체 파이프라인 실행
    
    단계:
    - 진동 데이터 로드 및 12,800 단위 시계열 분할
    - 시계열 신호로부터 통계/주파수/웨이블릿 특징 추출
    - 라벨 분리 및 정상 데이터 선택
    - feature scaling 및 torch tensor 변환
    - AutoEncoder 학습 및 모델 저장
    """
    df = loadArange().load_arange()
    df = preProcess(df).preprocess()
    train_df, test_df = split_data(df)
    df = train_df.copy()

    # Data Scaling
    scaler = stdScaling(df[X_FILTER])
    df[X_FILTER] = scaler.scaling(df[X_FILTER])
    dump(scaler, 'scaler.joblib')

    dataset = df2torch(df[X_FILTER])

    train_loader = DataLoader(dataset, batch_size=batch_size, shuffle=True, num_workers=4, pin_memory=True)

    model = AutoEncoder(input_dim, hidden_dim, latent_dim).to(device)
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)

    for epoch in range(num_epochs):
        model.train()
        train_loss = 0.0
        for batch in train_loader:
            batch = batch.to(device)
            _, outputs = model(batch)
            loss = criterion(outputs, batch)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            train_loss += loss.item() * batch.size(0)

        train_loss /= len(train_loader.dataset)
        print(f"Epoch [{epoch+1}/{num_epochs}], Train Loss: {train_loss:.6f}")

    model_cpu = model.cpu()
    torch.save(model_cpu.state_dict(), 'normal_train.model')
    print("학습종료")