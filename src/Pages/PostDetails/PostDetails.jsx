import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import AddComment from "../../Components/Comments/AddComment";
import AuthContextProvider from "../../Context/AuthContextProvider";
import CommentEdit from "../../Components/Comments/CommentEdit";
import Post from "../../Components/Post/Post";
import { Spinner } from "flowbite-react";

export default function PostDetails() {
  let { id: post_id } = useParams();
  console.log("post_id", post_id);
  let { data, isLoading } = useQuery({
    queryKey: ["post", post_id],
    queryFn: getPost,
    select: (data) => data.data,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  async function getPost() {
    return await axios.get(`${import.meta.env.VITE_BASE_URL}posts/${post_id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
  if (isLoading) {
    <Spinner />;
  }
  return (
    <div className="max-w-3xl">
      <Post post={data?.post} />
    </div>
  );
}
