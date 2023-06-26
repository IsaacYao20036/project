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

/* A majority of the code above is from https://stackoverflow.com/questions/34471016/adding-new-select-tag-by-clicking-on-the-button */


function openDialog() {

  var dialog = document.getElementById("order_dlg");    
    document.getElementById("order_btn").onclick = function() {    
        dialog.show();
    };

}
