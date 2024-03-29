
const firebase = require('../db/firestore');
let db = firebase.firestore();

const admin = require('firebase-admin');
const auth = admin.auth();


const serviceAccount = require('../config/ridewithmedb-firebase-adminsdk-4hbmz-e6a64ac696.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
},'ridewithmedb');

const au = admin.auth();


const getUser = async (req,res,next)=>{
    console.log("get_user");
    const users = db.collection('users');
    try{
        let u_id = req.body.id || "";
        const user_details = (await users.doc(u_id).get()).data();
        res.send({user_details})
    }catch(err){
        console.error('Error getting details: ', err);
    }
};

const addUser = async (req, res, next) => {
    try {
      let id = req.body.id || "";
      if (id === "") {
        throw new Error("Invalid ID");
      }
      let name = req.body.name || "";
      let age = req.body.age || "";
      let gender = req.body.gender || "";
      let phone = req.body.phone || "";
      let photoURL = req.body.photoURL || "";
  
      await db.collection("users").doc(id).set({
        id: id,
        name: name,
        age: age,
        gender: gender,
        phone: phone,
        photoURL: photoURL,
      });
  
      // Create a document for notifications
      await db.collection("Notifications").doc(id).set({
        notification_size: 0,
      });
  
      // Create a sub-collection named "notifications" inside the Notifications document
      await db
        .collection("Notifications")
        .doc(id)
        .collection("notifications")
        .doc()
        .set({
          // Add any initial notification data here
        });
  
      res.status(200).json({ message: "user insert details successfully" });
    } catch (err) {
      console.log("Error addUser details: ", err);
      res.status(200).json({ message: "user insert details failed" });
    }
  };
  


const updateUser = async (req,res,next) =>{
    console.log("update details");
    try{
        let id = req.body.id || "";
        let name = req.body.name || "";
        let age = req.body.age || "";
        let gender = req.body.gender || "";
        let phone = req.body.phone || "";
        let photoURL = req.body.photoURL || "";
        await db.collection('users').doc(id).set({
            id: id,
            name:name,
            age: age,
            gender: gender,
            phone: phone,
            photoURL:photoURL,
        })
    }catch(err){
        console.log('Error updateUser details: ', err)
    }
};


const SignIn = async (req,res,next) =>{
    console.log("you got to login");
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    try {
        const userCredential = await au.signInWithEmailAndPassword({email, password});
        const user = userCredential.user;
        res.send({ success: true, message: 'Login successful', user: user });
        console.log("yesss");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.status(401).send({ success: false, message: errorMessage });
        console.log("nooooo");
      }
}


const SignUp = async (req,res,next) =>{
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
    }
    try {
        const userRecord = await auth.createUser({
        email,
        password
        });
        console.log('User account created:', userRecord.toJSON());
        return res.status(201).send({ message: 'User account created', id: userRecord.toJSON().uid });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 'auth/email-already-exists') {
        return res.status(409).send({ message: 'Email already in use' });
        }
        return res.status(500).send({ message: 'Server error' });
    }
    }


module.exports = {
    getUser,
    addUser, 
    updateUser,
    SignIn, 
    SignUp,
};