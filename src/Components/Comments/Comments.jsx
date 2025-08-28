/* eslint-disable no-unused-vars */
import React from "react";
import { Avatar } from "flowbite-react";
export default function Comments({ comment }) {
  console.log("comments in comment component", comment);

  let {
    commentCreator: { _id: user_id, name: userName, image: userImage },
    content,
    createdAt,
    post: post_id,
    _id: comment_id,
  } = comment;

  return (
    <>
      <header>
        <div className=" flex items-center gap-2 w-full">
          <Avatar
            alt="Post Creator"
            img={userImage ? userImage : "https://picsum.photos/200/300"}
            rounded
          />
          <div className="">
            <h3>{userName}</h3>
            <p>{createdAt}</p>
          </div>
        </div>
        <div className="   text-2xl font-bold tracking-tight text-gray-900 dark:text-white  ">
          <h3>{content}</h3>
        </div>
      </header>
    </>
  );
}
