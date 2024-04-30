const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { validateOnCreate } = require("../../../../validation/auth/creatAccountValidation");
const User = require("../../../../Models/User");
const Profile = require("../../../../Models/Private/Profile");

// /api/v1/auth/addUser/check
router.get("/check",(req,res)=>{
console.log("i am ")
  res.send("I am working")
})
// @type    POST
// @route   /api/v1/auth/createAccount/createOne
// @desc    Create a new profile
// @access  Public
router.post("/createOne",
validateOnCreate, 
async (req, res) => { 
    const newUser = {
      // user:req.user.id,
      profileType: req.body.profileType,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      primaryEmail: req.body.primaryEmail,
      mobileNumber: req.body.mobileNumber,
      password:req.body.password,
      userImage: req.body.userImage,
      userName:req.body.userName || req.body.mobileNumber || req.body.primaryEmail,
    };
 //make value
var val1 = req.body.password
newUser.value = right_three(val1)
     // Encrypt Password using bcrypt
 // Encrypt Password using bcrypt
bcrypt.genSalt(10, (err, salt) => {
  if (err) {
    console.error("Error generating salt:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      variant: "error"
    });
  }

  // Check if newUser.password is defined
  if (newUser.password) {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({
          message: "Internal Server Error",
          variant: "error"
        });
      }

      newUser.password = hash;
     new User(newUser)
        .save()
        .then((user) =>
    {    if(user){
      CreateBlankProfile(user)
          res.json({
            message: "Congratulations! Your Account is Successfully Created ",
            variant: "success"
          })} else {
            res.json({
              message: "Something Went Wrong",
              variant: "success"
            })
          }}
        )
        .catch((err) =>
          res.status(404).json({
            message: "Problem in saving",
            variant: "error"
          } + err)
        );
    });
  } else {
    // Handle the case where newUser.password is undefined
    return res.status(400).json({
      message: "Invalid password",
      variant: "error"
    });
  }
});

});

function right_three(str) {
    if (str.length > 1)
      {
        var text = "";
  var char_list = "abcdefghijklmnopqrstuvwxyz0123456789";
  for(var i=0; i < 5; i++ )
  {  
  text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  var k = str.slice(-3) + text + str.slice(0, -3);
        return k
      }
  return str;
  }

const CreateBlankProfile = (user) => {
  let userId = user._id;

  let newData = {user:userId}
  
  new Profile(newData)
  .save()
  .then(console.log("Profile got created"))
  .catch(err => console.log(err))
}
// @type    POST
// @route   /api/v1/auth/createAccount/add/additionalData
// @desc    Add some additional data
// @access  Private
router.post("/add/additionalData", 
passport.authenticate("jwt", { session: false }), (req, res) => {
let myUser = {
}
if(req.body.firstName)myUser.firstName=req.body.firstName;
if(req.body.lastName)myUser.lastName=req.body.lastName;
if(req.body.primaryEmail)myUser.primaryEmail=req.body.primaryEmail;
if(req.body.mobileNumber)myUser.mobileNumber=req.body.mobileNumber;
if(req.body.userImage)myUser.userImage=req.body.userImage;
if(req.body.employmentType)myUser.employmentType=req.body.employmentType;
if(req.body.secondaryEmail)myUser.secondaryEmail=req.body.secondaryEmail;
if(req.body.domainSkills)myUser.domainSkills=req.body.domainSkills;
if(req.body.personalSkills)myUser.personalSkills=req.body.personalSkills;
if(req.body.dob)myUser.dob=req.body.dob;


  User.findByIdAndUpdate(req.user._id, myUser, { new: true })
  .then(myData => {
    if (!myData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Profile Updated",variant:"success" });
  })
  .catch(err => console.log(err));
});

// @type    GET
// @route   /api/v1/addition/addemployee/:id
// @desc    Get an employee by ID
// @access  Public
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  AddEmployee.findById(req.params.id)
    .then(employee => {
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    })
    .catch(err => console.log(err));
});

// @type    GET
// @route   /api/v1/addition/addemployee
// @desc    Get all employees
// @access  Public
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  AddEmployee.find()
    .then(employees => res.json(employees))
    .catch(err => console.log(err));
});

// @type    PUT
// @route   /api/v1/addition/addemployee/:id
// @desc    Update an employee by ID
// @access  Public
router.put("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  AddEmployee.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(employee => {
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    })
    .catch(err => console.log(err));
});

// @type    DELETE
// @route   /api/v1/addition/addemployee/:id
// @desc    Delete an employee by ID
// @access  Public
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  AddEmployee.findByIdAndRemove(req.params.id)
    .then(employee => {
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json({ message: "Employee deleted successfully" });
    })
    .catch(err => console.log(err));
});

module.exports = router;