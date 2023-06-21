var selectionCounter = 0
function cloneSelect() {
  var select = document.getElementById("flavours")
  var clone = select.cloneNode(true)
  var name = select.getAttribute("name") + selectionCounter++
  clone.id = name
  clone.setAttribute("name", name)
  document.getElementById("container").appendChild(clone)
}

/* This code is from https://stackoverflow.com/questions/34471016/adding-new-select-tag-by-clicking-on-the-button */