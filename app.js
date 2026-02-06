let activeBrand = null;
let activeGroup = null;

const products = [
  {
    id: 1,
    name: "Krem nawilżający",
    brand: "CeraVe",
    group: "skincare",
    subgroup: "moisturizer",
    type: "cream",
    image: "images/krem.jpg",
    note: "Na dzień"
  },
  {
    id: 2,
    name: "Blush w płynie",
    brand: "Rare Beauty",
    group: "makeup",
    subgroup: "face",
    type: "blush",
    image: "images/blush.jpg",
    note: "Kolor: Happy"
  },
  {
    id: 3,
    name: "Perfumy",
    brand: "Dior",
    group: "perfumy",
    subgroup: "eau-de-parfum",
    type: "floral",
    image: "images/perfumy.jpg",
    note: "Do przetestowania"
  }
];

const grid = document.getElementById("grid");
const groupButtons = document.querySelectorAll(".group-filter");
const brandFilters = document.getElementById("brandFilters");

const toggleCategories = document.getElementById("toggleCategories");
const toggleBrands = document.getElementById("toggleBrands");
const panelCategories = document.getElementById("panelCategories");
const panelBrands = document.getElementById("panelBrands");

let openPanel = null; // "categories" | "brands" | null

function setOpenPanel(which) {
  openPanel = (openPanel === which) ? null : which;

  panelCategories.classList.toggle("is-hidden", openPanel !== "categories");
  panelBrands.classList.toggle("is-hidden", openPanel !== "brands");

  toggleCategories.classList.toggle("is-active", openPanel === "categories");
  toggleBrands.classList.toggle("is-active", openPanel === "brands");
}

toggleCategories.addEventListener("click", () => {
  activeGroup = "all";
  activeBrand = "all";
  setActiveGroupButton();
  setActiveBrandButton();
  applyFilters();
  setOpenPanel("categories");
});


toggleBrands.addEventListener("click", () => {
  activeGroup = "all";
  activeBrand = "all";
  setActiveGroupButton();
  setActiveBrandButton();
  applyFilters();
  setOpenPanel("brands");
});


function render(list) {
  grid.innerHTML = "";

  for (const p of list) {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="content">
        <h3 class="title">${p.name}</h3>
        <p class="meta">${p.brand} • ${p.group} • ${p.area ?? ""} ${p.subgroup ?? ""} ${p.type ?? ""}</p>
      </div>
    `;

    grid.appendChild(card);
  }
}

function setActiveGroupButton() {
  for (const btn of groupButtons) {
    btn.classList.toggle("is-active", btn.dataset.group === activeGroup);
  }
}

function setActiveBrandButton() {
  const brandButtons = brandFilters.querySelectorAll(".brand-filter");
  for (const btn of brandButtons) {
    btn.classList.toggle("is-active", btn.dataset.brand === activeBrand);
  }
}

function renderBrandFilters() {
  const brands = ["all", ...new Set(products.map(p => p.brand))];

  brandFilters.innerHTML = "";

  for (const brand of brands) {
    const btn = document.createElement("button");

    // WAŻNE: ta klasa odróżnia markę od kategorii
    btn.className = "chip brand-filter";
    btn.dataset.brand = brand;

    btn.textContent = (brand === "all") ? "Wszystkie marki" : brand;

    btn.addEventListener("click", () => {
      activeBrand = brand;
      setActiveBrandButton();
      applyFilters();
    });

    brandFilters.appendChild(btn);
  }

  // po wygenerowaniu marek ustaw obwódkę na aktualnie wybranej
  setActiveBrandButton();
}

function applyFilters() {
  let list = products;

  if (activeGroup !== "all") {
    list = list.filter(p => p.group === activeGroup);
  }

  if (activeBrand !== "all") {
    list = list.filter(p => p.brand === activeBrand);
  }

  render(list);
}

for (const btn of groupButtons) {
  btn.addEventListener("click", () => {
    activeGroup = btn.dataset.group;
    setActiveGroupButton();
    applyFilters();
  });
}

renderBrandFilters();
setActiveBrandButton();
setActiveGroupButton();
applyFilters();
setOpenPanel(null);
setActiveBrandButton();
setActiveGroupButton();
applyFilters();

