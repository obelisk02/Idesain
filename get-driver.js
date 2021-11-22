
const firebaseConfig = {
    apiKey: "AIzaSyCWVd8mU-V5rLgbVygpvlN9EMBBJQe5nE8",
    authDomain: "idesain-uber.firebaseapp.com",
    projectId: "idesain-uber",
    storageBucket: "idesain-uber.appspot.com",
    messagingSenderId: "1069226085704",
    appId: "1:1069226085704:web:9d73d993b334002722777d"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  //const  db =firestore.collection("Conductor")
 
  let updateID="";
  const tabladriver= document.getElementById('tabla-driver');

  db.collection("Conductor").onSnapshot((querySnapshot) => {
    tabladriver.innerHTML = '';

    cont = 1;
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tabladriver.innerHTML += ` <tr>
        <th scope="row" class="text-center">${cont}</th>
        <td >${doc.data().nombre}</td>
        <td >${doc.data().auto}</td>
        <td class="text-center">${doc.data().renta_auto}</td>
        <td class="text-center">${doc.data().turno}</td>
        <td class="text-center">
        <button class="btn btn-sm btn-success w-50" type="button" onclick=" window.open('//api.whatsapp.com/send?phone=52${doc.data().telefono}','_blank')">
        <i class="fab fa-whatsapp"></i></button></td>
          
        <td class="text-center"> <div class="btn-group">
        <button class="btn btn-sm btn-warning w-50" type="button" 
        onclick="abrirModalEdit('${doc.id}','${doc.data().nombre}','${doc.data().auto}','${doc.data().renta_auto}','${doc.data().telefono}','${doc.data().turno}','${doc.data().activo}')">
          <i class="fa fa-pencil" aria-hidden="true"><i class="far fa-edit"></i></i>
        </button>
        <button class="btn btn-sm w-50 btn-danger" type="button"  
        onclick="eliminarD('${doc.id}')" >
          <i class="fa fa-trash-o" aria-hidden="true"><i class="fas fa-trash-alt"></i>
        </button>
      </div> </td>
      </tr>`

      cont++;
    });
});

const myModal1 = new bootstrap.Modal(document.getElementById('editarModal'));


let idD;
function abrirModalDelete(id) {  
  const myModal2 = new bootstrap.Modal(document.getElementById('exampleModal2'));
  myModal2.show()
  idD= id;
}

let idE,nameE,autoE,telefonoE,turnoE,activoE,rentaE;
function abrirModalEdit(id,name,auto,renta,telefono,turno,activo) {  
  myModal1.show()
  idE= id;
  nameE= name;
  autoE= auto;
  rentaE = renta;
  telefonoE= telefono;
  turnoE= turno;
  activoE= activo;

  document.getElementById('name-driver').value= nameE;
  document.getElementById('auto-driver').value= autoE;
  document.getElementById('phone-number').value= telefonoE;
  document.getElementById('hora-driver').value= turnoE;
  document.getElementById('activo-driver').value= activoE;
  document.getElementById('renta-edit').value= rentaE;
}


/* function cerrarModal(id) {
  let myModal2 = new bootstrap.Modal(document.getElementById('exampleModal'))
  myModal2.hide()
} */


function eliminarD(id){

  let confirmar1 = confirm("Desea eliminar");
if (confirmar1) {
  db.collection("Conductor").doc(id).delete().then(() => {
    console.log("Document successfully deleted!"); 
    
  }).catch((error) => {
    console.error("Error removing document: ", error);
  }); 
 
  //myModal2.hide()
 
}
}


// EDIT 

function update(idE){
  updateID = db.collection("Conductor").doc(idE);
  const editdriver= document.getElementById('driver-form');
  let nombre = editdriver['name-driver'].value;
      let auto = editdriver['auto-driver'].value; 
      let phone = editdriver['phone-number'].value;
      let turno = editdriver['hora-driver'].value;
      let activo = editdriver['activo-driver'].value;
      let renta = editdriver['renta-edit'].value;
      if (activo == "true"){
        activo=true
      } else { activo=false}
      

  return updateID.update({
    auto: auto,
    nombre: nombre,
    telefono: phone,
    turno: turno,
    activo: activo,
    renta_auto: renta
})
.then(() => {
    console.log("Document successfully updated!"); myModal1.hide()
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
}


//  onclick="eliminarD('${doc.id}')"

//<a class="" href="//api.whatsapp.com/send?phone=52${doc.data().telefono}"><i class="fab fa-whatsapp"></i>WA</a></td>

/*   
  db.collection("Conductor").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  }); 

  data-bs-toggle="modal" data-bs-target="#exampleModal" 
  */

