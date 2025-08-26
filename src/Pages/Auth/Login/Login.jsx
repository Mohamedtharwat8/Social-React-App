/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Radio, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toastConfig from "../../../Utils/toastConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../Context/Context";

export default function Login() {
  const navigate = useNavigate();
  const { token, setToken, getUserProfileData } = useContext(AuthContext);
  // ...existing code...
  const schema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: "Password is not valid",
      }),
  });
  // ...existing code...
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });
  const handleAPI = async (userValues) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}users/signin`,
        userValues
      );
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        toast.success("Login Succeddfully ", toastConfig);
        setToken(data.token);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
      console.log(data);
    } catch (error) {
      toast.error("Error happen", toastConfig);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleAPI)}
      className="flex max-w-md flex-col gap-4 my-5  bg-gray-800 p-8 rounded-2xl"
    >
      {/* *********************Email*************** */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email">Email</Label>
        </div>
        <TextInput
          {...register("email")}
          id="email"
          type="email"
          placeholder="name@gmail.com"
        />
      </div>
      {errors?.email && <p className="text-red-500">{errors.email.message}</p>}

      {/* *********************password*************** */}

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Password</Label>
        </div>
        <TextInput {...register("password")} id="password" type="password" />
      </div>
      {errors?.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      {/* *********************Submit*************** */}

      <Button type="submit">Submit</Button>
    </form>
  );
}
