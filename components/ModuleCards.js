import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://uiryvqtzdguvebqkpgep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk2MTEsImV4cCI6MjA2NzMyNTYxMX0.NVTZuxldO5SqHCHAkcpbEoRc3AMwJ5VGfnJCAg0nZlQ'
)

const allModules = {
  CFO: '📊 CFO Adminpanel',
  CSM: '👥 CSM Modul',
  Investor: '📈 Investorportal',
  ESG: '🌱 ESG / HMS'
}

export default function ModuleCards({ role }) {
  const [activeModules, setActiveModules] = useState(Object.keys(allModules))

  useEffect(() => {
    const fetchModules = async () => {
      if (role === 'admin') return // Admin skal alltid se alt

      const { data: { user } } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('user_modules')
        .select('module')
        .eq('user_id', user.id)

      if (!error) {
        const userModules = data.map((m) => m.module)
        setActiveModules(userModules)
      }
    }

    fetchModules()
  }, [role])

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">🧩 Tilgjengelige moduler:</h3>
      <ul className="space-y-2">
        {activeModules.map((key) => (
          <li key={key} className="p-2 bg-gray-200 rounded">
            {allModules[key]}
          </li>
        ))}
      </ul>
    </div>
  )
}
