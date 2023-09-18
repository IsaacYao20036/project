// Based on the page the user is on, this script changes the corresponding nav hyperlink to a different font

let path = location.pathname; // Gets URL of current page, stores in path
let linkID, linkID_2; // linkID_2 for links in dropdown

// Assigns linkID based on path
if (path == "/") {
    linkID = "home"
} else if (path == "/about_us") {
    linkID = "about_us"
} else if (path == "/flavours") {
    linkID = "our_products"
    linkID_2 = "flavours_link"
} else if (path == "/toppings") {
    linkID = "our_products"
    linkID_2 = "toppings_link"
} else if (path == "/containers") {
    linkID = "our_products"
    linkID_2 = "containers_link"
} else if (path == "/order_&_delivery") {
    linkID = "order_&_delivery"
}

// Changes nav link with the same id in linkID/linkID_2 to a different font
document.getElementById(linkID).style.fontFamily = "Bagel Fat One, fantasy";

if (linkID_2 != undefined) {
    document.getElementById(linkID_2).style.fontFamily = "Bagel Fat One, fantasy";
}
