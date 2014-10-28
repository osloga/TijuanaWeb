/// <reference path="jQuery/jquery-2.1.1.min.js" />

  $(document).ready(function () {
//ESTE WEY METODO VALIDA LA CAJA DE TEXTO
       
    function Submit() {
        $("#iniciar").click(function () {
         
               console.log($("#text_nombre").val());
          
        });
    }

    Submit();

});

