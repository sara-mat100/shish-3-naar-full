import useCart from '../components/useCart'
import Header from '../components/Header'
import Menu from '../components/Menu'
import CartWidget from '../components/CartWidget'
import CategoriesNav from '../components/CategoriesNav'
import data from '../data/menu.json'

export default function Home({ lang, setLang }) {
    const { cart, add, inc, dec, remove, subtotal } = useCart()
    const categories = data.categories
    return (<div>
        <Header lang={lang} setLang={setLang} subtotal={subtotal} />
        <main className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-4 p-4">
            <aside className="hidden lg:block lg:col-span-1"><CategoriesNav lang={lang} categories={categories} /></aside>
            <div className="lg:hidden overflow-x-auto px-1 -mx-1">
                <div className="flex gap-2 pb-2">
                    {categories.map(c => (
                        <button key={c.id} onClick={() => document.getElementById(`cat-${c.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="px-3 py-2 whitespace-nowrap rounded-full bg-white shadow text-sm">{c.title[lang]}</button>
                    ))}
                </div>
            </div>
            <section className="lg:col-span-2"><Menu lang={lang} onAdd={add} /></section>
            <aside className="hidden lg:block lg:col-span-1"><CartWidget lang={lang} cart={cart} inc={inc} dec={dec} remove={remove} /></aside>
        </main>
    </div>)
}
