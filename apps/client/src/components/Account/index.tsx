import { memo, useState } from "react";
import { axiosInstance } from "../../api";
import {
  getChatId,
  UserFriendships,
  UserFriendsInfo,
  UserType,
  WEB_SOCKET_MESSAGES,
  WEB_SOCKET_TYPES,
  WS_CHAT_ACTIONS,
} from "../../../../../packages/shared";
import useWebSocket from "react-use-websocket";
import { useMount } from "react-use";

interface Props {
  onLogout: () => void;
  user: UserType;
}

export const Account = memo((props: Props) => {
  const { onLogout, user } = props;
  const WS_URL = "ws://127.0.0.1:8000";
  const [openedChat, setOpenedChat] = useState(0);
  const [openedChatId, setOpenedChatId] = useState("");

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      queryParams: { userId: user.id || 0 },
    }
  );

  console.log(lastJsonMessage);

  const sendFriendRequest = async (toUserId: number) => {
    try {
      const response = await axiosInstance.post("/users/friend-request", {
        userId: toUserId,
      });
    } catch (error) {
      console.error(error);
    }
    sendJsonMessage({ type: "friend_request", to: toUserId });
  };

  const sendMsg = (id: number) =>
    sendJsonMessage({
      type: WEB_SOCKET_TYPES.PERSONAL_CHAT,
      action: WS_CHAT_ACTIONS.JOIN,
      user2Id: id,
      currentUserId: user.id,
    });

  const [users, setUsers] = useState<UserType[]>([]);
  const [friendshipData, setFriendshipData] = useState<UserFriendsInfo | null>(
    null
  );

  const [activeTab, setActiveTab] = useState(0);

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const getFriendsInfo = async () => {
    try {
      const response = await axiosInstance.get("/users/friends");
      const friendsInfoData = response.data as UserFriendships;
      setFriendshipData(friendsInfoData);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/users/logout", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      onLogout();
    } catch (error) {
      console.error(error);
    }
  };

  useMount(getFriendsInfo);

  return (
    <div>
      <button onClick={logout}>logout</button>
      <button onClick={getUsers}>get users</button>
      {!!users.length && (
        <ul>
          <h2>All users</h2>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}{" "}
              <button onClick={() => sendFriendRequest(user.id || 0)}>
                send friend request
              </button>
            </li>
          ))}
        </ul>
      )}

      <ul
        style={{ marginTop: 100, display: "flex", listStyle: "none", gap: 10 }}
      >
        <li>
          <button
            onClick={() => setActiveTab(0)}
            style={{ background: activeTab === 0 ? "red" : "unset" }}
          >
            Friends
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab(1)}
            style={{ background: activeTab === 1 ? "red" : "unset" }}
          >
            Requests
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab(2)}
            style={{ background: activeTab === 2 ? "red" : "unset" }}
          >
            My requests
          </button>
        </li>
      </ul>
      {!!friendshipData && (
        <div>
          {RenderFriendsComponent(friendshipData, activeTab, sendMsg, (id) => {
            setOpenedChat(id);
            sendJsonMessage({
              type: WEB_SOCKET_TYPES.PERSONAL_CHAT,
              action: WS_CHAT_ACTIONS.JOIN,
              currentUserId: user.id,
              user2Id: id,
            });
            setOpenedChatId(getChatId(user.id!, id));
          })}
        </div>
      )}
      {!!openedChat && (
        <ChatComponent
          id={openedChat}
          leaveChat={() => {
            setOpenedChat(0);
            sendJsonMessage({
              type: WEB_SOCKET_TYPES.PERSONAL_CHAT,
              action: WS_CHAT_ACTIONS.LEAVE,
              chatId: openedChatId,
            });
            setOpenedChatId("");
          }}
        />
      )}
    </div>
  );
});

const RenderFriendsComponent = (
  friendships: UserFriendsInfo,
  tab: number,
  sendMsg: (id: number) => void,
  setOpenedChat: (id: number) => void
) => {
  const handleFriendRequest = async (
    id: number,
    action: "reject" | "approve"
  ) => {
    try {
      const response = await axiosInstance.post(
        "/users/friends/request-handle",
        {
          action,
          requestedUserId: id,
        }
      );
      // const friendsInfoData = response.data as UserFriendships;
      // setFriendshipData(friendsInfoData);
    } catch (error) {
      console.error(error);
    }
  };

  if (tab === 0) {
    if (!friendships.friends.length) return <p>у вас нет друзей</p>;
    return (
      <ul>
        {friendships.friends.map((i) => (
          <li key={i.user.name}>
            {i.user.name}{" "}
            <button onClick={() => setOpenedChat(i.user.id || 0)}>
              open chat
            </button>
          </li>
        ))}
      </ul>
    );
  }

  if (tab === 1) {
    if (!friendships.requests.length) return <p>у вас нет запросов</p>;
    return (
      <ul>
        {friendships.requests.map((i) => (
          <li key={i.user.name}>
            {i.user.name}{" "}
            <button
              onClick={() => handleFriendRequest(i.user.id || 0, "approve")}
            >
              accept
            </button>{" "}
            <button
              onClick={() => handleFriendRequest(i.user.id || 0, "reject")}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return <div></div>;
};

const ChatComponent = ({
  id,
  leaveChat,
}: {
  id: number;
  leaveChat: VoidFunction;
}) => {
  // const { lastJsonMessage } = useWebSocket(WS_URL);

  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <h1>
        YOUR CHAT WITH USER {id} <button onClick={leaveChat}>leave</button>
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 500,
          gap: 10,
        }}
      >
        <div
          style={{
            height: 300,
            overflow: "auto",
            width: "500px",
            maxHeight: 300,
            border: "1px solid",
          }}
        ></div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            name=""
            id=""
            style={{ width: "100%" }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button>send message</button>
        </div>
      </div>
    </div>
  );
};
