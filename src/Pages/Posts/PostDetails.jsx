import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import avatar from "../../assets/avatar.webp";
import { useQuery } from "@tanstack/react-query";
import CreateComment from "../../Components/Comments/CreateComment";
import { useContext } from "react";  
import AuthContextProvider from './../../Context/AuthContextProvider';
import  CommentEdit  from "../../Components/Comments/CommentEdit";

export default function PostDetails() {
  const param = useParams();
  const { user } = useContext(AuthContextProvider);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["postDetail", param.id],
    queryFn: getPost,
    retry: 5,
    retryDelay: 5000,
  });

  const post = data?.data?.post;

  async function getPost() {
    return await axios.get(
      `https://linked-posts.routemisr.com/posts/${param.id}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  }

  if (isError) {
    return (
      <h2 className="mt-20 text-center capitalize text-red-500 font-extrabold text-5xl">
        {error.response.data.error}
      </h2>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex items-center">
          <Loading></Loading>
        </div>
      ) : (
        <>
          <Link to={"/"} className="fixed top-25 left-5">
            <i className="fa-solid fa-arrow-left-long"></i>
          </Link>
          <div className="mx-auto my-20 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ">
            <div className=" flex justify-start items-center gap-10 dark:text-white">
              <img src={post.user.photo} alt="" className="w-25" />
              <div>
                <p>{post.user.name}</p>
                <p>{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <p className="dark:text-white py-10">{post.body}</p>
            {post.image ? <img src={post.image} alt="" /> : null}
            {post.comments.map((comment) => {
              return (
                <div
                  key={comment._id}
                  className="text-white my-5 bg-gray-400 py-5 px-2.5 rounded-full"
                >
                  <div className=" flex justify-start items-center gap-10 pb-5">
                    <img
                      src={
                        comment.commentCreator.photo
                          ? avatar
                          : comment.commentCreator.photo
                      }
                      className="h-12 ms-5 rounded-3xl"
                      alt=""
                    />
                    <div>
                      <p>{comment.commentCreator.name}</p>
                      <p>{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                    {user?._id === comment.commentCreator._id ? (
                      <div className="ms-auto me-10">
                        <CommentEdit
                          commentId={comment._id}
                          commentBody={
                            post.comments[post.comments.length - 1].content
                          }
                          refetch={refetch}
                        ></CommentEdit>
                      </div>
                    ) : null}
                  </div>
                  <hr className="w-1/2 mx-auto" />
                  <p className="p-5 ms-5">{comment.content}</p>
                </div>
              );
            })}
            <CreateComment id={param.id} refetch={refetch}></CreateComment>
          </div>
        </>
      )}
    </>
  );
}
