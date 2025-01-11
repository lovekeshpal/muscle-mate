import React, { useState, useContext } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import { ThemeContext } from '../../context/ThemeContext';
import './profile.css'; // Import the custom CSS

const Profile = () => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1); // Add aspect state
  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    age: '',
    phoneNumber: '',
    username: '', 
    email: '',
    weight: '',
    height: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    profilePictureUrl: '',
    bio: '',
    goals: '',
    membershipStatus: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    preferredWorkoutTime: '',
    fitnessLevel: '',
    workoutPreferences: '',
    allergies: '',
    medicalConditions: '',
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2));
  };

  return (
    <>
      <h1 className="dark:text-white">PROFILE</h1>
      <div className="relative w-32 h-32 mx-auto mb-4">
        <img
          src={
            image || 'https://i.ibb.co/SmkQDH0/Profile-Picture-Placeholder.jpg'
          }
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
            <div className="relative w-64 h-64 cropper-container">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
                cropShape="rect"
                showGrid={true}
                minZoom={1}
                maxZoom={3}
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="dark:text-white">First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="dark:text-white">Middle Name</label>
            <input
              type="text"
              name="middleName"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="dark:text-white">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
            <label className="dark:text-white">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
        <div>
            <label className="dark:text-white">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="dark:text-white">Date of Birth (DOB)</label>
            <input
              type="date"
              name="dob"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="dark:text-white">Gender</label>
          <select
            name="gender"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
          <div>
            <label className="dark:text-white">Age</label>
            <input
              type="number"
              name="age"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="dark:text-white">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="dark:text-white">Weight</label>
            <input
              type="number"
              name="weight"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="dark:text-white">Height</label>
            <input
              type="number"
              name="height"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label className="dark:text-white">Address</label>
          <input
            type="text"
            name="address"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="dark:text-white">City</label>
            <input
              type="text"
              name="city"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="dark:text-white">State</label>
            <input
              type="text"
              name="state"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="dark:text-white">Country</label>
            <input
              type="text"
              name="country"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="dark:text-white">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label className="dark:text-white">Profile Picture URL</label>
          <input
            type="url"
            name="profilePictureUrl"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="dark:text-white">Bio</label>
          <textarea
            name="bio"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label className="dark:text-white">Goals</label>
          <textarea
            name="goals"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label className="dark:text-white">Membership Status</label>
          <input
            type="text"
            name="membershipStatus"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="dark:text-white">Emergency Contact Name</label>
          <input
            type="text"
            name="emergencyContactName"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="dark:text-white">Emergency Contact Phone</label>
          <input
            type="tel"
            name="emergencyContactPhone"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="dark:text-white">Preferred Workout Time</label>
          <input
            type="text"
            name="preferredWorkoutTime"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="dark:text-white">Fitness Level</label>
          <input
            type="text"
            name="fitnessLevel"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="dark:text-white">Workout Preferences</label>
          <textarea
            name="workoutPreferences"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label className="dark:text-white">Allergies</label>
          <textarea
            name="allergies"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label className="dark:text-white">Medical Conditions</label>
          <textarea
            name="medicalConditions"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Profile;
