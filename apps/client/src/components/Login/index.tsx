import { useState } from "react";
import { axiosInstance } from "../../api";
import { AxiosError } from "axios";
import { setAccessToken, setRefreshToken } from "../../utils";
import { UserType } from "../../../../../packages/shared";

interface Props {
  onSuccess: (user: UserType) => void;
}

export const Login = (props: Props) => {
  const { onSuccess } = props;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axiosInstance.post("/users/login", { name, password });
      setSuccess(res.data.message);
      const { accessToken, refreshToken } = res.data;
      onSuccess(res.data.user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message);
      } else {
        console.log("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onLogin();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: 300,
        border: "1px solid black",
      }}
    >
      <h2>Login</h2>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Name"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
      />
      <input type="submit" />
      {!!loading && <h3>Loading...</h3>}
      {!!error && <h3 style={{ color: "red" }}>{error}</h3>}
      {!!success && <h3 style={{ color: "green" }}>{success}</h3>}
    </form>
  );
};
