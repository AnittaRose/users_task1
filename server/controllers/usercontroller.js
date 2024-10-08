const users = require ('../db/models/users')
const { successfunction, errorfunction } = require('../util/responsehandler')
const bcrypt = require ('bcrypt')
const user = require('../db/models/user_types')


exports.addusers = async  function (req,res){
    try {
        let body = req.body;
        console.log('body',body);

        let password = body.password;

        let user_type = await user.findOne({user_type : body.user_type})
        console.log("user type" , user_type);

        let id = user_type._id
        console.log(id)

        body.user_type=id


        let salt = bcrypt.genSaltSync(10);
        console.log('salt',salt);

        let hashed_password = bcrypt.hashSync(password,salt);
        console.log('hashed_password' ,hashed_password)

        body.password=hashed_password



        

        let view = await users.create(body);
        console.log('view',view);

        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "Admin Added Successfully",
            data:view
            
        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    }
}

exports.viewusers = async function (req,res){
    try {
        let sections = await users.find();
        console.log('sections',sections)
        // let strsection = JSON.stringify(sections);

        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "Admin Added Successfully",
            data:sections
            
        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    }
}

exports.singleusers = async function(req,res){

    let single_id = req.params.id;
    console.log('id from single',single_id);

    let one_data = await users.findOne({_id: single_id})
    console.log('one_data',one_data);

    let Stringfy_data = JSON.stringify(one_data)
    console.log('Stringfy_data',Stringfy_data);

    if(one_data){
        res.status(200).send(one_data)
    }else{
        res.status(404).send('stringfy_data fetching fail');
    }
    
}

exports.deleteusers = async function(req,res){
    try {
        let delete_id =req.params.id;
        console.log('delete_id',delete_id);

        let delete_onedata = await users.deleteOne({_id : delete_id});
        res.status(200).send(delete_onedata)
    } catch (error) {
        console.log('error',error)
    }
}

exports.editusers = async function(req,res){
    try {
        let body = req.body;
        console.log('body',body);

    

        let id = req.params.id;

        let updatedata = await users.updateOne({ _id : id }, { $set: body });
        console.log('updatedata',updatedata);

        let strupdatedata = JSON.stringify(updatedata);
        console.log('strupdatedata',strupdatedata)

        if(updatedata){
            res.status(200).send(strupdatedata)
        }else{
            res.status(400).send('update failed')
        }

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product'); 
    }
}