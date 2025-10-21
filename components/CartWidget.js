import Link from 'next/link'
import settings from '../data/settings.json'

const currencySymbol = (c) => {
    if (!c) return '$'
    const map = { USD: '$', EUR: '€', LBP: 'ل.ل', AED: 'د.إ', SAR: '﷼' }
    return map[c] || '$'
}

export default function CartWidget({ lang, cart, inc, dec, remove }) {
    const cur = currencySymbol(settings?.currency)
    const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0)
    const service = subtotal * 0.05
    const total = subtotal + service

    return (
        <aside className="max-w-4xl mx-auto px-4">
            <div className="rounded-2xl shadow p-4 bg-white">
                <h3 className="text-lg font-semibold mb-3">
                    {lang === 'ar' ? 'سلة المشتريات' : 'Your Cart'}
                </h3>

                {cart.length === 0 ? (
                    <div className="text-sm text-gray-500">
                        {lang === 'ar' ? 'السلة فارغة' : 'Your cart is empty'}
                        <div className="mt-3">
                            <Link href="/" className="inline-block bg-primary text-white px-4 py-2 rounded-2xl">
                                {lang === 'ar' ? 'تصفح القائمة' : 'Browse Menu'}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="space-y-3">
                            {cart.map((x, i) => {
                                const line = x.price * x.qty
                                return (
                                    <div
                                        key={i}
                                        className="grid grid-cols-12 items-center gap-3 border rounded-xl p-3"
                                    >
                                        {/* Image */}
                                        <div className="col-span-2 sm:col-span-1">
                                            {x.image ? (
                                                <img
                                                    src={x.image}
                                                    alt={x.name[lang] || x.name.en}
                                                    className="w-16 h-16 rounded-xl object-cover"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-xl bg-gray-100" />
                                            )}
                                        </div>

                                        {/* Name */}
                                        <div className="col-span-10 sm:col-span-5 min-w-0">
                                            <p className="font-medium truncate">{x.name[lang] || x.name.en}</p>
                                            <p className="text-xs text-gray-500">
                                                {cur}{x.price}
                                                {lang === 'ar' ? ' لكل قطعة' : ' each'}
                                            </p>
                                        </div>

                                        {/* Quantity controls */}
                                        <div className="col-span-6 sm:col-span-3 flex items-center gap-2">
                                            <button
                                                onClick={() => dec(i)}
                                                className="px-2 py-1 bg-gray-100 rounded"
                                                aria-label={lang === 'ar' ? 'إنقاص' : 'Decrease'}
                                            >
                                                −
                                            </button>
                                            <span className="w-8 text-center">{x.qty}</span>
                                            <button
                                                onClick={() => inc(i)}
                                                className="px-2 py-1 bg-gray-100 rounded"
                                                aria-label={lang === 'ar' ? 'زيادة' : 'Increase'}
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Line total */}
                                        <div className="col-span-4 sm:col-span-2 text-right">
                                            <div className="font-semibold">
                                                {cur}{line.toFixed(2)}
                                            </div>
                                            <button
                                                onClick={() => remove(i)}
                                                className="text-xs text-red-600 hover:underline"
                                            >
                                                {lang === 'ar' ? 'حذف' : 'Remove'}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Totals */}
                        <div className="border-t pt-3 space-y-1 text-sm mt-4">
                            <div className="flex justify-between">
                                <span>{lang === 'ar' ? 'المجموع' : 'Subtotal'}</span>
                                <span>{cur}{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{lang === 'ar' ? 'خدمة (5%)' : 'Service (5%)'}</span>
                                <span>{cur}{service.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-gray-900">
                                <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
                                <span>{cur}{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="block mt-3 bg-green-600 text-white text-center px-3 py-2 rounded-2xl"
                        >
                            {lang === 'ar' ? 'تابع لإتمام الطلب' : 'Proceed to Checkout'}
                        </Link>
                    </>
                )}
            </div>
        </aside>
    )
}
