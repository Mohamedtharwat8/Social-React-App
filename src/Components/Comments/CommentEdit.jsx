import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../Context/Context";
import DropDownMenu from "../../Shared/DropDownMenu/DropDownMenu";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

export default function CommentEdit({ user_id, commentId, commentBody }) {
  console.log(commentId, commentBody);

  let { userData } = useContext(AuthContext);
  let queryClient = new QueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  async function editComment(values) {
    return await axios.put(
      `${import.meta.env.VITE_BASE_URL}comments/${commentId}`,
      { content: values.commentBody },

      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  async function deleteComment() {
    return await axios.delete(
      `${import.meta.env.VITE_BASE_URL}comments/${commentId}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  }
  let { mutate: handleEditComment } = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      toast.success("Comment updated successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user", userData?._id] });
    },
    onError: () => {
      toast.error("Comment updated failed");
      setIsEdit(false);
    },
  });
  let { mutate: handleDeleteComment } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success("Comment Delete successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user", userData?._id] });
    },
    onError: () => {
      toast.error("Comment Delete failed");
      setIsEdit(false);
    },
  });

  return (
    <>
      {user_id === userData?._id && (
        <DropDownMenu
          onEdit={() => setIsEdit(true)}
          onDelete={() => setIsDelete(true)}
        />
      )}

      {isEdit && (
        <Modal show={isEdit} onClose={() => setIsEdit(false)}>
          <ModalHeader>Edit Comment</ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit(handleEditComment)}
              className="w-full h-full flex flex-col justify-center gap-5      "
            >
              <div className="flex justify-between items-center  gap-5 ">
                <input
                  type="text"
                  id="Comment"
                  autoComplete="off"
                  defaultValue={commentBody}
                  {...register("commentBody")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-700 text-white  rounded-xl w-2/4 mx-auto cursor-pointer"
              >
                {/* onClick={() => setIsEdit(false)} */}
                Update
              </button>
            </form>
          </ModalBody>
        </Modal>
      )}
      {isDelete && (
        <Modal show={isDelete} onClose={() => setIsDelete(false)}>
          <ModalHeader>Delete Comment</ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit(handleDeleteComment)}
              className="w-full h-full flex flex-col justify-center gap-5      "
            >
              <h2>Are you sure you want to delete this comment?</h2>
              <button
                type="submit"
                className="bg-gray-700 text-white  rounded-xl w-2/4 mx-auto cursor-pointer"
              >
                Delete
              </button>
            </form>
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
