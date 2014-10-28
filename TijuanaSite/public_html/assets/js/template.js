/// <reference path="jQuery/jquery-2.1.1.min.js" />

$(document).ready(function () {

    function seccionAjax(seccion, params) {
        $.ajax({
            url: seccion,
            data: {},
            type: "GET",
            beforeSend: function () {
                $("#contenido").html('<div style="padding-left:5px; text-align:center;"><h3>Loading...</h3></div>');
            },
            success: function(data){
                $("#contenido").html('');
                $(".abrir").show();
                $("#contenido").html(data);
            },

           
            error: function (xhr) {
                console.log(xhr);
                alert(xhr.status);
            
            }
        });
    }

    //ACTIVANDO EL MENU....
    function activaMenu() {

        $(".subItem").on('click', function (elem) {
            elem = $(this);
            seccionAjax(elem.attr('data-seccion'), {});
        });//click

    }//funcion

    //ACTIVANDO EL PANEL

        function VerPanel() {
            $('.abrir').click(function () {
                $('#contenido').each(function () {
                    displaying = $(this).css("display");

                    if (displaying == 'block') {
                        $(this).toggle('slow', function () {
                            $(this).css("display:block;");

                        });
                        $('.abrir').html('');
                        $('.abrir').html('<img class="abrir" src="assets/img/abrir.png" width="40" height="40" />');

                    } else {

                        $(this).toggle('slow', function () {
                            $(this).css("display:none;");

                        });
                        $('.abrir').html('');
                        $('.abrir').html('<img class="abrir" src="assets/img/cerrar.png" width="40" height="40" />');
                    }
                });
            });
         }
         $("#HomeButton").click(function(){
             
             $(this).tareaEsri('acercar', 'main_content', {});
         });

    activaMenu();
    VerPanel();

});
   /*$("#global_content").append('<input class="llamada" name="boton" type="button" value="clickeame" style="width:100px; height:50px; position:absolute;" />');
    $(".llamada").click(function () {  
    $.ajax({
        url: "http://localhost:6080/arcgis/rest/services/Ejemplo/Ejemplo/MapServer/0",
        data:{'f':'json'},
        type: "GET",
        dataType: 'json',
        success: function(data){
            console.log(data);
        },
        error: function(err){
            alert(err.status);
        }
     });
   });*/