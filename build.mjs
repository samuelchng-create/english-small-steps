import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const read=p=>readFile(new URL('./'+p,import.meta.url),'utf8');
const bank=(await read('bank.mjs')).replaceAll('export const ','const ');
const core=(await read('core.mjs')).replaceAll('export function ','function ');
const app=(await read('app.mjs')).replace(/^import .*;\n/gm,'').replace(/\bescapeHTML\b/g,'escapeHTML');
// Escape a closing script tag should source strings ever contain one.
const js=(bank+'\n'+core+'\nconst esc=escapeHTML;\n'+app).replaceAll('</script','<\\/script');
const html=(await read('template.html')).replace('/*STYLE*/',await read('style.css')).replace('/*APP*/',js);
const hash=createHash('sha256').update(js).digest('base64');
const csp=`default-src 'self'; script-src 'sha256-${hash}'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'; form-action 'self'`;

await writeFile(new URL('./worker.mjs',import.meta.url),bank+'\nconst page='+JSON.stringify(html)+';\nconst csp='+JSON.stringify(csp)+';\n'+await read('server.mjs'));

await writeFile(new URL('./index.html',import.meta.url),html);
console.log('Assembled original lessons, browser app and server worker.');
