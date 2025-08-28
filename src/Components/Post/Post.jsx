import { Avatar, Card } from "flowbite-react";
import React from "react";
import Comment from "../Comments/Comments";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

export default function Post({ post }) {
  let {
    _id,
    body,
    comments,
    createdAt,
    image: postImage,
    user: { name: userName, _id: user_id, image: userImage },
  } = post;

  return (
    <>
      <div>
        {/* hover:scale-105 duration-300 */}
        <Card
          key={_id}
          className=" h-[500px] overflow-hidden  max-w-xl mx-auto   "
          imgAlt="Meaningful alt text for an image that is not purely decorative"
        >
          <header key={user_id} className="  flex items-center  gap-2">
            <Avatar
              alt="Post Creator"
              img={userImage ? userImage : "https://picsum.photos/200/300"}
              rounded
            />
            <div className="">
              <h3>{userName}</h3>
              <p>{createdAt}</p>
            </div>
          </header>
          {/* body */}
          <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-1">
            {body}
          </p>
          <div className=" h-[300px] overflow-hidden  w-full object-cover">
            <img
              src={postImage}
              className=" font-normal text-gray-700 dark:text-gray-400"
            />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Comments
          </h5>
          {/* footer */}
          <div className="flex items-center justify-between border-b-1 border-gray-200 p-2">
            <FaHeart />
            <div className="flex items-center gap-2">
              <span>{ comments?.length}</span>
            <FaComment />
            </div>
            <FaShare />
          </div>
          {comments && comments.length > 0 ? (
            <Comment comment={comments[0]} />
          ) : null}
        </Card>
      </div>
    </>
  );
}
