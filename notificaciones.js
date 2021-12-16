

const firebaseConfig = {
    apiKey: "AIzaSyCWVd8mU-V5rLgbVygpvlN9EMBBJQe5nE8",
    authDomain: "idesain-uber.firebaseapp.com",
    projectId: "idesain-uber",
    storageBucket: "idesain-uber.appspot.com",
    messagingSenderId: "1069226085704",
    appId: "1:1069226085704:web:9d73d993b334002722777d"
  };

  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();



  let contador2=1;
  const div_generador2= document.getElementById('infoService1');
   //Muestra los servicios
firestore.collection("Notificaciones").onSnapshot((querySnapshot) => {     $(div_generador2).empty();
       querySnapshot.forEach((doc) => { 
        console.log(doc.id, " => ", doc.data());
     
         //****************************************************************************** */
     
           //const div_generador= document.getElementById('infoDriver'+contador);  '<a href="#" id="'+doc.data().nombre+'" onClick="showtime(this.id)")>'+
        
         
           $(div_generador2).append('    <div class="card tarjeta"><div class="card-body " >' +
           '<div class="container"> <div class="row"> '+
           ' <div class="col-10 text-dark"> <a href="#"  id="'+doc.data().nombre+'" onClick="showtime(this.id)")> '+
           '<label id="name'+contador2+'"class="col-form-label fw-bold" style="display: inline-block;">'+doc.data().nombre+ '</label> <span class="badge bg-warning text-dark  justify-content-end" style="margin-left: auto;"id="fecha'+contador2+'"> Creado: '+ doc.data().fecha_creacion+'</span>'  +  

          '<div class="row padd-div"> <div class="col-8 col-sm-6">El conductor ha subido una imagen </div> Semana: '+doc.data().semana+' <div class="col-4 col-sm-6">  </div>  </div>  </div></a> '+

          '<div class="col-2">  <button class="btn btn-sm btn-danger w-50" type="button" onclick="eliminarD(\''+doc.id+'\' )">'+
          '<i class="fa fa-pencil" aria-hidden="true"><i class="fas fa-trash-alt"></i></i>  </button> '+
       
          '</div> </div> </div>  </div> </div>  <hr>' );     

         
          contador2++;

         });
    
   });



   function showtime(user_id){
    let data_id = document.getElementById(user_id).textContent;
    console.log(user_id);
    sessionStorage.setItem('user_pago', user_id);
    window.location.href = "pago-conductor.html";
}


//DELETE
function eliminarD(id){

    let confirmar1 = confirm("Desea eliminar");
  if (confirmar1) {
    firestore.collection("Notificaciones").doc(id).delete().then(() => {
      console.log("Document successfully deleted!"); 
      
    }).catch((error) => {
      console.error("Error removing document: ", error);
    }); 
  }
  }