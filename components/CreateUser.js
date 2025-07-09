import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTc0OTYxMSwiZXhwIjoyMDY3MzI1NjExfQ.GNqn_vxcnK2k1sbDGkpn8ZLoEFknBgQtRi-9-m0Elyg
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTc0OTYxMSwiZXhwIjoyMDY3MzI1NjExfQ.GNqn_vxcnK2k1sbDGkpn8ZLoEFknBgQtRi-9-m0Elyg'

const supabaseAdmin = createClient(
  'https://uiryvqtzdguvebqkpgep.supabase.co',
  serviceRoleKey
)

const supabasePublic = createClient(
  'https://uiryvqtzdguvebqkpgep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk2MTEsImV4cCI6MjA2NzMyNTYxMX0.NVTZuxldO5SqHCHAkcpbEoRc3AMwJ5VGfnJCAg0nZlQ'
)

export default function CreateUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('kunde')
  const [message, setMessage] = useState('')

  const handleCreate = async () => {
    setMessage('')

    try {
      const { data: userData, error: signupError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      })

      if (signupError) {
        setMessage('Feil ved opprettelse av bruker: ' + signupError.message)
        return
      }

      const userId = userData.user.id

      const { error: profileError } = await supabasePublic
        .from('profiles')
        .insert([{ id: userId, full_name: fullName, role }])

      if (profileError) {
        setMessage('Bruker opprettet, men profil mangler: ' + profileError.message)
      } else {
        setMessage('Ny bruker opprettet!')
        setEmail('')
        setPassword('')
        setFullName('')
        setRole('kunde')
      }
    } catch (err) {
      setMessage('Teknisk feil: ' + err.message)
    }
  }

  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="font-semibold mb-2">➕ Opprett ny bruker</h3>
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Passord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Fullt navn"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="admin">admin</option>
        <option value="partner">partner</option>
        <option value="kunde">kunde</option>
      </select>
      <button
        onClick={handleCreate}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow"
      >
        Opprett bruker
      </button>
      <div className="mt-2 text-sm text-gray-600">{message}</div>
    </div>
  )
}
