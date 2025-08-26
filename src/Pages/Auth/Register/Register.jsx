/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Radio, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toastConfig from "../../../Utils/toastConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  // ...existing code...
  const schema = z
    .object({
      email: z.string().min(1, "Email is required").email("Invalid email"),
      name: z.string().min(1, "Name is required"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          {
            message: "Password is not valid",
          }
        ),
      rePassword: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          {
            message: "Password is not valid",
          }
        ),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of Birth is required"),
      gender: z.enum(["male", "female"], {
        message: "Please Choose your Gender",
      }),
    })
    .refine((data) => data.password === data.rePassword, {
      error: "Password and Re-Password must match",
      path: ["rePassword"],
    });
  // ...existing code...
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });
  const handleAPI = (userValues) => {
    try {
      const { data } = axios.post(
        `${import.meta.env.VITE_BASE_URL}users/signup`,
        userValues
      );
      if (data.message === "success") {
        toast.success("Created Succeddfully ", toastConfig);
        setTimeout(() => {
          navigate("/login");
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
      {/* *********************Name*************** */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="Name">Name</Label>
        </div>
        <TextInput
          {...register("name")}
          id="Name"
          type="text"
          placeholder="Name"
        />
      </div>
      {errors?.name && <p className="text-red-500">{errors.name.message}</p>}

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

      {/* *********************RE-password*************** */}

      <div>
        <div className="mb-2 block">
          <Label htmlFor="rePassword">Re-Password</Label>
        </div>
        <TextInput
          {...register("rePassword")}
          id="rePassword"
          type="password"
        />
      </div>
      {errors?.rePassword && (
        <p className="text-red-500">{errors.rePassword.message}</p>
      )}
      {/* *********************Date Of Birth*************** */}

      <div>
        <div className="mb-2 block">
          <Label htmlFor="dateOfBirth">Date Of Birth</Label>
        </div>
        <TextInput {...register("dateOfBirth")} id="dateOfBirth" type="date" />
      </div>
      {errors?.dateOfBirth && (
        <p className="text-red-500">{errors.dateOfBirth.message}</p>
      )}
      {/* *********************Gender*************** */}

      <div>
        <div className="flex items-center gap-2 my-1">
          <Radio id="male" {...register("gender")} value="male" />
          <Label htmlFor="male">Male</Label>
        </div>
        <div className="flex items-center gap-2 my-1">
          <Radio id="female" {...register("gender")} value="female" />
          <Label htmlFor="female">Female</Label>
        </div>
      </div>
      {errors?.gender && (
        <p className="text-red-500">{errors.gender.message}</p>
      )}
      {/* *********************Submit*************** */}

      <Button type="submit">Submit</Button>
    </form>
  );
}
