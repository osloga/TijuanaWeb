/// <reference path="jQuery/jquery-2.1.1.min.js" />
﻿(function ($) {
     //FUNCION PARA AGREGAR MAPAS A LAS CAPAS DESEADAS
    var map, infoWindow, featureLayer, infoTemplate, str, attachmentEditor, esriConf, parser, borderContainer, contentPane, cuadrado;
    $.fn.tareaEsri = function (tarea, contenedor, params, id) {
        require(["dojo/dom",
         "dojo/dom-construct",
         "esri/map",
         "dojo/on",
         "esri/dijit/InfoWindow",
         "esri/layers/FeatureLayer",
         "esri/InfoTemplate",
         "dojo/string",
         "esri/dijit/editing/AttachmentEditor",
         "esri/config",
        "dojo/parser",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "esri/Color",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/symbols/TextSymbol",
        "esri/layers/LabelLayer",
        "esri/geometry/Extent",
        
       /* "esri/symbols/SimpleMarkerSymbol",//Esta herramienta nos agregara un cuadrado a seleccionar en esa region
        "esri/graphic",*/
        
        "esri/Color",
        "esri/toolbars/draw",
        
         "dojo/domReady!"
        ], function (dom, domConstruct, Map, on, InfoWindow, FeatureLayer, InfoTemplate, string, AttachmentEditor,
                     esriConfig, parser, BorderContainer, ContentPane, Color, SimpleLineSymbol, SimpleFillSymbol,
                     SimpleRenderer, TextSymbol, LabelLayer, Extent, Color, Draw) {

                   

            switch (tarea) {
            case 'map':
                    map = new Map(contenedor, params);   
                    map.on("Load", function(){
                        map.graphics.enableMouseEvents();
                        $(this).tareaEsri('acercar',null,null,null);
                        
                    });
                    if ($("#" + contenedor + "").css('height') != '510px') {
                        map.resize();
                    }
                    
                 
                    break;
                
            case 'etiquetar':
                    var labelcampo = contenedor;
                    var predios_label_color = new Color("#FA8258");
                    var predios_color_linea = new Color("#0B243B");
                    var predios_label_line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, predios_color_linea, 2);
                    var predios_label_symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL, predios_label_line, predios_label_color);
                    var predios_label_render = new SimpleRenderer(predios_label_symbol);
                    
                    var predios_label = new TextSymbol().setColor(predios_label_color);
                    predios_label.font.setSize("14pt");
                    predios_label.font.setFamily("arial");
                    
                    var predios_labelRender = new SimpleRenderer(predios_label);
                    var labels = new LabelLayer({id:params});
                    labels.addFeatureLayer(map.getLayer(id), predios_label_render, "{"+labelcampo+"}");
                    map.addLayer(labels);
                break;
                
            case 'featureLayer':
                    featureLayer = new FeatureLayer(contenedor, params);
                    map.addLayer(featureLayer);
                    break;
            case 'removeLayer':
                    if(contenedor == 18){
                        if(map.getLayer('clave_NCN') == "undefined"){
                            map.removeLayer(map.getLayer('clave_NCN'));
                            console.log('capa eliminada');
                        }
                    }
                    break;
                    
            case 'acercar':
                
                    cuadrado = new Draw(map);
                    on(cuadrado, "Draw-end", function(geometry){
                        cuadrado.deactivate();
                        var extent = new Extent(geometry);
                        map.setExtent(extent);
                    });
                   
                    break;
                    
            case 'destroy':
                    if (typeof (map) != "undefined" && map !== null) { 
                        map.destroy();
                    }
                    break;
            }
            return this;
            
            
            /*function llamarDraw(){
                cuadrado = new Draw(map);
                cuadrado.on("draw-end", function(geometry){
                    map.setExtent(geometry);
                });
                
                map.disableMapNavigation();             
                
            }*/
         
            
         
        });//Termina require
 

    }//function 
                
  

    $.fn.getCapas = function(url) {
        $.ajax({
            url: url,
            data: {'f': 'pjson'},
            type: "GET",
            dataType: 'json',
            beforeSend: function () {
                $("#layers_li").append('<li>Cargando Capas... </li>')
            },
            success: function (data) {
                $("#layers_li").html('');
                $.each(data.layers, function (index, obj) {

                    $("#layers_li").append('<li><input type="checkbox" class="capas_check_vistas"  value="' + obj.id + '" />' + obj.name + '</li>');

                    $("#layers_li").css('text-transform', 'capitalize');
                    
                })

                $(".capas_check_vistas").on('click', function (elem) {
                    elem = $(this);

                     
                    //SI ES ACTIVADO EL CHECKBOX DE CAPA
                    if (elem['0']['checked'] == true) {
                        console.log('checado.. activando capa...')
                        console.log(elem.val());
                        $(this).tareaEsri('featureLayer', (url + '/') + elem.val(), {
                            outFields: ["*"],
                            id: elem.val(),

                        });


                    } else if (elem['0']['checked'] == false) {
                        $(this).tareaEsri('removeLayer', elem.val(), {})
                    }

                   if(elem.val(18)){
                       
                       elem.parent().append('<ul>'+
                               '<li><input type="checkbox" class="capas_check_labels" data-campo="CLAVENCN" data-capa="18" data-activa="" value="clave_NCN" /> Clave NCN</li>'+
                               '<li><input type="checkbox" class="capas_check_labels" data-campo="CLAVECATASTRAL" data-capa="18" value="Clave_Predial" />Clave Predial</li>'+
                                +'</ul>'); 
                   }
                   
                   $(".capas_check_labels").click(function(elem){
                       elem = $(this);
                       if(elem['0']['checked']){
                           $(this).tareaEsri('etiquetar', elem.attr('data-campo'), elem.val(), elem.attr('data-capa'));
                       }else if(elem['0']['checked']==false){
                           $(this).tareaEsri('removeLayer', elem.attr('data-campo'), elem.val(), elem.attr('id'));
                           
                       }
                       
                   });
                })
                
                
            },
            error: function (xhr) {
                alert("Status:" + xhr.status)
            }
        })//ajax
        return this;
    }// getCapas fin
    
  
}(jQuery));