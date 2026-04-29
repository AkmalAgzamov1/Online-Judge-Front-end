import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const GUEST_AVATAR = "/guest.jpg"; // fallback

export default function ProfilePage() {
  const { user, updateProfile, logout } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    university: "",
    bio: "",
  });

  const [avatarPreview, setAvatarPreview] = useState("");

  // =============================
  // LOAD USER → UPDATE FORM
  // =============================
  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        university: user.university || "",
        bio: user.bio || "",
      });

      setAvatarPreview(user.avatar || GUEST_AVATAR);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center mt-20 text-xl">Please log in first.</div>
    );
  }

  // =============================
  // AVATAR UPLOAD
  // =============================
  function handleAvatarUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  // =============================
  // SAVE CHANGES
  // =============================
  async function handleSave() {
    const updated = {
      username: form.username,
      university: form.university,
      bio: form.bio,
      avatar: avatarPreview,
      // email НЕ отправляем
    };

    const res = await updateProfile(updated);
    if (res.success) setIsEditing(false);
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-[#0d1117] text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setAvatarPreview(user.avatar || GUEST_AVATAR);
                  setForm({
                    username: user.username,
                    email: user.email,
                    university: user.university,
                    bio: user.bio,
                  });
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-2xl p-8 shadow-xl">

          {/* TOP SECTION */}
          <div className="flex items-center gap-6 mb-8">

            {/* AVATAR */}
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                <img
                  src={avatarPreview || GUEST_AVATAR}
                  className="w-full h-full object-cover"
                />
              </div>

              {isEditing && (
                <label className="absolute bottom-0 right-0 px-2 py-1 rounded-full bg-black/60 text-white text-xs cursor-pointer">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </label>
              )}
            </div>

            {/* USERNAME + XP + EMAIL */}
            <div>
              {!isEditing ? (
                <>
                  {/* Username */}
                  <h2 className="text-2xl font-bold">{user.username}</h2>

                  {/* XP (как в public profile) */}
                  <p className="text-purple-400 font-semibold mt-1">
                    {user.exp || 0} XP
                  </p>

                  {/* Solved problems */}
                  <p className="text-sm text-gray-400 mt-1">
                    {(user.solvedProblems?.length || 0)} problems solved
                  </p>
                </>
              ) : (
                <>
                  <input
                    className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 mb-2"
                    value={form.username}
                    placeholder="Username"
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />

                  <input
                    className="w-full px-3 py-2 rounded bg-white/10 border border-white/20"
                    value={form.email}
                    readOnly
                    placeholder="Email"
                  />
                </>
              )}
            </div>
          </div>

          {/* UNIVERSITY */}

          <div className="mb-6">
            <h3 className="text-lg font-semibold">gmail: </h3>
            
              <p>{user.email || "Not specified"}</p>
             
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">University</h3>
            {!isEditing ? (
              <p>{user.university || "Not specified"}</p>
            ) : (
              <input
                className="mt-2 w-full px-3 py-2 rounded bg-white/10 border border-white/20"
                value={form.university}
                placeholder="Your University"
                onChange={(e) =>
                  setForm({ ...form, university: e.target.value })
                }
              />
            )}
          </div>
          {/* //     <p className="text-gray-400 text-sm mt-1">{user.email}</p> */}


          {/* BIO */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Bio</h3>
            {!isEditing ? (
              <p>{user.bio || "No bio yet"}</p>
            ) : (
              <textarea
                rows="3"
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20"
                value={form.bio}
                placeholder="Write something about yourself..."
                onChange={(e) =>
                  setForm({ ...form, bio: e.target.value })
                }
              />
            )}
          </div>

          {/* JOIN DATE */}
          <div className="mt-8">
            <p className="text-gray-400 text-sm">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

        {/* LOGOUT BUTTON */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => {
              logout();
              window.location.href = "/"; // redirect
            }}
            className="
              px-6 py-3 
              bg-red-600 hover:bg-red-500 
              text-white font-semibold 
              rounded-lg shadow-md 
              transition
            "
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
