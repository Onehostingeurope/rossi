import{s as p}from"./supabase-Bi0V1_se.js";import"./main-Cf8nhKZM.js";let d=[],i=[];async function v(){const e=document.getElementById("loading");try{const{data:s,error:t}=await p.from("properties").select("*").order("id",{ascending:!1});if(t)throw t;d=(s||[]).filter((r,f,m)=>r.url&&f===m.findIndex(y=>y.url===r.url)),i=[...d],e&&(e.style.display="none"),u()}catch(s){console.error("Error fetching properties:",s.message),e&&(e.innerHTML=`<p class="error">Erreur de chargement: ${s.message}</p>`)}}const c=document.getElementById("listings-grid"),n=document.getElementById("results-count"),l=document.getElementById("no-results");function h(e){c&&(c.innerHTML="",e.length===0?(l&&(l.style.display="block"),n&&(n.textContent="0 biens trouvés")):(l&&(l.style.display="none"),n&&(n.textContent=`${e.length} biens trouvés`)),e.forEach((s,t)=>{const r=$(s,t);c.appendChild(r),setTimeout(()=>r.classList.add("visible"),50+t*50)}))}function $(e,s){const t=document.createElement("div");return t.className="listing-card scroll-reveal",t.style.transitionDelay=`${s%3*.1}s`,t.innerHTML=`
    <a href="property.html?id=${e.id}" class="card-link" style="text-decoration:none; display:flex; flex-direction:column; height:100%;">
      <div class="card-img-wrap">
        ${e.image_url?`<img src="${e.image_url}" alt="${e.title}" loading="lazy">`:`<div class="card-img-placeholder ${e.gradient}"></div>`}
        ${e.prestige?'<span class="card-prestige-badge">Prestige</span>':""}
        <span class="card-type-badge">${e.type}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${e.title}</h3>
        <p class="card-location">${e.city}${e.quartier&&e.quartier!==e.city?` · ${e.quartier}`:""}</p>
        <div class="card-specs">
          <span class="card-spec">${e.surface} m²</span>
          <span class="card-spec">${e.rooms} pièces</span>
          <span class="card-spec">${e.bedrooms} ch.</span>
        </div>
        <div class="card-footer">
          <span class="card-price">${e.price.toLocaleString()} €</span>
          <span class="card-cta">Découvrir <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
        </div>
      </div>
    </a>
  `,t}const g=document.querySelectorAll("#filter-type .pill"),a=document.getElementById("sort-select");let o="all";function u(){const e=(a==null?void 0:a.value)||"recent";i=d.filter(s=>o==="all"?!0:s.type.toLowerCase().includes(o.toLowerCase())),e==="price-asc"?i.sort((s,t)=>s.price-t.price):e==="price-desc"?i.sort((s,t)=>t.price-s.price):e==="surface-desc"?i.sort((s,t)=>t.surface-s.surface):i.sort((s,t)=>(t.id||0)-(s.id||0)),h(i)}g.forEach(e=>{e.addEventListener("click",s=>{const t=s.target;g.forEach(r=>r.classList.remove("pill-active")),t.classList.add("pill-active"),o=t.getAttribute("data-value")||"all",u()})});a==null||a.addEventListener("change",u);document.addEventListener("DOMContentLoaded",v);
