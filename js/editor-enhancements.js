// GameDev Academy — enhancement layer (Prism, export, theme).
(() => {
  'use strict';
  const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function languageFor(editor) {
    const id=editor.dataset.exerciseId||'';
    if (id.startsWith('unity')) return {language:'csharp',extension:'cs'};
    if (id.startsWith('python')) return {language:'python',extension:'py'};
    const exercise=typeof EXERCISES!=='undefined'?EXERCISES[id]:null;
    const lang=(exercise?.language||'javascript').toLowerCase();
    return lang==='csharp'||lang==='unity'?{language:'csharp',extension:'cs'}:{language:lang==='python'?'python':'javascript',extension:lang==='python'?'py':'js'};
  }
  function upgradeEditor(editor) {
    if(editor.dataset.highlightReady) return;
    editor.dataset.highlightReady='1';
    const meta=languageFor(editor);
    const wrapper=document.createElement('div');
    wrapper.className='academy-editor-shell';
    const pre=document.createElement('pre');
    pre.className='academy-highlight language-'+meta.language;
    pre.setAttribute('aria-hidden','true');
    const code=document.createElement('code');
    code.className='language-'+meta.language;
    pre.appendChild(code);
    editor.parentNode.insertBefore(wrapper,editor);
    wrapper.append(pre,editor);
    editor.classList.add('academy-overlay-input');
    editor.setAttribute('spellcheck','false');
    const paint=()=>{
      const content=editor.value+'\n';
      if(window.Prism?.languages?.[meta.language]) code.innerHTML=Prism.highlight(content,Prism.languages[meta.language],meta.language);
      else code.innerHTML=escapeHTML(content);
    };
    editor.addEventListener('input',paint);
    editor.addEventListener('scroll',()=>{pre.scrollTop=editor.scrollTop;pre.scrollLeft=editor.scrollLeft});
    editor.addEventListener('keydown',e=>{
      if(e.key==='Tab'){e.preventDefault();const a=editor.selectionStart,b=editor.selectionEnd;editor.setRangeText('    ',a,b,'end');editor.dispatchEvent(new Event('input',{bubbles:true}));}
    });
    paint();
    const toolbar=document.createElement('div');
    toolbar.className='academy-editor-toolbar';
    const label=document.createElement('span');label.textContent='Prism.js · '+meta.language.toUpperCase();
    const exportBtn=document.createElement('button');exportBtn.type='button';exportBtn.className='btn btn-secondary';exportBtn.textContent='⬇ Exporter .'+meta.extension;
    exportBtn.addEventListener('click',()=>{
      const id=(editor.dataset.exerciseId||'script').replace(/[^a-z0-9_-]/gi,'-');
      const blob=new Blob([editor.value],{type:'text/plain;charset=utf-8'});
      const url=URL.createObjectURL(blob),a=document.createElement('a');
      a.href=url;a.download=id+'.'+meta.extension;document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1500);
    });
    toolbar.append(label,exportBtn);
    wrapper.parentNode.insertBefore(toolbar,wrapper);
  }
  function scan(){document.querySelectorAll('#userCode, textarea.code-textarea').forEach(upgradeEditor);}
  function themeSync(){
    const btn=document.getElementById('toggleTheme');
    if(btn){btn.setAttribute('aria-label','Basculer le mode sombre');btn.setAttribute('aria-pressed',String(document.body.classList.contains('dark-mode')));}
  }
  document.addEventListener('DOMContentLoaded',()=>{
    scan();themeSync();
    const observer=new MutationObserver(()=>scan());
    observer.observe(document.body,{childList:true,subtree:true});
    document.getElementById('toggleTheme')?.addEventListener('click',()=>requestAnimationFrame(themeSync));
  });
})();