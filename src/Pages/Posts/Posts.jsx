import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Card } from "flowbite-react";
import Post from "../../Components/Post/Post";
import AddPostModal from "../../Components/AddPostModal/AddPostModal";

import Loading from "../../Components/Loading/Loading";

export default function Posts() {
  const [posts, setPosts] = useState(null); // Change to null instead of [null]
  // const [comments, setComments] = useState(null); // Change to null instead of [null]
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      console.log("env", import.meta.env.VITE_BASE_URL);

      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}posts?limit=10&sort=createdAt`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data.message === "success") {
        setPosts(data.posts);
        console.log("posts", data.posts);
        console.log("comments", data.posts[0].comments[0]);

        // setComments(data.comments);
        console.log("comments", data.posts[0].comments[0]);
      }
    } catch (error) {
      console.log(error);
      setPosts([]); // Set to empty array on error
    } finally {
      setIsLoading(false); // Always set loading to false
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <Button
        onClick={() => setIsOpenModal(true)}
        className=" absolute top-2 right-3"
        color={"dark"}
      >
        Add Post
      </Button>

      {isLoading ? ( // Show spinner while loading
        <div className="flex justify-center items-center h-64">
          <Loading />
          {/* <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /> */}
        </div>
      ) : posts && posts?.length > 0 ? ( // Check if posts exist and have length
        <section className="  flex flex-col gap-4 max-w-xl mx-auto py-12">
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

      {isOpenModal && <AddPostModal />}
    </>
  );
}
