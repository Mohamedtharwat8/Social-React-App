import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import { useForm } from "react-hook-form";

const UploadPhoto = () => {
  const { register, handleSubmit } = useForm();
  const { getUserData, setLoading } = useContext(UserContext);

  async function handlePhoto(data) {
    const photo = new FormData();
    photo.append("photo", data.photo[0]);
    setLoading(true);
    await axios
      .put("https://linked-posts.routemisr.com/users/upload-photo", photo, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(() => {
        getUserData();
        toast.success("Upload Profile Picture Successfully");
      })
      .catch((err) => console.log(err.response.data.error));
  }
  return (
    <form
      onSubmit={handleSubmit(handlePhoto)}
      className="flex flex-col items-center justify-center w-3/4 mx-auto "
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          {...register("photo", {
            required: "Photo is required",
            validate: {
              isImage: (files) =>
                files?.[0]?.type.startsWith("image/") ||
                "Only image files are allowed",
            },
          })}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </label>
      <button
        type="submit"
        className="border-2 border-[#101828] mt-10 p-5 cursor-pointer hover:text-gray-400 transition-all duration-500"
      >
        <h2 className="text-center font-extrabold">Upload Profile Picture</h2>
      </button>
    </form>
  );
};

export default UploadPhoto;
