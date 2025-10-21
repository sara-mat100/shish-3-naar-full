import data from '../data/menu.json'
export default function Menu({ lang, onAdd }) {
    const cats = data.categories
    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            {cats.map(cat => (
                <section key={cat.id} id={`cat-${cat.id}`} className="mb-8 scroll-mt-24">
                    <h3 className="text-2xl font-bold mb-4">{cat.title[lang]}</h3>
                    <div className="grid sm:grid-cols-1 gap-3">
                        {cat.items.map((it, idx) => (
                            <div key={idx} className="rounded-2xl shadow p-4 bg-white">
                                <div className="flex items-start gap-3">
                                    {it.image ? (
                                        <img src={it.image} alt={it.name[lang]} className="w-16 h-16 rounded-xl object-cover" />
                                    ) : (
                                        <img src="/images/menu/placeholder.jpg" alt="" className="w-16 h-16 rounded-xl object-cover opacity-70" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="font-medium truncate">{it.name[lang]}</p>
                                            <span className="font-semibold">${it.price}</span>
                                        </div>
                                        {it.description && (
                                            <p className="text-xs text-gray-500 mt-1 truncate">{it.description[lang] || it.description.en}</p>
                                        )}
                                        <div className="mt-3">
                                            <button onClick={() => onAdd(it)} className="bg-primary text-white w-full px-3 py-2 rounded-2xl">{lang === 'ar' ? 'أضف إلى السلة' : 'Add to cart'}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}
