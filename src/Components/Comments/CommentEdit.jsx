import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export const CommentEdit = ({ commentId, commentBody, refetch }) => {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    initFlowbite();
  }, []);

  async function handleUpdate(data) {
    await axios
      .put(
        `https://linked-posts.routemisr.com/comments/${commentId}`,
        { content: data.body },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then(() => {
        toast.success("Comment updated Successfully");
        refetch();
      })
      .catch((err) =>
        toast.error(err.response.data.message || "ERROR Has Happened")
      );
  }

  async function handleDelete() {
    await axios
      .delete(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(() => {
        toast.success("Comment Deleted Successfully");
        refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.message || "ERROR Has Happened");
      });
  }

  return (
    <>
      <button
        id="dropdownMenuIconHorizontalButton"
        data-dropdown-toggle={`${commentId}-comment`}
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 cursor-pointer"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>

      <div
        id={`${commentId}-comment`}
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          className="py-2 flex flex-col items-center text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconHorizontalButton"
        >
          <li>
            <button
              data-modal-target={`modal-${commentId}-comment`}
              data-modal-toggle={`modal-${commentId}-comment`}
              onClick={() => {
                setValue("body", commentBody);
              }}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              <i className="fa-solid fa-square-pen text-amber-300"></i> Update
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                handleDelete();
              }}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              <i className="fa-solid fa-trash text-red-500"></i> Delete
            </button>
          </li>
        </ul>
      </div>

      <div
        id={`modal-${commentId}-comment`}
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="w-2/4 h-52 flex flex-col justify-center gap-5 bg-gray-500 p-5 rounded-3xl"
        >
          <div className="flex justify-between items-center  gap-5 ">
            <input
              type="text"
              id="post"
              autoComplete="off"
              {...register("body")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-700 text-white  rounded-xl w-2/4 mx-auto cursor-pointer"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};
