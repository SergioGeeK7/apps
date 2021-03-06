$(document).on("ready",function(){

	// validacion de campo numerico
	$("#carnet").keyup(function(){
		
		var message = $(this).next();
		if( isNaN($(this).val()) ) {
			message.html("Información inválida");
  			message.attr('class',"message error");
		}else{
			message.html("Informacion Valida");
			message.attr('class',"message success");
		}

	});

	// envio de formulario
	$("form").submit(function(event){

		event.preventDefault();
		//var datos_formulario = $(this).serialize();
		$.ajax({
                url: 'data/funcionarios.json',
                type: 'POST',
                dataType: 'json',
                success: function(datos){
                    
                    var carnet = $("#carnet").val();
					var consulta = find(datos,carnet);

					if (consulta != null) {
						crearTabla(consulta);
					}else{
						var empy = $("<p> No hay ningun funcionario que coincida </p>");
						$("#mensaje").append(empy);
						empy.fadeOut(2200);

					}


                }
        });



	});

	function find (datos,carnet){


		for (var i in datos){

			if (datos[i].carnet==carnet) {
				return datos[i];
			}

		}

		return;
	}

	function crearTabla (consulta){

		

	    var $table = $('<table>');
		$table.attr({ border :'1px' });
		// thead
		$table.append('<thead>').children('thead').append('<tr />')
		 .children('tr').append(
		 '<th>Nombre</th><th> # de carnet </th> <th> Telefono </th> <th> Foto </th> ');

		//tbody
		 var $tbody = $table.append('<tbody />').children('tbody');
		 var $tr = $tbody.append('<tr />').children('tr:last');


		// CUANDO SE HAGA CLICK EN LA IMG HACER ZOOM
		$tr.click(function (){
				//$("#zoomfoto").html("<img src='"+vendedor.fotos+"' />");
				$("#zoomfoto").attr("src",consulta.foto);
			    $('#popup').fadeIn('slow');
		});


		$tr.append("<td>"+consulta.nombres+" "+consulta.apellidos+"</td>")
		.append("<td>"+consulta.carnet+"</td>")
		.append("<td> "+consulta.telefono+" </td>")
		.append("<td>	<img src='fotos/funcionario.png'/>	</td>");


		// añadir tabla
		//$table.appendTo('#mensaje');
		$("#mensaje").html($table);


	}


	//------------------configurar popup img-------------------------

    $('#close').click(function(){
        $('#popup').fadeOut('slow');
    });
	//------------------configurar popup img------------------------------


});