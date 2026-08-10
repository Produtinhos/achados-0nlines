const products = [
  {
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
    category: "Utilidades",
    name: "Kit Organizador de Temperos",
    description: "Organizador prático para deixar os temperos sempre à mão e manter a cozinha mais organizada.",
    price: "R$ 39,90",
    link: "https://shopee.com.br/"
  },
  {
    image: "https://down-bs-br.img.susercontent.com/br-11134207-7r98o-lq97ra5vs0fbc7.webp",
    category: "Eletrônicos",
    name: "Carregador Portátil Pineng Power Bank 10.000mAh",
    description: "Carregue seu celular, tablet ou qualquer aparelho que possua entrada USB. Com 10.000mAh, é uma opção prática para o dia a dia.",
    price: "R$ 24,88",
    link: "https://s.shopee.com.br/20uYMyNGgj"
  },
  {
  image: "",
  category: "Casa",
  name: "Nome do produto",
  description: "Descrição curta do produto.",
  price: "R$ 00,00",
  link: "LINK_DA_SHOPEE_OU_MERCADO_LIVRE"
  },
  {
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85",
    category: "Eletrônicos",
    name: "Fone de Ouvido Sem Fio",
    description: "Design compacto e confortável para aproveitar músicas e chamadas no dia a dia.",
    price: "R$ 59,90",
    link: "https://shopee.com.br/"
  },
  {
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85",
    category: "Casa",
    name: "Organizador Multiuso",
    description: "Uma solução prática para guardar objetos e deixar diferentes ambientes mais organizados.",
    price: "R$ 29,90",
    link: "https://mercadolivre.com.br/"
  },
  {
  image: "https://down-zl-br.img.susercontent.com/br-11134207-7r98o-m5ar1tw0vjv4ec.webp",
  category: "Feminino",
  name: "Calça Pantalona Feminina Wide Leg Cintura Alta Tecido Crepe Dunas P ao GG Disponível no Linho",
  description: "Peça versátil e elegante, perfeita para diversas ocasiões. Com seu corte amplo e fluido, ela proporciona conforto e liberdade de movimento, ideal para o dia a dia ou eventos mais formais.",
  price: "R$ 36,90",
  link: "https://s.shopee.com.br/40fcoyYmWj"
},
  {
  image: "https://down-br.img.susercontent.com/file/br-11134207-820lz-mqpkmffnx0jle5.webp",
  category: "Feminino",
  name: "Calça Alfaiataria Feminina Pantalona Cintura Alta Look Elegante e Despojado Moda Casual para o Dia a Dia",
  description: "Sofisticação e conforto em uma só peça! Nossa Pantalona em Alfaiataria Premium é a escolha perfeita para quem quer um look elegante, moderno e cheio de estilo.",
  price: "R$ 39,99",
  link: "https://s.shopee.com.br/5AraGV2qTF"
},
  {
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    category: "Masculino",
    name: "Camiseta Básica Confortável",
    description: "Peça versátil para combinar com diferentes looks e usar no dia a dia.",
    price: "R$ 44,90",
    link: "https://shopee.com.br/"
  }
];

const categories = ["Todos", "Casa", "Cozinha", "Eletrônicos", "Utilidades", "Masculino", "Feminino"];
let activeCategory = "Todos";

const productsEl = document.querySelector("#products");
const filtersEl = document.querySelector("#categoryFilters");
const searchEl = document.querySelector("#search");
const emptyEl = document.querySelector("#empty");
const countEl = document.querySelector("#resultCount");

function renderFilters() {
  filtersEl.innerHTML = categories.map(cat =>
    `<button class="category-btn ${cat === activeCategory ? "active" : ""}" data-category="${cat}">${cat}</button>`
  ).join("");
  filtersEl.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category;
      renderFilters();
      renderProducts();
    });
  });
}

function renderProducts() {
  const query = searchEl.value.trim().toLowerCase();
  const filtered = products.filter(p => {
    const categoryMatch = activeCategory === "Todos" || p.category === activeCategory;
    const searchMatch = !query || `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(query);
    return categoryMatch && searchMatch;
  });

  countEl.textContent = `${filtered.length} ${filtered.length === 1 ? "produto" : "produtos"}`;
  emptyEl.classList.toggle("hidden", filtered.length !== 0);

  productsEl.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">
      </div>
      <div class="product-body">
        <span class="product-category">${escapeHtml(p.category)}</span>
        <h3 class="product-name">${escapeHtml(p.name)}</h3>
        <p class="product-description">${escapeHtml(p.description)}</p>
        <div class="price">${escapeHtml(p.price)}</div>
        <div class="badges">
          <span class="badge">🚚 Entrega rápida</span>
          <span class="badge">⭐ Bem avaliado</span>
          <span class="badge">💸 Ótimo custo-benefício</span>
        </div>
        <a class="btn product-btn" href="${p.link}" target="_blank" rel="noopener noreferrer sponsored">Ver Produto</a>
        <div class="secure">🔒 Compra segura na Shopee / Mercado Livre</div>
      </div>
    </article>
  `).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[ch]));
}

searchEl.addEventListener("input", renderProducts);
document.querySelector(".menu-toggle").addEventListener("click", (e) => {
  const nav = document.querySelector(".nav");
  const open = nav.classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => document.querySelector(".nav").classList.remove("open")));
document.querySelector("#year").textContent = new Date().getFullYear();

renderFilters();
renderProducts();
