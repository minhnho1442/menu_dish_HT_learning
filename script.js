// Lấy các thành phần HTML cần dùng cho chức năng tìm kiếm.
const searchInput = document.querySelector('#menuSearch');
const menuCards = Array.from(document.querySelectorAll('.menu-card'));
const emptyState = document.querySelector('#emptyState');
const menuCount = document.querySelector('#menuCount');

// Bỏ dấu tiếng Việt để tìm "ca phe" vẫn khớp "cà phê".
function normalizeText(text) {
  return text.toLocaleLowerCase('vi').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim();
}

// Lọc trực tiếp khi người dùng nhập từ khóa.
function filterMenu() {
  const keyword = normalizeText(searchInput.value);
  let visibleCount = 0;

  menuCards.forEach((card) => {
    const name = normalizeText(card.dataset.name);
    const matches = name.includes(keyword);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  emptyState.hidden = visibleCount !== 0;
  menuCount.textContent = `${String(visibleCount).padStart(2, '0')} món`;
}

searchInput.addEventListener('input', filterMenu);
filterMenu();
