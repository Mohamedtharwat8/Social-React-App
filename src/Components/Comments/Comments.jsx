/* eslint-disable no-unused-vars */
import React from "react";
import { Avatar } from "flowbite-react";
import { Card } from "flowbite-react";
import moment from "moment/moment";
import userImageDefualt from "../../assets/avatar.webp";
import CommentEdit from "./CommentEdit";

export default function Comments({ comment }) {
  // console.log("comments in comment component", comment);

  let {
    commentCreator: { _id: user_id, name: userName, image: userImage },
    content,
    createdAt,
    post: post_id,
    _id: comment_id,
  } = comment;

  return (
    <>
      <Card className="w-full">
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="pb-0 pt-3 sm:pt-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  <Avatar
                    alt="Post Creator"
                    img={userImage ? userImage : userImageDefualt}
                    rounded
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {userName}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {moment(createdAt).startOf("minute").fromNow()}
                  </p>
                </div>
                <div className="flex  flex-wrap items-center text-base font-semibold text-gray-900 dark:text-white">
                  <CommentEdit
                    commentId={comment_id}
                    commentBody={content}
                    user_id
                  ={user_id}/>
                </div>
              </div>
            </li>
          </ul>
          <div className="mt-2">{content}</div>
        </div>
      </Card>
    </>
  );
}
