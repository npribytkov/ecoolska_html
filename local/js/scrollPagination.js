

	// Функция AJAX запроса
	function getData() {
		$("#container_scroll").append('<div class="loading-bar">loading...</div>');
		var d=page+1;

		// Формируется POST запрос к ajax.php
		$.get("?PAGEN_6="+d+"&md_ajax=Y&clear_cache=Y",  function(data) {

			// Информируем пользователя
			$("#container_scroll").find('.loading-bar').html("loaded");

			// Если возвращенные данные пусты то сообщаем об этом
			if(data == "") {
				$("#container_scroll").find('.loading-bar').html("");
			}
			else {


				// Добавление полученных данных в DIV content
				$("#container_scroll").append(data);
				$("#container_scroll").find('.loading-bar').remove();
				$("#container_scroll").css('opacity', '1')
				// Процесс завершен
				busy = false;
			}

		});

	}
			
$(document).ready(function(){

	$('.loadMore').click(function() {

		// Проверяем пользователя, находится ли он в нижней части страницы

		if(!page){
			$('.loadMore').hide();
		}else {

			// Идет процесс
			busy = true;

			// Сообщить пользователю что идет загрузка данных
			$("#container_scroll").css('opacity', '0.5').find('.loading-bar').addClass('md_ajax_active');

			// Запустить функцию для выборки данных с установленной задержкой
			// Это полезно, если у вас есть контент в футере
			//setTimeout(function () {

				getData();

			//}, 100);

		}

	});

});

