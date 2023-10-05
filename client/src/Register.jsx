import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState("login");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  async function handleSubmit(e) {
    e.preventDefault();
    const url = isLogin === "register" ? "register" : "login";
    const { data } = await axios.post(url, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="block w-full  rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="block w-full  rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLogin === "register" ? "Register" : "Login"}
        </button>
        <div className="text-center mt-2">
          {isLogin === "register" && (
            <div>
              Already a member?
              <button className="ml-1" onClick={() => setIsLogin("login")}>
                Login Here
              </button>
            </div>
          )}
          {isLogin === "login" && (
            <div>
              Dont have an account?
              <button className="ml-1" onClick={() => setIsLogin("register")}>
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
