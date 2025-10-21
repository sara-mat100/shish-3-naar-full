import fs from 'fs'
import path from 'path'
function ok(req){ const k=req.headers['x-admin-key']; const s=process.env.ADMIN_KEY||'shishadmin'; return k&&k===s }
export default function handler(req,res){
  if(!ok(req)) return res.status(401).json({error:'Unauthorized'})
  const file=path.join(process.cwd(),'data','settings.json')
  if(req.method==='GET'){ try{ return res.status(200).json(JSON.parse(fs.readFileSync(file,'utf8'))) }catch(e){ return res.status(500).json({error:e.message}) } }
  if(req.method==='POST'){ try{ fs.writeFileSync(file, JSON.stringify(req.body,null,2),'utf8'); return res.status(200).json({ok:true}) }catch(e){ return res.status(500).json({error:e.message}) } }
  return res.status(405).end()
}
