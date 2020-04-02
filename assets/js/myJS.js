function tacheGenerator() {
	let item = document.getElementById("add").value;
	let ul = document.getElementById("listadd");
	let li = document.createElement("li");
	li.appendChild(document.createTextNode("- " + item));
	ul.appendChild(li);
	document.getElementById("add").value = "";
	li.onclick = removeItem;
  }
  
  document.body.onkeyup = function(e) {
	if (e.keyCode == 13) {
	  tacheGenerator();
	}
  };
  
  function removeItem(e) {
	e.target.parentElement.removeChild(e.target);
  }
