let form = document.getElementById("form");
let submit = document.getElementById("submit");
let ul = document.getElementById("items");
let filter = document.getElementById("filter");
let clearall = document.getElementById("clearall");

function setItem(item) {
  const items = getItem();
  localStorage.setItem("Todos", JSON.stringify([...items, item]));
}

function getItem() {
  const items = JSON.parse(localStorage.getItem("Todos")) || [];
  return items;
}

// Submitting items
const submitForm = (e) => {
  e.preventDefault();
  const input = document.getElementById("input");
  const item = input.value.trim();

  if (item !== "") {
    setItem(item);
    renderItems(item);
    input.value = "";
    input.focus();
  }
};

// Rendering new items
function renderItems(item) {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  const newText = document.createTextNode(item);
  const x = document.createTextNode("X");
  li.className = "itemList";
  btn.appendChild(x);
  li.appendChild(newText);
  li.appendChild(btn);
  btn.style.float = "right";
  btn.className = "btn";

  ul.appendChild(li);
}

// deleting items
const deleteItem = (e) => {
  // delete from DOM
  const element = e.target.parentElement;
  console.log(element);
  if (e.target.classList.contains("btn")) {
    if (confirm("Are you sure you want to delete?")) {
      ul.removeChild(element);
    }

    // delete from local storage
    const items = getItem();
    items.forEach((item) => {
      localStorage.setItem(
        "Todos",
        JSON.stringify(items.filter((id) => id != item))
      );
    });
  }
};
// Clear all
const removeAll = (e) => {
  if (confirm("Are you sure you want to clear all?")) {
    ul.innerHTML = "";
  }
  localStorage.removeItem("Todos");
};

// filter
const search = (e) => {
  //get the filter input
  let input = e.target.value.toLowerCase();

  //get the li's to match
  let items = document.getElementsByTagName("li");
  Array.from(items).forEach((item) => {
    if (item.firstChild.textContent.toLowerCase().indexOf(input) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
};

const domLoaded = () => {
  const local = getItem();
  local.forEach((item) => {
    renderItems(item);
  });
};
// **************************Event Listener****************************
clearall.addEventListener("click", removeAll);
ul.addEventListener("click", deleteItem);
form.addEventListener("submit", submitForm);
filter.addEventListener("keyup", search);
window.addEventListener("DOMContentLoaded", domLoaded);
