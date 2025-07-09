import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://uiryvqtzdguvebqkpgep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk2MTEsImV4cCI6MjA2NzMyNTYxMX0.NVTZuxldO5SqHCHAkcpbEoRc3AMwJ5VGfnJCAg0nZlQ'
)

const availableModules = ['CFO', 'CSM', 'Investor', 'ESG']

export default function ManageModules() {
  const [users, setUsers] = useState([])
  const [access, setAccess] = useState({})

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data: usersData } = await supabase.from('profiles').select('id, full_name')
    const { data: modulesData } = await supabase.from('user_modules').select('user_id, module')

    const structured = {}
    modulesData?.forEach(({ user_id, module }) => {
      if (!structured[user_id]) structured[user_id] = {}
      structured[user_id][module] = true
    })

    setUsers(usersData || [])
    setAccess(structured)
  }

  const toggleAccess = async (userId, module) => {
    const hasAccess = access[userId]?.[module]

    if (hasAccess) {
      await supabase
        .from('user_modules')
        .delete()
        .eq('user_id', userId)
        .eq('module', module)
    } else {
      await supabase.from('user_modules').insert([{ user_id: userId, module }])
    }

    fetchUsers()
  }

  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="font-semibold mb-2">🔧 Modultilgang per bruker</h3>
      {users.map((user) => (
        <div key={user.id} className="mb-3 p-3 bg-gray-100 rounded">
          <div className="font-medium mb-2">{user.full_name}</div>
          <div className="grid grid-cols-2 gap-2">
            {availableModules.map((mod) => (
              <button
                key={mod}
                onClick={() => toggleAccess(user.id, mod)}
                className={`px-2 py-1 rounded text-sm ${
                  access[user.id]?.[mod]
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-800'
                }`}
              >
                {mod}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
