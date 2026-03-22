-- Seed Categories
INSERT INTO categories (name, description) VALUES
('Hair', 'Haircuts, styling, coloring, and treatments'),
('Lashes & Brows', 'Lash extensions, lifts, brow shaping and tinting'),
('Nails', 'Manicures, pedicures, acrylics, and nail art'),
('Skincare', 'Facials, peels, and skin treatments'),
('Barber', 'Men''s haircuts, fades, beard trims');

-- Seed Users
INSERT INTO users (email, name, google_id, role) VALUES
('maria@example.com', 'Maria Lopez', 'google_001', 'provider'),
('james@example.com', 'James Chen', 'google_002', 'provider'),
('sofia@example.com', 'Sofia Rivera', 'google_003', 'customer'),
('alex@example.com', 'Alex Kim', 'google_004', 'customer');

-- Seed Customers
INSERT INTO customers (user_id) VALUES (3), (4);

-- Seed Service Providers
INSERT INTO service_providers (user_id, business_name, avg_rating, total_reviews) VALUES
(1, 'Lashes by Maria', 4.8, 24),
(2, 'James Cuts', 4.6, 15);

-- Seed Business Profiles
INSERT INTO business_profiles (provider_id, bio, experience_years, instagram_handle, accepts_walkins) VALUES
(1, 'Certified lash tech specializing in classic and volume sets. Based in Redwood City.', 4, '@lashesbymaria', false),
(2, 'Barber with 6 years experience. Fades, tapers, and beard work.', 6, '@jamescuts', true);

-- Seed Services
INSERT INTO services (provider_id, category_id, name, description, price, duration_minutes) VALUES
(1, 2, 'Classic Lash Set', 'Full set of classic individual lashes', 120.00, 90),
(1, 2, 'Lash Fill', 'Fill for existing classic or volume set', 65.00, 45),
(2, 5, 'Fade Haircut', 'Skin fade or taper with lineup', 35.00, 30),
(2, 5, 'Beard Trim', 'Shape and line up beard', 15.00, 15);

-- Seed Service Areas
INSERT INTO service_areas (provider_id, latitude, longitude, radius_miles) VALUES
(1, 37.4852, -122.2364, 5.00),
(2, 37.4852, -122.2364, 10.00);

-- Seed Tags
INSERT INTO tags (name) VALUES
('natural'), ('volume'), ('classic'), ('fade'), ('beard'), ('vegan');

-- Seed Service Tags
INSERT INTO service_tags (service_id, tag_id) VALUES
(1, 1), (1, 3),
(2, 2),
(3, 4),
(4, 5);