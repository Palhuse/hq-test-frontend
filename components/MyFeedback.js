import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://uiryvqtzdguvebqkpgep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk2MTEsImV4cCI6MjA2NzMyNTYxMX0.NVTZuxldO5SqHCHAkcpbEoRc3AMwJ5VGfnJCAg0nZlQ'
)

export default function MyFeedback() {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const fetchMyFeedback = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('feedback')
        .select('message, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error) {
        setFeedbacks(data)
      } else {
        console.error('Feil ved henting av egne tilbakemeldinger:', error)
      }
    }

    fetchMyFeedback()
  }, [])

  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="font-semibold mb-2">🧾 Mine innsendte tilbakemeldinger</h3>
      {feedbacks.length === 0 ? (
        <p>Ingen meldinger sendt ennå.</p>
      ) : (
        <ul className="space-y-2">
          {feedbacks.map((fb, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded">
              <div className="text-sm text-gray-500">
                {new Date(fb.created_at).toLocaleString()}
              </div>
              <div>{fb.message}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
