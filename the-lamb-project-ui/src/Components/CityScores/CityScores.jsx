import React, { useState, useEffect } from "react";
import axios from "axios";

const CityScores = ({ city }) => {
  const [cityName, setCityName] = useState("");
  const [scores, setScores] = useState([]);
  const [summary, setSummary] = useState("");
  async function getCityScore() {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/city/${city}/scores`
      );
      const responseData = response.data;
      setCityName(responseData._links?.ua?.name || "");
      setScores(responseData.categories || []);
      setSummary(responseData.summary || "");
    } catch (error) {
      console.error("Error fetching city scores:", error.message);
      setScores([]);
      setSummary("");
    }
  }

  useEffect(() => {
    getCityScore();
    // By default, load scores for a default city, e.g., Houston
    // handleSearch({ preventDefault: () => {} }); // Pass an empty object with a `preventDefault` function to simulate the event
  }, []);

  const getColorForScore = (score) => {
    const highestScore = Math.max(
      ...scores.map((category) => category.score_out_of_10)
    );
    const lowestScore = Math.min(
      ...scores.map((category) => category.score_out_of_10)
    );
    const middleScore = (highestScore + lowestScore) / 2;

    if (score >= highestScore) return "#0d6999"; // Blue (highest)
    if (score >= middleScore) return "#19ad51"; // Green (middle)
    if (score >= 5 && score <= 7) return "#f3c32c"; // Yellow (between 5 and 7)
    return "#e70c26"; // Red (lowest)
  };

  const replaceTeleportWithLAMB = (text) => {
    return text.replace(/Teleport/g, "LAMB");
  };

  return (
    <div className="container mx-auto px-4">
      {scores.length > 0 ? (
        <div>
          <div className="flex overflow-x-auto pb-4">
            {scores
              .filter((category) =>
                [
                  "Housing",
                  "Cost of Living",
                  "Safety",
                  "Commute",
                  "Healthcare",
                ].includes(category.name)
              )
              .map((category) => (
                <div key={category.name} className="w-1/3 px-2">
                  <h3 className="text-lg font-semibold mb-2 whitespace-nowrap">
                    {category.name}
                  </h3>
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-full font-semibold text-white"
                    style={{
                      backgroundColor: getColorForScore(
                        category.score_out_of_10
                      ),
                    }}
                  >
                    {category.score_out_of_10.toFixed(2)}
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">Summary</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: replaceTeleportWithLAMB(summary),
              }}
            />
          </div>
        </div>
      ) : (
        <div>No scores found for the entered city.</div>
      )}
    </div>
  );
};

export default CityScores;
