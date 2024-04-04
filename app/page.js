import Headers from "@/components/headers/Headers";
import Forms from "@/components/forms/Forms";
import PostFeeds from "@/components/posts/PostFeeds";

export default async function Home() {
  // 41
  return (
    <div className="  border-l-[1px] border-r-[1px] ml-16 border-[#31363F] w-[54%] overflow-y-auto scrollbar-thin scrollbar-thumb-blue scrollbar-track-transparent">
      <Headers>Home</Headers>
      <Forms placeholderText="What's happening 😎 ?" />
      <PostFeeds />
    </div>
  );
}
