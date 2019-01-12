const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    googleId : String,
    
    name: {
        type: String,
        //required:true
    },
    
    email: {
        type: String,
        //required: true,
    },
    
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
    
    }]
});
mongoose.model('users', userSchema);