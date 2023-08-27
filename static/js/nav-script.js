/* Based on the page the user is on, this script changes the corresponding nav hyperlink to a different font */

let path = location.pathname; /* Gets URL of current page, stores in path */
let linkID;

/* Assigns linkID based on path */
if (path == "/") {
    linkID = "home"
} else if (path == "/about_us") {
    linkID = "about_us"
} else if (path == "/our_products") {
    linkID = "our_products"
} else if (path == "/order_&_delivery") {
    linkID = "order_&_delivery"
}

/* Changes nav link to different font with same id in linkID */
document.getElementById(linkID).style.fontFamily = "Bagel Fat One", fantasy ;