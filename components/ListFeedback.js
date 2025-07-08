import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://uiryvqtzdguvebqkpgep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk2MTEsImV4cCI6MjA2NzMyNTYxMX0.NVTZuxldO5SqHCHAkcpbEoRc3AMwJ5VGfnJCAg0nZlQ'
)

export default function ListFeedback() {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase
        .from('feedback')
        .select('role, message, created_at')
        .order('created_at', { ascending: false })

      if (!error) {
        setFeedbacks(data)
      } else {
        console.error('Feil ved henting av feedback:', error)
      }
    }

    fetchFeedback()
  }, [])

  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="font-semibold mb-2">📥 Innkomne tilbakemeldinger</h3>
      {feedbacks.length === 0 ? (
        <p>Ingen tilbakemeldinger enda.</p>
      ) : (
        <ul className="space-y-3">
          {feedbacks.map((fb, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded">
              <div className="text-sm text-gray-500 mb-1">
                {fb.role} • {new Date(fb.created_at).toLocaleString()}
              </div>
              <div>{fb.message}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
