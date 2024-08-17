import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import back from "../public/images/back.jpg"; // Update the path as needed

const Launcher = () => {
  const { appname, id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const response = await axios.post(`https://ezeebe.onrender.com/apps/launcher/${id}`, {
          appPath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          param: `https://${appname}.com`
        });
        console.log('App launched successfully:', response.data);
        setLoading(false); // Set loading to false after successful fetch
      } catch (error) {
        console.error('Error fetching app details:', error.message);
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchAppDetails();
  }, [appname, id]);

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
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center text-white">
            {loading ? (
              <div className="mb-4">
                <p className="mb-4">Loading...</p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Home
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <p className="mb-4">App has been launching ...</p>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launcher;
