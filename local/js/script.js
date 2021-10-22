/*
$(function() {

   $.post('some_script.php', { width: screen.width }, function(json) {
       if(json.outcome == 'success') {
           // запрос прошёл успешно
       } else {
           alert('Unable to let PHP know what the screen resolution is!');
       }
   },'json');
});
*/
(function($) {
	$.fn.tabs = function( body , colback ){
		var boddy = $(body);
		var navs = $(this).find('a');
		navs.click(function(e){
			e.preventDefault();
			var id = $(this).attr('href');
			$(this).parent().addClass('active').parent().find('li').not($(this).parent()).removeClass('active');
			boddy.each(function(){
				$(this).hide();
			});
			$(body+id).show();
      if (colback) {
        colback();
      }
		});
	}
})(jQuery);

var mzOptions = {
	onUpdate: function() {
		$('.MagicZoom').show();
		$('.MagicZoomVideo').find('iframe').attr('src','');
		$('.MagicZoomVideo').hide();
	}
};

$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};

function showModal(modal) {
	modal.fadeIn();
	$('body').addClass('openModal');
}
function hideModal(modal) {
	modal.fadeOut();
	$('body').removeClass('openModal');
}
$(document).ready(function(){
	
	$('.styler').styler();

	$('a, button').click(function(e){
		if ($(this).hasAttr('data-modal')) {
			e.preventDefault();
			var modal = $(this).attr('data-modal');
			if ($(modal).length > 0) {
				showModal($(modal));
			}else{
				console.log('Объект не найден!')
			}
		}
	});

	$('.modalWindowClose, .js-closeModal').click(function(e){
		e.preventDefault();
		hideModal($(this).parents('.modalWindow'));
	});

  $(".headerBtns li.btnMobNav a").click(function(e){
  	e.preventDefault();
  	$("body").toggleClass("openNav");
  });
  $(".mobHeaderMenuClose").click(function(e){
  	e.preventDefault();
  	$("body").removeClass("openNav");
  });

  if ($('.fancybox').length > 0) {
    $('.fancybox').fancybox({
        openEffect : 'elastic',
        openSpeed  : 150,
        closeEffect : 'elastic',
        closeSpeed  : 150,
        padding: 5,
				helpers : {
					media : {},
				}
    });
  };

  $('#mask').click(function(){
  	$('body').removeClass('openFilter');
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

  $('.btnUp').click(function(e){
  	e.preventDefault();
		$("html, body").animate({scrollTop: 0},1000);
  });

  $(window).scroll(function(){
  	var _top = $(this).scrollTop();
  	if (_top > 100) {
			$('.header').addClass('fixed');  		
  	}else if(_top == 0){
			$('.header').removeClass('fixed');  		
  	}
  	if (_top > 200) {
			$('.btnUp').addClass('show');  		
  	}else{
			$('.btnUp').removeClass('show');  		
  	}
  });

  $('.mobHeaderNav ul li').find('ul').prev('a').click(function(e){
  	e.preventDefault();
  	if($(this).parents('li').hasClass('opened')){
  		$(this).parents('li').removeClass('opened');
  		$(this).parents('li').find('ul').slideUp();
  	}else{
  		$(this).parents('li').addClass('opened');
  		$(this).parents('li').find('ul').slideDown();
  	}
  });

  $('.footerNavHead').click(function(e){
  	e.preventDefault();
		$(this).parents('.footerNav').toggleClass('opened');
  });

  $('.telInput').inputmask("+7 (999) 999-99-99");

  $('.filterBlockHead').click(function(e){
  	e.preventDefault();
  	if($(this).parents('.filterBlock').hasClass('opened')){
  		$(this).parents('.filterBlock').removeClass('opened');
  		$(this).parents('.filterBlock').find('.filterBlockBody').slideUp();
  	}else{
  		$(this).parents('.filterBlock').addClass('opened');
  		$(this).parents('.filterBlock').find('.filterBlockBody').slideDown();
  	}
  });
  $('.filterBlockList li.toggleList a').click(function(e){
  	e.preventDefault();
  	$(this).parents('li').prevAll().slideDown();
  	$(this).parents('li').slideUp();
  });
  $('.filterModalBtn a').click(function(e){
  	e.preventDefault();
  	if($(this).parents('.filterModal').hasClass('opened')){
  		$(this).parents('.filterModal').removeClass('opened');
  		$(this).parents('.filterModal').find('.filterModalBody').slideUp();
  	}else{
  		$(this).parents('.filterModal').addClass('opened');
  		$(this).parents('.filterModal').find('.filterModalBody').slideDown();
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

  function pricesSliderFn(){
		if($('.priceS').length > 0 ) {
			$('.priceS').each(function(){
				var _this = $(this);
				_this.noUiSlider({
					range: {
				    'min': 0,
				    'max': 10000,
				  },
			    format: wNumb({
					  mark: '',
					  integers:1,
					  thousand: ' ',
					  // postfix: ' p.'
					}),
			    snap: false,
			    start: [0, 10000],
			    step:1,
			    change: function () {
			    	console.log(_this.val());
			    }
				});
				_this.find(".noUi-handle").append($("<span></span>"));
				_this.Link('lower').to(_this.parents('.pricesSlider').find(".numPrices .leftInput input"));
				_this.Link('lower').to(_this.find(".noUi-handle.noUi-handle-lower span"));

				_this.Link('upper').to(_this.parents('.pricesSlider').find(".numPrices .rightInput input"));
				_this.Link('upper').to(_this.find(".noUi-handle.noUi-handle-upper span"));
			})
		}
	}
	pricesSliderFn();

  function jsMainBannerSlider() {
	  	emblaCarousel('.js-mainBannerSlider', {
	  	dragFree: false,
	    containScroll: "trimSnaps",
	    align: "center",
	    startIndex: 1,
	    navs: true,
	    // dots: true,
	    loop: true,
	  });

  }

// const prevButtonNode = $('#js-mainBannerSlider .embla-nav-prev');
// const nextButtonNode = $('#js-mainBannerSlider .embla-nav-next');




// prevButtonNode.addEventListener('click', embla.scrollPrev, false)
// nextButtonNode.addEventListener('click', embla.scrollNext, false)

// $(nextButtonNode).click(embla.scrollNext,function(event) {
// 	/* Act on the event */
// 	console.log('s');
// });



 // $(nextButtonNode).on('click', embla.scrollPrev, function(event) {
 // 	event.preventDefault();
 // 	/* Act on the event */
 // 	console.log($(this));
 // });

 // const embla = EmblaCarousel(document.getElementById('js-mainBannerSlider'));

 // $('.js-mainBannerTabs li a').click(function(event) {

 // 	var getHref = $(this).data('href');
 	
	// embla.scrollTo(getHref);
 // 	return false;
 


 // });
 // $('#js-mainBannerSlider .embla-nav-next').on('click', embla.scrollNext, function(event) {
 // 	event.preventDefault();
 // 	/* Act on the event */
 // 	console.log($(this));
 // });


// var embla = emblaCarousel(document.getElementById('js-mainBannerSlider'),);
// embla.on('click', function(e){
// 	console.log('ss');
// });


// Add click listeners
// prevButtonNode.addEventListener('click', embla.scrollPrev, false)
// nextButtonNode.addEventListener('click', embla.scrollNext, false)

// const rootNode = document.querySelector('.embla')
// const viewportNode = rootNode.('.embla__viewport')

// Grab button nodes
// const prevButtonNode = $('.js-mainBannerSlider .embla__prev');
// const nextButtonNode = $('.js-mainBannerSlider .embla__next');

// prevButtonNode.addEventListener('click', embla.scrollPrev, false)
// nextButtonNode.addEventListener('click', embla.scrollNext, false)

  jsMainBannerSlider();

// var embla = EmblaCarousel($('js-mainBannerSlider'));


 // 	$('#js-mainBannerSlider .embla-nav-next').on('click', embla.scrollNext, function(event) {
	//  	event.preventDefault();
	//  	/* Act on the event */
	//  	console.log($(this));
	// });
  // $('.js-mainBannerTabs').tabs('.mainBannerItem',jsMainBannerSlider);

  function jsReceptsSliderInit() {
	  emblaCarousel('.js-receptsSlider', {
	  	dragFree: false,
	    containScroll: "trimSnaps",
	    align: "start",
	    navs: true,
	    dots: true,
	    // loop: true
	  });
  }
  jsReceptsSliderInit();

  $('.js-receptsTabs').tabs('.receptsTabsBody',jsReceptsSliderInit);

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

  emblaCarousel('.js-products', {
  	dragFree: false,
    containScroll: "trimSnaps",
    align: "start",
    navs: true,
    // loop: true
  });

  $('.productMinImages a').click(function(e) {
  	if ($(this).hasAttr('data-video-id')) {
  		e.preventDefault();
  		var id = $(this).attr('data-video-id');
  		console.log(id);
  		$('#'+id).find('iframe').attr('src',$(this).attr('href'));
  		$('.MagicZoom').hide();
  		$('.MagicZoomVideo').show();
		MagicZoom.refresh($('#Zoom-1')[0]);
  	}else{
  		$('.MagicZoom').show();
  		$('.MagicZoomVideo').find('iframe').attr('src','');
  		$('.MagicZoomVideo').hide();
  	}
  });

  $('.productCardBlockHead').click(function(e){
  	e.preventDefault();
  	$(this).parents('.productCardBlock').toggleClass('opened');
  });
/*
  $('.productItemButtons a.heart').click(function(e){
  	e.preventDefault();
  	$(this).toggleClass('active');
  });*/

	$(function(){
		var ink, d, x, y;
		$(".btnLarge, .btnMid, .btnMin").each(function(){
			var hovered = false;
			$(this).hover(function(e){
				if (!hovered) {
					hovered = true;
			    if($(this).find(".ink").length === 0){
			        $(this).prepend("<span class='ink'></span>");
			    }
			         
			    ink = $(this).find(".ink");
			    ink.removeClass("animateInk");
			     
			    if(!ink.height() && !ink.width()){
			        d = Math.max($(this).outerWidth(), $(this).outerHeight());
			        ink.css({height: d, width: d});
			    }
			     
			    x = e.pageX - $(this).offset().left - ink.width()/2;
			    y = e.pageY - $(this).offset().top - ink.height()/2;
			     
			    ink.css({top: y+'px', left: x+'px'}).addClass("animateInk");
				}
			},function(){
				hovered = false;
			});
		})
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
		console.log(1);

			if(res.quantity>0)
			{
		
				console.log(res.quantity);

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
				//dataLayer.push({'event': 'addTocart'});
				dataLayer.push({'event': 'toCart'});
				dataLayer.push({
					"ecommerce": {
						"add": {
							"products": [
								{
									"id": idd,
									"name": res.name[idd],
									"price": res.price[idd],
									"quantity": res.product_quantity[idd]
								}
							]
						}
					}
				});
			}
		}, 'json'); // json | html
		return false;
	});

	$("select#selectbox_sort").on('change',function () {
		val_ = $(this).val();
		if(val_ > 0) {
			sortUrl = $(".sortlist_.sort_" + val_ + " a").attr('href');
			window.location.href = sortUrl;
		}
		return false;
	});

	//Newsletter
	$('form#nl_form').on('submit',function(){
		email = $('input[name="email_newsletter"]').val();
		if(email != '') {
			$.getJSON('/local/includes/newsletter.php', {
				email: $('input[name="email_newsletter"]').val()
			}, function (data) {
				if (data.status == 'ok') {
					$(".alert_newsletter").empty().append('<span class="green">Вы успешно подписаны.</span>');
				} else {
					$(".alert_newsletter").empty().append('<span class="red">'+data.msg+"</span>");
				}
				dataLayer.push({'event': 'subscribe'});
			});
		} else {
			$(".alert_newsletter").empty().append('<span class="red">Укажите email</span>');
			return false;
		}
		return false;
	});



	$(".productImage a.quickview").on('click', function(e) {
		var itemId = $(this).data('item');
		$('li.item_'+itemId).css('opacity','0.75');
		var _v_action = '/local/includes/quickview.php';
		var vData = {
			'ACT' 		: 'qview',
			'productID' : itemId,
			'sessid' 	: BX.bitrix_sessid(),
		};
		$.ajax({
			type: "POST",
			url: _v_action,
			data: vData,
			dataType: 'html',
			success: function (data) {
				$("#previewProduct .qResult").empty().append(data);
				showModal($("#previewProduct"));
				$('li.item_'+itemId).css('opacity','1');
			}
		});
		return false;
	});


	$('.productSizes input, .productColors input').on('change', function(e) {
		if(this.checked) {
			var currentSize = $(".productSizes input[name=size]:checked").val();
			var currentColor = $(".productColors input[name=color]:checked").val();
			if (typeof currentColor === "undefined") {
				currentColor = 1;
			}
			if (typeof currentSize === "undefined") {
				return false;
			}
			var itemId = $(this).data('item');
			var cList = $("span.clistTake").data('item');
			var colorList = $("span.cColorTake").data('item');
			var _v_action = '/local/includes/offers.php';
			var dataSize = $(this).data('size');

			var getCurrency = $('#getCurrency').val();

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
				'getCurrency' : getCurrency,
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


});
window.onscroll = function() {
  myFunction()
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  if(scrolled >1){
  	$('#top-indicator').css('display', 'block');
  }
  document.getElementById("top-indicator").style.width = scrolled + "%";
}

function scrollAnimation(){
	var top = ($(window).scrollTop()+$(window).height()) - 100;
	$('.scrollAnimate').each(function(){
		var _top = $(this).offset().top;
		if (top >= _top) {
			$(this).addClass('scrollAnimated');
		}
	})
}
$(window).load(function(){
	scrollAnimation();
})

$(window).scroll(function(){
	scrollAnimation();
});




