document.addEventListener('DOMContentLoaded', () => {
    const cartSection = document.querySelector('.content__tovar');
    const handleAddToCart = async (event) => {
        event.preventDefault();

        const addButton = event.target;
        const productID = parseInt(addButton.closest('.tovar__block').getAttribute('data-product-id'));

        try {
            const response = await fetch(`http://127.0.0.1:8000/cart?product_id=${productID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    cartSection.addEventListener('click', (event) => {
        if (event.target.classList.contains('add_cart')) {
            handleAddToCart(event);
        }
    });
    fetch('http://127.0.0.1:8000/product')
        .then(response => response.json())
        .then(data => {
            data.products.forEach(product => {
                const templateBlock = `
                            <div class="tovar__block" data-product-id="${product.id}">
                    <img
                            class="photo_tovara"
                            src="${product.image}"
                            alt=""
                    />
                    <h2 class="tovar_name">
                        ${product.name}
                    </h2>
                    <div class="tovar_otziv">
                        <img src="assets/catolog/Star.png" alt=""/>
                        <a href="" class="otziv_cifra">${product.review}</a>
                        <a href="" class="otziv_kolvo"> / ${product.review_count} отзывов</a>

                    </div>
                    <div class="cena_tovara">
                        <a class="old_cena">${product.price} </a>
                        <a class="new_cena">${product.old_price} ₽</a>
                    </div>
                    <div class="block_korzina">
                        <button class="add_cart" data-product-id="1">
                            <img src="assets/catolog/cart.png" alt=""/>
                        </button>
                        <button class="like_item">
                            <img src="assets/catolog/like.png" alt=""/>
                        </button>
                        <button class="compare_item">
                            <img src="assets/catolog/compare.png" alt=""/>
                        </button>
                    </div>
                </div>`;
                cartSection.insertAdjacentHTML('beforeend', templateBlock);
            });
        })
        .catch(error => console.error('Ошибка получения данных:', error));
});

function moretovar() {
    var dots = document.getElementById("dots_item");
    var moreText = document.getElementById("more_item");
    var btnText = document.getElementById("more_item_btn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Показать ещё";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Скрыть";
        moreText.style.display = "contents";
    }
}

function readmore() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("readmore_btn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Показать ещё";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Скрыть";
        moreText.style.display = "flex";
    }
}

let current_rotation_1 = 180;
document.querySelectorAll(".dropdown__header").forEach((el) => {
    el.addEventListener("click", () => {
        let content = el.nextElementSibling;
        let child = el.lastElementChild;
        if (content.style.maxHeight == 0 + "px") {
            child.style.transform = "rotate(" + 180 + "deg)";
            content.style.maxHeight = content.scrollHeight + "px";
            console.log(content);
        } else {
            console.log(content);
            child.style.transform = "rotate(" + 0 + "deg)";
            content.style.maxHeight = 0 + "px";
        }
    });
});