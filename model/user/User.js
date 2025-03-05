const mongoose = require('mongoose');
//schema 

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum: ['admin','user'],
        defaut: 'user',
    },
    password:{
        type: String,
        required: true,
    },
    lastLogin:{
        type: Date,
        default: Date.now(),
    },
    isVerified:{
        type: String,
        required: false,
    },
    accountLevel:{
        type: String,
        enum: ['bronze','silver','platinum'],
        default: 'bronze',
    },
    profilepicture:{
        type: String,
        default: "",
    },
    coverimage:{
        type: String,
        default: "",
    },
    bio:{
        type: String,
        
    },
    location:{
        type: String,
        
    },
    notificationPreferences:{
        email: { type: String, default: true},
        //...othr notifications (sms);
        
    },
    Gender:{
        type: String,
        enum: ['male','female','prefer not to say','non-binary'],
       
    },


    profileview: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    followers:[{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    blockusers:[{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    posts:[{type: mongoose.Schema.Types.ObjectId, ref: "post"}],
    likedposts:[{type: mongoose.Schema.Types.ObjectId, ref: "post"}],
    passwordResetToken:{
        type: String,
    },
    passwordResetExpires:{
        type: Date,
    },
    accountlVerificationToken:{
        type: String,
    },
    accountVerificationExpires:{
        type: Date,
    }
},
    {
        timestamps: true,
    }
    
);

//compile schema into model;
const User = mongoose.model("User",userSchema);
module.exports = User;