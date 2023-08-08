import React from "react";

import "./MatchedCityPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MatchedCityCard from "../MatchedCityCard/MatchedCityCard";

// import "../../Icons/accept.png";
const MatchedCityPage = ({
  swiped,
  outOfFrame,
  lastDirection,
  formData,
  swipe,
  childRefs,
}) => {
  const [cityCard, setCityCard] = useState("");
  const [token, getToken] = useState(localStorage.getItem("token"));

  console.log("The formdata is.. ");
  console.log(formData);
  const saveUserData = async () => {
    try {
      const headers = {
        Authorization: "Bearer " + token,
      };
      let response = await axios.post(
        "https://the-lamb-project-api.onrender.com/user/getUserPreference",
        { formData },
        { headers }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterPreference = async () => {
    console.log("calling useEffect");
    try {
      axios
        .post("https://the-lamb-project-api.onrender.com/user/personal_preference", { formData })
        .then((response) => {
          setCityCard(response.data);
          console.log("response.data from matchedcity: ");
          console.log(response.data);
        });
    } catch (error) {
      // error handling, won't crash your code
      console.log("ERROR", error);
    }
    console.log("test");
  };

  useEffect(() => {
    saveUserData();
    filterPreference();
  }, []);

  console.log("city page", cityCard);
  return (
    <div>
      {cityCard !== "" ? (
        <MatchedCityCard
          formData={formData}
          swipe={swipe}
          swiped={swiped}
          outOfFrame={outOfFrame}
          lastDirection={lastDirection}
          cityCard={cityCard}
          childRefs={childRefs}
        />
      ) : (
        // "CityCard is empty"
        // <div className="border">
        //   <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
        <p> Loading...</p>

        // </div>
      )}
    </div>
  );
};

export default MatchedCityPage;
