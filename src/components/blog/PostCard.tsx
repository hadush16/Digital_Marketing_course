import { Link } from "react-router-dom";

export default function PostCard({ post }: any) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <img src={post.featured_image} className="h-48 w-full object-cover" />
      <div className="p-4">
        <Link to={`/post/${post.id}`}>
          <h2 className="font-bold text-lg">{post.title}</h2>
        </Link>
        <p className="text-sm text-gray-500 mt-2">
          {post.content.slice(0, 100)}...
        </p>
      </div>
    </div>
  );
}
