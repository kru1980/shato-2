				        <script src="https://yandex.st/jquery/2.2.3/jquery.min.js" type="text/javascript">
        </script>
        <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU">
        </script>
        <script src="/tiler-converter.js" type="text/javascript"></script>
        <script type="text/javascript">
            ymaps.ready(function() {
         var LAYER_NAME = 'user#layer',
             MAP_TYPE_NAME = 'user#customMap',
             TILES_PATH = '';
         var Layer = function() {
             var layer = new ymaps.Layer(TILES_PATH + '/%z/tile-%x-%y.png', {});
             layer.getCopyrights = function() {
                 return ymaps.vow.resolve('©');
             };
             return layer;
         };
         ymaps.layer.storage.add(LAYER_NAME, Layer);
         var mapType = new ymaps.MapType(MAP_TYPE_NAME, [LAYER_NAME]);
         ymaps.mapType.storage.add(MAP_TYPE_NAME, mapType);
         var map = new ymaps.Map('map', {
             center: [0.0041820003, 0.0016365235],
             zoom: 11,
             controls: ['zoomControl', 'fullscreenControl'],
			 // behaviors: ["scrollZoom"],
             type: MAP_TYPE_NAME
         }, {
             maxZoom: 12,
			 suppressMapOpenBlock: true,
			 zoomControlSize: 'small',
             projection: new ymaps.projection.Cartesian([
                 [-1, -1],
                 [1, 1]
             ], [false, false]),
             restrictMapArea: [
                 [-0.000010232825, 0.000019848728],
                 [0.0055118686, 0.0055666866]
             ],
         });
         // map.behaviors.disable("scrollZoom");
         console.log("getJSON");
         $.getJSON("/file.json?v25", function(data) {
             console.log("getJSON");
             $.each(data, function(key, val) {
                 var status = "<span style=color:#1fa300;font-weight:bold>Свободен</span>";
                 var color = "#00FF0000";
                 var price = "";
                 var area = "";
                 var status = "";
                 if (val.status == 1) {
                     status = "<br>Статус: <span style=color:#1fa300;font-weight:bold>Свободен</span>";
                     price = "<br>- Стоимость: <b>" + val.price + "</b>";
                     area = "<br>- Площадь участка: " + val.area + price + "<br>";
                 }
                 if (val.status == 2) {
                     status = "<br>Статус: <span style=color:#900000;font-weight:bold>Продан</span>";
                     color = "#ff000040";
                     area = "<br>- Площадь участка: " + val.area + price + "<br>";
                 }
                 if (val.status == 3) {
                     status = "<br>Статус: <span style=color:#7e7515;font-weight:bold>В резерве</span>";
                     color = "#ffea0080";
                     price = "<br>- Стоимость: <b>" + val.price + "</b>";
                     area = "<br>- Площадь участка: " + val.area + price + "<br>";
                 }
                 if (val.status == 4) {
                     status = "";
                     color = "#00000040";
                 }
                 var myPolygon60 = new ymaps.Polygon([val.coords], {
					 myContent: "<div style=padding:20px><span style=font-size:20px>" + val.address + "</span><br>" + area + status + "</div>"
                 }, {
                     fillColor: color,
                     strokeWidth: 1,
                     strokeStyle: 'dot',
                     strokeColor: color
                 });
                 map.geoObjects.add(myPolygon60);
             });
         });
				 map.geoObjects.events.add('click', function (e) {
					var object = e.get('target');
					var coords = e.get('coords');
					map.balloon.open([coords[0].toPrecision(8),coords[1].toPrecision(8)], object.properties._data.myContent, {
						// Опция: не показываем кнопку закрытия.
						closeButton: true
					});
				});
     });
        </script>
        <style>
        </style>
        <div class="map" id="map" style="width:895px;height:600px">
        </div>
			</div>

		</div>
	</div>
	<div>
			<table>
				<tr>
					<td><div style=margin-left:300px;width:20px;height:20px;background-color:#739407></div></td>
					<td style=color:#7d6849>&nbsp;Свободные</td>
					<td><div style=margin-left:40px;width:20px;height:20px;background-color:#cca130></div></td>
					<td style=color:#7d6849>&nbsp;В резерве</td>
					<td><div style=margin-left:40px;width:20px;height:20px;background-color:#c32929></div></td>
					<td style=color:#7d6849>&nbsp;Продано</td>
				</tr>
			</table>
	</div>
	
	<div class="bottom"><div></div></div>
</div>
