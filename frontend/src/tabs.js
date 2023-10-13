let navItem = document.querySelectorAll('.tabs__header-item');
let contentItem = document.querySelectorAll('.tabs__body-content');
let contTab = document.querySelectorAll('.tab-2');
let navTab = document.querySelectorAll('.tab');

// link.forEach(function(elem){
//     elem.addEventListener('click',open);
// })
function open() {

    navItem.forEach(function (elem) {
        elem.classList.remove('active');
    })
    contentItem.forEach(function (elem) {
        elem.classList.remove('active');
    })
    navTab.forEach(function (elem) {
        elem.classList.add('active');
    })
    contTab.forEach(function (elem) {
        elem.classList.add('active');
    })

}

navItem.forEach(function (elem) {
    elem.addEventListener('click', activeTab);
})

function activeTab() {
    navItem.forEach(function (elem) {
        elem.classList.remove('active');
    })
    this.classList.add('active');
    let tabName = this.getAttribute('data-tab');
    // console.log(tabName);
    activeTabContent(tabName);
}

function activeTabContent(tabName) {
    contentItem.forEach(function (item) {
        if (item.classList.contains(tabName)) {
            item.classList.add('active');

        } else {
            item.classList.remove('active');
        }
    })
}

heart1 = document.querySelector('.compare-form__heart img');

heart1.onclick = red_izb;
a = 0;

function red_izb() {

    if (a >= 1) {
        a = 0;
        heart1.src = 'img/' + img[a] + '.jpg';
    } else {
        a = 1
        heart1.src = 'img/' + img[a] + '.jpg';
    }


}

heart2 = document.querySelector('.compare-form__heart.second img');

heart2.onclick = red2_izb;
c = 0;
var img = ['heart', 'heart-red'];

function red2_izb() {

    if (c >= 1) {
        c = 0;
        heart2.src = 'img/' + img[c] + '.jpg';
    } else {
        c = 1
        heart2.src = 'img/' + img[c] + '.jpg';
    }


}

heart3 = document.querySelector('.compare-form__heart.third img');

heart3.onclick = red3_izb;
n = 0;

function red3_izb() {

    if (n >= 1) {
        n = 0;
        heart3.src = 'img/' + img[n] + '.jpg';
    } else {
        n = 1
        heart3.src = 'img/' + img[n] + '.jpg';
    }


}