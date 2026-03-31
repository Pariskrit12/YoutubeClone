import { formatTimeAgo } from "../../../util/formatTime";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useDeleteUserMutation } from "../../../api/adminApi";

export default function UsersList({ user, refetchUsers }) {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${user.username}? This will remove all their videos, likes, comments, and subscriptions.`
      )
    ) {
      try {
        await deleteUser(user._id).unwrap();
        alert(`${user.username} has been deleted.`);
        if (refetchUsers) refetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl px-4 py-3 flex items-center gap-4 hover:border-gray-600 transition-colors">
      {/* Avatar */}
      <img
        className="w-11 h-11 rounded-full object-cover flex-shrink-0"
        src={user?.avatar}
        alt={user?.username}
      />

      {/* Info */}
      <div className="flex-1 grid grid-cols-4 gap-2 items-center overflow-hidden">
        <p className="text-sm font-semibold text-white truncate">{user?.username}</p>
        <Link to={`/channel/${user?.channel?._id}`}>
          <p className="text-blue-400 hover:text-blue-300 text-xs underline truncate transition-colors">
            {user?.channel?.channelName || "No Channel"}
          </p>
        </Link>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${
            user?.role === "admin"
              ? "bg-purple-600/30 text-purple-300"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          {user?.role}
        </span>
        <p className="text-gray-500 text-xs">{formatTimeAgo(user?.createdAt)}</p>
      </div>

      {/* Delete */}
      <button
        onClick={handleDeleteUser}
        disabled={isLoading}
        className="flex-shrink-0 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
      >
        {isLoading ? <Spinner /> : "Delete"}
      </button>
    </div>
  );
}
