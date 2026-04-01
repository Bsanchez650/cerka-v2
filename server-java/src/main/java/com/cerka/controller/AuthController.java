package com.cerka.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JdbcTemplate jdbc;

    public AuthController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/me")
    public org.springframework.http.ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null) {
            return org.springframework.http.ResponseEntity.status(401).body(Map.of("error", "Not logged in"));
        }

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String googleId = oauthUser.getAttribute("sub");

        List<Map<String, Object>> users = jdbc.queryForList(
            "SELECT id, email, name, avatar_url, role FROM users WHERE google_id = ?",
            googleId
        );

        if (users.isEmpty()) {
            return org.springframework.http.ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }

        return org.springframework.http.ResponseEntity.ok(users.get(0));
    }
}