/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var map, tb;
require(["esri/toolbars/draw", "esri/symbols/SimpleMarkerSymbol", "esri/graphic", "esri/Color",
         "dojo/dom", "dojo/on", "dojo/domReady!"],
     function(Draw, SimpleMarkerSymbol, Graphic, Color, dom, on){
         map.on("load",herramienta);       
         var cuadrado = new SimpleMarkerSymbol();
         cuadrado.setColor(new Color("#00FFFF"));
         
         function herramienta(){
             tb = new Draw(map);
             tb.on("draw-end", addGraphic);
             on(dom.byId("HomeButton").on("click",function(evt){
                 var tool = evt.target.id.toLowareCase();
                 map.disableMapNavigation();
                 tb.active(tool);
             }));
             
         }
         function addGraphic(){
             tb.desactive();
             map.enableMapNavigation();
             alert('echo');
             
         }
     });

