import React, { useState, useContext } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { ThemeContext } from "../../context/ThemeContext";

const Profile = () => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const { theme } = useContext(ThemeContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setShowForm(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleSave = async () => {
    const croppedImage = await getCroppedImg(image, croppedArea);
    // Upload croppedImage to the server
    // Example: await uploadImage(croppedImage);
    setShowForm(false);
    setImage(croppedImage);
  };

  return (
    <>
      <h1 className="dark:text-white">PROFILE</h1>
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={image || "https://i.ibb.co/SmkQDH0/Profile-Picture-Placeholder.jpg"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-full">
            <label className="cursor-pointer">
            <span className="material-symbols-outlined hover-effect text-white">
                camera_alt
              </span>
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
        </div>
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white p-4 rounded-lg">
              <div className="relative w-64 h-64">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
              </div>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        )}
  </>
  );
};

export default Profile;