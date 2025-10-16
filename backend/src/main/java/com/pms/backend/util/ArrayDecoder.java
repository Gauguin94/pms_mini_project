package com.pms.backend.util;

import java.nio.*;
import java.util.*;
import java.util.Base64;

public final class ArrayDecoder {
    private ArrayDecoder() {}

    // ====== 공개 API ======
    /** (freq, amplitude) 두 배열을 동시에 '가장 그럴듯한' 포맷으로 디코딩 */
    public static Pair<List<Double>, List<Double>> decodeSpectrumSmart(String freqBase64, String ampBase64) {
        List<Candidate> cands = new ArrayList<>();

        // 6가지 포맷 후보: f32/f64/i16 × (LE/BE)
        for (Format f : Format.values()) {
            List<Double> fFreq = tryDecode(freqBase64, f);
            double score = scoreFrequency(fFreq);
            if (Double.isFinite(score)) {
                List<Double> fAmp = tryDecode(ampBase64, f);
                cands.add(new Candidate(f, fFreq, fAmp, score));
            }
        }

        if (cands.isEmpty()) {
            return new Pair<>(List.of(), List.of());
        }

        // 점수 최상 선택
        cands.sort((a,b) -> Double.compare(b.score, a.score));
        Candidate best = cands.get(0);
        return new Pair<>(best.freq, best.amp);
    }

    /** 단일 배열 디코딩이 필요할 때(진단용) */
    public static List<Double> toDoubleListSmart(String base64) {
        Candidate best = null;
        for (Format f : Format.values()) {
            List<Double> arr = tryDecode(base64, f);
            double sc = scoreGeneric(arr);
            if (!Double.isFinite(sc)) continue;
            if (best == null || sc > best.score) best = new Candidate(f, arr, List.of(), sc);
        }
        return best == null ? List.of() : best.freq;
    }

    // ====== 내부: 포맷 후보/점수화 ======
    private enum Format {
        F32_LE, F32_BE, F64_LE, F64_BE, I16_LE, I16_BE
    }

    private static class Candidate {
        final Format fmt;
        final List<Double> freq;
        final List<Double> amp;
        final double score;
        Candidate(Format fmt, List<Double> freq, List<Double> amp, double score) {
            this.fmt = fmt; this.freq = freq; this.amp = amp; this.score = score;
        }
    }

    public static final class Pair<A,B> {
        public final A first;
        public final B second;
        public Pair(A a, B b) { this.first = a; this.second = b; }
    }

    private static List<Double> tryDecode(String base64, Format fmt) {
        if (base64 == null || base64.isBlank()) return List.of();
        byte[] bytes;
        try { bytes = Base64.getDecoder().decode(base64); }
        catch (IllegalArgumentException e) { return List.of(); }

        try {
            return switch (fmt) {
                case F32_LE -> readF32(bytes, ByteOrder.LITTLE_ENDIAN);
                case F32_BE -> readF32(bytes, ByteOrder.BIG_ENDIAN);
                case F64_LE -> readF64(bytes, ByteOrder.LITTLE_ENDIAN);
                case F64_BE -> readF64(bytes, ByteOrder.BIG_ENDIAN);
                case I16_LE -> readI16(bytes, ByteOrder.LITTLE_ENDIAN);
                case I16_BE -> readI16(bytes, ByteOrder.BIG_ENDIAN);
            };
        } catch (Throwable t) {
            return List.of();
        }
    }

    private static List<Double> readF32(byte[] bytes, ByteOrder order) {
        if (bytes.length % 4 != 0) return List.of();
        FloatBuffer fb = ByteBuffer.wrap(bytes).order(order).asFloatBuffer();
        int n = fb.remaining();
        List<Double> out = new ArrayList<>(n);
        for (int i=0;i<n;i++) {
            float v = fb.get();
            if (Float.isNaN(v) || Float.isInfinite(v)) return List.of();
            out.add((double) v);
        }
        return out;
    }

    private static List<Double> readF64(byte[] bytes, ByteOrder order) {
        if (bytes.length % 8 != 0) return List.of();
        DoubleBuffer db = ByteBuffer.wrap(bytes).order(order).asDoubleBuffer();
        int n = db.remaining();
        List<Double> out = new ArrayList<>(n);
        for (int i=0;i<n;i++) {
            double v = db.get();
            if (Double.isNaN(v) || Double.isInfinite(v)) return List.of();
            out.add(v);
        }
        return out;
    }

    private static List<Double> readI16(byte[] bytes, ByteOrder order) {
        if (bytes.length % 2 != 0) return List.of();
        ShortBuffer sb = ByteBuffer.wrap(bytes).order(order).asShortBuffer();
        int n = sb.remaining();
        List<Double> out = new ArrayList<>(n);
        for (int i=0;i<n;i++) out.add((double) sb.get()); // scale은 저장쪽 정책에 따라 프론트에서 하자
        return out;
    }

    // ====== 점수: '주파수 배열'로서 그럴듯함을 채점 ======
    private static double scoreFrequency(List<Double> xs) {
        if (xs == null || xs.size() < 4) return Double.NEGATIVE_INFINITY;

        // NaN/Inf 존재하면 탈락
        for (double v : xs) if (!Double.isFinite(v)) return Double.NEGATIVE_INFINITY;

        double min = Collections.min(xs);
        double max = Collections.max(xs);
        if (max <= min) return Double.NEGATIVE_INFINITY;

        // 주파수 범위 sanity check (0 ~ 1e12 Hz 정도까지 허용)
        if (min < -1e-6 || max > 1e12) return -100;

        // 증가성/등간격성
        int ascOk = 0;
        double sumStep = 0, sumStep2 = 0;
        for (int i=0;i<xs.size()-1;i++) {
            double d = xs.get(i+1) - xs.get(i);
            if (d > 0) ascOk++;
            sumStep += d; sumStep2 += d*d;
        }
        double ascRatio = ascOk * 1.0 / (xs.size()-1);
        double meanStep = sumStep / (xs.size()-1);
        double var = Math.max(0.0, sumStep2/(xs.size()-1) - meanStep*meanStep);
        double cv = meanStep == 0 ? 1e9 : Math.sqrt(var) / Math.abs(meanStep); // 등간격이면 작음

        // 점수: 증가성이 높고(cv가 낮고) 범위가 합리적일수록 높게
        return 100*ascRatio + 50*(1.0/ (1.0 + cv)) + 10*Math.log10(Math.max(1e-12, max-min));
    }

    // 비주파수(제너럴) 채점: NaN/Inf/폭발치/극미치 필터링
    private static double scoreGeneric(List<Double> xs) {
        if (xs == null || xs.size() < 4) return Double.NEGATIVE_INFINITY;
        for (double v : xs) if (!Double.isFinite(v)) return Double.NEGATIVE_INFINITY;
        double maxAbs = 0;
        for (double v : xs) maxAbs = Math.max(maxAbs, Math.abs(v));
        if (maxAbs > 1e18) return -100;
        return 1.0 / (1.0 + Math.abs(Math.log10(Math.max(1e-18, maxAbs)))) ;
    }
}