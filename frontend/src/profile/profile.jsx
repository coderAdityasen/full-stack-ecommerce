import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import {
  setloadingfalse,
  setloadingtrue,
  updateavatar,
  updateuserinfo,
} from "../reducers/userReducer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useForm } from "react-hook-form";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.loading);
  const [profileLoading, setProfileLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleUpdateProfile = async (data) => {
    try {
      setProfileLoading(true);
      await axios.post(
        'https://full-stack-ecommerce-api-jade.vercel.app/user/updateprofile',
        data,
        { withCredentials: true }
      );

      dispatch(updateuserinfo(data));
      toast.success('Profile updated!');
    } catch (error) {
      toast.error('Error updating profile!');
      console.error(error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    try {
      dispatch(setloadingtrue());

      const imageFormData = new FormData();
      imageFormData.append('avatar', e.image[0]);
      imageFormData.append('upload_preset', 'adityasenhulala');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dj3gpszjr/image/upload',
        imageFormData
      );

      const imageUrl = response.data.secure_url;
      const formData = { avatar: imageUrl };

      await axios.post(
        'https://full-stack-ecommerce-api-jade.vercel.app/user/updateavatar',
        formData,
        { withCredentials: true }
      );

      dispatch(updateavatar(imageUrl));
      toast.success('Avatar updated!');
      reset();
    } catch (error) {
      toast.error('Failed to update avatar!');
      console.error('Avatar upload error:', error);
    } finally {
      dispatch(setloadingfalse());
    }
  };
  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full  flex items-center justify-center">
        <div id="avatar" className="w-3/12 mt-16 rounded-full">
          <img src={user.avatar} className="rounded-full w-72" alt="" />
          <form onSubmit={handleSubmit(handleFileChange)}>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload avatar
            </label>
            <input
            required={true}
              className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              {...register("image")}
              type="file"
            />
            {loading ? (
              <>
                <div
                  role="status"
                  className="mt-5 m-auto my-2 flex items-center ml-20 "
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="//www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="mt-5 text-white px-4 py-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Upload image
                </button>
              </>
            )}
          </form>
        </div>

        <form className="w-4/12 mt-16" onSubmit={handleUpdateProfile}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              aria-label="disabled input"
              className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={user.username}
              disabled
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder={user.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="fullname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={fullname}
              placeholder={user.fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          {profileLoading ? (
            <>
              <div
                role="status"
                className="mt-5 m-auto my-2 flex items-center ml-20 "
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Profile
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default Profile;
