const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id)
    .then(user =>{
        done(null, user);
    })
})
// tell passport to use googleStrategy for auth.
// needs id, secret and redirect path url,
// pass second argument as an arrow function that accepts 4 parameters
passport.use(
    new GoogleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
        }, 
       async (accessToken, refreshToken, profile, done) => {
            //console.log (profile.id);
        
          const existingUser = await User.findOne({googleId:profile.id})
                if(existingUser){
                 return done(null, existingUser);
                }
                const user= await new User({ 
                    googleId: profile.id,
                    //name: profile.displayName,
                    // email: emails.value
                    })
                    .save()
                    done(null, user);
               
        }
    
    )
)
