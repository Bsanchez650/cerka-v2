package com.cerka.repository;

import com.cerka.model.Provider;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProviderRepository {
    private final JdbcTemplate jdbc;

    public  ProviderRepository(JdbcTemplate jdbc){
        this.jdbc = jdbc;
    }

    private final RowMapper<Provider> rowMapper = (rs, rowNum) -> {
        Provider p = new Provider();
        p.setId(rs.getInt("id"));
        p.setBusinessName(rs.getString("business_name"));
        p.setAvgRating(rs.getBigDecimal("avg_rating"));
        p.setTotalReviews(rs.getInt("total_reviews"));
        p.setName(rs.getString("name"));
        p.setAvatarUrl(rs.getString("avatar_url"));
        p.setBio(rs.getString("bio"));
        p.setInstagramHandle(rs.getString("instagram_handle"));
        p.setAcceptsWalkins(rs.getBoolean("accepts_walkins"));
        return p;
    };

    public List<Provider> findAll() {
        String sql = """
            SELECT sp.id, sp.business_name, sp.avg_rating, sp.total_reviews,
                   u.name, u.avatar_url, bp.bio, bp.instagram_handle, bp.accepts_walkins
            FROM service_providers sp
            JOIN users u ON sp.user_id = u.id
            LEFT JOIN business_profiles bp ON bp.provider_id = sp.id
            WHERE sp.is_active = true
            """;
        return jdbc.query(sql, rowMapper);
    }

    public Provider findById(int id) {
        String sql = """
            SELECT sp.id, sp.business_name, sp.avg_rating, sp.total_reviews,
                   u.name, u.avatar_url, bp.bio, bp.experience_years,
                   bp.instagram_handle, bp.accepts_walkins
            FROM service_providers sp
            JOIN users u ON sp.user_id = u.id
            LEFT JOIN business_profiles bp ON bp.provider_id = sp.id
            WHERE sp.id = ?
            """;
        List<Provider> results = jdbc.query(sql, rowMapper, id);
        return results.isEmpty() ? null : results.get(0);
    }

}
