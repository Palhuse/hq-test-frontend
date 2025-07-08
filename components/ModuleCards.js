export default function ModuleCards({ role }) {
  const baseModules = [
    { title: '📊 CFO Adminpanel', roles: ['admin', 'partner'] },
    { title: '👥 CSM Modul', roles: ['admin', 'partner'] },
    { title: '📈 Investorportal', roles: ['admin', 'partner', 'kunde'] },
    { title: '🌱 ESG / HMS', roles: ['admin', 'partner', 'kunde'] },
  ]

  const visibleModules = baseModules.filter((mod) => mod.roles.includes(role))

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">🧩 Tilgjengelige moduler:</h3>
      <ul className="space-y-2">
        {visibleModules.map((mod, index) => (
          <li key={index} className="p-2 bg-gray-200 rounded">{mod.title}</li>
        ))}
      </ul>
    </div>
  )
}
