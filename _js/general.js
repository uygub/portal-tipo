// JavaScript Document

/* GENERAL
   ============================================================== */
$(document).ready(function() {
	$('html').removeClass('jsOff'); // Si el javascript est� activado le saco la clase jsOff	   
	$('.menuItem, .subItem').click(selectorMenu); // Selector de secci�n activa del men� principal
	$('.itemListaMenuCtx').click(menuCtx); // Mostrar/Ocultar subItems de men�Ctx
	
	// Men� principal desplegable con HOVER (Con transici�n y soporte IE con animaci�n Jquery)
	$('.itemMenuPrincipal').hoverIntent(dropDownMenuPrincipal, dropUpMenuPrincipal);
	
	// Men� principal. Cierra subitems con click
	$('.itemMenuPrincipal').click(mostrarOcultarSubMenuPrincipal);
	
	// Acorde�n men� contextual desplegable (Con transici�n y soporte IE con animaci�n Jquery)
	$('.content-title').click(mostrarOcultarAcc);
	
	// Mostrar y ocultar buscador o men� en m�viles
	$('.navMenuPrincipal li:has(ul)').doubleTapToGo(); // Fix Windows Phone
	$('#btn_menu').click(mostrarOcultarMenu); // Mostrar/Ocultar Men� principal
	$('#btn_buscador').click(mostrarOcultarBuscador); // Mostrar/Ocultar Buscador
	$(".navMenuPrincipal, .contListaCtx").navMenuAccesible(); // Accesibilidad men�
	
	// Tab navigation Opera
	var opera = (navigator.userAgent.match(/Opera|OPR\//) ? true : false);
	if(opera) {
		$('a[href]').attr('tabindex', 0);
	}
});

/* --------------- Mostrar/Ocultar Men� principal --------------- */
function mostrarOcultarMenu() {
	var buscador = $('#btn_buscador');
	var menu = $('#btn_menu');
	
	if ( buscador.hasClass('active') ) { // Si el buscador est� abierto
		$('#seccionBuscador').slideToggle('fast'); // Lo cierro
		buscador.removeClass('active'); // Actualizo estado del buscador (Cerrado)
	}
	
	if ( menu.hasClass('active') ) { // Si el men� est� abierto
		$('.navMenuPrincipal > ul').slideToggle(); // Oculto navegaci�n
		menu.removeClass('active'); // Actualizo estado del men� (Cerrado)
	}
	else {
		$('.navMenuPrincipal > ul').slideToggle(); // Muestro navegaci�n
		menu.addClass('active'); // Actualizo estado del men� (Abierto)
	}
}

/* --------------- Mostrar/Ocultar Buscador --------------- */
function mostrarOcultarBuscador() {
	var buscador = $('#btn_buscador');
	var menu = $('#btn_menu');
	
	if ( menu.hasClass('active') ) { // Si el men� est� abierto
		$('.navMenuPrincipal > ul').slideToggle(); // Oculto navegaci�n
		menu.removeClass('active'); // Actualizo estado del men� (Cerrado)
	}
	
	if ( buscador.hasClass('active') ) { // Si el men� est� abierto
		$('#seccionBuscador').slideToggle(); // Oculto buscador
		buscador.removeClass('active'); // Actualizo estado del men� (Cerrado)
	} 
	else {
		$('#seccionBuscador').slideToggle(); // Muestro buscador
		buscador.addClass('active'); // Actualizo estado del men� (Abierto)
	}
}		

/* --------------- Selector de secci�n activa del men� principal --------------- */
function selectorMenu() {
	$('.navMenuPrincipal ul li').removeClass('active');
	$('.navMenuPrincipal ul li ul li').removeClass('active');
	
	if( $(this).hasClass('menuItem') )
		$(this).addClass("active");
	
	if( $(this).hasClass('subItem') ) {
		$(this).parent().parent().addClass("active");
		$(this).addClass("active");
	}
}

/* --------------- Mostrar/Ocultar subItems de men�Ctx --------------- */
function menuCtx() {
	var itemPulsado = $(this).parent();
	var itemArrow = $(this).prev();
	
	if ( itemPulsado.find('ul').hasClass("menuListaActiva") ) { // Si el item pulsado ya est� abierto
		itemArrow.removeClass('icn-arrow-up');
		itemPulsado.find('ul').removeClass("menuListaActiva");
		
		if(!Modernizr.csstransitions) { // Si el navegador NO soporta las transiciones de CSS3
			// Oculto los subItems del item pulsado que ya estaba abierto
			itemPulsado.find('ul').slideToggle();
		}
		else // Si el navegador SI soporta las transiciones de CSS3
			itemPulsado.find('ul').css('max-height', '0'); // // Oculto los subItems del item pulsado que ya estaba abierto
	}
	else if ( !itemPulsado.find('ul').hasClass("menuListaActiva") ) { // Si el item pulsado est� cerrado
		itemArrow.addClass('icn-arrow-up');
		itemPulsado.find('ul').addClass("menuListaActiva");
		
		if(!Modernizr.csstransitions) { // Si el navegador NO soporta las transiciones de CSS3
			// Muestro los subItems del item pulsado
			itemPulsado.find('ul').slideToggle();
		}
		else // Si el navegador SI soporta las transiciones de CSS3
			itemPulsado.find('ul').css('max-height', itemPulsado.find('ul').prop('scrollHeight')); // Muestro subItems
	}
	
	return false;
}

/* --------------- Men� principal desplegable hacia abajo (mostrar) con HOVER (Con transici�n y soporte IE con animaci�n Jquery) --------------- */
function dropDownMenuPrincipal() {
	if(!Modernizr.csstransitions) { // Si el navegador NO soporta las transiciones de CSS3 (IE) uso animaci�n jquery Slide
		var subMenu = $(this).find('ul');
		subMenu.slideDown();
	}
	else { // Si el navegador soporta transiciones, cambio el alto del li para que se produzca la transicion y se muestren los elementos
		if ( !$(this).hasClass('itemMenuActive') ) {
			$(this).find('ul').css('max-height', $(this).find('ul').prop('scrollHeight'));
			$(this).addClass('itemMenuActive');
		}
	}
	
	return false;
}

/* --------------- Men� principal desplegable hacia arriba (ocultar) con HOVER (Con transici�n y soporte IE con animaci�n Jquery) --------------- */
function dropUpMenuPrincipal() {
	if(!Modernizr.csstransitions) { // Si el navegador NO soporta las transiciones de CSS3 (IE) uso animaci�n jquery Slide
		var subMenu = $(this).find('ul');
		subMenu.slideUp();
	}
	else { // Si el navegador soporta transiciones, cambio el alto del li para que se produzca la transicion y se oculten los elementos
		if ( $(this).hasClass('itemMenuActive') ) {
			$(this).find('ul').css('max-height', '0');
			$(this).removeClass('itemMenuActive');
		}
	}
	
	return false;
}

/* --------------- Men� principal. Cierra subitems con click --------------- */
function mostrarOcultarSubMenuPrincipal() {
	if ( !$(this).hasClass('itemMenuActive') ) {
		if(!Modernizr.csstransitions) // Si el navegador NO soporta las transiciones de CSS3 (IE) uso animaci�n jquery Slide
			$(this).find('ul').slideUp();
		else {
			$(this).find('ul').css('max-height', $(this).find('ul').prop('scrollHeight'));
		}
		
		$(this).addClass('itemMenuActive');
	}
	else { 
		if(!Modernizr.csstransitions) // Si el navegador NO soporta las transiciones de CSS3 (IE) uso animaci�n jquery Slide
			$(this).find('ul').slideUp();
		else {
			$(this).find('ul').css('max-height', '0');
		}
		
		$(this).removeClass('itemMenuActive');
	}
	
}

/* --------------- Acorde�n men� contextual desplegable (Animaci�n Jquery) --------------- */
function mostrarOcultarAcc() {
	if ($(".ctx .content-title").css("position") == "relative" ) {
		if ( !$(this).hasClass('accActive') ) {
			$(this).addClass('accActive');
			// Actualizo icono con signo de -
			$(this).find('span').addClass('icn-acc-active');
			
			// Muestro contenido
			$(this).next().slideDown();
		}	
		else { 
			$(this).removeClass('accActive');
			// Actualizo icono con signo de +
			$(this).find('span').removeClass('icn-acc-active');
			
			// Oculto contenido
			$(this).next().slideUp();
		}
	}
	
	return false;
}

$.fn.navMenuAccesible = function ()
{
    var el = $(this);

    /* Setup dropdown menus for IE 6 */

    $("li", el).mouseover(function() {
		if ( $(this).is(":focus") )
        	$(this).addClass("hover");
    }).mouseout(function() {
		if ( $(this).is(":focus") )
        	$(this).removeClass("hover");
    }); 

    /* Make dropdown menus keyboard accessible */

    $("a", el).focus(function() {
        $(this).parents("li").addClass("hover");
    }).blur(function() {
        $(this).parents("li").removeClass("hover");
    });
}


// Solucionar problema de foco al saltar al contenido
// https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
window.addEventListener("hashchange", function (event) {
  var element = document.getElementById(location.hash.substring(1));

  if (element) {
    if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
      element.tabIndex = -1;
    }

    element.focus();
  }
}, false);