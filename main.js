let propiedad = [];
console.log(propiedad);
const botonBuscar = document.querySelector("#botonBuscar");

document.addEventListener('DOMContentLoaded', () => {
  consultarJson();
})

function consultarJson(){
  fetch('json.json')
    .then( response => response.json())
    .then( data => propiedad = data.propiedades);

}
botonBuscar.addEventListener('click', validarFiltro);

const clearResultados = () => {
aplicandoDOM.innerHTML="";
};

clearResultados();

const clearForm = () => {
  errorForm.innerHTML="";
  };
  

function validarFiltro(){
  
  /* Obtenemos los valores de los select */
  const tipoOperacion = document.querySelector('#estado').value;
  const tipoPropiedad = document.querySelector('#tipoPropiedad').value;
  const localidad = document.querySelector('#localidad').value;
  
  if (!tipoOperacion && !tipoPropiedad && !localidad) {
    clearResultados();
    $('#aplicandoDOM').prepend('<h2 class="error404"> Complete al menos un campo para optimizar su busqueda.</h2>');    return;
  }
  

  //If por un solo campo completo

if(tipoPropiedad && !tipoOperacion && !localidad){
  const filtrarPorPropiedad = propiedad.filter( propiedad => propiedad.tipoPropiedad === tipoPropiedad);
  clearResultados();
mostrarHtml(filtrarPorPropiedad);  
}

if(!tipoPropiedad && tipoOperacion && !localidad){
  const filtrarTipoOperacion = propiedad.filter( propiedad => propiedad.estado === tipoOperacion);
  clearResultados();
mostrarHtml(filtrarTipoOperacion);  
}

if(!tipoPropiedad && !tipoOperacion && localidad){
  const filtrarPorLocalidad = propiedad.filter( propiedad => propiedad.localidad === localidad);
  clearResultados();
mostrarHtml(filtrarPorLocalidad);  
}

//If por dos campos completos

if(tipoPropiedad && localidad && !tipoOperacion){
  const filtrarPorLocalidadYPropiedad = propiedad.filter( propiedad => (propiedad.localidad === localidad &&  propiedad.tipoPropiedad === tipoPropiedad));
  clearResultados();
mostrarHtml(filtrarPorLocalidadYPropiedad)
}

if(!tipoPropiedad && localidad && tipoOperacion){
  const filtrarPorLocalidadYtipoOperacion = propiedad.filter( propiedad => (propiedad.localidad === localidad &&  propiedad.estado === tipoOperacion ));
  clearResultados();
mostrarHtml(filtrarPorLocalidadYtipoOperacion)
}

if(tipoPropiedad && !localidad && tipoOperacion){
  const filtrarPortipoPropiedadYtipoOperacion = propiedad.filter( propiedad => (propiedad.tipoPropiedad === tipoPropiedad  &&  propiedad.estado === tipoOperacion ));
  clearResultados();
mostrarHtml(filtrarPortipoPropiedadYtipoOperacion)
}

//If por tres campos completos

if(tipoPropiedad && localidad && tipoOperacion){
  const filtrarPortresCampos = propiedad.filter( propiedad => (propiedad.tipoPropiedad === tipoPropiedad &&  propiedad.estado === tipoOperacion && propiedad.localidad === localidad ));
  clearResultados();
mostrarHtml(filtrarPortresCampos)
}
}

function mostrarHtml(propiedadMostrar){
  propiedadMostrar.forEach(propiedad => {

     document.getElementById("aplicandoDOM").innerHTML += `

     <div class="card" style="width: 18rem; margin:0 15px 30px 30px;">
     <img src="${propiedad.imagen}" class="card-img-top" alt="Imagen de la propiedad">
     <div class="card-body">
     <h5 class="card-title">${propiedad.titulo}</h5>
     <h6 class="card-subtitle mb-2 text-muted"> Propiedad: ${propiedad.tipoPropiedad}</h6>
     <h6 class="card-subtitle mb-2 text-muted"> Estado: ${propiedad.estado}</h6>
     <h6 class="card-subtitle mb-2 text-muted"> Localidad: ${propiedad.localidad}</h6>
     <p class="card-text"> Precio: ${propiedad.precio}</p>  
     </div>`;
     }); 
}

//Animaciones Encadenadas
$("#call").prepend(' <h2  class="callToActionTitulo"> ¡Contactanos para más información! </h2>');
$("#call")
        .slideUp(0)
        .delay(500)
        .slideDown(2000);


//"Segunda animación encadenada"   

$("#tituloBucador").prepend('<h2  class="editandotituloBuscar">Buscá la propiedad de tus sueños</h2>');
$("#tituloBucador").fadeOut("slow", function(){
    $("#tituloBucador").fadeIn(1000);
}); 


//Jquery
$('#divBoton').prepend('<button class="btn lost" >Contacto</button>');

$('.btn.lost').hover(onHover, onLeave);

function onHover() {
  $(this).removeClass('colorOscuro');
  $(this).addClass('colorTransparente');
  $(this).text($(this).attr('on-hover'));
}
function onLeave() {
  $(this).removeClass('colorTransparente');
  $(this).addClass('colorOscuro');
  $(this).text($(this).attr('on-leave'));
}

//Local Storage

$(document).ready(function(){    
  $('#boton-guardar').click(function(){        
      /*Captura de datos escrito en los inputs*/        
      var nom = document.getElementById("nombretxt").value;
      var apel = document.getElementById("apellidotxt").value;
      var email = document.getElementById("email").value;

      if (!nom && !apel && !email) {
        clearForm();
        $('#errorForm').prepend('<h6 style=" background-color:red; color:#ffffff; padding:15px 0 15px 0;"> Complete los campos.</h6>');
        return;
      }


      /*Guardando los datos en el LocalStorage*/
      localStorage.setItem("Nombre", nom);
      localStorage.setItem("Apellido", apel);
      localStorage.setItem("Email", email);

      /*Limpiando los campos o inputs*/
      document.getElementById("nombretxt").value = "";
      document.getElementById("apellidotxt").value = "";
      document.getElementById("email").value = "";

  });   
});

/*Funcion Cargar y Mostrar datos*/
$(document).ready(function(){    
  $('#boton-cargar').click(function(){                       
      /*Obtener datos almacenados*/
      var nombre = localStorage.getItem("Nombre");
      var apellido = localStorage.getItem("Apellido");
      var email = localStorage.getItem("Email");


      /*Mostrar datos almacenados*/      
      document.getElementById("nombre").innerHTML = nombre;
      document.getElementById("apellido").innerHTML = apellido;
      document.getElementById("email").innerHTML = email; 
  });   
});
