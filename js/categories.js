// DOM Elements
const addCategoryForm = document.getElementById("add-category-form");
const addSubcategoryForm = document.getElementById("add-subcategory-form");
const categoryNameInput = document.getElementById("category-name");
const subcategoryNameInput = document.getElementById("subcategory-name");
const categorySelect = document.getElementById("category-select");
const categoriesList = document.getElementById("categories-list");

// Load categories and subcategories from localStorage or initialize
let categories = JSON.parse(localStorage.getItem("categories")) || {};

// Save categories and subcategories to localStorage
function saveCategories() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

// Render categories and subcategories in the UI
function renderCategories() {
  // Clear existing content
  categorySelect.innerHTML = '<option value="">Select a category</option>';
  categoriesList.innerHTML = "";

  // Populate categories and subcategories
  Object.keys(categories).forEach((category) => {
    // Add category to the dropdown
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);

    // Add category and its subcategories to the display list
    const li = document.createElement("li");
    li.innerHTML = `<strong>${category}</strong>`;
    const ul = document.createElement("ul");
    categories[category].forEach((subcategory) => {
      const subLi = document.createElement("li");
      subLi.textContent = subcategory;
      ul.appendChild(subLi);
    });
    li.appendChild(ul);
    categoriesList.appendChild(li);
  });
}

// Add a new category
addCategoryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const categoryName = categoryNameInput.value.trim();

  if (categoryName && !categories[categoryName]) {
    categories[categoryName] = []; // Initialize with no subcategories
    saveCategories();
    renderCategories();
    categoryNameInput.value = ""; // Clear input
    alert("Category added successfully!");
  } else {
    alert("Category already exists or name is invalid.");
  }
});

// Add a new subcategory
addSubcategoryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = categorySelect.value;
  const subcategoryName = subcategoryNameInput.value.trim();

  if (category && subcategoryName) {
    if (!categories[category].includes(subcategoryName)) {
      categories[category].push(subcategoryName); // Add subcategory
      saveCategories();
      renderCategories();
      subcategoryNameInput.value = ""; // Clear input
      alert("Subcategory added successfully!");
    } else {
      alert("Subcategory already exists in this category.");
    }
  } else {
    alert("Please select a category and enter a valid subcategory name.");
  }
});

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
});
