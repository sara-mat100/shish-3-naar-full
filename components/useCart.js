import { useEffect, useState } from 'react'
export default function useCart(){
  const [cart, setCart] = useState([])
  useEffect(()=>{ try{const raw=localStorage.getItem('cart'); if(raw) setCart(JSON.parse(raw))}catch{} },[])
  useEffect(()=>{ try{localStorage.setItem('cart', JSON.stringify(cart))}catch{} },[cart])
  function add(item){ setCart(c=>{const i=c.findIndex(x=>x.name.en===item.name.en&&x.name.ar===item.name.ar); if(i>=0){const n=[...c]; n[i]={...n[i],qty:n[i].qty+1}; return n} return [...c,{...item,qty:1}]}) }
  const inc=i=>setCart(c=>c.map((x,idx)=>idx===i?{...x,qty:x.qty+1}:x))
  const dec=i=>setCart(c=>c.flatMap((x,idx)=>idx===i?(x.qty>1?[{...x,qty:x.qty-1}]:[]):[x]))
  const remove=i=>setCart(c=>c.filter((_,idx)=>idx!==i))
  const subtotal=cart.reduce((s,x)=>s+x.price*x.qty,0)
  return {cart,setCart,add,inc,dec,remove,subtotal}
}
