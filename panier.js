// SPIN ROOM — panier partagé par toutes les pages.
// À charger après disques.js. Il ajoute tout seul le bouton « Panier » dans le menu
// et le panneau latéral. Le contenu est gardé dans le navigateur du visiteur (localStorage) :
// pas de serveur, et aucun paiement n'est effectué.

const Panier = (() => {
  const CLE = "spinroom-panier";
  const LIVRAISON = 4.9, LIVRAISON_OFFERTE = 60;

  // --- Mémoire (protégée : en navigation privée, le stockage peut être bloqué) ---
  let ids = [];
  try { ids = JSON.parse(localStorage.getItem(CLE)) || []; } catch (e) { ids = []; }
  ids = ids.filter(id => DISQUES.some(d => d.id === id));
  const sauver = () => { try { localStorage.setItem(CLE, JSON.stringify(ids)); } catch (e) {} };

  // --- Styles du bouton et du panneau ---
  const css = `
.panier-btn{position:relative;z-index:30;display:inline-flex;align-items:center;gap:.5rem;background:none;border:1px solid rgba(232,220,192,.3);
  border-radius:999px;color:var(--creme-clair);font:inherit;font-size:.85rem;padding:.4rem .85rem;cursor:pointer;transition:border-color .2s,background .2s}
.panier-btn:hover{border-color:var(--creme)}
.panier-btn svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.6}
.panier-btn .nb{min-width:1.3rem;height:1.3rem;border-radius:999px;background:var(--creme);color:#1f1a10;font-size:.72rem;font-weight:600;
  display:inline-flex;align-items:center;justify-content:center;padding:0 .3rem}
.panier-btn .nb[data-vide]{background:transparent;color:var(--gris);border:1px solid rgba(232,220,192,.25)}
.panier-btn.pop .nb{animation:pop .45s cubic-bezier(.2,.8,.2,1)}
@keyframes pop{40%{transform:scale(1.35)}}
.nav-droite{display:flex;align-items:center;gap:clamp(1rem,3vw,2.25rem)}
.voile{position:fixed;inset:0;z-index:40;background:rgba(0,0,0,.6);opacity:0;visibility:hidden;transition:opacity .35s ease,visibility 0s .35s}
.tiroir{position:fixed;top:0;right:0;bottom:0;z-index:41;width:min(440px,100%);background:#0b0b0b;border-left:1px solid rgba(232,220,192,.14);
  display:flex;flex-direction:column;transform:translateX(100%);visibility:hidden;
  transition:transform .45s cubic-bezier(.2,.8,.2,1),visibility 0s .45s}
.panier-ouvert .voile{opacity:1;visibility:visible;transition:opacity .35s ease}
.panier-ouvert .tiroir{transform:none;visibility:visible;transition:transform .45s cubic-bezier(.2,.8,.2,1)}
html.panier-ouvert,html.panier-ouvert body{overflow:hidden}
.tiroir-tete{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 1.5rem 1.25rem;border-bottom:1px solid rgba(232,220,192,.1)}
.tiroir-tete h2{font-family:var(--titre);font-weight:350;font-size:1.9rem;color:var(--creme)}
.tiroir-tete h2 span{font-family:var(--texte);font-size:.9rem;color:var(--gris);margin-left:.5rem}
.fermer{width:40px;height:40px;border-radius:50%;background:none;border:1px solid rgba(232,220,192,.25);color:var(--creme);font-size:1.3rem;cursor:pointer;line-height:1}
.fermer:hover{border-color:var(--creme)}
.tiroir-liste{flex:1;overflow-y:auto;padding:.5rem 1.5rem;list-style:none;margin:0}
.article{display:grid;grid-template-columns:68px 1fr auto;gap:1rem;align-items:center;padding:1rem 0;border-bottom:1px solid rgba(232,220,192,.08)}
.article img{width:68px;height:68px;object-fit:cover;border-radius:2px;display:block}
.article .a-artiste{font-size:.78rem;color:var(--gris)}
.article .a-titre{font-family:var(--titre);font-size:1.1rem;color:var(--creme-clair);line-height:1.2;margin:.1rem 0 .35rem}
.article .a-etat{font-size:.75rem;color:var(--gris)}
.article .a-droite{text-align:right;display:grid;gap:.4rem;justify-items:end}
.article .a-prix{color:var(--creme-clair)}
.retirer{background:none;border:none;color:var(--gris);font:inherit;font-size:.78rem;cursor:pointer;padding:0;text-decoration:underline;text-underline-offset:3px}
.retirer:hover{color:var(--creme-clair)}
.tiroir-vide,.tiroir-merci{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;gap:.75rem}
.tiroir-vide p:first-child,.tiroir-merci p:first-child{font-family:var(--titre);font-size:1.7rem;color:var(--creme-clair)}
.tiroir-vide p,.tiroir-merci p{color:var(--gris);max-width:30ch;line-height:1.6}
.tiroir-vide .bouton,.tiroir-merci .bouton{margin-top:1rem}
.tiroir-pied{padding:1.25rem 1.5rem calc(1.5rem + env(safe-area-inset-bottom,0px));border-top:1px solid rgba(232,220,192,.1);display:grid;gap:.6rem}
.ligne-total{display:flex;justify-content:space-between;font-size:.9rem;color:var(--gris)}
.ligne-total.grand{font-size:1.15rem;color:var(--creme-clair);margin-top:.25rem}
.astuce{font-size:.78rem;color:var(--gris)}
.commander{width:100%;margin-top:.6rem;border:none;cursor:pointer;font-family:inherit;text-align:center}
.demo{font-size:.72rem;color:var(--gris);text-align:center;opacity:.8}
@media (max-width:600px){.panier-btn .txt{display:none}.panier-btn{padding:.4rem .6rem}.nav-droite{gap:.5rem}}
@media (prefers-reduced-motion:reduce){.tiroir,.voile,.panier-btn .nb{transition:none!important;animation:none!important}}`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // --- Bouton dans le menu : regroupé avec les liens (et le burger sur téléphone) ---
  const nav = document.querySelector(".nav");
  const droite = document.createElement("div");
  droite.className = "nav-droite";
  const liens = nav.querySelector(".nav-liens"), burger = nav.querySelector(".burger");
  nav.appendChild(droite);
  if (liens) droite.appendChild(liens);
  const bouton = document.createElement("button");
  bouton.type = "button";
  bouton.className = "panier-btn";
  bouton.setAttribute("aria-haspopup", "dialog");
  bouton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/></svg>' +
    '<span class="txt">Panier</span><span class="nb"></span>';
  droite.appendChild(bouton);
  if (burger) droite.appendChild(burger);

  // --- Panneau latéral ---
  const voile = document.createElement("div");
  voile.className = "voile";
  const tiroir = document.createElement("aside");
  tiroir.className = "tiroir";
  tiroir.setAttribute("role", "dialog");
  tiroir.setAttribute("aria-modal", "true");
  tiroir.setAttribute("aria-labelledby", "tiroir-titre");
  tiroir.innerHTML = '<div class="tiroir-tete"><h2 id="tiroir-titre">Ton panier<span id="tiroir-nb"></span></h2>' +
    '<button class="fermer" type="button" aria-label="Fermer le panier">×</button></div><div id="tiroir-corps" style="display:contents"></div>';
  document.body.append(voile, tiroir);
  const corps = tiroir.querySelector("#tiroir-corps");
  let merci = false, avant = null;

  const disque = id => DISQUES.find(d => d.id === id);
  const sousTotal = () => ids.reduce((s, id) => s + disque(id).prix, 0);

  function dessiner() {
    const n = ids.length;
    const nb = bouton.querySelector(".nb");
    nb.textContent = n;
    nb.toggleAttribute("data-vide", n === 0);
    bouton.setAttribute("aria-label", "Ouvrir le panier, " + n + " disque" + (n > 1 ? "s" : ""));
    tiroir.querySelector("#tiroir-nb").textContent = n ? n + " disque" + (n > 1 ? "s" : "") : "";

    if (merci) {
      corps.innerHTML = '<div class="tiroir-merci"><p>Merci !</p><p>Ta commande de démonstration est enregistrée. Aucun paiement n\'a été effectué : SPIN ROOM est un projet fictif.</p>' +
        '<a class="bouton" href="catalogue.html">Retourner au bac</a></div>';
      return;
    }
    if (!n) {
      corps.innerHTML = '<div class="tiroir-vide"><p>Ton bac est vide</p><p>Feuillette le catalogue et ajoute les disques qui te plaisent.</p>' +
        '<a class="bouton" href="catalogue.html">Voir le catalogue</a></div>';
      return;
    }
    const st = sousTotal(), livraison = st >= LIVRAISON_OFFERTE ? 0 : LIVRAISON;
    corps.innerHTML = '<ul class="tiroir-liste">' + ids.map(id => {
      const d = disque(id);
      return '<li class="article"><a href="' + fiche(d) + '"><img src="' + pochette(d) + '" alt=""></a>' +
        '<div><p class="a-artiste">' + d.artiste + '</p><p class="a-titre"><a href="' + fiche(d) + '">' + d.titre + '</a></p>' +
        '<p class="a-etat">' + (d.etat === "neuf" ? "Neuf" : "Occasion · " + d.note) + '</p></div>' +
        '<div class="a-droite"><span class="a-prix">' + prixTexte(d.prix) + '</span>' +
        '<button class="retirer" type="button" data-id="' + id + '">Retirer</button></div></li>';
    }).join("") + '</ul>' +
    '<div class="tiroir-pied">' +
      '<div class="ligne-total"><span>Sous-total</span><span>' + prixTexte(st) + '</span></div>' +
      '<div class="ligne-total"><span>Livraison</span><span>' + (livraison ? prixTexte(livraison) : "Offerte") + '</span></div>' +
      (livraison ? '<p class="astuce">Livraison offerte dès ' + LIVRAISON_OFFERTE + ' € : encore ' + prixTexte(LIVRAISON_OFFERTE - st) + '.</p>' : '') +
      '<div class="ligne-total grand"><span>Total</span><span>' + prixTexte(st + livraison) + '</span></div>' +
      '<button class="bouton commander" type="button">Commander</button>' +
      '<p class="demo">Commande de démonstration : aucun paiement n\'est effectué.</p></div>';
  }

  function ouvrir() {
    avant = document.activeElement;
    document.documentElement.classList.add("panier-ouvert");
    setTimeout(() => tiroir.querySelector(".fermer").focus(), 50);
  }
  function fermer() {
    document.documentElement.classList.remove("panier-ouvert");
    if (merci) { merci = false; dessiner(); }
    if (avant && avant.focus) avant.focus();
  }
  const estOuvert = () => document.documentElement.classList.contains("panier-ouvert");

  bouton.addEventListener("click", ouvrir);
  voile.addEventListener("click", fermer);
  tiroir.querySelector(".fermer").addEventListener("click", fermer);
  addEventListener("keydown", e => {
    if (!estOuvert()) return;
    if (e.key === "Escape") fermer();
    if (e.key === "Tab") { // le clavier reste dans le panneau tant qu'il est ouvert
      const f = [...tiroir.querySelectorAll("a,button")];
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  corps.addEventListener("click", e => {
    const r = e.target.closest(".retirer");
    if (r) { retirer(r.dataset.id); tiroir.querySelector(".fermer").focus(); }
    if (e.target.closest(".commander")) { ids = []; sauver(); merci = true; dessiner(); changement(); }
  });

  // Les autres pages (la fiche) peuvent écouter les changements
  const ecouteurs = [];
  const changement = () => ecouteurs.forEach(f => f(ids.slice()));

  function ajouter(id) {
    if (!disque(id) || ids.includes(id)) return false;   // un seul exemplaire de chaque disque
    ids.push(id); sauver(); dessiner(); changement();
    bouton.classList.remove("pop"); void bouton.offsetWidth; bouton.classList.add("pop");
    return true;
  }
  function retirer(id) { ids = ids.filter(x => x !== id); sauver(); dessiner(); changement(); }

  // Si le panier change dans un autre onglet, on se met à jour
  addEventListener("storage", e => {
    if (e.key !== CLE) return;
    try { ids = JSON.parse(e.newValue) || []; } catch (er) { ids = []; }
    dessiner(); changement();
  });

  dessiner();
  return { ajouter, retirer, ouvrir, contient: id => ids.includes(id), surChangement: f => ecouteurs.push(f) };
})();
