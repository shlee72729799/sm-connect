// src/main/java/com/example/lsh_community/service/CrudServiceImpl.java
package com.example.lsh_community.service;

import com.example.lsh_community.dto.CommunityFixRequest;
import com.example.lsh_community.dto.CommunityRequest;
import com.example.lsh_community.dto.CommunityResponse;
import com.example.lsh_community.entity.CommunityEntity;
import com.example.lsh_community.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrudServiceImpl implements CrudService {

    private final CommunityRepository communityRepository;

    @Override
    public CommunityResponse create(CommunityRequest req) {
        // ❌ communityRepository.save(delete(req))  (오타)
        CommunityEntity saved = communityRepository.save(toEntity(req)); // ✅
        return toResponse(saved);
    }

    @Override
    public List<CommunityResponse> reads() {
        return communityRepository.findAll()
                .stream().map(this::toResponse).toList();
    }

    @Override
    public CommunityResponse read(Long id) {
        CommunityEntity e = communityRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Community not found: " + id));
        return toResponse(e);
    }

    @Override
    public CommunityResponse fix(Long id, CommunityFixRequest req) {
        CommunityEntity e = communityRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Community not found: " + id));
        e.fix(req); // 엔티티에 부분수정 로직
        return toResponse(communityRepository.save(e));
    }

    @Override
    public void delete(Long id) {
        if (!communityRepository.existsById(id)) {
            throw new IllegalArgumentException("Community not found: " + id);
        }
        communityRepository.deleteById(id);
    }
}
