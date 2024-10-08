const mongoose = require('mongoose');


const users = new mongoose.Schema({

    username :{
        type:String
    },
    email :{
        type:String
    },
    password :{
        type:String
    },
    user_type:{

        type :mongoose.Schema.Types.ObjectId,
        ref : "user_type"
    }


    

});

module.exports =mongoose.model("users",users);
