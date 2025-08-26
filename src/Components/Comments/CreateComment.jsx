import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

const CreateComment = ({ id, refetch }) => {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(UserContext);

  async function handleComment(data) {
    await axios
      .post(
        `https://linked-posts.routemisr.com/comments`,
        { content: data.body, post: id },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then(() => {
        toast.success("Comment Created Successfully");
        refetch();
      })
      .catch(({ err }) =>
        toast.error(err.response.data.message || "ERROR Has Happened")
      );
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleComment)}>
        <div className="flex justify-between items-center  gap-5 ">
          <img
            className="w-10 h-10 rounded-full"
            src={user?.photo}
            alt="Rounded avatar"
          />
          <input
            type="text"
            id="post"
            autoComplete="off"
            {...register("body")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-gray-700 text-white  rounded-xl p-2 cursor-pointer"
          >
            Comment
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateComment;
