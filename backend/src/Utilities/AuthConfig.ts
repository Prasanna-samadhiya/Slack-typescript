import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
const User =require('../Modals/User/UserModal'); // Adjust the path to your User model

export const configureGoogleOAuth = (app: any) => {
  // Configure cookie-session middleware
  app.use(require('cookie-session')({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: ['your-session-secret'],
  }));

  // Initialize Passport and restore session
  app.use(passport.initialize());
  app.use(passport.session());

  // Passport configuration
  passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback',
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      // Check if user already exists in the database
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      // Create a new user if not exists
      const newUser = await new User({ googleId: profile.id }).save();
      done(null, newUser);
    } catch (error) {
      done(error, null);
    }
  }));

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done: any) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Define routes for Google OAuth
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile'],
  }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req: any, res: any) => {
      // Successful authentication
      res.redirect('/');
    });

  app.get('/logout', (req: any, res: any) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/current_user', (req: any, res: any) => {
    res.send(req.user);
  });
};
