// src/main/java/com/example/lsh_community/entity/CommunityEntity.java
package com.example.lsh_community.entity;

import com.example.lsh_community.dto.CommunityFixRequest;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor @Builder
public class CommunityEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column private String title;
    @Column(columnDefinition = "TEXT") private String content;
    @Column private String name;

    public void fix(CommunityFixRequest req) {
        if (req.title()   != null) this.title   = req.title();
        if (req.content() != null) this.content = req.content();
        if (req.name()    != null) this.name    = req.name();
    }
}
