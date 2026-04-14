import{s as f}from"./supabase-9tAm6vTQ.js";let d=[],r=[];async function y(){const e=document.getElementById("loading");try{const{data:t,error:s}=await f.from("properties").select("*").order("id",{ascending:!1});if(s)throw s;d=t||[],r=[...d],e&&(e.style.display="none"),u()}catch(t){console.error("Error fetching properties:",t.message),e&&(e.innerHTML=`<p class="error">Erreur de chargement: ${t.message}</p>`)}}const c=document.getElementById("listings-grid"),i=document.getElementById("results-count"),n=document.getElementById("no-results");function m(e){c&&(c.innerHTML="",e.length===0?(n&&(n.style.display="block"),i&&(i.textContent="0 biens trouvés")):(n&&(n.style.display="none"),i&&(i.textContent=`${e.length} biens trouvés`)),e.forEach((t,s)=>{const l=p(t,s);c.appendChild(l)}))}function p(e,t){const s=document.createElement("div");return s.className="listing-card scroll-reveal",s.style.transitionDelay=`${t%3*.1}s`,s.innerHTML=`
    <a href="${e.url}" class="card-link" target="_blank" rel="noopener" style="text-decoration:none; display:flex; flex-direction:column; height:100%;">
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
  `,s}const g=document.querySelectorAll("#filter-type .pill"),a=document.getElementById("sort-select");let o="all";function u(){const e=(a==null?void 0:a.value)||"recent";r=d.filter(t=>o==="all"?!0:t.type.toLowerCase().includes(o.toLowerCase())),e==="price-asc"?r.sort((t,s)=>t.price-s.price):e==="price-desc"?r.sort((t,s)=>s.price-t.price):e==="surface-desc"?r.sort((t,s)=>s.surface-t.surface):r.sort((t,s)=>(s.id||0)-(t.id||0)),m(r)}g.forEach(e=>{e.addEventListener("click",t=>{const s=t.target;g.forEach(l=>l.classList.remove("pill-active")),s.classList.add("pill-active"),o=s.getAttribute("data-value")||"all",u()})});a==null||a.addEventListener("change",u);document.addEventListener("DOMContentLoaded",y);
