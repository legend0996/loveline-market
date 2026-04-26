import { useState } from "react";
import API from "../services/api";
import axios, { AxiosError } from "axios";

type LoginForm = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

type ErrorResponse = {
  message: string;
};

const Login = () => {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post<LoginResponse>("/api/user/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login successful");
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ErrorResponse>;
        alert(error.response?.data?.message || "Error occurred");
      } else {
        alert("Unexpected error");
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />

      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;