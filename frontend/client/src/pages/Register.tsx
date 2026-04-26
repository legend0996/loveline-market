import { useState } from "react";
import API from "../services/api";
import axios, { AxiosError } from "axios";

type RegisterForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type ErrorResponse = {
  message: string;
};

const Register = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    phone: "",
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
      const res = await API.post("/api/user/register", form);
      alert(res.data.message);
    } catch (err: unknown) 
    {
      console.log(err);
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
      <h2>Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default Register;