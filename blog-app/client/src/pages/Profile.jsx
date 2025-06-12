import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser } from '@/redux/user/user.slice';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import Loading from '@/components/Loading';



const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();




  const { data: userData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-user/${user._id}`,
    {
      method: 'GET',
      credentials: 'include',
    },
    [user?._id]
  );

  console.log("userData", userData, "loading", loading, "error", error);


  //const [loading, setLoading] = useState(false);



  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    password: '', // FIXED: do not prefill password
  });





  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {

      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      dispatch(setUser(data.user)); // Update Redux state
      toast.success('Profile updated successfully!');

    } catch (err) {
      console.log(err);
      toast.error(err.message || 'Something went wrong');
    }
  };

  if (loading) {
    return <Loading />;
  } 



  const handleAvatarChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('avatar', file);

  try {
    const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/user/upload-avatar/${user._id}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload image');
    }

    // Update Redux with new avatar
    dispatch(setUser(data.user));
    toast.success('Avatar updated successfully!');
  } catch (err) {
    console.error(err);
    toast.error(err.message || 'Image upload failed');
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>

          {/* User Avatar */}
          <div className="mt-4 group">
            <img
              src={user?.avatar || '/default-avatar.png'}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4 
              cursor-pointer"
            />
           {/* Hidden file input */}
<input
  type="file"
  accept="image/*"
  className="hidden"
  id="avatarInput"
  onChange={handleAvatarChange}
/>

{/* Button to trigger file input */}
<div className="flex justify-center items-center">
  <button
    onClick={() => document.getElementById('avatarInput').click()}
    className="text-blue-600 hover:underline transition-all duration-300"
  >
    Update Img.
  </button>
</div>


          </div>
        </div>



        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>



          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 
        rounded-md px-3 py-2 focus:outline-none focus:ring-2
        focus:ring-blue-500"
            />

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
