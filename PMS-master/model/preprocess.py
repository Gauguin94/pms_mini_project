import pywt
import numpy as np
import pandas as pd
from scipy.stats import skew, kurtosis
from scipy.fft import fft, fftfreq
from scipy.signal import hilbert

class preProcess:
    """
    진동 신호 데이터(df)를 입력받아, 주파수/시간/웨이블릿/통계 영역에서의 다양한 특징을 추출하고
    라벨링된 학습용 feature 데이터프레임을 생성하는 클래스.

    주요 단계:
    - FFT 기반 주파수 스펙트럼 및 고조파 성분 추출
    - 시간 영역 통계 특징, 변동성, Crest/Shape 계수 등 계산
    - 주파수 중심, 대역폭, 피크 주파수 등의 frequency feature 추출
    - 웨이블릿 분해(DWT)를 활용한 레벨별 RMS 및 첨도 계산
    - 포락선(envelope) 신호 기반의 이상 탐지 지표 추출
    - 다양한 결함 유형(bearing, misalignment 등)에 대한 이진 라벨 구성

    Parameters
    ----------
    df : pandas.DataFrame
        Raw dataframe containing 'dt_arr' (accelration array) and 'target' label.
    
    Attributes
    ----------
    df : pandas.DataFrame
        Input data copied internally for processing
    """
    def __init__(self, df):
        self.df = df.copy()

    def fourier_transform(self, arr):
        """
        주어진 시계열 배열(arr)에 대해 FFT를 적용하여 주파수 및 진폭 추출

        Parameters
        ----------
        arr : np.ndarray
            Time-domain signal array
        
        Returns
        -------
        freq : np.ndarray
            Frequency bins corresponding to FFT
        amplitude : np.ndarray
            Magnitude spectru, of the signal
        """
        fs = 12800
        data_length = len(arr)
        signal = arr
        fft_signal = np.fft.fft(signal)
        freq = np.fft.fftfreq(data_length, d=1/fs)
        amplitude = np.abs(fft_signal)
        return freq, amplitude

    def do_fourier_transform(self):
        """
        self.df 전체에 대해 FFT 수행 후, 주파수와 진폭 배열을 컬럼으로 추가
        """
        freq_list = []
        amp_list = []

        for elem in self.df.itertuples():
            freq, amp = self.fourier_transform(elem.dt_arr)
            freq_list.append(freq)
            amp_list.append(amp)
        self.df['freq'] = freq_list
        self.df['amp'] = amp_list

    def extract_harmonics(self, amp_arr):
        """
        FFT 진폭 배열로부터 1x ~ 5x 고조파 주파수 및 진폭 추출

        Parameters
        ----------
        amp_arr : np.ndarray
            Amplitude spectrum

        Returns
        -------
        freq 1x~5x : int
            Indices corresponding to harmonic frequencies
        amp_1x~5x : float
            Amplitudes at those harmonic bins
        """
        fs = 12800
        N = len(amp_arr)
        fundamental = 1180 / 60  # 약 19.67 Hz

        # FFT 빈을 구성하는 주파수 배열
        freq = np.fft.fftfreq(N, d=1/fs)

        # 양의 주파수 영역만 사용
        freq_positive = freq[:N//2]

        # 기본 주파수에 가장 가까운 인덱스 찾기
        freq_1x = int(np.around(freq_positive[np.argmin(np.abs(freq_positive - fundamental))]))
        freq_2x = int(np.around(freq_positive[np.argmin(np.abs(freq_positive - (fundamental*2)))]))
        freq_3x = int(np.around(freq_positive[np.argmin(np.abs(freq_positive - (fundamental*3)))]))
        freq_4x = int(np.around(freq_positive[np.argmin(np.abs(freq_positive - (fundamental*4)))]))
        freq_5x = int(np.around(freq_positive[np.argmin(np.abs(freq_positive - (fundamental*5)))]))
        
        amp_1x = amp_arr[freq_1x]
        amp_2x = amp_arr[freq_2x]
        amp_3x = amp_arr[freq_3x]
        amp_4x = amp_arr[freq_4x]
        amp_5x = amp_arr[freq_5x]

        return freq_1x, freq_2x, freq_3x, freq_4x, freq_5x, amp_1x, amp_2x, amp_3x, amp_4x, amp_5x

    def do_extract_harmonics(self):
        """
        self.df 내 FFT 진폭(amp) 컬럼을 기반으로 고조파 주파수 및 진폭을 추출하여
        관련 컬럼(freq_x, amp_x)으로 저장
        """
        freq_1x_list = []
        freq_2x_list = []
        freq_3x_list = []
        freq_4x_list = []
        freq_5x_list = []
        amp_1x_list = []
        amp_2x_list = []
        amp_3x_list = []
        amp_4x_list = []
        amp_5x_list = []
        freq_x_list = []
        amp_x_list = []

        for elem in self.df.itertuples():
            freq_1x, freq_2x, freq_3x, freq_4x, freq_5x, amp_1x, amp_2x, amp_3x, amp_4x, amp_5x = self.extract_harmonics(elem.amp)
            freq_temp_list = [freq_1x, freq_2x, freq_3x, freq_4x, freq_5x]
            amp_temp_list = [amp_1x, amp_2x, amp_3x, amp_4x, amp_5x]
            freq_1x_list.append(freq_1x)
            freq_2x_list.append(freq_2x)
            freq_3x_list.append(freq_3x)
            freq_4x_list.append(freq_4x)
            freq_5x_list.append(freq_5x)
            amp_1x_list.append(amp_1x)
            amp_2x_list.append(amp_2x)
            amp_3x_list.append(amp_3x)
            amp_4x_list.append(amp_4x)
            amp_5x_list.append(amp_5x)
            freq_x_list.append(freq_temp_list)
            amp_x_list.append(amp_temp_list)

        self.df['freq_1x'] = freq_1x_list
        self.df['freq_2x'] = freq_2x_list
        self.df['freq_3x'] = freq_3x_list
        self.df['freq_4x'] = freq_4x_list
        self.df['freq_5x'] = freq_5x_list
        self.df['amp_1x'] = amp_1x_list
        self.df['amp_2x'] = amp_2x_list
        self.df['amp_3x'] = amp_3x_list
        self.df['amp_4x'] = amp_4x_list
        self.df['amp_5x'] = amp_5x_list
        self.df['freq_x'] = freq_x_list
        self.df['amp_x'] = amp_x_list

    def extract_time_features(self, signal):
        """
        시간 영역 통계 특징 및 신호 형태 기반 특징 추출
        
        Parameters
        ----------
        signal : np.ndarray
            Time-domain signal
        
        Returns
        -------
        rms, peak, skewness, kurtosis, crest_factor, shape_factor : float
        """
        rms = np.sqrt(np.mean(signal**2))
        return rms, np.max(np.abs(signal)), skew(signal), kurtosis(signal), np.max(np.abs(signal)) / rms, rms / np.mean(np.abs(signal))

    def extract_frequency_features(self, signal, fs):
        """
        FFT 기반 주파수 중심, 대역폭, 피크 주파수 계산

        Parameters
        ----------
        signal : np.ndarray
            Time-domain signal
        fs : int
            Sampling frequency

        Returns
        -------
            centroid, bandwidth, peak_freq : float
        """
        fft_vals = np.fft.rfft(signal)
        fft_freq = np.fft.rfftfreq(len(signal), d=1/fs)
        mag = np.abs(fft_vals)

        centroid = np.sum(fft_freq * mag) / np.sum(mag)
        bandwidth = np.sqrt(np.sum(((fft_freq - centroid)**2) * mag) / np.sum(mag))
        peak_freq = fft_freq[np.argmax(mag)]

        return centroid, bandwidth, peak_freq

    def extract_dwt_features(self, signal, wavelet='db4', level=7):
        """
        신호를 웨이블릿(db4)으로 분해하여 각 레벨의 RMS 및 첨도 추출

        Parameters
        ----------
        signal : np.ndarray
            Time-domain signal
        wavelet : str
            Wavelet name
        level : int
            Decomposition level

        Returns
        -------
        cD1~cD7 RMS, kurtosis : float
        """
        coeffs = pywt.wavedec(signal, wavelet, level=level)
        features = {}
        for i, c in enumerate(coeffs[1:], 1):  # cD1 ~ cD7
            features[f'cD{i}_rms'] = np.sqrt(np.mean(c**2))
            features[f'cD{i}_kurtosis'] = kurtosis(c)

        return features['cD1_rms'], features['cD1_kurtosis'], features['cD2_rms'], features['cD2_kurtosis'], features['cD3_rms'], features['cD3_kurtosis'], features['cD4_rms'], features['cD4_kurtosis'],\
            features['cD5_rms'], features['cD5_kurtosis'], features['cD6_rms'], features['cD6_kurtosis'], features['cD7_rms'], features['cD7_kurtosis']

    def env_over_threshold(self, arr):
        """
        포락선(envelope) 스펙트럼 상에서 진폭이 임곗값(100)을 넘는 주파수 수 계산

        Parameters
        ----------
        arr : np.ndarray
            Time-domain signal
        
        Returns
        -------
        num_over : int
            Number of frequency bins exceeding threshold
        """
        threshold = 100
        signal = hilbert(arr)
        envelope = np.abs(signal)
        n = len(envelope)
        fs = 12800
        fft_vals = np.abs(fft(envelope))[:n // 2]
        fft_freqs = fftfreq(n, 1/fs)[:n // 2]
        temp_df = pd.DataFrame(data=fft_vals, columns=['value'])
        num_over = len(temp_df[temp_df.value>threshold])
        return num_over

    def bearing_noise(self, arr):
        """
        특정 주파수 대역(500~2,000Hz)에서의 평균 진폭을 통해 베어링 노이즈 계산

        Parameters
        ----------
        arr : np.ndarray
            Time-domain signal

        Returns
        -------
        temp_df.amp.mean() : float
            Mean amplitude in target band
        """
        freq, amp = self.fourier_transform(arr)
        temp_df = pd.DataFrame(columns=['freq', 'amp'])
        temp_df['freq'] = freq
        temp_df['amp'] = amp
        temp_df = temp_df[(temp_df.freq>=500)&(temp_df.freq<=2000)].reset_index(drop=True)
        return temp_df.amp.mean()

    def preprocess(self):
        """
        전체 전처리 및 특징 추출 수행
        - FFT, 고조파, 시간/주파수/DWT 영역 특징 계산
        - 변동성 및 포락선(envelope) 지표 추출
        - 결함 라벨링(normal/anomaly+상세 fault)

        Returns
        -------
        result_df : pandas.DataFrame
            Feature dataframe with extracted features and binary/multi-class labels
        """
        self.do_fourier_transform()
        self.do_extract_harmonics()

        result_df = pd.DataFrame(
            columns = [
                'time_rms', 'time_skewness', 'time_kurtosis', 'time_crest_factor', 'time_shape_factor',
                'time_mean', 'time_std', 'time_peak',
                'time_mean_diff', 'time_std_diff', 'time_min_diff', 'time_max_diff',

                'fft_centroid', 'fft_bandwidth', 'fft_peak_freq', 'fft_over_env', 'fft_noise',
                'fft_amp_1x', 'fft_amp_2x', 'fft_amp_3x', 'fft_amp_4x', 'fft_amp_5x',

                'cD1_rms', 'cD1_kurtosis', 'cD2_rms', 'cD2_kurtosis', 'cD3_rms', 'cD3_kurtosis', 'cD4_rms', 'cD4_kurtosis',
                'cD5_rms', 'cD5_kurtosis', 'cD6_rms', 'cD6_kurtosis', 'cD7_rms', 'cD7_kurtosis', 

                'normal', 'anomaly',
                'bearing', 'misalignment', 'unbalance', 'rotor', 'cavitation', 'vane',
                'real_normal'
            ]
        )

        rms_list = []
        skewness_list = []
        kurtosis_list = []
        crest_factor_list = []
        shape_factor_list = []
        mean_list = []
        std_list = []
        peak_list = []
        mean_volatile_list = []
        std_volatile_list = []
        min_volatile_list = []
        max_volatile_list = []
        centroid_list = []
        bandwidth_list = []
        peak_freq_list = []
        fft_over_env_list = []
        fft_noise_list = []

        amp_1x_list = []
        amp_2x_list = []
        amp_3x_list = []
        amp_4x_list = []
        amp_5x_list = []

        cD1_rms_list = []
        cD1_kurtosis_list = []
        cD2_rms_list = []
        cD2_kurtosis_list = []
        cD3_rms_list = []
        cD3_kurtosis_list = []
        cD4_rms_list = []
        cD4_kurtosis_list = []
        cD5_rms_list = []
        cD5_kurtosis_list = []
        cD6_rms_list = []
        cD6_kurtosis_list = []
        cD7_rms_list = []
        cD7_kurtosis_list = []

        normal_list = []
        anomaly_list = []

        bearing_list = []
        misalignment_list = []
        unbalance_list = []
        rotor_list = []
        cavitation_list = []
        vane_list = []

        real_normal_list = []

        for elem in self.df.itertuples():
            rms, peak, skewness, kurto, crest_factor, shape_factor = self.extract_time_features(elem.dt_arr)
            centroid, bandwidth, peak_freq = self.extract_frequency_features(elem.dt_arr, 12800)

            cD1_rms, cD1_kurtosis, cD2_rms, cD2_kurtosis, cD3_rms, cD3_kurtosis,\
            cD4_rms, cD4_kurtosis, cD5_rms, cD5_kurtosis, cD6_rms, cD6_kurtosis, cD7_rms, cD7_kurtosis = self.extract_dwt_features(elem.dt_arr)

            rms_list.append(rms)
            skewness_list.append(skewness)
            kurtosis_list.append(kurto)
            crest_factor_list.append(crest_factor)
            shape_factor_list.append(shape_factor)

            mean_list.append(elem.dt_arr.mean())
            std_list.append(elem.dt_arr.std())
            peak_list.append(peak)

            diff_arr = np.diff(elem.dt_arr, n=1)

            mean_volatile_list.append(diff_arr.mean())
            std_volatile_list.append(diff_arr.std())
            min_volatile_list.append(diff_arr.min())
            max_volatile_list.append(diff_arr.max())

            centroid_list.append(centroid)
            bandwidth_list.append(bandwidth)
            peak_freq_list.append(peak_freq)

            fft_over_env_list.append(self.env_over_threshold(elem.dt_arr))
            fft_noise_list.append(self.bearing_noise(elem.dt_arr))

            cD1_rms_list.append(cD1_rms)
            cD1_kurtosis_list.append(cD1_kurtosis)
            cD2_rms_list.append(cD2_rms)
            cD2_kurtosis_list.append(cD2_kurtosis)
            cD3_rms_list.append(cD3_rms)
            cD3_kurtosis_list.append(cD3_kurtosis)
            cD4_rms_list.append(cD4_rms)
            cD4_kurtosis_list.append(cD4_kurtosis)
            cD5_rms_list.append(cD5_rms)
            cD5_kurtosis_list.append(cD5_kurtosis)
            cD6_rms_list.append(cD6_rms)
            cD6_kurtosis_list.append(cD6_kurtosis)
            cD7_rms_list.append(cD7_rms)
            cD7_kurtosis_list.append(cD7_kurtosis)

            if elem.target == 'normal':
                normal_list.append(1)
                anomaly_list.append(0)
                real_normal_list.append(1)
            elif 'warning' in elem.target:
                normal_list.append(1)
                anomaly_list.append(0)
                real_normal_list.append(0)
            else:
                normal_list.append(0)
                anomaly_list.append(1)
                real_normal_list.append(0)

            amp_1x_list.append(elem.amp_1x)
            amp_2x_list.append(elem.amp_2x)
            amp_3x_list.append(elem.amp_3x)
            amp_4x_list.append(elem.amp_4x)
            amp_5x_list.append(elem.amp_5x)

            if (elem.target=='bear_warning') or (elem.target=='bear_fault'):
                if elem.target == 'bear_warning':
                    bearing_list.append(1)
                else:
                    bearing_list.append(2)
                misalignment_list.append(0)
                unbalance_list.append(0)
                rotor_list.append(0)
                cavitation_list.append(0)
                vane_list.append(0)
            elif (elem.target=='mis_warning') or (elem.target == 'mis_fault'):
                misalignment_list.append(1)
                bearing_list.append(0)
                unbalance_list.append(0)
                rotor_list.append(0)
                cavitation_list.append(0)
                vane_list.append(0)
            elif (elem.target=='unbal_warning') or (elem.target == 'unbal_fault'):
                if elem.target == 'unbal_warning':
                    unbalance_list.append(1)
                else:
                    unbalance_list.append(2)
                bearing_list.append(0)
                misalignment_list.append(0)
                rotor_list.append(0)
                cavitation_list.append(0)
                vane_list.append(0)
            else:
                if elem.target == 'rotor_fault':
                    rotor_list.append(1)
                    bearing_list.append(0)
                    misalignment_list.append(0)
                    unbalance_list.append(0)
                    cavitation_list.append(0)
                    vane_list.append(0)
                elif elem.target == 'cavi_fault':
                    cavitation_list.append(1)
                    bearing_list.append(0)
                    misalignment_list.append(0)
                    unbalance_list.append(0)
                    rotor_list.append(0)
                    vane_list.append(0)
                elif elem.target == 'vane_fault':
                    bearing_list.append(0)
                    misalignment_list.append(0)
                    unbalance_list.append(0)
                    rotor_list.append(0)
                    cavitation_list.append(0)
                    vane_list.append(1)
                else:
                    bearing_list.append(0)
                    misalignment_list.append(0)
                    unbalance_list.append(0)
                    rotor_list.append(0)
                    cavitation_list.append(0)
                    vane_list.append(0)

        result_df[result_df.columns[0]] = rms_list
        result_df[result_df.columns[1]] = skewness_list
        result_df[result_df.columns[2]] = kurtosis_list
        result_df[result_df.columns[3]] = crest_factor_list
        result_df[result_df.columns[4]] = shape_factor_list
        result_df[result_df.columns[5]] = mean_list
        result_df[result_df.columns[6]] = std_list
        result_df[result_df.columns[7]] = peak_list
        result_df[result_df.columns[8]] = mean_volatile_list
        result_df[result_df.columns[9]] = std_volatile_list
        result_df[result_df.columns[10]] = min_volatile_list
        result_df[result_df.columns[11]] = max_volatile_list
        result_df[result_df.columns[12]] = centroid_list
        result_df[result_df.columns[13]] = bandwidth_list
        result_df[result_df.columns[14]] = peak_freq_list
        result_df[result_df.columns[15]] = fft_over_env_list
        result_df[result_df.columns[16]] = fft_noise_list
        result_df[result_df.columns[17]] = amp_1x_list
        result_df[result_df.columns[18]] = amp_2x_list
        result_df[result_df.columns[19]] = amp_3x_list
        result_df[result_df.columns[20]] = amp_4x_list
        result_df[result_df.columns[21]] = amp_5x_list
        result_df[result_df.columns[22]] = cD1_rms_list
        result_df[result_df.columns[23]] = cD1_kurtosis_list
        result_df[result_df.columns[24]] = cD2_rms_list
        result_df[result_df.columns[25]] = cD2_kurtosis_list
        result_df[result_df.columns[26]] = cD3_rms_list
        result_df[result_df.columns[27]] = cD3_kurtosis_list
        result_df[result_df.columns[28]] = cD4_rms_list
        result_df[result_df.columns[29]] = cD4_kurtosis_list
        result_df[result_df.columns[30]] = cD5_rms_list
        result_df[result_df.columns[31]] = cD5_kurtosis_list
        result_df[result_df.columns[32]] = cD6_rms_list
        result_df[result_df.columns[33]] = cD6_kurtosis_list
        result_df[result_df.columns[34]] = cD7_rms_list
        result_df[result_df.columns[35]] = cD7_kurtosis_list
        result_df[result_df.columns[36]] = normal_list
        result_df[result_df.columns[37]] = anomaly_list
        result_df[result_df.columns[38]] = bearing_list
        result_df[result_df.columns[39]] = misalignment_list
        result_df[result_df.columns[40]] = unbalance_list
        result_df[result_df.columns[41]] = rotor_list
        result_df[result_df.columns[42]] = cavitation_list
        result_df[result_df.columns[43]] = vane_list
        result_df[result_df.columns[44]] = real_normal_list
        return result_df