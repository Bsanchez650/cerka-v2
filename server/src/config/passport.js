const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      const existing = await db.query(
        'SELECT * FROM users WHERE google_id = $1',
        [profile.id]
      );

      if (existing.rows.length > 0) {
        return done(null, existing.rows[0]);
      }

      // Create new user
      const newUser = await db.query(
        `INSERT INTO users (email, name, google_id, avatar_url, role)
         VALUES ($1, $2, $3, $4, 'customer')
         RETURNING *`,
        [
          profile.emails[0].value,
          profile.displayName,
          profile.id,
          profile.photos[0]?.value
        ]
      );

      // Also create customer record
      await db.query(
        'INSERT INTO customers (user_id) VALUES ($1)',
        [newUser.rows[0].id]
      );

      done(null, newUser.rows[0]);
    } catch (err) {
      done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;