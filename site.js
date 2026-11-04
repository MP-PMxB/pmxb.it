/* ============================================================
   PMxB - script condiviso (menu mobile + loghi clienti)
   ============================================================

   COME AGGIUNGERE UN CLIENTE
   1. Copia il logo (PNG o SVG con sfondo trasparente) in img/clienti/
   2. Aggiungi una riga qui sotto, ad esempio:
        { nome: "Nome Cliente", file: "img/clienti/nome-cliente.png" },
   Se la lista e' vuota la fascia "I nostri clienti" resta nascosta.
   (Aggiungi ?demo all'indirizzo della pagina per vedere un'anteprima.)
   Pubblica i loghi solo con il consenso del cliente.
*/
const CLIENTI = [
  // { nome: "Nome Cliente", file: "img/clienti/nome-cliente.png" },
];

/* ============================================================
   PROFILI SOCIAL: incolla qui sotto gli indirizzi delle pagine PMxB.
   Se un indirizzo resta vuoto la relativa icona non viene mostrata.
   ============================================================ */
const SOCIAL = {
  linkedin: "https://www.linkedin.com/company/pmxb/",
  facebook: "https://www.facebook.com/share/19jc8z7nQU/",
  instagram: "https://www.instagram.com/pmxb_engineeringconsulting/",
};

(function () {
  // profili social (Contatti e footer)
  const demoSoc = /[?&]demo\b/.test(location.search);
  document.querySelectorAll("[data-social]").forEach((a) => {
    const url = SOCIAL[a.dataset.social] || (demoSoc ? "#" : "");
    if (url) a.href = url; else a.remove();
  });
  // cartella base del sito (funziona anche dalle pagine dentro /articoli/)
  const BASE = document.currentScript.src.replace(/site\.js.*$/, "");
  // menu mobile
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", () => menu.classList.toggle("open"));
    menu.addEventListener("click", () => menu.classList.remove("open"));
  }

  // fascia clienti
  const box = document.getElementById("clienti");
  if (!box) return;
  const track = box.querySelector(".track");
  let lista = CLIENTI.slice();
  if (!lista.length && /[?&]demo\b/.test(location.search)) {
    lista = Array.from({ length: 8 }, (_, i) => ({ nome: "Logo cliente " + (i + 1) }));
  }
  if (!lista.length) { box.hidden = true; return; }

  const crea = (c) => {
    const d = document.createElement("div");
    d.className = "logo-c";
    if (c.file) {
      const img = document.createElement("img");
      img.src = BASE + c.file; img.alt = c.nome; img.loading = "lazy";
      d.appendChild(img);
    } else {
      const s = document.createElement("span"); s.textContent = c.nome; d.appendChild(s);
    }
    return d;
  };
  // la sequenza viene duplicata per ottenere uno scorrimento continuo senza stacchi
  const giro = lista.length < 6 ? lista.concat(lista, lista) : lista;
  [giro, giro].forEach((seq) => seq.forEach((c) => track.appendChild(crea(c))));
  box.hidden = false;
})();
