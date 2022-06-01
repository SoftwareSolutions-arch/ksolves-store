var session_id = localStorage.getItem('payment_session_id');
var stripe_id = localStorage.getItem('stripe_session_id');

$(document).ready(function () {
    function _redirectToStripeCheckout() {
        var stripe = Stripe(stripe_id);
        stripe.redirectToCheckout({
            sessionId: session_id
        }).then(function (result) {
            if (result.error) {
                // displayError(result.error.message);
            }
        });
    }

    $.getScript("https://js.stripe.com/v3/", function (data, textStatus, jqxhr) {
        _redirectToStripeCheckout($('form[provider="stripe"]'));
    });
});