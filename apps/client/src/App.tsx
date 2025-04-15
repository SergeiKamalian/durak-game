import { Auth } from "./components";
import { useAppInitialization } from "./hooks";
import { AppProvider } from "./providers";
import { useAuthSelector } from "./store";

function App() {
  useAppInitialization();
  const { isAuth } = useAuthSelector();

  return (
    <AppProvider>
      {!isAuth ? (
        <Auth />
      ) : (
        <div>
          asd <img src="image.jpeg" alt="" />
        </div>
      )}
    </AppProvider>
  );
  // const [user, setUser] = useState<UserType | null>(null);
  // const [isReg, setIsReg] = useState(true);

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const token = getAccessToken();

  //       if (token) {
  //         const res = await axiosInstance.post("/users/whoami");
  //         if (res.data) {
  //           setUser(res.data);
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getUser();
  // }, []);

  // const getUsers = async () => {
  //   try {
  //     const response = await axiosInstance.get("/users");
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const logout = async () => {
  //   try {
  //     const response = await axiosInstance.post("/users/logout", {
  //       refreshToken: localStorage.getItem("refreshToken"),
  //     });
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("refreshToken");
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // if (!user)
  //   return (
  //     <div>
  //       {isReg ? (
  //         <Registration onSuccess={setUser} />
  //       ) : (
  //         <Login onSuccess={setUser} />
  //       )}
  //       <p>
  //         {isReg ? "have account" : "dont have account"}{" "}
  //         <button onClick={() => setIsReg((prev) => !prev)}>
  //           {isReg ? "login" : "registration"}
  //         </button>
  //       </p>
  //     </div>
  //   );

  // return (
  //   <div>
  //     <h1>
  //       Hello {user.name} {user.id}
  //     </h1>
  //     <Account user={user} onLogout={() => setUser(null)} />
  //   </div>
  // );
}

export default App;
