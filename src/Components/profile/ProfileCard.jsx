import { Button, Card, Dropdown, DropdownItem } from "flowbite-react";
import userImageDefualt from "../../assets/avatar.webp";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/Context";
import { Avatar } from "flowbite-react";
import { MdOutlineEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function ProfileCard() {
  let { userData } = useContext(AuthContext);
  console.log("userData", userData);
  const [imageUpload, setImageUpload] = useState(false);
  let {
    register,
    handleSubmit,
    formState: { errors, isSubitting, isValid },
  } = useForm({});
  async function updateImage(values) {
    let formData = new FormData();
    if (values.image && values.image[0]) {
      formData.append("photo", values.photo[0]);
    }
    return axios.put(
      `${import.meta.env.VITE_BASE_URL}/users/upload-photo`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  let queryClient = new QueryClient();
  let { mutate: handleImageUpload } = useMutation({
    mutationFn: updateImage,
    onSuccess: () => {
      toast.success("Image Uploaded Successfully");
      QueryClient.invalidateQueries({ queryKey: ["user", userData?._id] });
    },
    onError: () => {
      toast.error("Image Upload Failed");
    },
  });
  return (
    <>
      <Card className="w-full bg-gray-800 text-white">
        <div
          className="flex flex-col items-center pb-10  
        "
        >
          <div className="relative">
            <Avatar
              className=" avatar size-24 shadow-lg mb-2"
              alt="Post Creator"
              img={userData?.photo || userImageDefualt}
              rounded
            />
            <button
              onClick={() => setImageUpload(true)}
              className="absolute bottom-0 right-0 rounded-full bg-gray-900 text-white p-4 cursor-pointer"
            >
              <MdOutlineEdit />
            </button>
          </div>

          <h5 className="mb-1 text-xl font-medium text-gray-900 text-white dark:text-white">
            {userData?.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData?.email}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData?.dateOfBirth}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData?.gender}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Button
              to="#"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Message
            </Button>
          </div>
        </div>
      </Card>

      {imageUpload && (
        <form onSubmit={handleImageUpload}>
          <div className="flex flex-col w-full items-center justify-center  bg-gray-800 text-white">
            <label
              htmlfor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-400 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                {...register("photo")}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
            <Button type="submit" className="w-full">
              Upload
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
