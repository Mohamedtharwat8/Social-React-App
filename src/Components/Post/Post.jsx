import { Avatar, Card } from "flowbite-react";
import React from "react";
import Comment from "../Comments/Comments";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import userImageDefualt from "../../assets/avatar.webp";
import postImageDefualt from "../../assets/OIP.webp";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import Comments from "./../Comments/Comments";
import AddComment from "../Comments/AddComment";
 
export default function Post({ post, isHome }) {
  // Check if post exists before destructuring
  if (!post) {
    return (
      <Card className="max-w-xl text-white border-gray-200 shadow-lg bg-gray-900">
        <div className="animate-pulse">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
            <div>
              <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-16"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="h-48 bg-gray-700 rounded mb-4"></div>
        </div>
      </Card>
    );
  }

  // Safe destructuring
  const {
    _id,
    body,
    comments,
    createdAt,
    image: postImage,
    user: { name: userName, _id: user_id, image: userImage } = {},
  } = post;

  return (
    <div className="max-w-3xl">
      <Card className="text-white border-gray-200 shadow-lg bg-gray-900">
        <header key={user_id} className="flex items-center gap-2">
          <Avatar
            alt="Post Creator"
            img={userImage || userImageDefualt}
            rounded
          />
          <div>
            <h3>{userName}</h3>
            <p>{moment(createdAt).startOf("minute").fromNow()}</p>
          </div>
        </header>

        <h3 className="text-2xl font-bold tracking-tight text-white line-clamp-2">
          {body}
        </h3>

        <img
          src={postImage || postImageDefualt}
          alt="Post"
          className="font-normal text-gray-700"
        />

        <div className="flex items-center justify-between border-b-1 border-gray-200 p-2">
          <FaHeart />
          <div className="flex items-center gap-2">
            <span>{comments?.length || 0}</span>
            <FaComment />
          </div>
          <Link to={`/post-details/${_id}`}>
            <FaShare />
          </Link>
        </div>
        <AddComment post_id={_id} />
        {comments && comments.length > 0 ? (
          isHome ? (
            <Comment comment={comments[0]} />
          ) : (
            comments.map((comment) => <Comment comment={comment} />)
          )
        ) : null}
      </Card>
    </div>
  );
}
