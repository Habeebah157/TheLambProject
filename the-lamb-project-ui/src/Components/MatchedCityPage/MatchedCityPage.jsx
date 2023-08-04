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
  // childRefs,
}) => {
  const [cityCard, setCityCard] = useState("");
  q;

  console.log("The formdata is.. ");
  console.log(formData);
  const [token, setToken] = useState(localStorage("token"));
  // setToken();

  const filterData = async () => {
    try {
      axios
        .post("http://localhost:3001/user/personal_preference", { formData })
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
  const getUserPreference = () => {
    try {
      const headers = {
        Authorization: "Bearer" + " " + token,
      };
      console.log(formData);
      axios
        .post(
          "http://localhost:3001/user/getUserPreference",
          { formData },
          { headers }
        )
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const returningUserInformation = () => {
    try {
      const headers = {
        Authorization: "Bearer " + token,
      };
      axios
        .get("http://localhost:3001/user/returningUserInformation", { headers })
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    filterData();
    getUserPreference();
    returningUserInformation();
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
          // childRefs={childRefs}
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
