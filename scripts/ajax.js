
function traemePagina(pagina) {
  var peticion = new XMLHttpRequest();

   peticion.onreadystatechange = function() {

    if (peticion.readyState == 4) {

          switch(peticion.status)
          {
            case 200:
              var responseText = this.responseText;

              var contenido = document.getElementById('contenido');

              contenido.innerHTML = responseText;
          
              break;
            case 404:
              traemeNotFound();
              break;
          }

        }


    }
  

  peticion.open('GET', 'recursos/'+pagina + '.html', true);

  peticion.send();
}



function traemeNotFound() 
{
  

  //  Creo la peticion HTTP
  var peticion = new XMLHttpRequest();

  //  Espero que cambie el estado de la peticion
  peticion.onreadystatechange = function() {

    //  Si la peticion esta completa
    if (peticion.readyState == 4) {
      if (peticion.status == 200)
      {
        document.querySelector('main').innerHTML = peticion.responseText;
      }

    }

  }

  //  Le informe que metodo utilizar y que URL tiene el recurso
  peticion.open('GET','recursos/notfound.html', true);

  //  Envio la peticion
  peticion.send();
}


/* Carga la nueva sección al cambiar de una sección a otra. */
addEventListener('hashchange', function(event) {

  var pagina = event.newURL.split('#').pop();
  var hashAnterior=event.oldURL.split('#').pop();

  if (pagina=='') {
    pagina="inicio"

  }

  var linkAActivar = document.querySelector('[href="#'+pagina+'"]');
  linkAActivar.setAttribute('class','active');

   
  var linkADesactivar = document.querySelector('[href="#'+hashAnterior+'"]');
  if (linkADesactivar){
    linkADesactivar.setAttribute('class','');
  }

    

  traemePagina(pagina);
});


addEventListener('load', function() {

  var pagina = window.location.hash.substr(1) || 'inicio';

  traemePagina(pagina);
});
