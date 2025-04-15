import { Auth, Profile } from "./components";
import { useAppInitialization } from "./hooks";
import { AppProvider } from "./providers";
import { useAuthSelector } from "./store";

function App() {
  useAppInitialization();
  const { isAuth } = useAuthSelector();

  return <AppProvider>{!isAuth ? <Auth /> : <Profile />}</AppProvider>;
}

export default App;
