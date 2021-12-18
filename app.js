$(document).ready(function () {

  
    });


    
       
    const firebaseConfig  = {
            apiKey: "AIzaSyCWVd8mU-V5rLgbVygpvlN9EMBBJQe5nE8",
            authDomain: "idesain-uber.firebaseapp.com",
            projectId: "idesain-uber",
            storageBucket: "idesain-uber.appspot.com",
            messagingSenderId: "1069226085704",
            appId: "1:1069226085704:web:9d73d993b334002722777d"
    };    
 






    // TABLa Main 
    firebase.initializeApp(firebaseConfig);
    const firestore = firebase.firestore()
  const tabladriver= document.getElementById('tabla-main');




  // Scar el dia jueves
  const d = new Date();

 let month = d.getMonth() + 1;	// Month	[mm]	(1 - 12)
 let day = d.getDate();		// Day		[dd]	(1 - 31)
 let year = d.getFullYear();
let semanadeldia = d.getDay(); 

  let fechacompleta = day +" "+month + " "+year;

  let diahtml= document.getElementById("fecha-hoy");
  diahtml.textContent=semanadeldia

  
  console.log(day +"El 4 es jueves");
  if (semanadeldia == 4){

    var docRef = firestore.collection("CheckerDay").doc(fechacompleta);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            console.log("No existe documento: Crear uno nuevo");
            let ruta1= firestore.collection("CheckerDay").doc(fechacompleta);
            ruta1.set({
                fecha: fechacompleta,
                dia: semanadeldia,
                checked: true
          })
          .then(() => {
              
            // CHECAR LOS PAGOS FALTANTES PARA ESTE JUEVES

           firestore.collection("Pagos").where("status", "==", "pendiente").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           
            console.log(doc.id, " => ", doc.data());

            
            //****************************************************************** */
            // CREAR LA NOTIFICACION DE NO PAGADO
             
    // Subir como notificacion
    var f = new Date();
    let hoy = f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();
 
     firestore.collection("Notificaciones").doc(doc.id+" No pago").set({
       nombre: doc.data().id,
       semana: doc.data().fecha,
       debe: doc.data().debe,
       fecha_creacion: hoy,
       mensaje: "Alerta: No se ha registrado pago del conductor."
   })
   .then(() => {
       console.log("Document successfully written!");
   })
   .catch((error) => {
       console.error("Error writing document: ", error);
   });
   //************************************************************************** */
   
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


          })
        }
    }).catch((error) => {  console.log("Error getting document");
       
    });




}


  //************************************** */
  firestore.collection("Auto").onSnapshot((querySnapshot) => {
    tabladriver.innerHTML = '';

    cont = 1;
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tabladriver.innerHTML += ` <tr>
      
        <td id="ID${cont}">${doc.id}</td>
        <td >${doc.data().marca} ${doc.data().modelo}</td>
        <td class="text-center">${doc.data().anio}</td>
        <td class="text-center">${doc.data().placa}</td>
        <td class="text-center">${doc.data().inversion}</td>
        <td class="text-left"><a href="#" id="matutino${cont}" onclick='showtime(this.id)'>${doc.data().matutino}</a></td>
        <td class="text-left"><a href="#" id="vespertino${cont}" onclick='showtime(this.id)'>${doc.data().vespertino}</a></td>
        <td class="text-left"><a href="service-car.html" id="servicio${cont}" onclick=''>${doc.data().servicios}</a></td>
        <td class="text-center"><textarea onblur="reparar(this.id)" id="reparaciones${cont}" name="reparaciones${cont}"
        style=" background: transparent; border: none; width: 100%; height: 100%; font-size:small;" > ${doc.data().reparar} </textarea></td> 
        <td class="text-center"><textarea onblur='observa(this.id)' id="observaciones${cont}" name="observaciones${cont}"
        style=" background: transparent; border: none; width: 100%; height: 100%; font-size:small;" > ${doc.data().observaciones} </textarea></td> 
        
       
      </tr>`

      cont++;
    }); 
}); //href="pago-conductor.html



// HREF AL SHOW CONDUCTOR
function showtime(user_id){
    let data_id = document.getElementById(user_id).textContent;
    console.log(data_id);
    sessionStorage.setItem('user_pago', data_id);
    window.location.href = "pago-conductor.html";
}



function reparar( user_id){
 
  let data = document.getElementById(user_id).value; 
  let id_carro =  user_id.charAt(user_id.length-1); console.log(id_carro);
  id_carro = document.getElementById("ID"+id_carro).textContent;
  

var washingtonRef = firestore.collection("Auto").doc(id_carro);
return washingtonRef.update({
    reparar: data
})
.then(() => {
    console.log("Document successfully updated!");
   
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

      
}

function observa(user_id){

  let data = document.getElementById(user_id).value; 
  let id_carro =  user_id.charAt(user_id.length-1); console.log(id_carro);
  id_carro = document.getElementById("ID"+id_carro).textContent;
  
  
var washingtonRef = firestore.collection("Auto").doc(id_carro);
return washingtonRef.update({
    observaciones: data
})
.then(() => {
    console.log("Document successfully updated!");
   
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

}