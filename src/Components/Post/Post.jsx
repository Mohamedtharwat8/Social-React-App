import { Avatar, Card } from "flowbite-react";
import React from "react";
import Comment from "../Comments/Comments";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import userImageDefualt from "../../assets/avatar.webp";
import postImageDefualt from "../../assets/OIP.webp";
import moment from "moment/moment";
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
        {/* fixed */}
        <Card className="max-w-xl text-white border-gray-200 shadow-lg  bg-gray-900">
          <header key={user_id} className="  flex items-center  gap-2">
            <Avatar
              alt="Post Creator"
              img={userImage ? userImage : userImageDefualt}
              rounded
            />
            <div className="">
              <h3>{userName}</h3>
              <p>{moment(createdAt).startOf("minute").fromNow()}</p>
            </div>
          </header>
          {/* body */}
          <h3 className="text-2xl font-bold tracking-tight  text-white dark:text-white line-clamp-2">
            {body}
          </h3>

          <img
            src={postImage ? postImage : postImageDefualt}
            className=" font-normal text-gray-700 dark:text-gray-400"
          />
          {/* footer */}
          <div className="flex items-center justify-between border-b-1 border-gray-200 p-2">
            <FaHeart />
            <div className="flex items-center gap-2">
              <span>{comments?.length}</span>
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
