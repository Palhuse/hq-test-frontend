import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://uiryvqtzdguvebqkpgep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk2MTEsImV4cCI6MjA2NzMyNTYxMX0.NVTZuxldO5SqHCHAkcpbEoRc3AMwJ5VGfnJCAg0nZlQ'
)

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profile, setProfile] = useState(null)
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setMessage('Innlogging feilet: ' + signInError.message)
      return
    }

    const user = signInData.user
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single()

    if (profileError) {
      setMessage('Innlogging vellykket, men fant ikke profildata.')
      return
    }

    setProfile(profileData)
    setMessage('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
        {!profile ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">Logg inn i HQ Testmiljø</h1>
            <input
              type="email"
              placeholder="E-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow"
            >
              Logg inn
            </button>
            <div className="mt-4 text-sm text-gray-600 text-center">{message}</div>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-xl font-bold mb-4">Velkommen, {profile.full_name}!</h1>
            <p>Du er logget inn som: <strong>{profile.role}</strong></p>
          </div>
        )}
      </div>
    </div>
  )
}
