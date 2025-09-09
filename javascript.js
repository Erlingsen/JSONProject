//Husker ikke hva denne gjør, ligger sikkert igjen fra at jeg prøvde en ting men så ombestemte jeg meg å gjorde det på en annen måte, husker ikke hva. Ting ser ut til å funke uten den men jeg lar den ligge i tilfelle det ødlegger en eller annen obskur feature.
let data = [];

//Fetch HTML ting
const list = document.getElementById("list");
const attributeSelect = document.getElementById("attribute");
const sortSelect = document.getElementById("sort");
const searchName = document.getElementById("searchName");
const searchAttr = document.getElementById("searchAttr");

// Vis sorterings valg basert på atributt
function updateSortOptions() {
  const attribute = attributeSelect.value;
  sortSelect.innerHTML = "";

  //Hvis atributt er x så vis sorteringsvalgene for x
  if (attribute === "year") {
    addOption("yearOldNew", "Gamlest > Nyest");
    addOption("yearNewOld", "Nyest > Gamlest");
  } else if (attribute === "compiler") {
    addOption("compilerAÅ", "Compiler (A > Å)");
    addOption("compilerÅA", "Compiler (Å > A)");
  } else if (attribute === "popularity") {
    addOption("popularFirst", "Highest > Lowest");
    addOption("popularLast", "Lowest > Highest");
  }
  //Her ligger sikkert problemet med sorter etter greien som ikke vil vise seg, HUSK Å FIKSE DETTE SENERE

  // Sorter etter navn
  addOption("nameAÅ", "Name (A > Å)");
  addOption("nameÅA", "Name (Å > A)");

  // Oppdater atributt placeholder
  searchAttr.placeholder = `Søk med ${attribute}...`;
}

function addOption(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  sortSelect.appendChild(option);
}

async function loadData() {
  const response = await fetch("languages.json");
  data = await response.json();
  updateSortOptions();
  render();
}

function render() {
  const attribute = attributeSelect.value;
  const sortType = sortSelect.value;
  const queryName = searchName.value.toLowerCase();
  const queryAttr = searchAttr.value.toLowerCase();

  let displayData = data.filter(lang =>
    lang.name.toLowerCase().includes(queryName) &&
    lang[attribute].toString().toLowerCase().includes(queryAttr)
  );

  if (sortType === "yearOldNew") {
    displayData.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  } else if (sortType === "yearNewOld") {
    displayData.sort((a, b) => parseInt(b.year) - parseInt(a.year));
  } else if (sortType === "compilerAÅ") {
    displayData.sort((a, b) => a.compiler.localeCompare(b.compiler));
  } else if (sortType === "compilerÅA") {
    displayData.sort((a, b) => b.compiler.localeCompare(a.compiler));
  } else if (sortType === "popularFirst") {
    displayData.sort((a, b) => (parseFloat(a.popularity) || 0) - (parseFloat(b.popularity) || 0));
  } else if (sortType === "popularLast") {
    displayData.sort((a, b) => (parseFloat(b.popularity) || 0) - (parseFloat(a.popularity) || 0));
  } else if (sortType === "nameAÅ") {
    displayData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortType === "nameÅA") {
    displayData.sort((a, b) => b.name.localeCompare(a.name));
  }

  list.innerHTML = "";
  displayData.forEach(lang => {
    const li = document.createElement("li");
    li.textContent = `${lang.name} — ${lang[attribute]}`;
    list.appendChild(li);
  });
}

attributeSelect.addEventListener("change", () => {
  updateSortOptions();
  render();
});

sortSelect.addEventListener("change", render);
searchName.addEventListener("input", render);
searchAttr.addEventListener("input", render);

//Denne sier seg sjøl
loadData();