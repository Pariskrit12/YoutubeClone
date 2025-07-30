import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBellSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setSubscriptionState,
  subscribe,
  unsubscribe,
} from "../store/slice/toggleSubscription";
import {
  useSubscribeChannelMutation,
  useUnsubscribeChannelMutation,
} from "../api/channelApi";

export default function SubscribeButton({ channelId }) {
  const dispatch = useDispatch();
  const isSubscribed = useSelector((state) => state.sub?.subStatus?.[channelId]);
  const [subscribeChannel, { isLoading: subscribeLoading }] =
    useSubscribeChannelMutation();
  const [unsubscribeChannel, { isLoading: unsubscribeLoading }] =
    useUnsubscribeChannelMutation();
  const toggleSubsscriptionButton = async () => {
    try {
      if (isSubscribed) {
        dispatch(unsubscribe({ channelId }));
        const res = await unsubscribeChannel(channelId).unwrap();
        dispatch(setSubscriptionState({ channelId, ...res.data }));
      } else {
        dispatch(subscribe({ channelId }));
        const res = await subscribeChannel(channelId).unwrap();
        dispatch(setSubscriptionState({ channelId, ...res.data }));
      }
    } catch (error) {
      console.error("Subscription toggle failed:", error);
    }
  };
  if (subscribeLoading) return <p>Loading</p>;
  if (unsubscribeLoading) return <p>Loading</p>;
  return (
    <div>
      <div
        className={` text-white cursor-pointer flex items-center justify-between  w-[8rem] h-[2.5rem] px-[0.5rem] rounded-2xl border-[1px] border-gray-500 ${
          isSubscribed ? "bg-gray-900" : "bg-red-600"
        }`}
        onClick={toggleSubsscriptionButton}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
        <FontAwesomeIcon icon={isSubscribed ? faBell : faBellSlash} />
      </div>
    </div>
  );
}
