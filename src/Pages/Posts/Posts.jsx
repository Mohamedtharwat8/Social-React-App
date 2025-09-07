import axios from "axios";
import React, { useEffect, useContext } from "react";

import {
  Avatar,
  Button,
  Card,
  Label,
  TextInput,
  Checkbox,
} from "flowbite-react";
import Post from "../../Components/Post/Post";
import AddPost from "../../Components/Post/AddPost";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader/Loader";
import { AuthContext } from "../../Context/Context";

export default function Posts({ isProfile }) {
  // const [posts, setPosts] = useState(null); // Change to null instead of [null]
  // const [comments, setComments] = useState(null); // Change to null instead of [null]
  let { userData } = useContext(AuthContext);

  const getAllPosts = async () => {
    try {
      console.log("env", import.meta.env.VITE_BASE_URL);
      console.log("userData", userData);

      let api_url = isProfile
        ? `${import.meta.env.VITE_BASE_URL}users/${userData?._id}/posts?limit=2`
        : `${import.meta.env.VITE_BASE_URL}posts?limit=30&sort=-createdAt`;
      console.log("api_url", api_url);

      const { data } = await axios.get(
        api_url, //
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data.message === "success") {
        // setPosts(data.posts);
        // console.log("posts", data.posts);
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
    select: (data) => data?.posts, // here data is response.data from axios
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
        <Loader />
      ) : posts && posts?.length > 0 ? ( // Check if posts exist and have length
        <section className="  flex flex-col gap-4 max-w-xl mx-auto py-12">
          <AddPost />
          {posts
            .filter((post) => post && post._id)
            ?.map((post) => (
              <Post key={post._id} post={post} isHome={true} />
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
