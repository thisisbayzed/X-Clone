"use client";
import React, { useCallback, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import axios from "axios";
import toast from "react-hot-toast";
import Login from "../login/Login";
import Register from "../register/Register";
import Avaters from "../avaters/Avaters";
import { Button } from "@/components/ui/button";
import useSingalPost from "@/hooks/useSingalPost";

function Forms({ placeholderText, isComment, postId }) {
  const { data } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutateFetchedPost } = useSingalPost(postId);
  const [body, setBody] = useState("");
  const [loadings, setLoadings] = useState(false);

  const handleSubmit = useCallback(async () => {
    setLoadings(true);
    try {
      const url = isComment
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/comments?id=${postId}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/creates`;
      await axios.post(url, { body });
      toast.success("Post created successfully");
      setBody("");
      mutatePosts();
      mutateFetchedPost();
      setLoadings(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [body, mutatePosts, postId, isComment]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {data ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avaters UserId={data?.id} />
          </div>
          <div className="w-full">
            <textarea
              className="bg-black ring-0 text-[17px] resize-none w-full peer placeholder-text-[#31363F] mt-3 text-white outline-none"
              placeholder={placeholderText}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-[#31363F]" />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={!body}
                variant={"destructive"}
                onClick={handleSubmit}
              >
                {loadings ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Wellcome to EX
          </h1>
          <p className="text-white text-center">
            Create your memories & forget who forget you
          </p>
          <div className="flex flex-row items-center justify-center gap-4">
            <Login children={"Write your thought"} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Forms;
