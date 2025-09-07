import {
  Avatar,
  Button,
  Card,
  Dropdown,
  DropdownItem,
  Textarea,
} from "flowbite-react";

import React, { useContext, useState } from "react";
import Comment from "../Comments/Comments";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import userImageDefualt from "../../assets/avatar.webp";
import postImageDefualt from "../../assets/OIP.webp";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import Comments from "./../Comments/Comments";
import AddComment from "../Comments/AddComment";
import { useForm } from "react-hook-form";
import DropDownMenu from "../../Shared/DropDownMenu/DropDownMenu";
import { AuthContext } from "../../Context/Context";
import axios from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import { Spinner } from "flowbite-react";
export default function Post({ post, isHome }) {
  let { userData } = useContext(AuthContext);
  let queryClient = new QueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  async function editPost(values) {
    let formData = new FormData();
    formData.append("body", values.body);
    if (values.image && values.image[0]) {
      formData.append("image", values.image[0]);
    }
    return await axios.put(
      `${import.meta.env.VITE_BASE_URL}posts/${post._id}`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  async function deletePost() {
    return await axios.delete(`${import.meta.env.VITE_BASE_URL}posts/${_id}`, {
      headers: { token: localStorage.getItem("token") },
    });
  }
  let { mutate: handleEditPost } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user", userData?._id] });
    },
    onError: () => {
      toast.error("Post updated failed");
      setIsEdit(false);
    },
  });
  let { mutate: handleDeletePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post Delete successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user", userData?._id] });
    },
    onError: () => {
      toast.error("Post Delete failed");
      setIsEdit(false);
    },
  });

  // Safe destructuring
  let {
    _id,
    body,
    comments,
    createdAt,
    image: postImage,
    user: { name: userName, _id: user_id, image: userImage } = {},
  } = post;

  // Check if post exists before destructuring
  if (!post) {
    return (
      <Card className="max-w-xl text-white border-gray-200 shadow-lg bg-gray-900">
        <div className="animate-pulse">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
            <div>
              <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-16"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="h-48 bg-gray-700 rounded mb-4"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl">
      <Card className="text-white border-gray-200 shadow-lg bg-gray-900">
        <header
          key={user_id}
          className="flex items-center  justify-between gap-2"
        >
          <div className="flex items-center   gap-2">
            <Avatar
              alt="Post Creator"
              img={userImage || userImageDefualt}
              rounded
            />
            <div>
              <h3>{userName}</h3>
              <p>{moment(createdAt).startOf("minute").fromNow()}</p>
            </div>
            <div className=""></div>
          </div>
          {user_id === userData?._id && (
            <DropDownMenu
              onEdit={() => setIsEdit(true)}
              onDelete={() => {
                handleDeletePost;
              }}
            />
          )}
        </header>
        {/* body */}
        {isEdit ? (
          <form
            onSubmit={handleSubmit(handleEditPost)}
            className="flex  flex-col gap-4 max-w-xl   bg-black p-2 rounded-lg"
          >
            <label htmlFor="body">Edit Post</label>
            <Textarea
              defaultValue={body}
              {...register("body")}
              id="body"
              placeholder="Leave a comment ..."
              required
              rows={4}
            />
            <div className="flex justify-between items-center text-xl">
              <p>Upload Image</p>
              <FaUpload className="cursor-pointer" />
              <input
                id="file"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image")}
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
              Update Post
            </Button>
          </form>
        ) : (
          <h3 className="text-2xl font-bold tracking-tight text-white line-clamp-2">
            {body}
          </h3>
        )}

        <img
          src={postImage || postImageDefualt}
          alt="Post"
          className="font-normal text-gray-700"
        />
        <div className="flex items-center justify-between border-b-1 border-gray-200 p-2">
          <FaHeart />
          <div className="flex items-center gap-2">
            <span>{comments?.length || 0}</span>
            <FaComment />
          </div>
          <Link to={`/post-details/${_id}`}>
            <FaShare />
          </Link>
        </div>
        <AddComment post_id={_id} />
        {comments && comments.length > 0 ? (
          isHome ? (
            <Comment comment={comments[0]} />
          ) : (
            comments.map((comment) => <Comment comment={comment} />)
          )
        ) : null}
      </Card>
    </div>
  );
}
