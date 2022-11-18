// MODELO DE DATOS

let mis_peliculas_iniciales = [
    {titulo: "Superlópez",   director: "Javier Ruiz Caldera", "miniatura": "files/superlopez.png"},
    {titulo: "Jurassic Park", director: "Steven Spielberg", "miniatura": "files/jurassicpark.png"},
    {titulo: "Interstellar",  director: "Christopher Nolan", "miniatura": "files/interstellar.png"}
 ];

 let mis_peliculas = [];

 const postAPI = async (peliculas) => {
     try {
         const res = await fetch("https://jsonstorage.net/v1/json?apiKey=195755a7-0a9e-4b21-ba11-6fee7128505d", {
           method: 'POST', 
           headers:{
               "Content-Type": "application/json",
           },
           body: JSON.stringify(peliculas)
         });
         const {uri} = await res.json();
         return uri;               
     } catch (err) {
         alert("No se ha podido crear el endpoint.")
     }
 }
 const getAPI = async () => {
     // Completar: Llamar a la API para leer la información guardada en myjson a través de la API
     try {
         const res = await fetch("https://api.jsonstorage.net/v1/json/650cd385-824a-4ff2-acd8-66c9d52f56ad/66d126e1-c4d5-49b8-9b19-f8fd10584074");
         const data = await res.json();
         return data;
     } catch (err) {
         alert("No se ha podido leer el endpoint.")
     }

   
 }
 const updateAPI = async (peliculas) => {
     // Completar: Actualizar la información a través de la API
     try {
         const res = await fetch("https://api.jsonstorage.net/v1/json/650cd385-824a-4ff2-acd8-66c9d52f56ad/66d126e1-c4d5-49b8-9b19-f8fd10584074?apiKey=195755a7-0a9e-4b21-ba11-6fee7128505d", {
           method: 'PUT', 
           headers:{
               "Content-Type": "application/json",
           },
           body: JSON.stringify(peliculas)
         });
         const {uri} = await res.json();
         return uri;               
     } catch (err) {
         alert("No se ha podido actualizar el endpoint.")
     }
 }


 // VISTAS

 const indexView = (peliculas) => {
     let i=0;
     let view = "";

     while(i < peliculas.length) {
       view += `
         <div class="movie">
            <div class="movie-img">
                 <img class="show" data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='files/placeholder.png'"/>
            </div>
            <div class="title">
                ${peliculas[i].titulo || "<em>Sin título</em>"}
            </div>
            <div class="actions">
                <button class="edit" data-my-id="${i}">editar</button>
             </div>
         </div>\n`;
       i = i + 1;
     };

     view += `<div class="actions">
                 <!--Insertar aquí botones de "Añadir" y "Reset"-->
             </div>`;

     return view;
 }

 const editView = (i, pelicula) => {
     return `<h2>Editar Película </h2>
         <div class="field">
         Título <br>
         <input  type="text" id="titulo" placeholder="Título" 
                 value="${pelicula.titulo}">
         </div>
         <div class="field">
         Director <br>
         <input  type="text" id="director" placeholder="Director" 
                 value="${pelicula.director}">
         </div>
         <div class="field">
         Miniatura <br>
         <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                 value="${pelicula.miniatura}">
         </div>
         <div class="actions">
             <button class="update" data-my-id="${i}">
                 Actualizar
             </button>
             <button class="index">
                 Volver
             </button>
        `;
 }

 const showView = (pelicula) => {
     // Completar: genera HTML con información de la película
     return `<h2>Información de la película</h2>
         <div class="field">
         Título <br>
         <input  type="text" id="titulo" placeholder="Título" 
                 value="${pelicula.titulo}" disabled>
         </div>
         <div class="field">
         Director <br>
         <input  type="text" id="director" placeholder="Director" 
                 value="${pelicula.director}" disabled>
         </div>
         <div class="field">
         Miniatura <br>
         <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                 value="${pelicula.miniatura}" disabled>
         </div>
         <div class="actions">
             <button class="index">
                 Volver
             </button>
        `;
    }

 const newView = () => {
     // Completar: genera formulario para crear nuevo quiz
     return `<h2>Nueva Película</h2>
         <div class="field">
         Título <br>
         <input  type="text" id="titulo" placeholder="Título" 
                 value="">
         </div>
         <div class="field">
         Director <br>
         <input  type="text" id="director" placeholder="Director" 
                 value="">
         </div>
         <div class="field">
         Miniatura <br>
         <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                 value="">
         </div>
         <div class="actions">
             <button class="create">
                 Crear
             </button>
             <button class="index">
                 Volver
             </button>
        `;
 }

 // CONTROLADORES 

 const initContr = async () => {
     if (!localStorage.URL || localStorage.URL === "undefined") {
         localStorage.URL = await postAPI(mis_peliculas_iniciales);
     }
     indexContr();
 }

 const indexContr = async () => {
     mis_peliculas = await getAPI() || [];
     document.getElementById('main').innerHTML = await indexView(mis_peliculas);
 }

 const showContr = (i) => {
     // Completar: controlador que muestra la vista showView()
     document.getElementById('main').innerHTML = showView(mis_peliculas[i]);
 }

 const newContr = () => {
     // Completar: controlador que muestra la vista newView()
     document.getElementById('main').innerHTML = newView();
 }

 const createContr = async () => {
     // Completar: controlador que crea una película nueva en el modelo guardado en myjson
     let titulo = document.getElementById('titulo').value;
 }

 const editContr = (i) => {
     document.getElementById('main').innerHTML = editView(i,  mis_peliculas[i]);
 }

 const updateContr = async (i) => {
     mis_peliculas[i].titulo   = document.getElementById('titulo').value;
     mis_peliculas[i].director = document.getElementById('director').value;
     mis_peliculas[i].miniatura = document.getElementById('miniatura').value;
     await updateAPI(mis_peliculas);
     indexContr();
 }

 const deleteContr = async (i) => {
     // Completar:  controlador que actualiza el modelo borrando la película seleccionada
     // Genera diálogo de confirmación: botón Aceptar devuelve true, Cancel false
     if (confirm("¿Estás seguro de que quieres borrar la película?")) {
         mis_peliculas.splice(i, 1);
         await updateAPI(mis_peliculas);
         indexContr();
     }
     
 }

 const resetContr = async () => {
     // Completar:  controlador que reinicia el modelo guardado en myjson con las películas originales
     if (confirm("¿Estás seguro de que quieres reiniciar la lista de películas?")) {
         localStorage.URL = await postAPI(mis_peliculas_iniciales);
         indexContr();
     }
 }

 // ROUTER de eventos
 const matchEvent = (ev, sel) => ev.target.matches(sel)
 const myId = (ev) => Number(ev.target.dataset.myId)

 document.addEventListener('click', ev => {
     if      (matchEvent(ev, '.index'))  indexContr  ();
     else if (matchEvent(ev, '.edit'))   editContr   (myId(ev));
     else if (matchEvent(ev, '.update')) updateContr (myId(ev));
     else if (matchEvent(ev, '.delete')) deleteContr (myId(ev));
     else if (matchEvent(ev, '.reset'))  resetContr  ();
     else if (matchEvent(ev, '.show'))   showContr   (myId(ev));
     else if (matchEvent(ev, '.new'))    newContr    ();
     else if (matchEvent(ev, '.create')) createContr ();
 })
 
 
 // Inicialización        
 document.addEventListener('DOMContentLoaded', initContr);