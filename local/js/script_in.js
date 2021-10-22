$(document).ready(function(){


    // Add2Basket
    $('a.js_add2bsk, button.js_add2bskProduct, button.js_add2bsk').on('click', function(e) {
        var idd = $(this).attr('data-id');
        var _f_action = '/local/includes/ajax_add2cart.php';//$('#form-add2bsk').attr('action');
        var datacard = $(this).attr('data-card');
        var qty = 1;
        if(datacard == 1) {
            qty = $("input[name='product_qty']").val();
        }

        var dmpData = {
            'ACT' 		: 'add2bsk',//$('input[name=ACT]').val(),
            'productID' : $(this).attr('data-id'),
            'quantity' 	: qty,//$('input[name=quantity_'+idd+']').val(),
            'sessid' 	: BX.bitrix_sessid(),
        };
        var tov = 'Товара';
        $.post(_f_action, dmpData, function(res) {

            if(res.quantity>0)
            {
                BX.onCustomEvent('OnBasketChange');
                if(res.quantity)
                {
                    if(res.quantity == 1) {
                        tov = 'Товар';
                    }
                    $('#total_qnt').html("В корзине " + res.quantity+" "+tov);
                }
                if(res.summ != '')
                {
                    $('#total_price').html("Итого: "+res.summ+" р.");
                }
                showModal($("#modalBy"));
                $("a.btnCard").addClass('active');
                dataLayer.push({'event': 'toCart'});
            }
        }, 'json'); // json | html
        return false;
    });
    

});