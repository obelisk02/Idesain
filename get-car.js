

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCWVd8mU-V5rLgbVygpvlN9EMBBJQe5nE8",
    authDomain: "idesain-uber.firebaseapp.com",
    projectId: "idesain-uber",
    storageBucket: "idesain-uber.appspot.com",
    messagingSenderId: "1069226085704",
    appId: "1:1069226085704:web:9d73d993b334002722777d"
  };

  const partnerform= document.getElementById('form-partner');
  
firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore()

  //const  db =firestore.collection("Conductor");

  const tabladriver= document.getElementById('tabla-driver');
  let cont = 1, pamp='status-tabla',pamp2="";
  firestore.collection("Auto").onSnapshot((querySnapshot) => {
    tabladriver.innerHTML = '';

    cont = 1;
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tabladriver.innerHTML += ` <tr>
        <th scope="row" class="text-center">${cont}</th>
        <td >${doc.id}</td>
        <td >${doc.data().marca} ${doc.data().modelo}</td>
        <td class="text-center">${doc.data().anio}</td>
        <td class="text-center">${doc.data().placa}</td>
        <td class="text-center">${doc.data().inversion}</td>
        <td class="text-center">${doc.data().matutino}</td>
        <td class="text-center">${doc.data().vespertino}</td>
        <td class="text-center" > <span  id="status-tabla${cont}">${doc.data().activo}</span></td>  
    
        <td class="text-center"> <div class="btn-group">
        <button class="btn btn-sm btn-warning w-50" type="button" 
        onclick="abrirModalEdit('${doc.id}','${doc.data().marca}','${doc.data().modelo}','${doc.data().anio}','${doc.data().placa}','${doc.data().inversion}','${doc.data().matutino}','${doc.data().vespertino}','${doc.data().activo}')">
          <i class="fa fa-pencil" aria-hidden="true"><i class="far fa-edit"></i></i>
        </button>
        <button class="btn btn-sm w-50 btn-danger" type="button"  
        onclick="eliminarD('${doc.id}')" >
          <i class="fa fa-trash-o" aria-hidden="true"><i class="fas fa-trash-alt"></i>
        </button>
      </div> </td>
      </tr>`

     
      pamp2 = pamp+cont;
      status1 = document.getElementById(pamp2);
     //console.log(status1.textContent);
    
  
    if (status1.textContent == "Activo"){
      status1.className += " badge bg-success";
    }
    if (status1.textContent == "Detenido"){
      status1.className += " badge bg-danger";
    }

    if (status1.textContent == "Reparacion"){
      status1.className += " badge bg-warning";
    }

    cont++;

    });
});










//Submit
  let submitBtn = document.getElementById('btn-partner-submit')

  submitBtn.addEventListener('click',(e)=>{
      e.preventDefault()

      let id = partnerform['nombre-socio'].value;
      let nombre = partnerform['nombre-socio'].value;
      let desc = partnerform['desc-socio'].value;
      let pago = partnerform['pago-socio'].value;
    
      const  db =firestore.collection("Socio");
      db.doc(id).set({
          nombre: nombre,
          descripcion: desc,
          pago_por_conductor: pago,
         generado: 0,
         deducciones: 0,
         pagado: 0,
         saldo: 0
          


      }).then ( ()=>{
          console.log("Data enviada")
      }).catch((error) =>{
          console.log(error)
      })
      alert("Se registro correctamente")

      partnerform.reset()
  });



  //Edit 
  const myModal1 = new bootstrap.Modal(document.getElementById('editarModal'));
let idE,anioE,marcaE,modeloE,placaE,inversionE,matutinoE,vespertinoE,activoE;
function abrirModalEdit(id,marca,modelo,anio,placa,inversion,matutino,vespertino,activo) {  
  myModal1.show()
  idE= id;
  marcaE=marca;
  modeloE=modelo;
  anioE=anio;
  placaE=placa;
  inversionE= inversion;
  matutinoE = matutino;
  vespertinoE= vespertino;
  activoE=activo;

  document.getElementById('id-auto').value= idE;
  document.getElementById('marca-auto').value= marcaE;
  document.getElementById('model-auto').value= modeloE;
  document.getElementById('anio-auto').value= anioE;
  document.getElementById('placas-auto').value= placaE;
  document.getElementById('inversion-auto').value= inversionE;
  document.getElementById('activo-auto').value= activoE;


}

function update(idE){
  const db = firebase.firestore();
  updateID = db.collection("Auto").doc(idE);
  const editdriver= document.getElementById('driver-form');
      let id1 = editdriver['id-auto'].value;
      let marca1 = editdriver['marca-auto'].value; 
      let model1 = editdriver['model-auto'].value;
      let anio1 = editdriver['anio-auto'].value;
      let placas1 = editdriver['placas-auto'].value;
      let inversion1 = editdriver['inversion-auto'].value;
      let activo1 = editdriver['activo-auto'].value;
     /* if (activo1 == "true"){
        activo1=true
      } else { activo1=false} */
      

  return updateID.update({
    id: id1,
    marca: marca1,
    modelo: model1,
    anio: anio1,
    placa: placas1,
    activo: activo1,
    inversion: inversion1
})
.then(() => {
    console.log("Document successfully updated!"); editdriver.reset(); myModal1.hide();
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
}



//DELETE
function eliminarD(id){

  let confirmar1 = confirm("Desea eliminar");
if (confirmar1) {
  firestore.collection("Auto").doc(id).delete().then(() => {
    console.log("Document successfully deleted!"); 
    
  }).catch((error) => {
    console.error("Error removing document: ", error);
  }); 
}
}