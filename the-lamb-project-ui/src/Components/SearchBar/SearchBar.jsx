import React, { useState } from "react";
import axios from "axios";

const CitySummary = () => {
  const [cityName, setCityName] = useState("");
  const [summary, setSummary] = useState("");
  const [teaserLength, setTeaserLength] = useState(200); // Increase the teaser length to 200 characters
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Replace spaces with hyphens and convert to lowercase
      const formattedCityName = cityName.replace(/\s+/g, "-").toLowerCase();
      const response = await axios.get(
        `http://localhost:3001/api/city/${formattedCityName}/scores`
      );
      const responseData = response.data;
      setCityName(responseData._links?.ua?.name || "");
      setSummary(responseData.summary || "");
      setSearched(true);
      setError("");
    } catch (error) {
      console.error("Error fetching city summary:", error.message);
      setSummary("");
      setSearched(true);
      setError("No summary found for the entered city.");
    }
  };

  const replaceTeleportWithLAMB = (text) => {
    return text.replace(/Teleport/g, "LAMB");
  };

  const getTeaser = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <form onSubmit={handleSearch} className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mr-2"
        />
        <button
          type="submit"
          className="bg-[#015239] rounded-lg hover:bg-green-800 text-white px-4 py-2"
        >
          Try Now!
        </button>
      </form>
      {searched && summary && (
        <div>
          <h1 className="text-3xl font-bold mb-4">{cityName}</h1>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2 flex justify-center">
              City Summary
            </h2>
            <div
              className="text-xl flex justify-center"
              dangerouslySetInnerHTML={{
                __html: replaceTeleportWithLAMB(
                  getTeaser(summary, teaserLength)
                ),
              }}
            />
          </div>
          <p className="mt-4 text-lg py-5 text-[red] rounded-lg flex justify-center">
            Create an account to see the full summary and access personalized
            features!
          </p>
        </div>
      )}
      {searched && error && (
        <div className="mb-4 flex justify-center px-4 py-2">{error}</div>
      )}
    </div>
  );
};

export default CitySummary;
