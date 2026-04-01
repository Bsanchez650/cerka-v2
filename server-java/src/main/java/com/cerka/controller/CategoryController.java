package com.cerka.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")

public class CategoryController {

    private final JdbcTemplate jdbc;

    public CategoryController(JdbcTemplate jdbc){
        this.jdbc = jdbc;
    }

    @GetMapping
    public List<Map<String, Object>> getAll() {
        return jdbc.queryForList("SELECT * FROM categories ORDER BY name");
    }

    @GetMapping("/{id}")
    public Map<String, Object> getById(@PathVariable int id) {
        return jdbc.queryForMap("SELECT * FROM categories WHERE id = ?", id);
    }
    
}
