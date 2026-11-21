// Converts saved official pages to plain markdown-ish text for research. Keeps hidden tab/expandable content.
import { fileURLToPath } from 'node:url'; process.chdir(fileURLToPath(new URL('.', import.meta.url)));
import fs from 'node:fs'; import path from 'node:path';
const dec = s => s.replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;|&#x27;/g,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16)));
function conv(html){
  let m = html.match(/<main[^>]*>([\s\S]*)<\/main>/); let h = m?m[1]:html;
  h = h.replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/g,'');
  h = h.replace(/<nav[\s\S]*?<\/nav>/g,'');
  h = h.replace(/<h([1-6])[^>]*>/g,(_,n)=>'\n\n'+'#'.repeat(+n)+' ').replace(/<\/h[1-6]>/g,'\n');
  h = h.replace(/<li[^>]*>/g,'\n- ').replace(/<tr[^>]*>/g,'\n|').replace(/<\/t[dh]>/g,' |');
  h = h.replace(/<summary[^>]*>/g,'\n▸ ').replace(/<br\s*\/?>/g,'\n');
  h = h.replace(/<code[^>]*>/g,'`').replace(/<\/code>/g,'`');
  h = h.replace(/<(p|div|section|article|table|ul|ol|details|figure|aside|header|footer|dl|dt|dd)[^>]*>/g,'\n').replace(/<\/(p|div|section|article|ul|ol|details|aside|dt|dd)>/g,'\n');
  h = h.replace(/<[^>]+>/g,''); h = dec(h);
  return h.split('\n').map(l=>l.replace(/[ \t]+/g,' ').trim()).filter((l,i,a)=>l||(a[i-1]??'')!=='').join('\n').replace(/\n{3,}/g,'\n\n').trim();
}
for (const lang of ['en','pt','en-chat']) { const dir=path.join('raw',lang), out=path.join('text',lang); fs.mkdirSync(out,{recursive:true});
  for (const f of fs.readdirSync(dir)) { const t=conv(fs.readFileSync(path.join(dir,f),'utf8')); fs.writeFileSync(path.join(out,f.replace('.html','.md')),t); } }
for (const f of ['en_classes','en_interface','en_guias_comunidade','en_builds','en_vip','en','en_guias']) fs.writeFileSync(path.join('text',f+'.md'),conv(fs.readFileSync(path.join('raw',f+'.html'),'utf8')));
