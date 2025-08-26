import { Avatar, Card } from "flowbite-react";
import React from "react";

export default function Post({ post, comments }) {
  return (
    <>
      <div>
        {/* hover:scale-105 duration-300 */}
        <Card
          key={post._id}
          className=" h-[500px] overflow-hidden max-w-sm    "
          imgAlt="Meaningful alt text for an image that is not purely decorative"
        >
          <header className="  flex items-center justify-between py-3 px-2 rounded-md">
            <h3>{post.user.name}</h3>
            <Avatar
              alt="Post Creator"
              img={
                post.user ? post.user.photo : "https://picsum.photos/200/300"
              }
              rounded
            />
          </header>
          <div className=" h-[300px] overflow-hidden object-cover">
            <img
              src={post.image}
              className=" font-normal text-gray-700 dark:text-gray-400"
            />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.createdAt}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-1">
            {post.body}
          </p>
          {comments && comments.length > 0 ? (
            <Comment comment={comments[0]} />
          ) : null}
        </Card>
      </div>
    </>
  );
}
