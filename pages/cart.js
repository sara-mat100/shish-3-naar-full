import {useCart} from '../components/CartContext'
import Header from '../components/Header'
import CartWidget from '../components/CartWidget'
export default function CartPage({ lang, setLang }){
  const { cart, inc, dec, remove, subtotal } = useCart()
  return (<div>
    <Header lang={lang} setLang={setLang} subtotal={subtotal}/>
    <main className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">{lang==='ar'?'سلة المشتريات':'Your Cart'}</h2>
      <CartWidget lang={lang} cart={cart} inc={inc} dec={dec} remove={remove}/>
    </main>
  </div>)
}
