import { Button, Spinner, Textarea } from "flowbite-react";
import { FaUpload } from "react-icons/fa";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import toastConfig from "../../Utils/toastConfig";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddPostModal() {
  const userFileInput = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
  });
  // useForm
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
  let queryClient = useQueryClient();
  // useMutation
  let { mutate: handleUserAddPost } = useMutation({
    mutationFn: AddPost,
    onSuccess: () => {
      toast.success("Please added successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: () => {
      toast.error("Please added failed");
    },
  });
  // AddPost
  async function AddPost(values) {
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
        `${import.meta.env.VITE_BASE_URL}posts?limit=20&sort=createdAt`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

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
    <form
      onSubmit={handleSubmit(handleUserAddPost)}
      className="flex  flex-col gap-4 max-w-xl   bg-black p-2 rounded-lg"
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
  );
}
