// src/main/java/com/example/lsh_community/service/CrudService.java
package com.example.lsh_community.service;

import com.example.lsh_community.dto.CommunityFixRequest;
import com.example.lsh_community.dto.CommunityRequest;
import com.example.lsh_community.dto.CommunityResponse;
import com.example.lsh_community.entity.CommunityEntity;

import java.util.List;

public interface CrudService {
    CommunityResponse create(CommunityRequest req);
    List<CommunityResponse> reads();
    CommunityResponse read(Long id);
    CommunityResponse fix(Long id, CommunityFixRequest req);
    void delete(Long id);

    // ✅ 공통 매핑 헬퍼 (구현체에서 그대로 사용)
    default CommunityEntity toEntity(CommunityRequest r) {
        return CommunityEntity.builder()
                .title(r.title())
                .content(r.content())
                .name(r.name())
                .build();
    }
    default CommunityResponse toResponse(CommunityEntity e) {
        return new CommunityResponse(e.getId(), e.getTitle(), e.getContent(), e.getName());
    }
}
