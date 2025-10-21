import { useEffect, useState } from 'react'
const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || 'shishadmin'
export default function AdminPage() {
    const [key, setKey] = useState(''); const [authed, setAuthed] = useState(false)
    const [menu, setMenu] = useState(null); const [settings, setSettings] = useState(null); const [status, setStatus] = useState('')
    useEffect(() => { const s = typeof window !== 'undefined' ? localStorage.getItem('adminKey') : null; if (s) { setKey(s); setAuthed(true) } }, [])
    useEffect(() => { if (authed) loadAll() }, [authed])
    async function loadAll() {
        setStatus('Loading...'); try {
            const m = await fetch('/api/admin/menu', { headers: { 'x-admin-key': key } }).then(r => r.json())
            const s = await fetch('/api/admin/settings', { headers: { 'x-admin-key': key } }).then(r => r.json())
            setMenu(m); setSettings(s); setStatus('')
        } catch { setStatus('Failed to load') }
    }
    function handleLogin(e) { e.preventDefault(); if (key && key === ADMIN_KEY) { if (typeof window !== 'undefined') localStorage.setItem('adminKey', key); setAuthed(true) } else alert('Wrong key') }
    function addCategory() { setMenu(p => ({ ...p, categories: [...p.categories, { id: 'cat-' + Date.now(), title: { ar: 'فئة', en: 'Category' }, items: [] }] })) }
    function addItem(ci) { setMenu(p => { const n = { ...p }; n.categories[ci].items.push({ name: { ar: 'جديد', en: 'New' }, price: 1 }); return n }) }
    function updateTitle(ci, lang, val) { setMenu(p => { const n = { ...p }; n.categories[ci].title[lang] = val; return n }) }
    function updateItem(ci, ii, field, val) { setMenu(p => { const n = { ...p }; const it = n.categories[ci].items[ii]; if (field === 'price') it.price = Number(val); if (field === 'ar') it.name.ar = val; if (field === 'en') it.name.en = val; if (field === 'image') it.image = val; if (field === 'desc_ar') { it.description = it.description || {}; it.description.ar = val } if (field === 'desc_en') { it.description = it.description || {}; it.description.en = val } return n }) }
    function delItem(ci, ii) { setMenu(p => { const n = { ...p }; n.categories[ci].items.splice(ii, 1); return n }) }
    function delCat(ci) { setMenu(p => { const n = { ...p }; n.categories.splice(ci, 1); return n }) }
    async function saveMenu() { setStatus('Saving menu...'); const r = await fetch('/api/admin/menu', { method: 'POST', headers: { 'content-type': 'application/json', 'x-admin-key': key }, body: JSON.stringify(menu) }); setStatus(r.ok ? 'Saved ✅' : 'Save failed ❌') }
    async function saveSettings() { setStatus('Saving settings...'); const r = await fetch('/api/admin/settings', { method: 'POST', headers: { 'content-type': 'application/json', 'x-admin-key': key }, body: JSON.stringify(settings) }); setStatus(r.ok ? 'Saved ✅' : 'Save failed ❌') }
    if (!authed) return (<main className="max-w-md mx-auto p-6"><h1 className="text-2xl font-semibold mb-4">Admin Login</h1><form onSubmit={handleLogin} className="space-y-3 bg-white p-4 rounded-2xl shadow"><input value={key} onChange={e => setKey(e.target.value)} placeholder="Enter admin key" className="w-full border rounded-xl px-3 py-2" /><button className="bg-primary text-white px-4 py-2 rounded-2xl w-full">Login</button></form></main>)
    if (!menu || !settings) return <main className="max-w-2xl mx-auto p-6">{status || 'Loading...'}</main>
    return (<main className="max-w-5xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-semibold">Admin</h1><div className="text-sm text-gray-500">{status}</div></div>
        <section className="rounded-2xl shadow p-4 bg-white">
            <h2 className="text-lg font-semibold mb-3">Settings</h2>
            <div className="grid sm:grid-cols-3 gap-3">
                <input value={settings.restaurantName || ''} onChange={e => setSettings({ ...settings, restaurantName: e.target.value })} placeholder="Restaurant Name" className="border rounded-xl px-3 py-2" />
                <input value={settings.whatsappNumber || ''} onChange={e => setSettings({ ...settings, whatsappNumber: e.target.value })} placeholder="WhatsApp Number (no +)" className="border rounded-xl px-3 py-2" />
                <input value={settings.currency || ''} onChange={e => setSettings({ ...settings, currency: e.target.value })} placeholder="Currency (USD, LBP...)" className="border rounded-xl px-3 py-2" />
            </div>
            <div className="mt-3"><button onClick={saveSettings} className="bg-green-600 text-white px-4 py-2 rounded-2xl">Save Settings</button></div>
        </section>
        <section className="rounded-2xl shadow p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Menu Editor</h2>
                <div className="space-x-2"><button onClick={addCategory} className="bg-gray-100 px-3 py-2 rounded-2xl">+ Category</button><button onClick={saveMenu} className="bg-primary text-white px-4 py-2 rounded-2xl">Save Menu</button></div>
            </div>
            {menu.categories.map((cat, ci) => (
                <div key={cat.id} className="border rounded-xl p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <input value={cat.title.ar} onChange={e => updateTitle(ci, 'ar', e.target.value)} className="border rounded-xl px-2 py-1" placeholder="Arabic title" />
                        <input value={cat.title.en} onChange={e => updateTitle(ci, 'en', e.target.value)} className="border rounded-xl px-2 py-1" placeholder="English title" />
                        <button onClick={() => addItem(ci)} className="ml-auto bg-gray-100 px-3 py-1 rounded-xl">+ Item</button>
                        <button onClick={() => delCat(ci)} className="bg-red-100 text-red-700 px-3 py-1 rounded-xl">Delete Category</button>
                    </div>
                    <div className="space-y-2">
                        {cat.items.map((it, ii) => (
                            <div key={ii} className="grid grid-cols-1 sm:grid-cols-6 gap-2">
                                <input value={it.name.ar} onChange={e => updateItem(ci, ii, 'ar', e.target.value)} className="border rounded-xl px-2 py-1" placeholder="Arabic name" />
                                <input value={it.name.en} onChange={e => updateItem(ci, ii, 'en', e.target.value)} className="border rounded-xl px-2 py-1" placeholder="English name" />
                                <input type="number" step="0.1" value={it.price} onChange={e => updateItem(ci, ii, 'price', e.target.value)} className="border rounded-xl px-2 py-1" placeholder="Price" />
                                <input value={it.image || ""} onChange={e => updateItem(ci, ii, "image", e.target.value)} className="border rounded-xl px-2 py-1 sm:col-span-2" placeholder="/images/menu/your-image.jpg" />
                                <input value={(it.description && it.description.ar) || ""} onChange={e => updateItem(ci, ii, "desc_ar", e.target.value)} className="border rounded-xl px-2 py-1 sm:col-span-3" placeholder="Description (AR)" />
                                <input value={(it.description && it.description.en) || ""} onChange={e => updateItem(ci, ii, "desc_en", e.target.value)} className="border rounded-xl px-2 py-1 sm:col-span-3" placeholder="Description (EN)" />
                                <div className="flex items-center gap-2"><button onClick={() => { const ev = new Event('click'); ev.preventDefault?.(); }} className="hidden">noop</button></div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    </main>)
}
