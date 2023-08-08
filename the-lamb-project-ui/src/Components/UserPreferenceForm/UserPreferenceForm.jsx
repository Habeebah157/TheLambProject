import React, { useEffect } from "react";
import { useState } from "react";
import StateInfo from "../UserPrefPages/StateInfo";
import HobbyInfo from "../UserPrefPages/HobbyInfo";
import Industry from "../UserPrefPages/Industry";
import WeatherInfo from "../UserPrefPages/WeatherInfo";
import { useNavigate, Navigate } from "react-router-dom";
import MatchedCityPage from "../MatchedCityPage/MatchedCityPage";
import axios from "axios";

const UserPreferenceForm = ({
  swiped,
  outOfFrame,
  lastDirection,
  formData,
  setFormData,
  swipe,
  childRefs,
}) => {
  const [page, setPage] = useState(0);
  const [formComplete, setFormComplete] = useState(false);
  const [saveData, setSaveData] = useState([]);
  const [returningUser, setReturningUser] = useState(false);
  const [userSavedPreference, setUserSavedPreference] = useState([]);
  const [token, getToken] = useState(localStorage.getItem("token"));

  // get back saved data of user
  const returningUserInformation = async () => {
    try {
      const headers = {
        Authorization: "Bearer " + token,
      };
      let response = await axios.get(
        "http://localhost:3001/user/returningUserInformation",
        { headers }
      );
      console.log(response);
      if (response.data === "false") {
        setReturningUser(false);
      } else {
        setReturningUser(true);
        setUserSavedPreference(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FormTitles = ["State", "Industry", "Hobbies", "Weather"];
  const PageDisplay = () => {
    if (page === 0) {
      return <StateInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Industry formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <HobbyInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <WeatherInfo formData={formData} setFormData={setFormData} />;
    }
  };

  useEffect(() => {
    returningUserInformation();
  }, []);

  return (
    <div>
      {!formComplete && !returningUser && userSavedPreference !== "false" ? (
        <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="header">
              <h1 className="mt-10 text-3xl underline decoration-sky-700/300 font-bold leading-9 tracking-tight text-[#044389]">
                {FormTitles[page]}
              </h1>
            </div>
            <br />
            <div className="body">{PageDisplay()}</div>
            <br />
            <div className="flex space-x-4 ...">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={page == 0}
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}
              >
                Prev
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  if (page === FormTitles.length - 1) {
                    setFormComplete(true);
                    console.log(formData);
                  } else {
                    setPage((currPage) => currPage + 1);
                  }
                }}
              >
                {page === FormTitles.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      ) : !returningUser ? (
        <MatchedCityPage
          swiped={swiped}
          outOfFrame={outOfFrame}
          lastDirection={lastDirection}
          formData={formData}
          swipe={swipe}
          childRefs={childRefs}
        />
      ) : userSavedPreference != "" ? (
        <MatchedCityPage
          swiped={swiped}
          outOfFrame={outOfFrame}
          lastDirection={lastDirection}
          formData={userSavedPreference.returningUserInformation}
          swipe={swipe}
          childRefs={childRefs}
        />
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default UserPreferenceForm;
