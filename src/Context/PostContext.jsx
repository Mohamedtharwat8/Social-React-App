import { createContext } from "react";
import axios from "axios";
import toast from "react-toastify";

export let PostContext = createContext();
export default function PostContextProvider({ children }) {
  async function getAllPosts(page = 1) {
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}posts?limit=50&page=${page}&sort=-createdAt`,

        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("API Response Data:", data);

      // Log pagination info specifically
      if (data && data.paginationInfo) {
        console.log("Pagination Info:", data.paginationInfo);
        console.log("Number of Pages:", data.paginationInfo.numberOfPages);
      } else {
        console.warn("No paginationInfo found in response");
      }

      return data;
    } catch (error) {
      console.log("API Error:", error);
      // Return a consistent error structure
      return { error: error.message, posts: [] };
    }
  }

  async function getSinglePost(id) {
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}posts/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);

      return data.post;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserData() {
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}users/profile-data`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);

      return data.user;
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserPost(id) {
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}users/${id}/posts?limit=50`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);

      return data.posts;
    } catch (error) {
      console.log(error);
    }
  }
  async function addComment(body) {
    try {
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}comments`,
        body,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      toast.success("Comment added successfully");
      return data.comments;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function addPosts(formData) {
    try {
      let { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}posts`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      toast.success("Post added successfully");
      // return data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function deletePost(id) {
    try {
      let { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}posts/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      toast.success("Post Deleted successfully....");
      // return data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <PostContext.Provider
      value={{
        getAllPosts,
        getUserData,
        getUserPost,
        getSinglePost,
        addComment,
        addPosts,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
