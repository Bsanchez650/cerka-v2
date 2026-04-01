package com.cerka.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

    private final JdbcTemplate jdbc;

    public OAuthSuccessHandler(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String googleId = oauthUser.getAttribute("sub");
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");
        String avatar = oauthUser.getAttribute("picture");

        // Check if user exists
        List<Map<String, Object>> existing = jdbc.queryForList(
            "SELECT * FROM users WHERE google_id = ?", googleId
        );

        if (existing.isEmpty()) {
            // Create new user
            jdbc.update(
                "INSERT INTO users (email, name, google_id, avatar_url, role) VALUES (?, ?, ?, ?, 'customer')",
                email, name, googleId, avatar
            );

            // Get the new user's id
            Map<String, Object> newUser = jdbc.queryForMap(
                "SELECT id FROM users WHERE google_id = ?", googleId
            );
            int userId = (int) newUser.get("id");

            // Create customer record
            jdbc.update("INSERT INTO customers (user_id) VALUES (?)", userId);
        }

        response.sendRedirect("http://localhost:3000");
    }
}