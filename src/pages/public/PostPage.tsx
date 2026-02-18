import { useParams } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams();
  return <div className="p-6">Viewing Post ID: {id}</div>;
}
