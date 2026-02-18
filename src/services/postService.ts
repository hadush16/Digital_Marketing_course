import API from "./api";

export const fetchPosts = () => API.get("/posts");
export const fetchPost = (id:string) => API.get(`/posts/${id}`);
export const createPost = (data:any) => API.post("/posts", data);
export const updatePost = (id:string,data:any)=>API.put(`/posts/${id}`,data);
export const deletePost = (id:string)=>API.delete(`/posts/${id}`);
