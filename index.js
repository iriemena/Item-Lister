let form = document.getElementById('form');
let submit = document.getElementById('submit');
let ul = document.getElementById('items');
let filter = document.getElementById('filter');
let clearall = document.getElementById('clearall');

form.addEventListener("submit", add)
function add(e){
e.preventDefault();
let input = document.getElementById('input').value;

//to clear the last entry automatically
form.reset();

//to avoid submiting empty field
if(!input){
	return;
}
//create new item
let li = document.createElement('li');
li.className = "itemList";

//create new text which would be the input
let newText = document.createTextNode(input);
li.appendChild(newText);
ul.appendChild(li);

//create new element button
let button = document.createElement('button');
button.className = "btn"

//create and append x to button for deleting 
let x = document.createTextNode('X')
button.appendChild(x);
button.style.float = "right";
li.appendChild(button)

console.log(li)
}

//to remove an item
ul.addEventListener('click', remove);

function remove(e){
	let li = e.target.parentElement;
	if(e.target.classList.contains('btn')){
	if(confirm('Are you sure?')){
	ul.removeChild(li)
	}
}
}
// to filter 
filter.addEventListener('keyup', search);

function search(e){
	//get the filter input
	let input = e.target.value.toLowerCase();

	//get the li's to match
	let items = document.getElementsByTagName('li');

	// convert to array then loop with forEach
	Array.from(items).forEach(function(item){
		
		if(item.firstChild.textContent.toLowerCase().indexOf(input) != -1){
			item.style.display = "block"
		}else{
			item.style.display = "none"
		}
		
	})
	
	// or loop with for..loop without converting to array
	// for(i=0; i < items.length; i++){
	// 	if(items[i].firstChild.textContent.toLowerCase().indexOf(input) != -1){
	// 		items[i].style.display = "block"
	// 	}else{
	// 		items[i].style.display = "none"
	// 	}
	// 	console.log(items[i])
	// }
	
	}

	//to clear all
	clearall.addEventListener('click', clear)

	function clear(){
		if(confirm("Are you sure you want to clear all?")){
			ul.innerHTML = ""
		}
		
	}

	

	