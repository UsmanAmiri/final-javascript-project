$(document).ready(function() {

    function createCheckoutProductCard(obj) {
        // <div class="checkout-card">
        //     <div>
        //         <img class="checkout-product-img" src="/assets/default-product.png" />
        //     </div>
        //     <div>
        //         <h4>Product Title</h4>
        //         <p>x3</p>
        //         <p>Amount: Rs <span>30000</span></p>
        //     </div>
        // </div>

        var card = document.createElement('div');
        card.classList.add('checkout-card');

        var firstInnerDiv = document.createElement('div');
        var productImg = document.createElement('img');
        productImg.classList.add('checkout-product-img');
        productImg.src = obj.preview;
        firstInnerDiv.appendChild(productImg);

        var secondInnerDiv = document.createElement('div');
        var productName = document.createElement('h4');
        productName.innerHTML = obj.name;
        var productCount = document.createElement('p');
        productCount.innerHTML = 'x'+obj.count;
        var amountLabel = document.createElement('span');
        amountLabel.innerHTML = 'Amount: Rs ';
        var amountSpan = document.createElement('span');
        amountSpan.innerHTML = parseInt(obj.count) * parseInt(obj.price);
        var productAmount = document.createElement('p');
        productAmount.appendChild(amountLabel);
        productAmount.appendChild(amountSpan);
        secondInnerDiv.appendChild(productName);
        secondInnerDiv.appendChild(productCount);
        secondInnerDiv.appendChild(productAmount);

        card.appendChild(firstInnerDiv);
        card.appendChild(secondInnerDiv);

        return card;
    }

    var productList = window.localStorage.getItem('product-list');
    productList = productList === null || productList === '' ? [] : productList;
    productList = productList.length > 0 ? JSON.parse(productList) : [];

    // console.log(productList);
    var grandTotal = 0;
    for(var i=0; i<productList.length; i++) {
        $('#card-list').append(createCheckoutProductCard(productList[i]));
        // console.log('Count => ', productList[i].count);
        // console.log('Price => ', productList[i].price);

        var totalForCurrentProduct = parseFloat(productList[i].count) * parseFloat(productList[i].price);

        grandTotal = grandTotal + totalForCurrentProduct;

        // console.log('Total For Product '+ i + ' is=> ' + totalForCurrentProduct);
    }

    $('#item-count').html(productList.length);
    $('#total-amount').html(grandTotal);

    $('#btn-place-order').click(function() {

        var orderItemArr = [];
        for(var i=0; i<productList.length; i++) {
            var prodObj = {
                "id": productList[i].id,
                "brand": productList[i].brand,
                "name": productList[i].name,
                "price": productList[i].price,
                "preview": productList[i].preview,
                "isAccessory": productList[i].isAccessory
            }

            orderItemArr.push(prodObj);
        }

        // console.log(productList);
        // console.log(orderItemArr);

        var dataObj = {
            amount: grandTotal,
            products: orderItemArr
        }
        $.post('https://5d76bf96515d1a0014085cf9.mockapi.io/order', dataObj, function() {
            alert('Order Placed Successfully')
            localStorage.setItem('product-list', []);

            location.assign('./thankyou.html');
        })
    })
})
var productData = {
    "id": "1",
    "name": "Men Navy Blue Solid Sweatshirt",
    "preview": "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg",
    "photos": [
            "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg",
            "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/efc3d5b9-1bb3-4427-af53-7acae7af98951541402833591-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-2.jpg",
            "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/c7e58861-3431-4189-9903-9880f5eebd181541402833566-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-3.jpg",
            "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/66490b64-32de-44b4-a6e4-fe36f1c040051541402833548-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-4.jpg",
            "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/957be784-7c5d-4e90-ab9f-0928015b22891541402833645-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-5.jpg"
        ],
    "description": "Navy solid sweatshirt with patchwork, has a round neck, long sleeves, straight hem",
    "size": [
            1,
            1,
            0,
            1,
            0
        ],
    "isAccessory": false,
    "brand": "United Colors of Benetton",
    "price": 2599
}

// apply data to page

// main image
document.getElementById("main_image").src = productData["preview"];

// item name
document.getElementById("name").innerHTML = productData["name"];

// item brand
document.getElementById("brand").innerHTML = productData["brand"];

// item price
document.getElementById("price_value").innerHTML = productData["price"];

// item description
document.getElementById("description").innerHTML = productData["description"];

// item images
for(let i = 0; i < productData["photos"].length; i++)
{
    // <img id="image_0" class="active" onclick="update_main_image(this);" src="">

    let temp_image_tag = document.createElement("img");
    
    temp_image_tag.id = "image_" + i;
    temp_image_tag.setAttribute("onclick", "update_main_image(this);");
    temp_image_tag.src = productData["photos"][i];

    if(i == 0) temp_image_tag.classList.add("active");

    document.getElementById("preview_images").appendChild(temp_image_tag);
}

console.clear();

function update_main_image(new_image)
{
	console.log(new_image.src);

	let main_image = document.getElementById("main_image");

	document.getElementById(main_image.dataset.img).classList.remove("active");
	new_image.classList.add("active");

	main_image.src = new_image.src;
	main_image.dataset.img = new_image.id;
}