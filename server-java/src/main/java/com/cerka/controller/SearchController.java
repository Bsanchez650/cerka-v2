package com.cerka.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final JdbcTemplate jdbc;

    public SearchController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping
    public List<Map<String, Object>> search(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Integer category) {

        StringBuilder sql = new StringBuilder("""
            SELECT DISTINCT sp.id, sp.business_name, sp.avg_rating, sp.total_reviews,
                   u.name, u.avatar_url, bp.bio, bp.instagram_handle, bp.accepts_walkins
            FROM service_providers sp
            JOIN users u ON sp.user_id = u.id
            LEFT JOIN business_profiles bp ON bp.provider_id = sp.id
            LEFT JOIN services s ON s.provider_id = sp.id
            LEFT JOIN categories c ON s.category_id = c.id
            WHERE sp.is_active = true
            """);

        List<Object> param = new ArrayList<>();
        if (category != null) {
            sql.append(" AND s.category_id = ? ");
            param.add(category);
        }

        if (q != null && !q.isEmpty()) {
            String like = "%" + q.toLowerCase() + "%";
            sql.append(" AND (LOWER(sp.business_name) LIKE ?");
            sql.append(" OR LOWER(u.name) LIKE ?");
            sql.append(" OR LOWER(s.name) LIKE ?");
            sql.append(" OR LOWER(c.name) LIKE ?)");
            param.add(like);
            param.add(like);
            param.add(like);
            param.add(like);
        }

        sql.append(" ORDER BY sp.avg_rating DESC");

        return jdbc.queryForList(sql.toString(), param.toArray());
    }
}