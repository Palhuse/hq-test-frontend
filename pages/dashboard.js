import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import UserList from '../components/UserList'
import CreateUser from '../components/CreateUser'
import EditUserList from '../components/EditUserList'
import ModuleCards from '../components/ModuleCards'
import ModulStatus from '../components/ModulStatus'
import SendFeedback from '../components/SendFeedback'
import ListFeedback from '../components/ListFeedback'
import MyFeedback from '../components/MyFeedback'
import ManageModules from '../components/ManageModules'

const supabase = createClient(
  'https://uiryvqtzdguvebqkpgep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwODkyNTQsImV4cCI6MjA2NzY2NTI1NH0.RVoWrH3fDuYqxL-brpSX10LHzLxIV_iOsCoqqok1cIE'
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

        <ModuleCards role={profile.role} />
        <ModulStatus />

        {profile.role === 'admin' && (
          <>
            <UserList />
            <CreateUser />
            <EditUserList />
            <ManageModules />
            <ListFeedback />
          </>
        )}

        {profile.role === 'partner' || profile.role === 'kunde' ? (
          <MyFeedback />
        ) : null}

        <SendFeedback profile={profile} />

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow mt-6"
        >
          Logg ut
        </button>
      </div>
    </div>
  )
}
