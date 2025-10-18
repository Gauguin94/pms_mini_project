package com.pms.backend.dto;

public class RealtimeDataDto {
    private Long id;
    private Double timeRms;
    private Double timeSkewness;
    private Double timeKurtosis;
    private Double timeCrestFactor;
    private Double timeShapeFactor;
    private Double timeMean;
    private Double timeStd;
    private Double timePeak;
    private Double timeMeanDiff;
    private Double timeStdDiff;
    private Double timeMinDiff;
    private Double timeMaxDiff;
    private Double fftCentroid;
    private Double fftBandwidth;
    private Double fftPeakFreq;
    private Double fftOverEnv;
    private Double fftAmp1x;
    private Double fftAmp2x;
    private Double fftAmp3x;
    private Double fftAmp4x;
    private Double fftAmp5x;
    private Double cD1Rms;
    private Double cD1Kurtosis;
    private Double cD2Rms;
    private Double cD2Kurtosis;
    private Double cD3Rms;
    private Double cD3Kurtosis;
    private Double cD4Rms;
    private Double cD4Kurtosis;
    private Double cD5Rms;
    private Double cD5Kurtosis;
    private Double cD6Rms;
    private Double cD6Kurtosis;
    private Double cD7Rms;
    private Double cD7Kurtosis;

    // Constructors
    public RealtimeDataDto() {
    }

    public RealtimeDataDto(Long id, Double timeRms, Double timeSkewness, Double timeKurtosis,
                          Double timeCrestFactor, Double timeShapeFactor, Double timeMean,
                          Double timeStd, Double timePeak, Double timeMeanDiff, Double timeStdDiff,
                          Double timeMinDiff, Double timeMaxDiff, Double fftCentroid,
                          Double fftBandwidth, Double fftPeakFreq, Double fftOverEnv,
                          Double fftAmp1x, Double fftAmp2x, Double fftAmp3x, Double fftAmp4x,
                          Double fftAmp5x, Double cD1Rms, Double cD1Kurtosis, Double cD2Rms,
                          Double cD2Kurtosis, Double cD3Rms, Double cD3Kurtosis, Double cD4Rms,
                          Double cD4Kurtosis, Double cD5Rms, Double cD5Kurtosis, Double cD6Rms,
                          Double cD6Kurtosis, Double cD7Rms, Double cD7Kurtosis) {
        this.id = id;
        this.timeRms = timeRms;
        this.timeSkewness = timeSkewness;
        this.timeKurtosis = timeKurtosis;
        this.timeCrestFactor = timeCrestFactor;
        this.timeShapeFactor = timeShapeFactor;
        this.timeMean = timeMean;
        this.timeStd = timeStd;
        this.timePeak = timePeak;
        this.timeMeanDiff = timeMeanDiff;
        this.timeStdDiff = timeStdDiff;
        this.timeMinDiff = timeMinDiff;
        this.timeMaxDiff = timeMaxDiff;
        this.fftCentroid = fftCentroid;
        this.fftBandwidth = fftBandwidth;
        this.fftPeakFreq = fftPeakFreq;
        this.fftOverEnv = fftOverEnv;
        this.fftAmp1x = fftAmp1x;
        this.fftAmp2x = fftAmp2x;
        this.fftAmp3x = fftAmp3x;
        this.fftAmp4x = fftAmp4x;
        this.fftAmp5x = fftAmp5x;
        this.cD1Rms = cD1Rms;
        this.cD1Kurtosis = cD1Kurtosis;
        this.cD2Rms = cD2Rms;
        this.cD2Kurtosis = cD2Kurtosis;
        this.cD3Rms = cD3Rms;
        this.cD3Kurtosis = cD3Kurtosis;
        this.cD4Rms = cD4Rms;
        this.cD4Kurtosis = cD4Kurtosis;
        this.cD5Rms = cD5Rms;
        this.cD5Kurtosis = cD5Kurtosis;
        this.cD6Rms = cD6Rms;
        this.cD6Kurtosis = cD6Kurtosis;
        this.cD7Rms = cD7Rms;
        this.cD7Kurtosis = cD7Kurtosis;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTimeRms() {
        return timeRms;
    }

    public void setTimeRms(Double timeRms) {
        this.timeRms = timeRms;
    }

    public Double getTimeSkewness() {
        return timeSkewness;
    }

    public void setTimeSkewness(Double timeSkewness) {
        this.timeSkewness = timeSkewness;
    }

    public Double getTimeKurtosis() {
        return timeKurtosis;
    }

    public void setTimeKurtosis(Double timeKurtosis) {
        this.timeKurtosis = timeKurtosis;
    }

    public Double getTimeCrestFactor() {
        return timeCrestFactor;
    }

    public void setTimeCrestFactor(Double timeCrestFactor) {
        this.timeCrestFactor = timeCrestFactor;
    }

    public Double getTimeShapeFactor() {
        return timeShapeFactor;
    }

    public void setTimeShapeFactor(Double timeShapeFactor) {
        this.timeShapeFactor = timeShapeFactor;
    }

    public Double getTimeMean() {
        return timeMean;
    }

    public void setTimeMean(Double timeMean) {
        this.timeMean = timeMean;
    }

    public Double getTimeStd() {
        return timeStd;
    }

    public void setTimeStd(Double timeStd) {
        this.timeStd = timeStd;
    }

    public Double getTimePeak() {
        return timePeak;
    }

    public void setTimePeak(Double timePeak) {
        this.timePeak = timePeak;
    }

    public Double getTimeMeanDiff() {
        return timeMeanDiff;
    }

    public void setTimeMeanDiff(Double timeMeanDiff) {
        this.timeMeanDiff = timeMeanDiff;
    }

    public Double getTimeStdDiff() {
        return timeStdDiff;
    }

    public void setTimeStdDiff(Double timeStdDiff) {
        this.timeStdDiff = timeStdDiff;
    }

    public Double getTimeMinDiff() {
        return timeMinDiff;
    }

    public void setTimeMinDiff(Double timeMinDiff) {
        this.timeMinDiff = timeMinDiff;
    }

    public Double getTimeMaxDiff() {
        return timeMaxDiff;
    }

    public void setTimeMaxDiff(Double timeMaxDiff) {
        this.timeMaxDiff = timeMaxDiff;
    }

    public Double getFftCentroid() {
        return fftCentroid;
    }

    public void setFftCentroid(Double fftCentroid) {
        this.fftCentroid = fftCentroid;
    }

    public Double getFftBandwidth() {
        return fftBandwidth;
    }

    public void setFftBandwidth(Double fftBandwidth) {
        this.fftBandwidth = fftBandwidth;
    }

    public Double getFftPeakFreq() {
        return fftPeakFreq;
    }

    public void setFftPeakFreq(Double fftPeakFreq) {
        this.fftPeakFreq = fftPeakFreq;
    }

    public Double getFftOverEnv() {
        return fftOverEnv;
    }

    public void setFftOverEnv(Double fftOverEnv) {
        this.fftOverEnv = fftOverEnv;
    }

    public Double getFftAmp1x() {
        return fftAmp1x;
    }

    public void setFftAmp1x(Double fftAmp1x) {
        this.fftAmp1x = fftAmp1x;
    }

    public Double getFftAmp2x() {
        return fftAmp2x;
    }

    public void setFftAmp2x(Double fftAmp2x) {
        this.fftAmp2x = fftAmp2x;
    }

    public Double getFftAmp3x() {
        return fftAmp3x;
    }

    public void setFftAmp3x(Double fftAmp3x) {
        this.fftAmp3x = fftAmp3x;
    }

    public Double getFftAmp4x() {
        return fftAmp4x;
    }

    public void setFftAmp4x(Double fftAmp4x) {
        this.fftAmp4x = fftAmp4x;
    }

    public Double getFftAmp5x() {
        return fftAmp5x;
    }

    public void setFftAmp5x(Double fftAmp5x) {
        this.fftAmp5x = fftAmp5x;
    }

    public Double getcD1Rms() {
        return cD1Rms;
    }

    public void setcD1Rms(Double cD1Rms) {
        this.cD1Rms = cD1Rms;
    }

    public Double getcD1Kurtosis() {
        return cD1Kurtosis;
    }

    public void setcD1Kurtosis(Double cD1Kurtosis) {
        this.cD1Kurtosis = cD1Kurtosis;
    }

    public Double getcD2Rms() {
        return cD2Rms;
    }

    public void setcD2Rms(Double cD2Rms) {
        this.cD2Rms = cD2Rms;
    }

    public Double getcD2Kurtosis() {
        return cD2Kurtosis;
    }

    public void setcD2Kurtosis(Double cD2Kurtosis) {
        this.cD2Kurtosis = cD2Kurtosis;
    }

    public Double getcD3Rms() {
        return cD3Rms;
    }

    public void setcD3Rms(Double cD3Rms) {
        this.cD3Rms = cD3Rms;
    }

    public Double getcD3Kurtosis() {
        return cD3Kurtosis;
    }

    public void setcD3Kurtosis(Double cD3Kurtosis) {
        this.cD3Kurtosis = cD3Kurtosis;
    }

    public Double getcD4Rms() {
        return cD4Rms;
    }

    public void setcD4Rms(Double cD4Rms) {
        this.cD4Rms = cD4Rms;
    }

    public Double getcD4Kurtosis() {
        return cD4Kurtosis;
    }

    public void setcD4Kurtosis(Double cD4Kurtosis) {
        this.cD4Kurtosis = cD4Kurtosis;
    }

    public Double getcD5Rms() {
        return cD5Rms;
    }

    public void setcD5Rms(Double cD5Rms) {
        this.cD5Rms = cD5Rms;
    }

    public Double getcD5Kurtosis() {
        return cD5Kurtosis;
    }

    public void setcD5Kurtosis(Double cD5Kurtosis) {
        this.cD5Kurtosis = cD5Kurtosis;
    }

    public Double getcD6Rms() {
        return cD6Rms;
    }

    public void setcD6Rms(Double cD6Rms) {
        this.cD6Rms = cD6Rms;
    }

    public Double getcD6Kurtosis() {
        return cD6Kurtosis;
    }

    public void setcD6Kurtosis(Double cD6Kurtosis) {
        this.cD6Kurtosis = cD6Kurtosis;
    }

    public Double getcD7Rms() {
        return cD7Rms;
    }

    public void setcD7Rms(Double cD7Rms) {
        this.cD7Rms = cD7Rms;
    }

    public Double getcD7Kurtosis() {
        return cD7Kurtosis;
    }

    public void setcD7Kurtosis(Double cD7Kurtosis) {
        this.cD7Kurtosis = cD7Kurtosis;
    }
}

