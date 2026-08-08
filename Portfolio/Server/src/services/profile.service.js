const Profile = require("../models/Profile.model");
const ApiError = require("../utils/ApiError");

/**
 * Gets the singleton profile document, creating a default one if it doesn't exist.
 */
const getProfile = async () => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({ name: "Portfolio Owner" });
  }
  return profile;
};

/**
 * Updates the profile document. Since it's a singleton, we always update the first one.
 * @param {Object} updateData - Fields to update.
 */
const updateProfile = async (updateData) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create(updateData);
    return profile;
  }
  Object.assign(profile, updateData);
  await profile.save();
  return profile;
};

module.exports = { getProfile, updateProfile };
