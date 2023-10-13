let countt = 0;
let summ = 0;
let cartt = {};

if (localStorage.getItem("countt")) {
    countt = parseInt(localStorage.getItem("countt"));
}

if (localStorage.getItem("summ")) {
    summ = parseInt(localStorage.getItem("summ"));
}

if (localStorage.getItem("cartt")) {
    cartt = JSON.parse(localStorage.getItem("cartt"));
}

updateCartt();

let btnss = document.querySelectorAll(".cartt");

for (let i = 0; i < btnss.length; i++) {
    let btns = btnss[i];
    btns.addEventListener("click", add);
}

function add(event) {
    let pricee = Number(event.target.dataset.pricee);
    let title = event.target.dataset.title;
    let id = event.target.dataset.id;

    if (id in cartt) {
        cartt[id].qtyy++;
    } else {
        let cartItem = {
            titlee: title,
            pricee: pricee,
            qtyy: 1
        };
        cartt[id] = cartItem
    }

    countt++;
    summ += pricee;

    console.log(cartt);

    localStorage.setItem("cartt", JSON.stringify(cartt));
    updateCartt();
}

function updateCartt() {
    document.getElementById("summ").textContent = summ;
    document.getElementById("countt").textContent = countt;
    localStorage.setItem("summ", summ);
    localStorage.setItem("count", countt);
}