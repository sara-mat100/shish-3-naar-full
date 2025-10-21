import { useState } from 'react'
import useCart from '../components/useCart'
import Header from '../components/Header'
import settings from '../data/settings.json'
export default function Checkout({ lang, setLang }){
  const { cart, subtotal } = useCart()
  const [form,setForm]=useState({name:'', phone:'', address:'', method:'cash', notes:''})
  const total=subtotal*1.05
  function msg(o){
    const lines=[]
    lines.push(`New Order - ${settings.restaurantName}`)
    lines.push(`Name: ${o.form.name}`)
    lines.push(`Phone: ${o.form.phone}`)
    if(o.form.address) lines.push(`Address: ${o.form.address}`)
    lines.push('Items:'); o.cart.forEach(x=>lines.push(`- ${x.name.en} (${x.name.ar}) x${x.qty} - $${x.price}`))
    lines.push(`Subtotal: $${o.subtotal.toFixed(2)}`)
    lines.push(`Total (incl. 5% service): $${o.total.toFixed(2)}`)
    if(o.form.notes) lines.push(`Notes: ${o.form.notes}`)
    return lines.join('\n')
  }
  async function submit(e){
    e.preventDefault()
    const order={cart, form, subtotal, total, createdAt:new Date().toISOString()}
    try{ await fetch('/api/order',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(order)}) }catch{}
    const phone=settings.whatsappNumber.replace(/[^0-9]/g,'')
    window.location.href=`https://wa.me/${phone}?text=${encodeURIComponent(msg(order))}`
  }
  return (<div>
    <Header lang={lang} setLang={setLang} subtotal={subtotal}/>
    <main className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">{lang==='ar'?'استكمال الطلب':'Checkout'}</h2>
      <form onSubmit={submit} className="space-y-4 bg-white p-4 rounded-2xl shadow">
        <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder={lang==='ar'?'الاسم':'Name'} className="w-full border rounded-xl px-3 py-2 text-base"/>
        <input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder={lang==='ar'?'الهاتف':'Phone'} className="w-full border rounded-xl px-3 py-2 text-base"/>
        <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder={lang==='ar'?'العنوان (للديليفري)':'Address (for delivery)'} className="w-full border rounded-xl px-3 py-2 text-base"/>
        <select value={form.method} onChange={e=>setForm({...form,method:e.target.value})} className="w-full border rounded-xl px-3 py-2 text-base">
          <option value="cash">{lang==='ar'?'كاش عند التسليم':'Cash on delivery'}</option>
          <option value="card">{lang==='ar'?'بطاقة':'Card payment (offline)'}</option>
        </select>
        <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder={lang==='ar'?'ملاحظات':'Notes'} className="w-full border rounded-xl px-3 py-2 text-base"/>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm">{lang==='ar'?'المجموع':'Subtotal'}: ${subtotal.toFixed(2)}</div>
            <div className="text-sm">{lang==='ar'?'الإجمالي (مع خدمة 5%)':'Total (with 5% service)'}: ${(total).toFixed(2)}</div>
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-2xl">{lang==='ar'?'أرسل الطلب عبر واتساب':'Send via WhatsApp'}</button>
        </div>
      </form>
    </main>
  </div>)
}
