		var mapa;
		var markers = new Array();
		$(document).on("ready",inicio);
		function inicio(){

			$("ul.tabs").jTabs({content: ".tabs_content"}); // Tabs
			navigator.geolocation.getCurrentPosition(mostrar,error);

			var fixed=true;
			$("#fixedbug").click(function (){

				if (fixed) {
					fixed=false;
					navigator.geolocation.getCurrentPosition(mostrar,error);// Arrancar geo
				}

			});
			
			// Dos opciones sobrecarga de JS haciando calculo aqui
			// 2 sobrecarga de servidor haciendo calculoas aia ... cada vez k c da click

			function error(){} // Funcion para mostrar error

			function mostrar(datos){
				var lat=datos.coords.latitude;
				var lon=datos.coords.longitude;
				//var ubicacion=new google.maps.LatLng(lat,lon);
				var ubicacion=new google.maps.LatLng(6.231128,-75.583291);
				var opcionesmapa={
					center:ubicacion,
					zoom:19,
					mapTypeId:google.maps.MapTypeId.SATELLITE
				}
				mapa=new google.maps.Map($("#mapa")[0],opcionesmapa);

				// PUNTERO YO
				var puntero=new google.maps.Marker({
						position:ubicacion,
						map:mapa,
						animation: google.maps.Animation.DROP,
						icon:'img/you-are-here-2.png'
						});


				var infowindow = new google.maps.InfoWindow({
				    content: "<p>Yo</p>"
				});

				infowindow.open(mapa,puntero);
				//---- cargar vendedor

				var vendedor;
				$.ajax({
			    url: 'managetables.php',
			    type: 'POST',
			    dataType: 'json',
			    error: function (error){console.log(error);},
			    success: function(datos){
			    	
			    	vendedor = datos;
			    	mostrarVendedor(vendedor,ubicacion);
				}

				});

				//---- end carga vendedor

				//------------------configurar popup img-------------------------

			    $('#close').click(function(){
			        $('#popup').fadeOut('slow');
			    });
				//------------------configurar popup img---------------------------



				//----------------------------- CAPTURA LOCALIZACION

				 google.maps.event.addListener(mapa, "click", function(evento) {
			     // Obtengo las coordenadas como objeto latLng || evento.latLng
			     puntero.setPosition(evento.latLng);
			     mostrarVendedor(vendedor,evento.latLng);
			     
			     }); //----------------------------- CAPTURA LOCALIZACION



			}


		}


		//----------------------------- CREAR TABLA Y AGREGAR MARKERS
		function mostrarVendedor (vendedor,latLng){

		// limpiar markers anteriores
	     for (var i in markers){
	     	markers[i].setPosition(null);
	     }

	     
	     $('#mensaje').html("");

	     var $table = $('<table>');
		 $table.attr({ border :'1px' });
		// thead
		 $table.append('<thead>').children('thead').append('<tr />')
		 .children('tr').append('<th>Nombre</th><th> # de carnet </th> <th> Foto </th>');

		//tbody
		 var $tbody = $table.append('<tbody />').children('tbody');

	     for (var i in vendedor){

	     	var lng = vendedor[i].zona_lng.split(',');
	     	var ubicacion=new google.maps.LatLng(lng[0],lng[1]);
		     if (google.maps.geometry.spherical.computeDistanceBetween(latLng,ubicacion,150)
		     	<0.0035000000000000000){

				// add row
				
				var $tr = $tbody.append('<tr />').children('tr:last');

				$tr.append("<td>"+vendedor[i].nombre+"</td>")
				.append("<td>"+vendedor[i].carnet+"</td>")
				.append("<td>	<img src='fotos/online-store-icon.png'/>	</td>");

				// add table to dom
				marks2(vendedor[i],$tr);
				$table.appendTo('#mensaje');
				

				
		     }


	    }

	     if ($('#mensaje').text()=="") {
	     	
	     	$('#mensaje').html(" <p> No hay vendedores cercanos </p>...");
	     	 
	     }


		} ///----------------------------- CREAR TABLA Y AGREGAR MARKERS

		// DIBUJAR vendedor
		function marks2(vendedor,tr){

			var lng = vendedor.zona_lng.split(',');
			var image = 'img/market.png';
		    var ubicacion=new google.maps.LatLng(lng[0],lng[1]);

			var puntero=new google.maps.Marker({
			position:ubicacion,
			map:mapa,
			animation: google.maps.Animation.DROP,
			icon:image
			});
			
			// CUANDO SE LE DE CLICK MOSTRARA INFO DEL VENDEDOR
			var infowindow = new google.maps.InfoWindow({
	    	content: 'Nombre :'+vendedor.nombre +'<br>Carnet : '+vendedor.carnet
			});

			google.maps.event.addListener(puntero, 'click', function() {
			infowindow.open(mapa,puntero);

			});

			// CUANDO SE HAGA CLICK EN LA IMG HACER ZOOM
			tr.click(function (){
				//$("#zoomfoto").html("<img src='"+vendedor.fotos+"' />");
				$("#zoomfoto").attr("src",vendedor.fotos);
			    $('#popup').fadeIn('slow');
			});

	     	// contar markador para despues limpiarlo
	     	markers.push(puntero);



		}// ----- END DIBUJAR VENDEDOR