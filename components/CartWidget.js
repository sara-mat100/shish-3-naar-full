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
        <aside className="max-w-2xl w-full mx-auto px-2 sm:px-4">
            <div className="rounded-2xl shadow-lg p-4 bg-white">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                    {lang === 'ar' ? 'سلة المشتريات' : 'Your Cart'}
                </h3>

                {cart.length === 0 ? (
                    <div className="text-base text-gray-500 text-center py-8">
                        {lang === 'ar' ? 'السلة فارغة' : 'Your cart is empty'}
                        <div className="mt-4">
                            <Link href="/" className="inline-block bg-primary hover:bg-primary-dark transition text-white px-6 py-2 rounded-full shadow">
                                {lang === 'ar' ? 'تصفح القائمة' : 'Browse Menu'}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-4">
                            {cart.map((x, i) => {
                                const line = x.price * x.qty
                                return (
                                    <div
                                        key={i}
                                        className="flex flex-col sm:flex-row items-center gap-3 border rounded-xl p-3 bg-gray-50"
                                    >
                                        {/* Image */}
                                        <div className="flex-shrink-0">
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
                                        <div className="flex-1 min-w-0 w-full">
                                            <p className="font-medium truncate">{x.name[lang] || x.name.en}</p>
                                            <p className="text-xs text-gray-500">
                                                {cur}{x.price}
                                                {lang === 'ar' ? ' لكل قطعة' : ' each'}
                                            </p>
                                        </div>

                                        {/* Quantity controls */}
                                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                            <button
                                                onClick={() => dec(i)}
                                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded transition"
                                                aria-label={lang === 'ar' ? 'إنقاص' : 'Decrease'}
                                            >
                                                −
                                            </button>
                                            <span className="w-8 text-center font-semibold">{x.qty}</span>
                                            <button
                                                onClick={() => inc(i)}
                                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded transition"
                                                aria-label={lang === 'ar' ? 'زيادة' : 'Increase'}
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Line total & Remove */}
                                        <div className="flex flex-col items-end min-w-[80px] mt-2 sm:mt-0">
                                            <div className="font-semibold text-green-700">
                                                {cur}{line.toFixed(2)}
                                            </div>
                                            <button
                                                onClick={() => remove(i)}
                                                className="text-xs text-red-600 hover:underline mt-1"
                                            >
                                                {lang === 'ar' ? 'حذف' : 'Remove'}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Totals */}
                        <div className="border-t pt-4 space-y-2 text-base mt-6">
                            <div className="flex justify-between">
                                <span>{lang === 'ar' ? 'المجموع' : 'Subtotal'}</span>
                                <span className="font-medium">{cur}{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{lang === 'ar' ? 'خدمة (5%)' : 'Service (5%)'}</span>
                                <span className="font-medium">{cur}{service.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-gray-900 text-lg">
                                <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
                                <span>{cur}{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="block mt-6 bg-green-600 hover:bg-green-700 transition text-white text-center px-4 py-3 rounded-full font-semibold shadow"
                        >
                            {lang === 'ar' ? 'تابع لإتمام الطلب' : 'Proceed to Checkout'}
                        </Link>
                    </>
                )}
            </div>
        </aside>
    )
}
