import torch.nn as nn

# ✅ AutoEncoder 모델 정의
class AutoEncoder(nn.Module):
    """
    입력 데이터를 잠재 공간(latent space)으로 압축한 후,
    복원을 통해 이상 탐지를 수행할 수 있는 AutoEncoder 모델 구조

    Parameters
    ----------
    input_dim : int
        Input feature vector dimension
    hidden_dim : int
        Hidden layer size used in encoder/decoder
    latent_dim
        Compressed latent vector size
    
    Attributes
    ----------
    encoder : nn.Sequential
        Linear -> LayerNorm -> ReLU 구조로 구성된 인코더
    decoder : nn.Sequential
        Latent vector를 다시 원래 차원으로 복원하는 디코더
    """
    def __init__(self, input_dim, hidden_dim, latent_dim):
        super(AutoEncoder, self).__init__()
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, hidden_dim), # n, 32
            nn.LayerNorm(hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim//2), # 32, 16
            nn.LayerNorm(hidden_dim//2),
            nn.ReLU(),
            nn.Linear(hidden_dim//2, latent_dim), # 16, 8
        )
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, hidden_dim//2), # 2, 4
            nn.LayerNorm(hidden_dim//2),
            nn.ReLU(),
            nn.Linear(hidden_dim//2, hidden_dim), # 4, 8
            nn.LayerNorm(hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, input_dim), # 32, n
        )

    def forward(self, x):
        """
        인코더를 통해 잠재 벡터로 압축하고,
        디코더를 통해 입력 복원(재구성) 수행

        Parameters
        ----------
        x : torch.Tensor
            Input feature tensor of shape (batch_size, input_dim)
        
        Returns
        -------
        latent_vec : torch.Tensor
            Latent representation of input
        out : torch.Tensor
            Reconstructed output from decoder
        """
        latent_vec = self.encoder(x)
        out = self.decoder(latent_vec)
        return latent_vec, out