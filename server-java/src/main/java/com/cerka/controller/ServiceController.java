package com.cerka.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/services")

public class ServiceController {

    private final JdbcTemplate jdbc;

    public ServiceController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping
    public List<Map<String, Object>> getAll() {
        String sql = """
            SELECT s.id, s.name, s.description, s.price, s.duration_minutes, s.is_active,
                   c.name AS category, sp.business_name AS provider
            FROM services s
            JOIN categories c ON s.category_id = c.id
            JOIN service_providers sp ON s.provider_id = sp.id
            WHERE s.is_active = true
            ORDER BY s.name
            """;
        return jdbc.queryForList(sql);
    }

    @GetMapping("/category/{categoryId}")
    public List<Map<String, Object>> getByCategory(@PathVariable int categoryId) {
        String sql = """
            SELECT s.id, s.name, s.description, s.price, s.duration_minutes,
                   sp.business_name AS provider, sp.avg_rating
            FROM services s
            JOIN service_providers sp ON s.provider_id = sp.id
            WHERE s.category_id = ? AND s.is_active = true
            ORDER BY sp.avg_rating DESC
            """;
        return jdbc.queryForList(sql, categoryId);
    }
    
}
