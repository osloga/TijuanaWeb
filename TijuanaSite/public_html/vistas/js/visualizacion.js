

$(function () {

    $("#seleccion_capa_vista").on('click', function () {
        $(this).getCapas("http://192.168.100.44:6080/arcgis/rest/services/Baja_C/mapa_bc_test1/MapServer");
       
        //$("#nav_layers").slideDown(500);

    });

    //$("#cerrar_layers_vistas").click(function (elem) {
    //    elem = $(this);
    //    $("#nav_layers").slideUp(500);
    //});
   
})//jQuery
