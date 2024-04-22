import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedAccessToken } from "@/types/decoded-access-token";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthTokens = {
  access: string;
  refresh: string;
};

type AuthProviderState = {
  user: DecodedAccessToken | null;
  authTokens: AuthTokens | null;
  loginUser: (email:string, password:string) => Promise<Response>;
  logoutUser: () => void;
};

const initialState: AuthProviderState = {
  user: null,
  authTokens: null,
  loginUser: () => null,
  logoutUser: () => null,
};

const AuthContext = createContext(initialState);

export default AuthContext;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") as string)
      : null
  );
  const [user, setUser] = useState<DecodedAccessToken | null>(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens") as string)
      : null
  );
  const [loading, setLoading] = useState(false);

  const loginUser = async (badge_id: string, password: string): Promise<Response> => {
    setLoading(true);
    const response = await fetch(
      `http://127.0.0.1:8000/api/token/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          badge_id: badge_id,
          password: password,
        }),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      setLoading(false);
    } else if (response.status === 401) {
      alert("Invalid email or password!");
      setLoading(false);
    } else {
      alert("Something went wrong!");
      console.error(response);
      setLoading(false);
    }
    return response;
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
