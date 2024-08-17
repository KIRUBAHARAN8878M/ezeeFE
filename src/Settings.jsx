import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import back from "../public/images/back.jpg"; // Update the path as needed

const Settings = () => {
  const [name, setName] = useState("");
  const [configuration, setConfiguration] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddButtonClick = async () => {
    if (!name || !configuration || !image) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("configuration", configuration);
      formData.append("icon", image);

      await axios.post(
        "https://ezee-be.vercel.app/apps/create",
        formData
      );

      // Redirect to the homepage after successful addition
      navigate("/");
    } catch (error) {
      setError("Error adding app: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-transparent-900 w-64 p-4 text-white flex flex-col justify-between">
          <div className="mb-8">
            <p className="text-2xl font-light">OpEzee</p>
          </div>
          <div className="mt-auto">
            <span className="text-lg cursor-pointer" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faHome} />
            </span>
            {/* <span className="text-lg cursor-pointer mt-4" onClick={() => navigate("/settings")}>
              <FontAwesomeIcon icon={faCog} />
            </span> */}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-8">
          <h1 className="text-3xl font-thin mb-4 text-white">Add App</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="w-full max-w-md">
            <div className="mb-4">
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="App Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                rows="5"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="App Configuration"
                value={configuration}
                onChange={(e) => setConfiguration(e.target.value)}
              />
            </div>
            <div className="mb-4 text-white">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {image && <p className="mt-2">Selected file: {image.name}</p>}
            </div>
            <button
              type="button"
              onClick={handleAddButtonClick}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-thin py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? "Adding..." : "ADD"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
