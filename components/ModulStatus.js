export default function ModulStatus() {
  const moduler = [
    { navn: 'CFO Adminpanel', status: '✅ Ferdig testet' },
    { navn: 'Investorportal', status: '🔧 Under arbeid' },
    { navn: 'ESG / HMS', status: '✅ Ferdig testet' },
    { navn: 'CSM-modul', status: '❌ Ikke startet' },
  ]

  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="font-semibold mb-2">📌 Modulstatus</h3>
      <ul className="space-y-2">
        {moduler.map((mod, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded flex justify-between">
            <span>{mod.navn}</span>
            <span className="text-sm">{mod.status}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
