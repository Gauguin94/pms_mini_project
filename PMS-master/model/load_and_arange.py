import os
import pandas as pd
import numpy as np

class loadArange:
    """
    진동 센서 데이터가 저장된 csv 파일을 불러와, 각 클래스(target)에 대해
    12800개 샘플 단위로 구간을 나누고 라벨링하여 데이터셋을 구성하는 클래스
    대상 구간 수에 따라 'bear_fault', 'unbal_warning' 등의 상태 라벨 부여.
    """
    def __init__(self):
        """
        진동 센서 데이터가 저장된 csv 파일을 불러와 데이터프레임에 저장

        Attributes
        ----------
        df : pandas.Dataframe
            Raw sensor data loaded from 'pms_data.csv'
        """
        self.df = pd.read_csv('{}/merged_data/pms_data.csv'.format(os.getcwd()))

    def load_arange(self):
        """
        12,800개 단위로 시계열 진동 데이터를 나누고, 각 구간에 해당하는 target 라벨을 부여하여
        분석용 데이터셋(arr_df)을 생성. 중복 제거와 불필요한 클래스 필터링.

        Returns
        -------
        arr_df : pandas.DataFrame
            DataFrame with columns:
            - 'target' : string label for the condition (e.g., 'normal', 'rotor_fault', ...)
            - 'dt_arr' : np.ndarray containing 12,800-length acceleration sequence.
        """
        arr_df = pd.DataFrame(columns=['target', 'dt_arr'])

        target_list = []
        accel_list = []
        temp_list = []
        for num, elem in enumerate(self.df.itertuples()):
            temp_list.append(elem.accel)
            if (num+1)%12800 == 0:
                accel_list.append(np.array(temp_list))
                temp_list = []
                if (num+1) <= 256000:
                    target_list.append('bear_fault')
                elif (num+1) <= 512000:
                    target_list.append('bear_warning')
                elif (num+1) <= 768000:
                    target_list.append('cavi_fault')
                elif (num+1) <= 1024000:
                    target_list.append('mis_fault')
                elif (num+1) <= 1280000:
                    target_list.append('mis_warning')
                elif (num+1) <= 1792000	:
                    target_list.append('normal')
                elif (num+1) <= 2048000:
                    target_list.append('rotor_fault')
                elif (num+1) <= 2304000:
                    target_list.append('unbal_fault')
                elif (num+1) <= 2560000:
                    target_list.append('unbal_warning')
                else:
                    target_list.append('vane_fault')
        arr_df.target = target_list
        arr_df.dt_arr = accel_list

        # 불필요한 클래스 제거
        arr_df = arr_df[arr_df.target!='mis_warning'].reset_index(drop=True)
        arr_df = arr_df[arr_df.target!='cavi_fault'].reset_index(drop=True)

        # 중복 제거
        arr_df['dt_arr_tuple'] = arr_df['dt_arr'].apply(lambda x: tuple(x))
        arr_df = arr_df.drop_duplicates(subset=['target', 'dt_arr_tuple']).drop(columns='dt_arr_tuple')

        return arr_df