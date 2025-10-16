package com.pms.backend.controller;

import com.pms.backend.dto.SpectrumDto;
import com.pms.backend.service.SpectrumService;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 스펙트럼 전용 엔드포인트
 *
 * - GET /api/spectrum/timestamps?channel=1&limit=20&format=local|utc
 *     : 특정 채널의 최근 ts 목록(문자열) 반환, 최신→과거
 *
 * - GET /api/spectrum/by-ts?channels=1,2,3
 *     : ts 파라미터가 없으면 최신(ts=MAX) 기준으로 다중 채널 스펙트럼
 *
 * - GET /api/spectrum/by-ts?ts=...&channels=1,2,3
 *     : 특정 ts 기준으로 다중 채널 스펙트럼
 *
 * - GET /api/spectrum/by-rank?channels=1,2,3&rank=0
 *     : 각 채널의 rank번째(0=최신) 스펙트럼
 *
 * - GET /api/spectrum/by-common?channels=1,2,3&offset=0
 *     : 선택 채널들의 "공통 ts" 시퀀스에서 offset번째(0=최신) 스펙트럼
 */
@RestController
@RequestMapping("/api/spectrum")
public class SpectrumController {

    private final SpectrumService service;

    public SpectrumController(SpectrumService service) {
        this.service = service;
    }

    @GetMapping("/timestamps")
    public List<String> recentTimestamps(
            @RequestParam int channel,
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(defaultValue = "local") String format   // local | utc
    ) {
        boolean asUtc = "utc".equalsIgnoreCase(format);
        return service.getRecentTimestamps(channel, limit, asUtc);
    }

    @GetMapping("/by-ts")
    public List<SpectrumDto> byTimestamp(
            @RequestParam(required = false) String ts,
            @RequestParam String channels
    ) {
        List<Integer> chs = Arrays.stream(channels.split(","))
                .map(String::trim).filter(s -> !s.isEmpty())
                .map(Integer::parseInt).collect(Collectors.toList());

        return service.getByTimestampIsoOrLatest(ts, chs);
    }

    @GetMapping("/by-rank")
    public List<SpectrumDto> byRank(
            @RequestParam String channels,
            @RequestParam(defaultValue = "0") int rank
    ) {
        List<Integer> chs = Arrays.stream(channels.split(","))
                .map(String::trim).filter(s -> !s.isEmpty())
                .map(Integer::parseInt).collect(Collectors.toList());
        return service.getByRank(chs, rank);
    }

    @GetMapping("/by-common")
    public List<SpectrumDto> byCommon(
            @RequestParam String channels,
            @RequestParam(defaultValue = "0") int offset
    ) {
        List<Integer> chs = Arrays.stream(channels.split(","))
                .map(String::trim).filter(s -> !s.isEmpty())
                .map(Integer::parseInt).collect(Collectors.toList());
        return service.getByCommon(chs, offset);
    }
}


// package com.pms.backend.controller;

// import com.pms.backend.dto.SpectrumDto;
// import com.pms.backend.service.SpectrumService;
// import org.springframework.web.bind.annotation.*;

// import java.util.*;
// import java.util.stream.Collectors;

// /**
//  * 스펙트럼 전용 엔드포인트
//  *
//  * - GET /api/spectrum/timestamps?channel=1&limit=20
//  *     : 특정 채널의 최근 ts 목록(ISO 문자열) 반환, 최신→과거
//  *
//  * - GET /api/spectrum/by-ts?channels=1,2,3
//  *     : ts 파라미터가 없으면 최신(ts=MAX) 기준으로 다중 채널 스펙트럼
//  *
//  * - GET /api/spectrum/by-ts?ts=ISO&channels=1,2,3
//  *     : 특정 ts 기준으로 다중 채널 스펙트럼
//  */
// @RestController
// @RequestMapping("/api/spectrum")
// public class SpectrumController {

//     private final SpectrumService service;

//     public SpectrumController(SpectrumService service) {
//         this.service = service;
//     }

//     @GetMapping("/timestamps")
//     public List<String> recentTimestamps(
//             @RequestParam int channel,
//             @RequestParam(defaultValue = "20") int limit,
//             @RequestParam(defaultValue = "local") String format   // local | utc
//     ) {
//         boolean asUtc = "utc".equalsIgnoreCase(format);
//         return service.getRecentTimestamps(channel, limit, asUtc);
//     }

//     @GetMapping("/by-ts")
//     public List<SpectrumDto> byTimestamp(
//             @RequestParam(required = false) String ts,
//             @RequestParam String channels
//     ) {
//         List<Integer> chs = Arrays.stream(channels.split(","))
//                 .map(String::trim).filter(s -> !s.isEmpty())
//                 .map(Integer::parseInt).collect(Collectors.toList());

//         return service.getByTimestampIsoOrLatest(ts, chs);
//     }
// }