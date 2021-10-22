$(document).ready(function(){

    emblaCarousel('.js-gProcess', {
        dragFree: false,
        containScroll: "trimSnaps",
        align: "start",
        navs: true,
        arrowPrev: 'icon-arrow-left',
        arrowNext: 'icon-arrow-right',
        // dots: true,
        // loop: true
    });




    $('.num').each(function(){
        var _ = $(this);
        var plus = _.find('.nPlus');
        var minus = _.find('.nMinus');
        var val = _.find('.val');
        plus.click(function(e){
            e.preventDefault();
            var v = val.val();
            var nv = ++v;
            val.val(nv);
            if(nv > 1){
                minus.removeClass('disabled_');
            }
        });
        minus.click(function(e){
            e.preventDefault();
            if(!$(this).hasClass('disabled_')){
                var v = val.val();
                var nv = --v;
                val.val(nv);
                if(nv <= 1){
                    $(this).addClass('disabled_');
                }
            }
        });
    });


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
            }
        }, 'json'); // json | html
        return false;
    });

    $('.productSizes input, .productColors input').on('change', function(e) {
        if(this.checked) {
            var currentSize = $(".productSizes input[name=size]:checked").val();
            var currentColor = $(".productColors input[name=color]:checked").val();
            if (typeof currentColor === "undefined") {
                currentColor = 1;
            }
            if(typeof currentSize === "undefined") {
                return false;
            }
            var itemId = $(this).data('item');
            var cList = $("span.clistTake").data('item');
            var colorList = $("span.cColorTake").data('item');
            var _v_action = '/local/includes/offers.php';
            var dataSize = $(this).data('size');

            if (dataSize == 1) {
                ///alert("yes");

                $("label.allColors").css('display','none');
                $(".hiddenColors label").css('display','none');
                $(".hiddenColors label.size_"+currentSize).css('display','inline-block');

            } else {

                $(".productPage").css('opacity', '0.7');

                var vData = {
                    'ACT': 'offerview',
                    'productID': itemId,
                    'color': currentColor,
                    'size': currentSize,
                    'cList': cList,
                    'colorList': colorList,
                    'dataSize': dataSize,
                    'sessid': BX.bitrix_sessid(),
                };
                $.ajax({
                    type: "POST",
                    url: _v_action,
                    data: vData,
                    dataType: 'html',
                    success: function (data) {
                        if (dataSize == 1) {
                            $(".productColors").empty().append(data);
                        } else {
                            $(".productPage").empty().append(data);
                        }

                        $(".productPage").css('opacity', '1');

                    }
                });
            }
            return false;

        } else {
            return false;
        }
    });

    $('.accordion2ItemHead').click(function(e){
        e.preventDefault();
        if($(this).parents('li').hasClass('opened')){
            $(this).parents('li').removeClass('opened');
            $(this).parents('li').find('.accordion2ItemBody').slideUp();
        }else{
            $(this).parents('li').addClass('opened');
            $(this).parents('li').find('.accordion2ItemBody').slideDown();
        }
    });

    $('.productMinImages a').click(function(e) {
        if ($(this).hasAttr('data-video-id')) {
            e.preventDefault();
            var id = $(this).attr('data-video-id');
            console.log(id);
            $('#'+id).find('iframe').attr('src',$(this).attr('href'));
            $('.MagicZoom').hide();
            $('.MagicZoomVideo').show();
        }else{
            $('.MagicZoom').show();
            $('.MagicZoomVideo').find('iframe').attr('src','');
            $('.MagicZoomVideo').hide();
        }
    });

    $('.styler_').styler();
});