var selectionCounter = 0
function cloneSelect() {

  var br = document.createElement("br");
  document.getElementById("divContainer").appendChild(br)

  var select = document.getElementById("flavours")
  var clone = select.cloneNode(true)
  var name = select.getAttribute("name") + selectionCounter++
  clone.id = name
  clone.setAttribute("name", name)
  document.getElementById("divContainer").appendChild(clone)

  var select = document.getElementById("containers")
  var clone = select.cloneNode(true)
  var name = select.getAttribute("name") + selectionCounter++
  clone.id = name
  clone.setAttribute("name", name)
  document.getElementById("divContainer").appendChild(clone)
 
}

/* This code is from https://stackoverflow.com/questions/34471016/adding-new-select-tag-by-clicking-on-the-button */