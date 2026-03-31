import React from "react";
import { formatTimeAgo } from "../../../util/formatTime";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faTrash } from "@fortawesome/free-solid-svg-icons";

const ReportVideoCard = ({ video, onDelete }) => {
  const reportCount = video.reportedBy?.length || 0;

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4 flex gap-4 hover:border-gray-600 transition-colors">
      {/* Thumbnail */}
      <Link to={`/video/${video._id}`} className="flex-shrink-0">
        <img
          className="w-44 aspect-video object-cover rounded-xl"
          src={video.thumbnail}
          alt={video.title}
        />
      </Link>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 overflow-hidden">
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <Link to={`/video/${video._id}`}>
              <p className="font-semibold text-white hover:underline line-clamp-2 leading-snug">
                {video.title}
              </p>
            </Link>
            {reportCount > 1 && (
              <span className="flex-shrink-0 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
                {reportCount} reports
              </span>
            )}
          </div>

          <p className="text-gray-400 text-xs">
            {video.channel?.channelName || "Unknown Channel"}
          </p>
          <p className="text-gray-500 text-xs">
            {video.views} views • {formatTimeAgo(video.createdAt)}
          </p>

          {/* Reporters */}
          {reportCount > 0 && (
            <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
              <FontAwesomeIcon icon={faFlag} className="text-[10px]" />
              <span>
                Reported by: {video.reportedBy.map((u) => u.username).join(", ")}
              </span>
            </div>
          )}

          {/* Reason */}
          {video.reportedReason && (
            <p className="text-xs text-red-300 bg-red-900/20 border border-red-900/40 rounded-lg px-3 py-1.5 mt-1">
              <span className="font-semibold">Reason:</span> {video.reportedReason}
            </p>
          )}
        </div>

        {/* Delete */}
        <button
          onClick={onDelete}
          className="mt-3 self-start flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
        >
          <FontAwesomeIcon icon={faTrash} />
          Delete Video
        </button>
      </div>
    </div>
  );
};

export default ReportVideoCard;
