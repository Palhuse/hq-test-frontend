import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://uiryvqtzdguvebqkpgep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk2MTEsImV4cCI6MjA2NzMyNTYxMX0.NVTZuxldO5SqHCHAkcpbEoRc3AMwJ5VGfnJCAg0nZlQ'
)

export default function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('profiles').select('full_name, role')
      if (!error) {
        setUsers(data)
      } else {
        console.error('Feil ved henting av brukerliste:', error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">👥 Brukere</h3>
      {users.length === 0 ? (
        <p>Ingen brukere funnet.</p>
      ) : (
        <ul className="space-y-1">
          {users.map((user, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded">
              {user.full_name} — <span className="text-sm text-gray-600">{user.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
