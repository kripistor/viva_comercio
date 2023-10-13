const boxes = Array.from(document.querySelectorAll(".btnAfter"));

boxes.forEach((btnAfter) => {
    btnAfter.addEventListener("click", boxHandler);
});

function boxHandler(e) {
    e.preventDefault();
    let currentBox = e.target.closest(".btnAfter");
    let accordCard__item = e.target.nextElementSibling;
    currentBox.classList.toggle("active");
    if (currentBox.classList.contains("active")) {
        accordCard__item.style.display = "block";
    } else {
        accordCard__item.style.display = "none";
    }
}

//счетчик товаров
window.addEventListener("click", function (event) {
    console.log("click window");
    console.log(event.target.dataset.action);

    if (event.target.dataset.action === "plus") {
        const btnAmount = event.target.closest(".btnAmount");

        const counter = btnAmount.querySelector("[data-counter]");

        const amount = document.querySelector("[data-amount]");

        counter.innerText = ++counter.innerText;
    }

    if (event.target.dataset.action === "minus") {
        const btnAmount = event.target.closest(".btnAmount");

        const counter = btnAmount.querySelector("[data-counter]");
        if (counter.innerText == 1) {
            if (confirm("Удалить из корзины?")) {
                event.target.closest(".iphone__block").remove();
                toggleCartStatus();
                calcCartPrice();
            } else {
                counter.innerText = counter.innerText;
            }
            // event.target.closest(".iphone__block").remove();
        } else {
            counter.innerText = --counter.innerText;
        }
    }
    calcCartPrice();
});

// пустая корзина
function toggleCartStatus() {
    const cartWrapper = document.querySelector(".myCart");
    const cartEmptyBadge = document.querySelector("[data-cart-empty]");
    const iphBlock = document.querySelectorAll(".iphone__block").length;
    const totalBlock = document.querySelector(".total");
    if (iphBlock == 0) {
        console.log("FULL");
        cartEmptyBadge.innerText = "Корзина пуста";
        totalBlock.style.display = "none";
    }
}

// подсчет итога корзины

function calcCartPrice() {
    const cartItems = document.querySelectorAll(".iphone__block");

    const totalPriceEl = document.querySelector(".amountSum");
    let priceTotal = 0;

    cartItems.forEach(function (item) {
        const amountEl = item.querySelector("[data-counter]");

        const priceEl = item.querySelector(".cardPrice");

        const currentPrice =
            parseInt(amountEl.innerText) * parseInt(priceEl.innerText);

        priceTotal += currentPrice;
    });
    console.log(priceTotal);
    const numbFmt = priceTotal.toLocaleString("ru-RU");
    totalPriceEl.innerText = numbFmt + " ₽";
}
