const Profile = require("../../../../../Models/Private/Profile");

const AddExperience = (req, res) => {
  const userId = req.user._id;
  const { company, title, startDate, endDate, description } = req.body;

  Profile.findOneAndUpdate(
    { user: userId },
    {
      $push: {
        experience: {
          company: company,
          title: title,
          startDate: startDate,
          endDate: endDate,
          description: description
        }
      }
    },
    { new: true } // to return the updated document
  )
    .then(profile => {
      if (!profile) {
        return res.json({ message: "Profile not found" });
      }
      res.json(
        {
          data:profile,
          message:"Profile Data Updated",
          variant:"success"
        }
      );
    })
    .catch(err => {
      console.error("Error adding experience:", err);
      res.status(500).json({ message: "Internal server error" });
    });
};

const UpdateExperience = async (req, res) => {
  const userId = req.user._id;
  const experienceId = req.params.experienceId; // Assuming you pass the _id in the request params
  const updatedExperienceData = req.body; // Assuming you have the updated data in the request body

  try {
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Find the experience with the specified _id
    const experienceToUpdate = profile.experience.find(exp => exp._id.toString() === experienceId);

    if (!experienceToUpdate) {
      return res.status(400).json({ message: "Invalid experience _id" });
    }

    // Update the fields of the experience object
    experienceToUpdate.company = updatedExperienceData.company;
    experienceToUpdate.title = updatedExperienceData.title;
    experienceToUpdate.startDate = updatedExperienceData.startDate;
    experienceToUpdate.endDate = updatedExperienceData.endDate;
    experienceToUpdate.description = updatedExperienceData.description;

    // Save the updated profile
    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteExperience = (req, res) => {
  const userId = req.user._id;
  const experienceId = req.params.experienceId; // Assuming you pass the _id in the request params

  Profile.findOne({ user: userId })
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      // Find the experience with the specified _id
      const experienceToDelete = profile.experience.find(exp => exp._id.toString() === experienceId);
      if (!experienceToDelete) {
        return res.status(400).json({ message: "Invalid experience _id" });
      }

      // Remove the experience from the array
      profile.experience.pull(experienceToDelete);

      // Save the updated profile
      return profile.save();
    })
    .then(updatedProfile => {
      res.json(
        {
          data:updatedProfile,
          message:"Profile Data Deleted",
          variant:"success"
        }
      );
    })
    .catch(err => {
      console.error("Error deleting experience:", err);
      res.status(500).json({ message: "Internal server error" });
    });
};

module.exports = {AddExperience,UpdateExperience,DeleteExperience};
