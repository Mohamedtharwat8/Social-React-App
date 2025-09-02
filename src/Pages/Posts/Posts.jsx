import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Label,
  TextInput,
  Checkbox,
} from "flowbite-react";
import Post from "../../Components/Post/Post";
import AddPostModal from "../../Components/AddPostModal/AddPostModal";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";

export default function Posts() {
  // const [posts, setPosts] = useState(null); // Change to null instead of [null]
  // const [comments, setComments] = useState(null); // Change to null instead of [null]

  const getAllPosts = async () => {
    try {
      console.log("env", import.meta.env.VITE_BASE_URL);

      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}posts?limit=20&sort=-createdAt`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data.message === "success") {
        // setPosts(data.posts);
        console.log("posts", data.posts);
        return data; // ✅ return, don't just setPosts
      }
    } catch (error) {
      console.log(error);
      return;
      // setPosts([]); // Set to empty array on error
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  let { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    select: (data) => data.posts, // here data is response.data from axios
  });
  return (
    <>
      {/* <Button
        onClick={() => setIsOpenModal(true)}
        className=" absolute top-2 right-3"
        color={"dark"}
      >
        Add Post
      </Button> */}

      {isLoading ? (
        <div
          role="status"
          className="  w-xl  my-3   p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700"
        >
          <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          <div className="flex items-center mt-4">
            <svg
              className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
              <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : posts && posts?.length > 0 ? ( // Check if posts exist and have length
        <section className="  flex flex-col gap-4 max-w-xl mx-auto py-12">
          <AddPostModal />
          {posts
            .filter((post) => post && post._id)
            ?.map((post) => (
              <Post key={post._id} post={post} />
            ))}
        </section>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p>No posts found</p>
        </div>
      )}
    </>
  );
}
