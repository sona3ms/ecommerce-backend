import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type User = {
  id: number;
  name?: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(
    () => {
      const storedUser =
        localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    }
  );

  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token")
  );

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}