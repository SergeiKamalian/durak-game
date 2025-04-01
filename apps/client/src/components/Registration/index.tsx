import { useState } from "react";
import { axiosInstance } from "../../api";
import { AxiosError } from "axios";
import { UserType } from "../../../../../packages/shared";
import { setAccessToken, setRefreshToken } from "../../utils";

interface Props {
  onSuccess: (user: UserType) => void;
}

export const Registration = (props: Props) => {
  const { onSuccess } = props;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegistration = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axiosInstance.post("/users/create", { name, password });
      onSuccess(res.data.user);
      setSuccess(res.data.message);
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
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
        onRegistration();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: 300,
        border: "1px solid black",
      }}
    >
      <h2>Registation</h2>

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
