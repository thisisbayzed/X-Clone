"use client"
import React from 'react';
import useSingalPost from '@/hooks/useSingalPost';
import Headers from '@/components/headers/Headers';
import ClipLoader from "react-spinners/ClipLoader"
import PostItmes from '@/components/posts/PostItmes';
import Forms from '@/components/forms/Forms';
import Commentsfeed from '@/components/comments/Commentsfeed';

function SingalPostview({ params }) {
    const postId = params.postId;
    
    const { data , isLoading , isError , mutate} = useSingalPost(postId);

    if (isLoading || !data) {
        return (
          <div className="  border-l-[1px] ml-16 border-r-[1px] border-[#31363F] w-[54%]">
            <Headers>Tweets</Headers>
            <div className="flex justify-center items-center h-screen">
              <ClipLoader color="#50C4ED" size={80} />
            </div>
          </div>
        );
      }
      console.log("data:,,,,,,,,,,,", data);
      console.log("post object:", data?.post);
      // console.log("post imges ....:", data?.post[0]?.comments[0]?.userId);

      // {data?.post.map((post) => (
      //   post.comments.map((comment) => (
      //     console.log(comment.body)
      //   ))
      // ))}

    return (
        <div className="  border-l-[1px] ml-16 border-r-[1px] border-[#31363F] w-[54%]">
        <Headers>Tweets</Headers>
        <PostItmes data={data.post[0]} />
        <Forms isComment placeholderText="Write a comment" postId={postId}/>
        <Commentsfeed data={data?.post}/>
        </div>
    );
}

export default SingalPostview;