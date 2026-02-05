let cart = 0;
let total = 0;

function addToCart(price) {
    cart++;
    total += price;
    document.getElementById("cart-count").innerText = cart;
    document.getElementById("total-price").innerText = total;
}
