import { useMemo } from "react";

import { useAppInitialization } from "./hooks";
import { AppProvider } from "./providers";
import { useAuthSelector } from "./store";
import { GuestProfile, Profile } from "./views";

function App() {
  useAppInitialization();
  const { isAuth } = useAuthSelector();

  const profileComponent = useMemo(
    () => (isAuth ? <Profile /> : <GuestProfile />),
    [isAuth]
  );

  return <AppProvider>{profileComponent}</AppProvider>;
}

export default App;
