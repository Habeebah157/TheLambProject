import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Weather from "../Weather/Weather";
import CityScores from "../CityScores/CityScores";

const MoreInformationCard = () => {
  const [info, setInfo] = useState([]);
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  async function getMoreInfo() {
    try {
      // const response = await axios.get("http://localhost:3001/getwalkscore/"+ city);
      const response = await axios.get(
        `http://localhost:3001/getwalkscore/${city}`
      );
      setInfo(response?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/historical-weather?city=${city}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setError("Failed to fetch weather data");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    getWeatherData();
    getMoreInfo();
  }, []);

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-5xl">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="px-4 sm:px-0">
          <h1 className="text-xl font-semibold leading-7 text-[#044389]">
            {city.toUpperCase()} INFORMATION 🏙️
          </h1>
          <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-[#015239]">
            More details to ensure this is the city that you want!
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6 text-[#044389]">
                Walk Score:
              </dt>
              <dd className="mt-1 text-sm leading-6 font-semibold text-[#015239] sm:col-span-2 sm:mt-0">
                {info?.walkscore}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6 text-[#044389]">
                {" "}
                Transit Score:
              </dt>
              <dd className="mt-1 text-sm leading-6 font-semibold text-[#015239] sm:col-span-2 sm:mt-0">
                {info?.transit?.score}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6 text-[#044389]">
                {" "}
                Bike Score:{" "}
              </dt>
              <dd className="mt-1 text-sm leading-6 font-semibold text-[#015239] sm:col-span-2 sm:mt-0">
                {info?.bike?.score}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6 text-[#044389]">
                Weather:{" "}
              </dt>
              <dd className="mt-1 text-sm leading-6 font-semibold text-[#015239] sm:col-span-2 sm:mt-0">
                🥶 Lowest Temperature: {weatherData?.todayMinTemp}°F <br />
                🌡 Average Temperature: {weatherData?.todayAvgTemp}°F <br />
                🥵 Highest Temperature: {weatherData?.todayMaxTemp}°F{" "}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-semibold leading-6 text-[#044389]">
                City Description:
              </dt>
              <dd className="mt-1 text-sm leading-6 font-semibold text-[#015239] sm:col-span-2 sm:mt-0">
                {<CityScores city={city} />}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default MoreInformationCard;
