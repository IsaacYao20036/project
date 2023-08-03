var selectionCounter = 0
function cloneFunction() {

	var br = document.createElement("br");
	document.getElementById("divContainer").appendChild(br)

	var input = document.getElementById("quantity")
	var clone = input.cloneNode(true)
	var name = input.getAttribute("name") + selectionCounter++
	clone.id = name
	clone.setAttribute("name", name)
	document.getElementById("divContainer").appendChild(clone).value = ""

	var span = document.createElement("span");
	var node = document.createTextNode(" x \u00A0");
	span.appendChild(node);
	var element = document.getElementById("divContainer");
	element.appendChild(span);

	var select = document.getElementById("flavours")
	var clone = select.cloneNode(true)
	var name = select.getAttribute("name") + selectionCounter++
	clone.id = name
	clone.setAttribute("name", name)
	document.getElementById("divContainer").appendChild(clone)

	var span = document.createElement("span");
	var node = document.createTextNode("\u00A0 in \u00A0");
	span.appendChild(node);
	var element = document.getElementById("divContainer");
	element.appendChild(span);

	var select = document.getElementById("containers")
	var clone = select.cloneNode(true)
	var name = select.getAttribute("name") + selectionCounter++
	clone.id = name
	clone.setAttribute("name", name)
	document.getElementById("divContainer").appendChild(clone)

}

/* A majority of the code above is from https://stackoverflow.com/questions/34471016/adding-new-select-tag-by-clicking-on-the-button
answered by CoderPi Dec 26, 2015 at 12:01, edited Dec 26, 2015 at 14:00 */


function openDialog() {

	var dialog = document.getElementById("order_dlg");
	document.getElementById("order_btn").onclick = function () {
		dialog.show();
	};

}


/* The code below is edited version of the one from https://flexiple.com/javascript/disable-button-javascript/
written by Flexiple Inc*/

let quantityField = document.getElementById("quantity")
let flavoursSelect = document.getElementById("flavours");
let containersSelect = document.getElementById("containers");
let order = document.getElementById("order_btn");

order.disabled = true;

flavoursSelect.addEventListener("click", stateHandle);
containersSelect.addEventListener("click", stateHandle);
quantityField = addEventListener("click", stateHandle);

function stateHandle() {
	if (Number(document.getElementById("quantity").value) > 5) {
		order.disabled = true;
	} else if (Number(document.getElementById("quantity").value) < 1) {
		order.disabled = true;
	} else if (Number.isInteger(Number(document.getElementById("quantity").value)) == false) {
		order.disabled = true;
	} else if (document.getElementById("quantity").value === "") {
		order.disabled = true;
	} else if (document.getElementById("flavours").value === "") {
		order.disabled = true;
	} else if (document.getElementById("containers").value === "") {
		order.disabled = true;
	} else {
		order.disabled = false;
	}
}
