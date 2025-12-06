import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {


  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    let error;

    if (isLogin) {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      error = signInError
    } else {      
      if (password !== confirmPassword) {
        setMessage("Passwords do not match!")
        setLoading(false)
        return
      }
      if (!fullName) {
        setMessage("Name is required!")
        setLoading(false)
        return
      }
      const { error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })
      error = signUpError
        if (!error) {
         fetch(import.meta.env.VITE_N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, name: fullName, time: new Date().toISOString() })
         }).catch(console.error)
         setMessage('Registration successful! Check your email.')
      }
    }

    if (error) setMessage(error.message)
    setLoading(false)
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{isLogin ? 'Login' : 'Create Account'}</h2>
        {message && <div className={`mb-4 p-2 rounded text-sm text-center ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>}
        <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
            <input
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          )}

          <input
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 font-semibold"
            disabled={loading}
          >
            {loading ? 'Processing..' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "New here? " : "Already have an account? "}
          <button onClick={() => { setIsLogin(!isLogin); setMessage('') }} className="text-blue-600 font-bold hover:underline">
            {isLogin ? 'Create an Account' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}