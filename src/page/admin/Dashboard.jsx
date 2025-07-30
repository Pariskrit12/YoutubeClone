import { faComment, faUser, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Videos from "./components/Videos";
import Comments from "./components/Comments";
import UsersList from "./components/UsersList";
import { useGetAllUsersQuery } from "../../api/adminApi";
import Spinner from "../../components/Spinner";

export const DashboardComponent = ({ label, icon, customKey }) => {
  const { data, isLoading: userLoading } = useGetAllUsersQuery();
  const users = data?.data;

  return (
    <div className="flex flex-col gap-[0.5rem]">
      <div className="flex items-center text-xl font-semibold justify-center gap-[0.5rem]">
        <p>{label}</p>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className=" bg-black border-[1px] rounded-2xl h-[20rem] mb-[1rem] p-[1rem] overflow-auto">
        {customKey === "Users" &&
          (userLoading ? (
            <Spinner />
          ) : (
            Array.isArray(users) &&
            users.map((user) => <UsersList user={user} key={user._id} />)
          ))}

        {customKey === "Videos" && <Videos />}
        {customKey === "Comments" && <Comments />}
      </div>
    </div>
  );
};
export default function Dashboard() {
  const items = [
    { label: "Users", icon: faUser, customKey: "Users" },
    { label: "Reported Videos", icon: faVideo, customKey: "Videos" },
    { label: "Reported Comments", icon: faComment, customKey: "Comments" },
  ];
  return (
    <div className="w-full  p-[1rem]">
      <p className="text-2xl font-bold">Admin Dashboard</p>
      <div className="border-[1px] mb-[1rem]"></div>
      <div className="">
        {items.map((item, index) => (
          <DashboardComponent
            key={index}
            label={item.label}
            icon={item.icon}
            customKey={item.customKey}
          />
        ))}
      </div>
    </div>
  );
}
