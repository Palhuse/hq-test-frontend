import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://uiryvqtzdguvebqkpgep.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnl2cXR6ZGd1dmVicWtwZ2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk2MTEsImV4cCI6MjA2NzMyNTYxMX0.NVTZuxldO5SqHCHAkcpbEoRc3AMwJ5VGfnJCAg0nZlQ'
)

export default function SendFeedback({ profile }) {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async () => {
    setStatus('')

    if (!message.trim()) {
      setStatus('Skriv inn en melding først.')
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('feedback').insert([{
      user_id: user.id,
      role: profile.role,
      message,
    }])

    if (error) {
      setStatus('Feil ved innsending: ' + error.message)
    } else {
      setStatus('Takk for tilbakemeldingen!')
      setMessage('')
    }
  }

  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="font-semibold mb-2">🗣️ Send tilbakemelding</h3>
      <textarea
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Hva ønsker du å gi tilbakemelding om?"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow"
      >
        Send
      </button>
      <p className="text-sm text-gray-600 mt-2">{status}</p>
    </div>
  )
}
