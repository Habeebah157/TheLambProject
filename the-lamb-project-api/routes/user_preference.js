const express = require("express");
const User_Preference = require("../models/user_preferences");
const User = require("../models/user");
const router = express.Router();

//put the preferences in the table
//renders on the table
router.get("/preferences", async function (req, res, next) {
  try {
    console.log("HELLO");
    const preference = await User_Preference.insertData();
    return res.status(200).json({ preference });
  } catch (err) {
    next(err);
  }
});

//get the personal preferences information
//based on industry, hobby, etc....
router.post("/personal_preference", async function (req, res, next) {
  try {
    console.log("Personal Preference");

    const pers_preference = await User_Preference.gettingData(
      req.body.formData
    );

    console.log("PP Data:::");
    console.log({ pers_preference });
    return res.status(200).json({ pers_preference });
  } catch (err) {
    next(err);
  }
});
router.post("/getUserPreference", async function (req, res, next) {
  try {
    // const { user } = res.locals.user;
    // console.log("save the users information");
    // console.log("user_id:" + user);
    const { email } = res.locals.user;
    console.log("res.local1", res.locals.user.email);
    const preference = await User_Preference.savingUserData(req.body, email);
    return res.status(201).json({ preference });
  } catch (err) {
    next(err);
  }
});
router.get("/filledOutPreferenceForm", async function (req, res, next) {
  try {
    const { email } = res.locals.user;
    const preferenceExist =
      await User_Preference.checkingIfUserFilledPreference(email);
    return res.status(201).json({ preferenceExist });
  } catch (error) {
    console.log(error);
  }
});
router.get("/returningUserInformation", async function (req, res, next) {
  try {
    const { email } = res.locals.user;
    console.log("USER EMAIL", email);
    const returningUserInformation =
      await User_Preference.getReturningUserPreferences(email);
    return res.status(201).json({ returningUserInformation });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
