import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import back from "../public/images/back1.png"; // Update the path as needed

const HomePage = () => {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://ezee-be.vercel.app/apps/get");
        setApps(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleAppClick = (appId) => {
    // Navigate to the configuration page with the app's ID in the URL params
    navigate(`/configuration/${appId}`);
  };

  const handleIconClick = (appId, appname) => {
    navigate(`/launcher/${appname}/${appId}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        // opacity:"90%"
      }}
    >
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-transparent-900 w-64 p-4 text-white flex flex-col justify-between">
          <div className="mb-8">
            <p className="text-2xl font-light">OpEzee</p>
          </div>
          <div className="mt-auto">
            <span className="text-lg">
              <FontAwesomeIcon onClick={() => navigate("/settings")} icon={faCog} />
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-8">
          <h1 className="text-3xl font-thin mb-4 text-white">Apps</h1>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {apps.map((app) => (
              <div
                key={app._id}
                className="cursor-pointer p-4 rounded-md bg-white bg-opacity-10"
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-12 object-contain mb-4 rounded-md"
                  onClick={() => handleIconClick(app._id, app.name)}
                />
                <p
                  className="text-lg text-white font-light text-center"
                  onClick={() => handleAppClick(app._id)}
                >
                  {app.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
