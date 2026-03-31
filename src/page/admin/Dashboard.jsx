import React, { useState } from "react";
import {
  useDeleteUserMutation,
  useDeleteVideoByAdminMutation,
  useGetAllUsersQuery,
  useGetReportedVideosQuery,
} from "../../api/adminApi";
import Spinner from "../../components/Spinner";
import ReportVideoCard from "./components/ReportVideoCard";
import UsersList from "./components/UsersList";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  // --- Users ---
  const { data: usersData, isLoading: usersLoading, refetch: refetchUsers } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const users = usersData?.data || [];

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
    }
  };

  // --- Reported Videos ---
  const { data: reportedData, isLoading: videosLoading } = useGetReportedVideosQuery();
  const [deleteVideoByAdmin] = useDeleteVideoByAdminMutation();
  const reportedVideos = reportedData?.data || [];

  const handleDeleteVideo = async (video) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      await deleteVideoByAdmin({ videoId: video._id, channelId: video.channel._id });
    }
  };

  const tabs = [
    { id: "users", label: "Users", count: users.length },
    { id: "videos", label: "Reported Videos", count: reportedVideos.length },
  ];

  return (
    <div className="min-h-screen  px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Manage users and reported content</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-800 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 text-sm font-semibold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-[#1a1a1a] text-white border border-b-0 border-gray-700"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                tab.id === "videos" && tab.count > 0
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="flex flex-col gap-3">
          {usersLoading ? (
            <Spinner />
          ) : users.length === 0 ? (
            <p className="text-gray-500 text-sm">No users found.</p>
          ) : (
            users.map((user) => (
              <UsersList key={user._id} user={user} refetchUsers={refetchUsers} />
            ))
          )}
        </div>
      )}

      {/* Reported Videos Tab */}
      {activeTab === "videos" && (
        <div className="flex flex-col gap-4">
          {videosLoading ? (
            <Spinner />
          ) : reportedVideos.length === 0 ? (
            <p className="text-gray-500 text-sm">No reported videos.</p>
          ) : (
            reportedVideos.map((video) => (
              <ReportVideoCard
                key={video._id}
                video={video}
                onDelete={() => handleDeleteVideo(video)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
