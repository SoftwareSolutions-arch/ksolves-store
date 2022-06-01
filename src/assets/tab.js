$(document).on('click', '.product-detail .product-rating', function(event) {
    $('#reviews').siblings().removeClass('active show')
    $('#reviews').addClass('active show')
});