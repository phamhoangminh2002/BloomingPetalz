
(function ($) {

    let list = []; 

    $(document).on('click', '.addToCompare', function () {
        $(".comparePanel").show();
        $(this).toggleClass("rotateBtn");
        $(this).parents(".card-container").toggleClass("selected");
        var productID = $(this).parents('.card-img').attr('data-id');

        var inArray = $.inArray(productID, list); 
        if (inArray < 0) {
            if (list.length < 2) {
                list.push(productID);

                var displayName = $(this).parents('.card-img').parents('.card-container').attr('data-name');

                var image = $(this).siblings("a").children('img').attr('src');

                $(".comparePan").append('<div id="' + productID + '" class="relPos col-6 col-tab-12"><div class="panel-item"><a class="selectedItemCloseBtn">&times</a><img src="' + image + '" alt="image" style="max-height:100px;max-width=100px"/><p id="' + productID + '" >' + displayName + '</p></div></div>');
            }
            else {
                alert("You can only compare up to 2 products    ");
                $(this).toggleClass("rotateBtn");
                $(this).parents(".card-container").toggleClass("selected");
                return;
            }

        } else {
            list.splice($.inArray(productID, list), 1);
            $('#' + productID).remove();
            hideComparePanel();
        }


        if (list.length > 1) {
            $(".btn-compare").addClass("active");
            $(".btn-compare").removeAttr('disabled');
        } else {
            $(".btn-compare").removeClass("active");
            $(".btn-compare").attr('disabled', '');
        }

    });

    $(document).on('click', '.btn-compare', function () {
        if ($(".btn-compare").hasClass("active")) {
            $(".contentPop").append('<div class="col-2 compareItemParent relPos">' + 
                                        '<ul class="contentPop-product">' + 
                                           '<li class="relPos compHeader"></br>Features</li>' + 
                                           '<li class="name-li">Name</li>' +
                                           '<li>Price</li>'  +
                                           '<li class="description">Description</li>' +
                                        '</ul>' + 
                                    '</div>');

            for (var i = 0; i < list.length; i++) {
                product = $('.card-container[data-id="' + list[i] + '"]');
                var image = $('[data-id=' + list[i] + ']').find(".flowerImage").attr('src');
                var title = $('[data-id=' + list[i] + ']').attr('data-name');
                $(".contentPop").append('<div class="col-4 compareItemParent relPos">' +
                                            '<ul class="contentPop-product">' + 
                                               '<li class="compHeader"><img src="' + image + '" class="compareThumb"></li>' +
                                               '<li class="name-li">' + title + '</li>' + '<li>' + $(product).data('price')+'$' + '</li>' + 
                                               '<li class="description">' + $(product).data('description') + '</li>' +
                                             '</ul>' + 
                                        '</div>');
            }
        }
        $(".modPos").show();
    });

    /* function to close the comparision popup */
    $(document).on('click', '.closeBtn', function () {
        $(".contentPop").empty();
        $(".comparePan").empty();
        $(".comparePanel").hide();
        $(".modPos").hide();
        $(".card-container").removeClass("selected");
        $(".btn-compare").attr('disabled', '');
        list.length = 0;
        $(".rotateBtn").toggleClass("rotateBtn");
    });

    /*function to remove item from preview panel*/
    $(document).on('click', '.selectedItemCloseBtn', function () {

        var test = $(this).siblings("p").attr('id');
        $('[data-id=' + test + ']').find(".addToCompare").click();
        hideComparePanel();
    });

    function hideComparePanel() {
        if (!list.length) {
            $(".comparePan").empty();
            $(".comparePanel").hide();
        }
    }
})(jQuery);