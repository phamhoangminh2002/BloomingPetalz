var data = [
    {"id":"p01","name":"Be Mine Bouquet", "pic":"be_mine_bouquet.jpg","price":100,"description":"flower 1", "cat":"bestSellers"},
    
    {"id":"p03","name":"Be My Lover", "pic":"be_my_lover.jpg","price":123,"description":"Flower 2", "cat":"bestSellers"},

    {"id":"p04","name":"Sweet Heart", "pic":"sweet_heart.png","price":90,"description":"", "cat":"bestSellers"},

    {"id":"p06","name":"Ruby", "pic":"ruby.jpg","price":13,"description":"", "cat":"bestSellers"},

    {"id":"p07","name":"Soulmate", "pic":"soulmate.jpg","price":150,"description":"","cat":"bestSellers"},

    {"id":"p08","name":"Evelyn", "pic":"evelyn.jpg","price":150,"description":"", "cat":"bestSellers"},

    {"id":"p10","name":"Ire", "pic":"ire.jpg","price":123,"description":"", "cat":"aniversary"},

    {"id":"p11","name":"Fiona Bouquet", "pic":"fiona.jpg","price":190,"description":"", "cat":"bouquet"},

    {"id":"p12","name":"Amber Bouquet", "pic":"amber.jpg","price":115,"description":"", "cat":"bouquet"},

    {"id":"p13","name":"Sapphire Bouquet", "pic":"sapphire.jpg","price":130,"description":"", "cat":"bouquet"},
    
    {"id":"p14","name":"Amethyst Bouquet", "pic":"amethyst.jpg","price":130,"description":"", "cat":"bouquet"},

    {"id":"p16","name":"True Love Giftbox", "pic":"truelove.jpg","price":130,"description":"", "cat":"giftbox"},

    {"id":"p17","name":"Fairytale Giftbox", "pic":"fairytale.jpg","price":130,"description":"", "cat":"giftbox"},

    {"id":"p18","name":"Mini Orchid Giftbox", "pic":"miniOrchid.jpg","price":130,"description":"", "cat":"giftbox"},

    {"id":"p19","name":"Kawaii Unicorn Bloombox", "pic":"sapphire.jpg","price":130,"description":"", "cat":"bloombox"},

    {"id":"p20","name":"Loving You Bloombox", "pic":"lovingyou.jpg","price":130,"description":"", "cat":"bloombox"},

    {"id":"p21","name":"True Love Big Size Bloombox", "pic":"sapphire.jpg","price":130,"description":"", "cat":"bloombox"},
    
    {"id":"p22","name":"Heartshape Bloombox", "pic":"sapphire.jpg","price":130,"description":"", "cat":"bloombox"}
];

displayImages(data);

//lap trinh su kien search
$("#formSearch").submit(function (e) {
    e.preventDefault();

    let search = $("#search").val();
    let re = new RegExp(search, "ig");
    let subdata = data.filter(item => item.name.search(re) >= 0);

    displayImages(subdata);
});

// lap trinh chi tiet san pham
var res = '';
function getUrlID(){
    var urlID = window.location.href;
    res = urlID.slice(-3);
}

function productDetail(){
    var d = ``;
    var i = 0;
    for (var v of data){
        if (v.id == res){
            i++;
            d += `
            <div class="row" id="productDetail">
                <div class="col-7 detail-img">
                    <div><img src="imgs/${v.pic}" alt="" class="flowerImage"></div>
                </div>
                <div class="col-5 detail-content">
                    <h3>${v.name}</h3>
                    <h2>Price: ${v.price}</h2>
                    <div>
                        <p>${v.description}</p>
                    </div>
                    <a href="#" data-name="${v.name}" data-price="${v.price}" class="add-to-cart">Add to cart</a>
                </div>
            </div>
                `;
            break;
        }
    }
    if (i == 0){
        d += `404 Not Found`;
    }
    $("#productDetail").html(d);
}



$("input[type=checkbox]").click(function () {
    let cats = $(".chk-cake:checked").map(function () { return $(this).val() }).toArray().toString();
    let subdata = (cats.length==0)?data: data.filter(item => cats.search(item.cat) >= 0);
    
    displayImages(subdata);

});


function displayImages(items) {
    let s = ``;
    $.each(items, function (k, v) {
            s += ` <div class="card-container" data-id="${v.id}" data-name="${v.name}" data-price="${v.price}" data-description="${v.description}">
                        <div class="card-img" data-id="${v.id}">
                            <a class="addButtonCircular addToCompare"> + </a>
                            <a href="productDetail.html?id=${v.id}" class="productImg">
                               <img src="imgs/${v.pic}" alt="" class="flowerImage">
                            </a>
                        </div>
                        <div class="card-content">
                            <h4>${v.name}</h4>
                            <p><span>${v.price}$</span></p>
                            <a href="#" data-name="${v.name}" data-price="${v.price}" class="add-to-cart btn btn-primary">Add to cart</a>
                        </div>
                    </div>
                 `;

    });

    $("#products").html(s);
}

var label1 = document.querySelector("#label-1");
var label2 = document.querySelector("#label-2");
var label3 = document.querySelector("#label-3");
var label4 = document.querySelector("#label-4");
label1.onclick = () => {
    label1.classList.toggle('changeColor');
}
label2.onclick = () => {
    label2.classList.toggle('changeColor');
}
label3.onclick = () => {
    label3.classList.toggle('changeColor');
}
label4.onclick = () => {
    label4.classList.toggle('changeColor');
}