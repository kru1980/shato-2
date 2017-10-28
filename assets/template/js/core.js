function draw(data_array) {
    var map_places = $('#map-places');
    var canva = $('#canvas');
	data_array.forEach(function(item, i) {
	    id = 'a' + i;
		//создаем элементы канвас
		var canvas_width, canvas_height;
		var cords_array = [];
		var max_x = 0;
		var min_x = 10000;
		var max_y = 0;
		var min_y = 10000;
		item.cords = item.cords.split(',');
		item.cords.forEach(function(cord, i){
		    cord = cord*1;
		    if(!(i%2)){
		        if(cord > max_x)
		            max_x = cord;
		        if(cord < min_x)
		            min_x = cord;
		        cords_array.push([cord, item.cords[i+1]]);
		    }
		    else{
		        if(cord > max_y)
		            max_y = cord;
		        if(cord < min_y)
		            min_y = cord;
		    }
		});
		
		canvas_width = max_x - min_x + 5;
		canvas_height = max_y - min_y + 5;
		
		var canvas = document.createElement('canvas');
		$(canvas).attr('id', id)
		    .attr('width', canvas_width)
		    .attr('height', canvas_height)
		    .attr('data_num', i)
		    .css({
    		    'top': min_y,
    		    'left': min_x
    		});
        canva.append($(canvas));
		//Рисуем объект
		if (canvas.getContext) {
			var ctx = canvas.getContext('2d');
			if(item.status == "1")
			    ctx.fillStyle = "orange";
		    else if(item.status == "0"){
		        ctx.fillStyle = "red";
		        $(canvas).addClass('sold');
		    }
		    else if(item.status == "2"){
		        ctx.fillStyle = "yellow";
		        $(canvas).addClass('sold');
		    }
			ctx.beginPath();
			ctx.moveTo(cords_array[0][0] - min_x, cords_array[0][1] - min_y);
			last_point = cords_array[0];
			cords_array.splice(0,1);
			cords_array.forEach(function(point, idx){
			    ctx.lineTo(point[0] - min_x, point[1] - min_y);
			    last_point = point;
			}); 
			ctx.fill();	
			ctx.closePath();
		}
		
	    area = $('<area>',{
                'coords': item.cords.join(','),
                'shape': 'poly',
                'data-target': i,
                'href': '#'
            });
        map_places.append(area);
        area.on('mouseover click', function(e){
            e.preventDefault();
            var target = $(this).attr('data-target');
            
    	    if(item.status == "1")
    	        $('#a'+target).css({'opacity': 0.6});
    	        
            var popup = $('#popup');
            $('#map-price').html(data_array[target].price)
            switch(data_array[target].status){
                case "1":
                    $('#map-status').html('Доступен').addClass('free').removeClass('sold').removeClass('reserved');
                    break;
                case "2":
                    $('#map-status').html('Забронирован').addClass('reserved').removeClass('sold').removeClass('free');
                    break;
                case "0":
                    $('#map-status').html('Продан').addClass('sold').removeClass('reserved').removeClass('free');
                    break;
            }
            $('#map-text').html(data_array[target].text);
            $('#map-square').html(data_array[target].square);
            $('#map-address').html(data_array[target].address)
            popup.css({'display':'block','opacity': 0});
            var popup_width = popup.width();
            if(popup_width > min_x)
                popup.css({'left': max_x});
            else
                popup.css({'left': min_x - popup_width});
                
            var popup_height = popup.height();
            if(popup_height > min_y)
                popup.css({'top': '10px'});
            else
                popup.css({'top': max_y - popup_height});
            
            popup.css({'opacity': 1});
        }).on('mouseout', function(e){
            var target = $(this).attr('data-target');
            if(item.status == "1")
    	        $('#a'+target).css({'opacity': 0});
            var popup = $('#popup');
            popup.css({'display':'none'});
        });
	});
	$('.interactive-map').animate({'opacity': 1}, 1000);
}

window.onload = function () {
    // console.log(places_array);
	draw(places_array);
}