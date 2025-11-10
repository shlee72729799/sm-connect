// src/main/java/com/example/lsh_community/controller/CrudController.java
package com.example.lsh_community.controller;

import com.example.lsh_community.dto.CommunityRequest;
import com.example.lsh_community.dto.CommunityResponse;
import com.example.lsh_community.dto.CommunityFixRequest;
import com.example.lsh_community.service.CrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Community") // ✅ 기본 경로 통일
public class CrudController {

    private final CrudService crudService;

    // CREATE
    @PostMapping("")
    public ResponseEntity<CommunityResponse> create(@RequestBody CommunityRequest req) {
        CommunityResponse created = crudService.create(req);
        return ResponseEntity
                .created(URI.create("/Community/" + created.getId())) // Location 헤더
                .body(created);
    }

    // READ (list)
    @GetMapping("")
    public ResponseEntity<List<CommunityResponse>> reads() {
        return ResponseEntity.ok(crudService.reads());
    }

    // READ (one)
    @GetMapping("/{id}")
    public ResponseEntity<CommunityResponse> read(@PathVariable Long id) {
        return ResponseEntity.ok(crudService.read(id));
    }

    // UPDATE (partial)
    @PatchMapping("/{id}")
    public ResponseEntity<CommunityResponse> fix(
            @PathVariable Long id, @RequestBody CommunityFixRequest req) {
        return ResponseEntity.ok(crudService.fix(id, req));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        crudService.delete(id);
        return ResponseEntity.noContent().build(); // 204
    }
}
