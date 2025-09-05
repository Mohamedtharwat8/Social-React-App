// import { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContextProvider from "../../Context/AuthContextProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Spinner } from "flowbite-react";
// import { ValidationError } from "../../Shared/ValidationError/ValidationError";
export default function AddComment({ post_id }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm();
  // const { user } = useContext(AuthContextProvider);
  let queryClient = useQueryClient();

  async function AddComment(values) {
    await axios.post(
      `https://linked-posts.routemisr.com/comments`,
      { ...values, post: post_id },
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  }
  let { mutate: handleAddComment } = useMutation({
    mutationFn: AddComment,
    onSuccess: () => {
      toast.success("Comment Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.response.data.message || "ERROR Has Happened");
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(handleAddComment)}>
        <div className="flex flex-col justify-between items-center  gap-5 ">
          <textarea
            id="content"
            placeholder="Comment Something..."
            rows={4}
            {...register("content", { required: "Comment is optional" })}
            className=" w-full  bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <Button
            disabled={!isValid || isSubmitting}
            type="submit"
            className=" w-full bg-blue-700 text-white  rounded-xl p-2 cursor-pointer"
          >
            {isSubmitting && (
              <Spinner aria-label="Spinner button example" size="sm" light />
            )}
            <span className="pl-3">Submit</span>
          </Button>
        </div>
      </form>
    </>
  );
}
