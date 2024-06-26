"use client";
import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItmes from "@/components/posts/PostItmes";
// import toast from "react-hot-toast";

function PostFeeds() {
  const { data: posts = [] } = usePosts();
  console.log("posts", posts);

  // if (posts?.post?.length < 1) {
  //   return <div className="text-white flex items-center justify-center">No posts found</div>; 
  // }

  // console.log("userids........." , UserId);

  return (
    <div>
      {posts?.post?.map((post) => (
        <PostItmes key={post.id}  data={post} />
      ))}
    </div>
  );
}

export default PostFeeds;
