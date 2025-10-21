import Link from 'next/link'
export default function Header({ lang, setLang, subtotal }) {
  return (
    <header className="bg-white/90 backdrop-blur border-b sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className=" flex items-center gap-2">
                  <img src="/logo.png" alt="logo" className="w-28 h-auto" />
                  <div className="mt-8">
            <h1 className="text-xl font-semibold text-charcoal">Shish 3 Naar</h1>
            <p className="text-xs text-gray-500">{lang === 'ar' ? 'قائمة الطلب' : 'Order Menu'}</p>
          </div>
        </div>
        <div className="ml-auto mt-8 flex items-center gap-2">
          <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="px-3 py-2 rounded-2xl bg-gray-100 hover:bg-gray-200">
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
          <Link href="/cart" className="px-3 py-2 rounded-2xl bg-primary text-white hover:opacity-90">
            {lang === 'ar' ? 'السلة' : 'Cart'} {subtotal ? `- $${subtotal.toFixed(2)}` : ''}
          </Link>
        </div>
      </div>
    </header>
  )
}
