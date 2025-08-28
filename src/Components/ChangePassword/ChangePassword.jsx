import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";

const schema = zod.object({
  password: zod.string().regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    `At least 8 characters.
      At least one uppercase letter.
      At least one lowercase letter.
      At least one digit.
      At least one special character`
  ),
  newPassword: zod.string().regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    `At least 8 characters.
      At least one uppercase letter.
      At least one lowercase letter.
      At least one digit.
      At least one special character`
  ),
});
export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  async function handleChange(data) {
    await axios
      .patch(`https://linked-posts.routemisr.com/users/change-password`, data, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((data) => {
        localStorage.setItem("token", data?.data.token);
        toast.success("Password Changed Successfully");
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleChange)} className="my-5">
        <input
          type="password"
          id="password"
          className="w-full border-gray-500 border-2 p-5 rounded-4xl mb-5"
          autoComplete="off"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-600 mb-5">{errors.password.message}</p>
        )}
        <input
          type="password"
          id="newPassword"
          className="w-full border-gray-500 border-2 p-5 rounded-4xl mb-5"
          autoComplete="off"
          {...register("newPassword")}
          placeholder="NewPassword"
        />
        {errors.newPassword && (
          <p className="text-red-600 mb-5">{errors.newPassword.message}</p>
        )}
        <button
          type="submit"
          className="mx-auto block border-2 border-gray-500 p-5 rounded-4xl hover:text-white hover:border-white cursor-pointer"
        >
          Submit
        </button>
      </form>
    </>
  );
}
