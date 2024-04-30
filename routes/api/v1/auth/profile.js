const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../../../Models/User");
const {AddExperience,DeleteExperience, UpdateExperience} = require("./ProfileFunction/Experience");
const Profile = require("../../../../Models/Private/Profile");

// @type    GET
// @route   /api/v1/auth/profile/getOne/:userName
// @desc    Get an employee by ID
// @access  Public
router.get("/getOne/:userName", (req, res) => {
    let userName = req.params.userName;
    User.findOne({ userName: userName })
        .then(myData => {
            if (!myData) {
                return res.status(404).json({ message: "My Data not found" });
            }
            
            // Exclude sensitive fields from the response
            const { loginAllowed, value, password, ...userData } = myData.toObject();

            res.json({
                data: userData,
                message: "Profile Data Loaded",
                variant: "success"
            });
        })
        .catch(err => console.log(err));
});

// @type    POST
// @route   /api/v1/auth/profile/add/additionalData/experience
// @desc    Add some additional data
// @access  Private
router.post("/add/additionalData/experience", 
passport.authenticate("jwt", { session: false }), async(req, res) => {

    await AddExperience(req,res)
})
// @type    POST
// @route   /api/v1/auth/profile/add/additionalData/experience/:experienceId
// @desc    Add some additional data
// @access  Private
router.post("/add/additionalData/experience/:experienceId", 
passport.authenticate("jwt", { session: false }), async(req, res) => {

    await UpdateExperience(req,res)
})
// @type    Get
// @route   /api/v1/auth/profile/get/oneProfile
// @desc    Add some additional data
// @access  Private
router.get("/get/oneProfile", 
passport.authenticate("jwt", { session: false }), async(req, res) => {

    let myData = await Profile.findOne({user:req.user._id}).catch(err => console.log(err))
res.json({
    data:myData,
    message:"Profile data loaded",
    variant:"success"
})

})

// @type    POST
// @route   /api/v1/auth/profile/delete/additionalData/experience/:experienceId
// @desc    Delete some additional data
// @access  Private
router.delete("/delete/additionalData/experience/:experienceId", 
passport.authenticate("jwt", { session: false }), async(req, res) => {

    await DeleteExperience(req,res)
})

module.exports = router;
