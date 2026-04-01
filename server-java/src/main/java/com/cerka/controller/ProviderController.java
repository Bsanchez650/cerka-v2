package com.cerka.controller;

import com.cerka.model.Provider;
import com.cerka.repository.ProviderRepository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/providers")
public class ProviderController {

    private final ProviderRepository providerRepo;
    private final JdbcTemplate jdbc;


    public ProviderController(ProviderRepository providerRepo, JdbcTemplate jdbc) {
        this.providerRepo = providerRepo;
        this.jdbc = jdbc;
    }

    @GetMapping
    public List<Provider> getAll() {
        return providerRepo.findAll();
    }

    @GetMapping("/{id}")
    public Provider getById(@PathVariable int id) {
        return providerRepo.findById(id);
    }

    @GetMapping("/{id}/services")
    public List<Map<String, Object>> getServices(@PathVariable int id) {
        String sql = """
            SELECT s.id, s.name, s.description, s.price, s.duration_minutes, c.name AS category
            FROM services s
            JOIN categories c ON s.category_id = c.id
            WHERE s.provider_id = ? AND s.is_active = true
            """;
        return jdbc.queryForList(sql, id);
    }
}