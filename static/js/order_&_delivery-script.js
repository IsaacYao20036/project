/*
Code used in cloneFunction function is from
https://stackoverflow.com/questions/34471016/adding-new-select-tag-by-clicking-on-the-button
answered by CoderPi Dec 26, 2015 at 12:01, edited Dec 26, 2015 at 14:00
*/

// function clones original row of select tags
function cloneFunction() {

	// create line breaks and hr between rows
	var br = document.createElement("br");
	var hr = document.createElement("hr")
	document.getElementById("order_dropdowns").appendChild(br)
	document.getElementById("order_dropdowns").appendChild(br.cloneNode(true))
	document.getElementById("order_dropdowns").appendChild(hr)
	document.getElementById("order_dropdowns").appendChild(br.cloneNode(true))

	// clone number scroll
	var input = document.getElementById("quantity")
	var clone = input.cloneNode(true)
	var name = input.getAttribute("name")
	clone.id = name
	clone.setAttribute("name", name)
	document.getElementById("order_dropdowns").appendChild(clone).value = ""

	// create span with text "x"
	var span = document.createElement("span");
	var node = document.createTextNode(" x \u00A0");
	span.appendChild(node);
	var element = document.getElementById("order_dropdowns");
	element.appendChild(span);

	// clone flavours select
	var select = document.getElementById("flavours")
	var clone = select.cloneNode(true)
	var name = select.getAttribute("name")
	clone.id = name
	clone.setAttribute("name", name)
	document.getElementById("order_dropdowns").appendChild(clone)

	// create span " in "
	var span = document.createElement("span");
	var node = document.createTextNode("\u00A0 in \u00A0");
	span.appendChild(node);
	var element = document.getElementById("order_dropdowns");
	element.appendChild(span);

	// clone containers select
	var select = document.getElementById("containers")
	var clone = select.cloneNode(true)
	var name = select.getAttribute("name")
	clone.id = name
	clone.setAttribute("name", name)
	document.getElementById("order_dropdowns").appendChild(clone)

}


// function opens dialog
function openDialog() {

	var dialog = document.getElementById("order_dlg");
	document.getElementById("order_btn").onclick = function () {
		dialog.show();
	};

}


/*
The code below is edited version of the one from
https://flexiple.com/javascript/disable-button-javascript/
written by Flexiple Inc

The following code only works for the original, first row in the form due to my lack of Javascript knowledge.
*/

let quantityField = document.getElementById("quantity")
let flavoursSelect = document.getElementById("flavours");
let containersSelect = document.getElementById("containers");
let order = document.getElementById("order_btn");

order.disabled = true;

flavoursSelect.addEventListener("click", stateHandle);
containersSelect.addEventListener("click", stateHandle);
quantityField = addEventListener("click", stateHandle);


// function disables order button if fields in form are not filled out properly
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
