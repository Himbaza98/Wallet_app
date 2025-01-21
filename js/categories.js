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
  try {
    localStorage.setItem("categories", JSON.stringify(categories));
    console.log("Categories saved:", categories); // Debugging log
  } catch (error) {
    console.error("Error saving categories to localStorage:", error);
  }
}

// Render categories and subcategories in the UI
function renderCategories() {
  // Clear existing content
  categorySelect.innerHTML = '<option value="">Select a category</option>';
  categoriesList.innerHTML = "";

  // Check if there are any categories
  if (Object.keys(categories).length === 0) {
    categoriesList.innerHTML = "<p>No categories added yet.</p>";
    return;
  }

  // Populate categories and subcategories
  Object.keys(categories).forEach((category) => {
    // Add category to the dropdown
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);

    // Create list item for category
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${category}</strong>
      <button class="edit-category-btn" data-category="${category}">Edit</button>
      <button class="delete-category-btn" data-category="${category}">Delete</button>
    `;
    const ul = document.createElement("ul");

    // Add subcategories to the list
    categories[category].forEach((subcategory, index) => {
      const subLi = document.createElement("li");
      subLi.innerHTML = `
        ${subcategory}
        <button class="edit-subcategory-btn" data-category="${category}" data-index="${index}">Edit</button>
        <button class="delete-subcategory-btn" data-category="${category}" data-index="${index}">Delete</button>
      `;
      ul.appendChild(subLi);
    });

    li.appendChild(ul);
    categoriesList.appendChild(li);
  });

  // Add event listeners for edit/delete buttons
  attachCategoryButtons();
}

// Add a new category
addCategoryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const categoryName = categoryNameInput.value.trim();

  if (categoryName) {
    if (!categories[categoryName]) {
      categories[categoryName] = []; // Initialize with no subcategories
      saveCategories();
      renderCategories();
      categoryNameInput.value = ""; // Clear input
      alert("Category added successfully!");
    } else {
      alert("Category already exists.");
    }
  } else {
    alert("Please enter a valid category name.");
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

// Attach Edit and Delete Buttons to Categories and Subcategories
function attachCategoryButtons() {
  // Edit Category
  document.querySelectorAll(".edit-category-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      const newCategoryName = prompt("Edit category name:", category);
      if (newCategoryName && newCategoryName !== category) {
        // Update category key
        categories[newCategoryName] = categories[category];
        delete categories[category];
        saveCategories();
        renderCategories();
        alert("Category updated successfully!");
      }
    });
  });

  // Delete Category
  document.querySelectorAll(".delete-category-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      if (confirm(`Are you sure you want to delete the category "${category}"?`)) {
        delete categories[category];
        saveCategories();
        renderCategories();
        alert("Category deleted successfully!");
      }
    });
  });

  // Edit Subcategory
  document.querySelectorAll(".edit-subcategory-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      const index = button.dataset.index;
      const subcategory = categories[category][index];
      const newSubcategoryName = prompt("Edit subcategory name:", subcategory);
      if (newSubcategoryName && newSubcategoryName !== subcategory) {
        categories[category][index] = newSubcategoryName;
        saveCategories();
        renderCategories();
        alert("Subcategory updated successfully!");
      }
    });
  });

  // Delete Subcategory
  document.querySelectorAll(".delete-subcategory-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      const index = button.dataset.index;
      if (confirm(`Are you sure you want to delete the subcategory "${categories[category][index]}"?`)) {
        categories[category].splice(index, 1); // Remove subcategory
        saveCategories();
        renderCategories();
        alert("Subcategory deleted successfully!");
      }
    });
  });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
});
