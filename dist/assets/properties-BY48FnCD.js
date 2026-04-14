import{s as f}from"./supabase-CMXLK4IM.js";let d=[],s=[];async function g(){const e=document.getElementById("loading");try{const{data:t,error:r}=await f.from("properties").select("*").order("id",{ascending:!1});if(r)throw r;d=t||[],s=[...d],e&&(e.style.display="none"),p()}catch(t){console.error("Error fetching properties:",t.message),e&&(e.innerHTML=`<p class="error">Erreur de chargement: ${t.message}</p>`)}}const l=document.getElementById("listings-grid"),n=document.getElementById("results-count"),i=document.getElementById("no-results");function m(e){l&&(l.innerHTML="",e.length===0?(i&&(i.style.display="block"),n&&(n.textContent="0 biens trouvés")):(i&&(i.style.display="none"),n&&(n.textContent=`${e.length} biens trouvés`)),e.forEach((t,r)=>{const c=y(t,r);l.appendChild(c)}))}function y(e,t){const r=document.createElement("div");return r.className="prop-card scroll-reveal",r.style.transitionDelay=`${t%3*.1}s`,r.innerHTML=`
    <a href="${e.url}" class="prop-card-link" target="_blank" rel="noopener">
      <div class="prop-card-img-wrap">
        <div class="prop-card-gradient ${e.gradient}"></div>
        ${e.prestige?'<span class="prop-card-tag">Prestige</span>':""}
      </div>
      <div class="prop-card-body">
        <div class="prop-card-header">
          <span class="prop-card-type">${e.type}</span>
          <span class="prop-card-price">${e.price.toLocaleString()} €</span>
        </div>
        <h3 class="prop-card-title">${e.title}</h3>
        <p class="prop-card-location">${e.city}${e.quartier?` · ${e.quartier}`:""}</p>
        <div class="prop-card-meta">
          <span>${e.surface} m²</span>
          <span>${e.rooms} pièces</span>
          <span>${e.bedrooms} ch.</span>
        </div>
      </div>
    </a>
  `,r}const u=document.querySelectorAll("#filter-type .pill"),a=document.getElementById("sort-select");let o="all";function p(){const e=(a==null?void 0:a.value)||"recent";s=d.filter(t=>o==="all"?!0:t.type.toLowerCase().includes(o.toLowerCase())),e==="price-asc"?s.sort((t,r)=>t.price-r.price):e==="price-desc"?s.sort((t,r)=>r.price-t.price):e==="surface-desc"?s.sort((t,r)=>r.surface-t.surface):s.sort((t,r)=>(r.id||0)-(t.id||0)),m(s)}u.forEach(e=>{e.addEventListener("click",t=>{const r=t.target;u.forEach(c=>c.classList.remove("pill-active")),r.classList.add("pill-active"),o=r.getAttribute("data-value")||"all",p()})});a==null||a.addEventListener("change",p);document.addEventListener("DOMContentLoaded",g);
