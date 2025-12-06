import { supabase } from './supabaseClient'
export default function Dashboard({ session }) {
  const userName = session.user.user_metadata.full_name || 'User'
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome 🙏</h1>
        <p className="text-gray-500 mb-6">{session.user.email}</p>
        <div className="p-4 bg-green-50 border border-green-200 rounded text-green-700 mb-6">
           Congratulation You Passed all the required Details.
        </div>

        <button 
          onClick={() => supabase.auth.signOut()} 
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}