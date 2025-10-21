import fs from 'fs'
import path from 'path'
export default function handler(req,res){
  if(req.method!=='POST') return res.status(405).end()
  const file=path.join(process.cwd(),'data','orders.json')
  let existing=[]; try{ if(fs.existsSync(file)) existing=JSON.parse(fs.readFileSync(file,'utf8')) }catch{}
  existing.push(req.body); try{ fs.writeFileSync(file, JSON.stringify(existing,null,2),'utf8'); res.status(200).json({ok:true}) }catch(e){ res.status(500).json({ok:false,error:e.message}) }
}
