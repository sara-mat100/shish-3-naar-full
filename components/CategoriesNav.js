import { useEffect, useState } from 'react'

export default function CategoriesNav({ lang = 'ar', categories = [] }) {
    const [active, setActive] = useState(categories?.[0]?.id || '')

    useEffect(() => {
        const sections = categories.map(c => document.getElementById(`cat-${c.id}`)).filter(Boolean)
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id.replace('cat-', '')
                    setActive(id)
                }
            })
        }, { rootMargin: '-30% 0px -60% 0px', threshold: 0.01 })
        sections.forEach(sec => sec && obs.observe(sec))
        return () => obs.disconnect()
    }, [categories])

    function goto(id) {
        const el = document.getElementById(`cat-${id}`)
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
    }

    return (
        <nav className="sticky top-20">
            <div className="rounded-2xl bg-white shadow p-2 max-h-[70vh] overflow-auto">
                <ul className="space-y-1">
                    {categories.map(c => {
                        const isActive = active === c.id
                        return (
                            <li key={c.id}>
                                <button
                                    onClick={() => goto(c.id)}
                                    className={`w-full text-left px-3 py-2 rounded-xl transition ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                                >
                                    <span className="truncate block">{c.title?.[lang] ?? c.title?.en ?? c.id}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}
