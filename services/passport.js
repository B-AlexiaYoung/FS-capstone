const passport = require ('passport');
const GoogleStrategy =  require ('passport-google-oauth20').Strategy;
const mongoose = require ('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
// tell passport to use googleStrategy for auth.
// needs id, secret and redirect path url,
// pass second argument as an arrow function that accepts 4 parameters
passport.use(
    new GoogleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) => {
            console.log (profile.id);
        
            User.findOne({googleId:profile.id})
            .then((existingUser) => {
                if(existingUser){
                }else{
                    new User({ googleId: profile.id,
                    //name: profile.displayName,
                    // email: emails.value
                    }).save();
                }
            });
        }
    
    )
)
