import { Button, Spinner, Textarea } from "flowbite-react";
import { FaUpload } from "react-icons/fa";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import toastConfig from "../../Utils/toastConfig";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export default function AddPostModal() {
  const userFileInput = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
  });
  const {
    register,
    formState: { isSubmitting, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange", // validate on change so isValid updates properly
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(schema),
  });

  const handleUserAddPost = async (values) => {
    const formData = new FormData();
    formData.append("body", values.name);
    if (selectedImage) {
      formData.append("image", selectedImage);
    } else {
      toast.error("Please select an image", toastConfig);
      return;
    }
    console.log("formData", ...formData);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}posts`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.message === "success") {
        toast.success("Post added successfully", toastConfig);
      }
    } catch (error) {
      console.log(error);
      toast.error("Post added failed", toastConfig);
    }
  };

  const handleUserImage = (e) => {
    const img = e.target.files[0];
    if (!img) return;
    if (img.size > 800 * 1024) {
      return toast.error("Image size must be less than 2KB", toastConfig);
    }
    if (!img.type.includes("image/")) {
      return toast.error("Image must be png or jpg", toastConfig);
    }
    setSelectedImage(img);
    toast.success("Image is valid", toastConfig);
  };

  return (
    <div className="bg-black/60 fixed inset-0 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleUserAddPost)}
        className="flex w-1/3 flex-col gap-4 bg-black p-6 rounded-md"
      >
        <label htmlFor="body">Post Body</label>
        <Textarea
          {...register("name")}
          id="comment"
          placeholder="Leave a comment ..."
          required
          rows={4}
        />
        <div className="flex justify-between items-center text-xl">
          <p>Upload Image</p>
          <FaUpload
            onClick={() => userFileInput.current.click()}
            className="cursor-pointer"
          />
          <input
            ref={userFileInput}
            onChange={handleUserImage}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting && (
            <Spinner aria-label="Spinner button example" size="sm" light />
          )}
          Add Post
        </Button>
      </form>
    </div>
  );
}
