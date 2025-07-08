import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://uiryvqtzdguvebqkpgep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk2MTEsImV4cCI6MjA2NzMyNTYxMX0.NVTZuxldO5SqHCHAkcpbEoRc3AMwJ5VGfnJCAg0nZlQ'
)

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Feil ved henting av profil:', error)
      } else {
        setProfile(data)
      }
    }

    getProfile()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!profile) return <p className="text-center mt-10">Laster dashboard...</p>

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-xl font-bold mb-4">Velkommen, {profile.full_name}</h1>
        <p className="mb-4">Du er logget inn som: <strong>{profile.role}</strong></p>

        {profile.role === 'admin' && (
          <div className="space-y-2 mb-6">
            <h2 className="font-semibold mb-2">Adminverktøy:</h2>
            <div className="p-2 bg-gray-200 rounded">📋 Brukerliste (kommer)</div>
            <div className="p-2 bg-gray-200 rounded">🛠️ Systemstatus (kommer)</div>
            <div className="p-2 bg-gray-200 rounded">🧩 Moduloversikt (kommer)</div>
          </div>
        )}

        {profile.role === 'partner' && (
          <div className="space-y-2 mb-6">
            <h2 className="font-semibold mb-2">Partnerpanel:</h2>
            <div className="p-2 bg-gray-200 rounded">📁 Kunder</div>
            <div className="p-2 bg-gray-200 rounded">📨 Tilbakemeldinger</div>
          </div>
        )}

        {profile.role === 'kunde' && (
          <div className="space-y-2 mb-6">
            <h2 className="font-semibold mb-2">Kundemoduler:</h2>
            <div className="p-2 bg-gray-200 rounded">📊 Mine rapporter</div>
            <div className="p-2 bg-gray-200 rounded">📦 Modulstatus</div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow"
        >
          Logg ut
        </button>
      </div>
    </div>
  )
}
