import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://uiryvqtzdguvebqkpgep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk2MTEsImV4cCI6MjA2NzMyNTYxMX0.NVTZuxldO5SqHCHAkcpbEoRc3AMwJ5VGfnJCAg0nZlQ'
)

export default function EditUserList() {
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('profiles').select('id, full_name, role')
    if (!error) {
      setUsers(data)
    } else {
      console.error('Feil ved henting:', error)
    }
  }

  const updateUser = async (id, full_name, role) => {
    const { error } = await supabase
      .from('profiles')
      .update({ full_name, role })
      .eq('id', id)

    if (!error) {
      setMessage('Oppdatert!')
      fetchUsers()
    } else {
      setMessage('Feil: ' + error.message)
    }
  }

  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="font-semibold mb-2">✏️ Rediger brukere</h3>
      {users.map((user) => (
        <div key={user.id} className="mb-4 p-2 bg-gray-100 rounded">
          <input
            type="text"
            value={user.full_name}
            onChange={(e) =>
              setUsers((prev) =>
                prev.map((u) => (u.id === user.id ? { ...u, full_name: e.target.value } : u))
              )
            }
            className="w-full mb-2 p-1 border rounded"
          />
          <select
            value={user.role}
            onChange={(e) =>
              setUsers((prev) =>
                prev.map((u) => (u.id === user.id ? { ...u, role: e.target.value } : u))
              )
            }
            className="w-full mb-2 p-1 border rounded"
          >
            <option value="admin">admin</option>
            <option value="partner">partner</option>
            <option value="kunde">kunde</option>
          </select>
          <button
            onClick={() => updateUser(user.id, user.full_name, user.role)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Lagre
          </button>
        </div>
      ))}
      <p className="text-sm text-gray-600 mt-2">{message}</p>
    </div>
  )
}
