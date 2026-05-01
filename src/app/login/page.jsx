// app/login/page.jsx
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Login</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg focus:outline-green-500" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg focus:outline-green-500" />
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
            Login
          </button>
        </form>
        <button className="w-full mt-4 border border-gray-300 py-3 rounded-lg font-bold flex items-center justify-center hover:bg-gray-50 transition">
          Login with Google
        </button>
      </div>
    </div>
  );
}