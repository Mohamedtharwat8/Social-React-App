import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import Loader from "../../../Components/Loader/Loader";
import Posts from "../../Posts/Posts";
import { AuthContext } from "../../../Context/Context";

export default function Profile() {
  // let { userData } = useContext(AuthContext);
  // async function getProfilePosts() {
  //   const { data } = await axios.get(
  //     `${import.meta.env.VITE_BASE_URL}users/${userData?._id}/posts?limit=2`,
  //     {
  //       headers: {
  //         token: localStorage.getItem("token"),
  //       },
  //     }
  //   );
  //   return data;
  // }

  // let { data, isLoading, isError } = useQuery({
  //   queryKey: ["user", userData?._id],
  //   queryFn: getProfilePosts,
  // });
  return (
    <>
      <Posts isProfile={true} />
    </>
  );
}
