import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email: email,
          password: password,
        }
        // { withCredentials: true }
      );
      // const setCookieHeader = response.headers["set-cookie"];
      // console.log("Cookie received:", setCookieHeader);
      const { data } = response;
      const id = data?.user;
      if (response.status === 200) {
        setIsLoggedIn(true);
        console.log(response);
        router.push(`/${id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };
  console.log(isLoggedIn);
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
