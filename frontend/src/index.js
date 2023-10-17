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

const cartSection = document.querySelector('.myCart .iphoneCards');
cartSection.addEventListener('click', async function(event) {
    if (event.target.classList.contains('del')) {
        event.preventDefault();
        const deleteButton = event.target;
        const productID = deleteButton.closest('.iphone__block').id;
        try {
            const response = await fetch(`http://127.0.0.1:8000/cart?product_id=${productID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            console.log('Success:', data);
            // Удалите элемент из DOM или обновите его, чтобы он больше не отображался
            deleteButton.closest('.iphone__block').remove();
        } catch (error) {
            console.error('Error:', error);
        }
    }
});

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
function increaseCartItem(productID) {
    fetch(`http://127.0.0.1:8000/cart/increase?product_id=${productID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Increased item count in cart:', response);
    })
    .catch(error => console.error('Error increasing item count:', error));
}

function decreaseCartItem(productID) {
    fetch(`http://127.0.0.1:8000/cart/decrease?product_id=${productID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Decreased item count in cart:', response);
    })
    .catch(error => console.error('Error decreasing item count:', error));
}
window.addEventListener("click", function (event) {
    console.log("click window");
    console.log(event.target.dataset.action);

    if (event.target.dataset.action === "plus") {
        const btnAmount = event.target.closest(".btnAmount");
        const counter = btnAmount.querySelector("[data-counter]");
        counter.innerText = ++counter.innerText;

        const productID = event.target.closest('.iphone__block').id; // Получить ID товара
        increaseCartItem(productID); // Вызвать функцию увеличения количества товара
    }

    if (event.target.dataset.action === "minus") {
        const btnAmount = event.target.closest(".btnAmount");
        const counter = btnAmount.querySelector("[data-counter]");
        if (counter.innerText == 1) {
            if (confirm("Удалить из корзины?")) {
                const productID = event.target.closest('.iphone__block').id; // Получить ID товара
                decreaseCartItem(productID); // Вызвать функцию уменьшения количества товара
                event.target.closest(".iphone__block").remove();
                toggleCartStatus();
                calcCartPrice();
            } else {
                counter.innerText = counter.innerText;
            }
        } else {
            counter.innerText = --counter.innerText;
            const productID = event.target.closest('.iphone__block').id; // Получить ID товара
            decreaseCartItem(productID); // Вызвать функцию уменьшения количества товара
        }
    }
    calcCartPrice();
});
fetch('http://127.0.0.1:8000/cart')
    .then(response => response.json())
    .then(data => {
        const cartSection = document.querySelector('.myCart .iphoneCards');
        data.products.forEach(product => {
            const templateBlock = `
                <div class="iphone__block" id="${product.id}">
                    <div class="blockCard">
                        <img src="${product.image}" alt="" width="90" height="66"/>
                        <span class="leftCard">
                            <div class="cardName">
                                ${product.name}
                            </div>
                            <span class="btnCard">
                                <button id="fav">В избранное</button>
                                <button id="del" class="del">Удалить</button>
                            </span>
                        </span>
                        <span class="rightCard">
                            <div class="cardPrice">${product.price} ₽</div>
                            <div class="btnAmount">
                                <button class="btnMinus">
                                    <div class="minusItem" data-action="minus">-</div>
                                </button>
                                <span class="itemAmount" data-counter>${product.count}</span>
                                <button class="btnPluse">
                                    <div class="pluseItem" data-action="plus">+</div>
                                </button>
                            </div>
                        </span>
                    </div>
                </div>
            `;
            cartSection.insertAdjacentHTML('beforeend', templateBlock);
            calcCartPrice();
        });
    })
    .catch(error => console.error('Ошибка получения данных:', error));

