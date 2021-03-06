if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Barang ini sudah ada di keranjang anda')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">HAPUS</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rp', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100

    if (total > 100000) {
        var diskonText = document.getElementById("hematDiskon").innerText
        diskonSeratus = seratusRibuDiskon(total)
        diskonMember = total * (5 / 100)
        totalDiskon = total - diskonSeratus
        totalDiskonMember = total - (diskonSeratus + diskonMember)
        document.getElementById("hematDiskon").innerText = diskonText.replace("Rp0", diskonSeratus)
        document.getElementsByClassName('cart-total-price')[0].innerText = 'Rp' + (totalDiskon)
        document.getElementsByClassName('cart-total-diskon')[0].innerText = 'Anda Seorang member, anda berhak mendapatkan diskon sebesar 5% Anda cukup membayar ' + totalDiskonMember + ' Untuk Belanja Ini'
        alert("Selamat Mendapatkan Diskon Tambahan 10% atau " + diskonSeratus)
    } else if (total <= 100000) {
        var diskonText = document.getElementById("hematDiskon").innerText
        diskon = total * (5 / 100)
        totalDiskon = total - diskon
        document.getElementById("hematDiskon").innerText = diskonText.replace("Rp0", "Rp0")
        document.getElementsByClassName('cart-total-price')[0].innerText = 'Rp' + total
        document.getElementsByClassName('cart-total-diskon')[0].innerText = 'Selamat anda mendapatkan diskon Total bayar anda Sebesar ' + diskon + ' Rp ' + totalDiskon
    } else {
        var diskonText = document.getElementById("hematDiskon").innerText
        diskon = total * (5 / 100)
        totalDiskon = total - diskon
        document.getElementById("hematDiskon").innerText = diskonText.replace("Rp0", "Rp0")
        document.getElementsByClassName('cart-total-price')[0].innerText = 'Rp' + total
        document.getElementsByClassName('cart-total-diskon')[0].innerText = 'Selamat anda mendapatkan diskon Total bayar anda Sebesar ' + diskon + ' Rp ' + totalDiskon
    }
}

function isClicked() {
    var checkBox = document.getElementById("styled-checkbox-1")
    var text = document.getElementById("diskon")
    if (checkBox.checked == true) {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function isWeekend() {
    var hargaItemList = document.getElementsByClassName("shop-item-price")
    for (var i = 0; i < hargaItemList.length; i++) {
        var elementHarga = hargaItemList[i].innerText
        var elementHargaChange = hargaItemList[i].innerText
        var price = parseFloat(elementHarga.replace('Rp', ''))
        var diskonWeekend = price * (1 - (2 / 100))
        document.getElementsByClassName("shop-item-price")[i].innerText = elementHarga.replace(elementHargaChange, "Rp" + diskonWeekend)
    }
    updateCartTotal()
    alert("Harga Per Item Di Diskon 2 Persen")
}

function seratusRibuDiskon(total) {
    var tambahanDiskon = 0;
    if (total > 100000) {
        tambahanDiskon = total * (10 / 100)
    }
    return tambahanDiskon
}

document.getElementById("weekend").addEventListener("click", isWeekend)



// function OnChangeCheckbox(checkbox, newTotal) {
//     if (checkbox.checked) {
//         alert("Selamat Anda Mendapatkan Diskon Sebesar 10 Persen")
//         newTotal = newTotal * (1 - (10 / 100))
//         document.getElementsByClassName('cart-total-price')[0].innerText = 'Rp' + newTotal
//     } else {
//         alert("Bukan Member")
//         document.getElementsByClassName('cart-total-price')[0].innerText = 'Rp' + newTotal
//     }

// }

// function isMember() {
//     var test = document.getElementsByClassName("styled-checkbox")[0].checked

//     if (test == true) {
//         return true
//     } else {
//         return false
//     }
// }

// function onClickCheck(money) {
//     var checkBox = document.getElementsByClassName("styled-checkbox")
//     var text = document.getElementsByClassName("cart-total-price")[0].innerText
//     if (checkBox.checked == true) {
//         money = money(1 - (10 / 100))
//         text = 'Rp' + money
//     } else {
//         text = 'Rp' + money
//     }
// }