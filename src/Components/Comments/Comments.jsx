import React from 'react'

export default function Comments({ comments }) {
    console.log("comments in comment component", comments);
    
//   let {
//     body,
//     createdAt,
//     user: { name: userName, _id: user_id, image: userImage },
//   } = comments;
  return (
    <>
      <header className="  flex items-center justify-between py-3 px-2 rounded-md">
        {/* <h3>{post.user.name}</h3>
        <Avatar
          alt="Post Creator"
          img={post.user ? post.user.photo : "https://picsum.photos/200/300"}
          rounded
        /> */}
      </header>
    </>
  );
}
