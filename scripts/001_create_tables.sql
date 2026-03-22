
-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    google_id VARCHAR(255) UNIQUE,
    avatar_url TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

--Customers
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

--Service Provider
CREATE TABLE service_providers(
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id),
    business_name VARCHAR(255) NOT NULL,
    avg_rating DECIMAL(2,1) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Business Profiles
CREATE TABLE business_profiles (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER UNIQUE NOT NULL REFERENCES service_providers(id),
    bio TEXT,
    experience_years INTEGER,
    instagram_handle VARCHAR(255),
    accepts_walkins BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Services
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER NOT NULL REFERENCES service_providers(id),
    category_id INTEGER NOT NULL REFERENCES categories(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Appointments
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    provider_id INTEGER NOT NULL REFERENCES service_providers(id),
    service_id INTEGER NOT NULL REFERENCES services(id),
    scheduled_at TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Availability Schedules
CREATE TABLE availability_schedules (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER NOT NULL REFERENCES service_providers(id),
    day_of_week INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_break BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER UNIQUE NOT NULL REFERENCES appointments(id),
    amount DECIMAL(10,2) NOT NULL,
    method VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Waitlist Entries
CREATE TABLE waitlist_entries (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    provider_id INTEGER NOT NULL REFERENCES service_providers(id),
    preferred_start TIMESTAMP,
    preferred_end TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'waiting',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    provider_id INTEGER NOT NULL REFERENCES service_providers(id),
    appointment_id INTEGER NOT NULL REFERENCES appointments(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Service Areas
CREATE TABLE service_areas (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER NOT NULL REFERENCES service_providers(id),
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    radius_miles DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Portfolios
CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER NOT NULL REFERENCES service_providers(id),
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    receiver_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tags
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Service Tags (M:M junction table)
CREATE TABLE service_tags (
    service_id INTEGER NOT NULL REFERENCES services(id),
    tag_id INTEGER NOT NULL REFERENCES tags(id),
    PRIMARY KEY (service_id, tag_id)
);

-- Instagram Posts
CREATE TABLE instagram_posts (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER NOT NULL REFERENCES service_providers(id),
    instagram_url TEXT NOT NULL,
    image_url TEXT,
    caption TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Reports
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    reporter_id INTEGER NOT NULL REFERENCES users(id),
    reported_entity VARCHAR(50) NOT NULL,
    reported_id INTEGER NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP
);
