import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog } from "@fortawesome/free-solid-svg-icons";
import back from "../public/images/back.jpg"; // Update the path as needed

const Configuration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appDetails, setAppDetails] = useState({});
  const [name, setName] = useState("");
  const [configuration, setConfiguration] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const response = await axios.get(
          `https://ezeebe.onrender.com/apps/get/${id}`
        );
        setAppDetails(response.data);
        setName(response.data.name);
        setConfiguration(response.data.configuration);
      } catch (error) {
        console.error("Error fetching app details:", error.message);
      } finally {
        setLoading(false); // Move this line here to set loading to false after successful data fetch
      }
    };

    fetchAppDetails();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdateClick = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("configuration", configuration);
      if (image) {
        formData.append("icon", image);
      }

      await axios.put(
        `https://ezeebe.onrender.com/apps/update/${id}`,
        formData
      );

      // Navigate back to the homepage after successful update
      navigate("/");
    } catch (error) {
      console.error("Error updating app:", error.message);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(
        `https://ezeebe.onrender.com/apps/delete/${id}`
      );

      // Navigate back to the homepage after successful delete
      navigate("/");
    } catch (error) {
      console.error("Error deleting app:", error.message);
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
          <div>
            <span className="text-lg cursor-pointer" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faHome} />
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="container mx-auto mt-8 text-white px-4 lg:px-8">
            <h1 className="text-3xl font-medium mb-4">App Configuration</h1>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                
                <div className="mb-4">
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Update App Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    rows="5"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Update App Configuration"
                    value={configuration}
                    onChange={(e) => setConfiguration(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <br />
                <br />
                <div className="mb-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleUpdateClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-thin py-2 px-6 rounded focus:outline-none focus:shadow-outline mr-4"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="bg-red-500 hover:bg-red-700 text-white font-thin py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
