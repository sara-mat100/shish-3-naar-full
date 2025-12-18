import '../styles/globals.css'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { CartProvider } from '../components/CartContext';
export default function MyApp({ Component, pageProps }){
  const [lang,setLang]=useState('ar')
  useEffect(()=>{ document.body.classList.toggle('rtl', lang==='ar') },[lang])
  return (<>
    <Head>
      <title>Shish 3 Naar</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet"/>
      </Head>
      <CartProvider>
          <div className={lang === 'ar' ? 'rtl' : ''}><Component {...pageProps} lang={lang} setLang={setLang} /></div>
      </CartProvider>
  </>)
}


