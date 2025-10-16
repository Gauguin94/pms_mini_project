package com.pms.backend.service;

import com.pms.backend.dto.VelocityDto;
import com.pms.backend.repository.VelocityRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;

@Service
public class VelocityService {

    private final VelocityRepository repo;

    public VelocityService(VelocityRepository repo) {
        this.repo = repo;
    }

    /** 채널별 최신 N건: 시간 오름차순으로 리턴 */
    public List<VelocityDto> getLatest(Integer channelId, int limit) {
        int safe = Math.max(1, Math.min(limit, 500));
        var pageable = PageRequest.of(0, safe, Sort.by(Sort.Direction.DESC, "ts"));
        var rowsDesc = repo.findByChannel_Id(channelId, pageable);
        var rowsAsc  = rowsDesc.stream().sorted(Comparator.comparing(v -> v.getTs())).toList();
        return rowsAsc.stream()
                .map(v -> new VelocityDto(v.getTs(), decodeBase64Flexible(v.getVelocityArr())))
                .toList();
    }

    // ---- Base64 디코딩 유틸 (CSV/JSON/바이너리 자동 판별) ----
    private double[] decodeBase64Flexible(String base64) {
        if (base64 == null || base64.isEmpty()) return new double[0];
        byte[] bytes;
        try { bytes = Base64.getDecoder().decode(base64); }
        catch (IllegalArgumentException e) { return new double[0]; }

        String asText = new String(bytes, StandardCharsets.UTF_8).trim();
        if (isMostlyText(bytes)) {
            if (asText.startsWith("[") && asText.endsWith("]")) { // JSON 배열
                String inner = asText.substring(1, asText.length() - 1).trim();
                if (inner.isEmpty()) return new double[0];
                String[] toks = inner.split(",");
                double[] out = new double[toks.length];
                for (int i = 0; i < toks.length; i++) out[i] = safeParseDouble(toks[i]);
                return out;
            }
            if (asText.contains(",")) { // CSV
                String[] toks = asText.split(",");
                double[] out = new double[toks.length];
                for (int i = 0; i < toks.length; i++) out[i] = safeParseDouble(toks[i]);
                return out;
            }
            if (asText.matches("[-+0-9eE.\\s]+")) { // 공백 구분 숫자
                String[] toks = asText.split("\\s+");
                double[] out = new double[toks.length];
                for (int i = 0; i < toks.length; i++) out[i] = safeParseDouble(toks[i]);
                return out;
            }
            return new double[0];
        }

        // 바이너리: float64 우선 → 실패 시 float32
        if (bytes.length % 8 == 0 && bytes.length > 0) {
            try { return toDoubleArrayFromFloat64LE(bytes); } catch (Exception ignore) {}
        }
        if (bytes.length % 4 == 0 && bytes.length > 0) {
            try { return toDoubleArrayFromFloat32LE(bytes); } catch (Exception ignore) {}
        }
        return new double[0];
    }

    private boolean isMostlyText(byte[] bytes) {
        int printable = 0;
        for (byte b : bytes) {
            int c = b & 0xFF;
            if (c == 9 || c == 10 || c == 13 || (c >= 32 && c < 127)) printable++;
        }
        return printable >= bytes.length * 0.85;
    }

    private double safeParseDouble(String s) {
        try { return Double.parseDouble(s.trim()); }
        catch (Exception e) { return Double.NaN; }
    }

    private double[] toDoubleArrayFromFloat64LE(byte[] bytes) {
        ByteBuffer buf = ByteBuffer.wrap(bytes).order(ByteOrder.LITTLE_ENDIAN);
        int n = bytes.length / 8;
        double[] out = new double[n];
        for (int i = 0; i < n; i++) out[i] = buf.getDouble();
        return out;
    }

    private double[] toDoubleArrayFromFloat32LE(byte[] bytes) {
        ByteBuffer buf = ByteBuffer.wrap(bytes).order(ByteOrder.LITTLE_ENDIAN);
        int n = bytes.length / 4;
        double[] out = new double[n];
        for (int i = 0; i < n; i++) out[i] = buf.getFloat();
        return out;
    }
}
