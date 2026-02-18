export default function Login() {
  const handleLogin = (role: string) => {
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("role", role);
    window.location.href = role === "admin" ? "/admin" : "/blogger";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => handleLogin("admin")}
        >
          Login as Admin
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => handleLogin("blogger")}
        >
          Login as Blogger
        </button>
      </div>
    </div>
  );
}
