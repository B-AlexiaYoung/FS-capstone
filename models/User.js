const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    googleId : String,
       
    movieList:  [{
        
        title: {
            type:String
        },
        movieId: {
            type:String
        },
        poster: {
            type:String  
        },
        movieReleaseDate: {
            type:String
        },
        overview: {
            type:String
        },
    
    }]
});
mongoose.model('users', userSchema);