package com.example.lsh_community.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommunityResponse {
    private Long id;
    private String title;
    private String content;
    private String name;
}
