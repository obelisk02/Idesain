

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

  firestore.collection("Socio").onSnapshot((querySnapshot) => {
    tabladriver.innerHTML = '';

    cont = 1;
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tabladriver.innerHTML += ` <tr>
        <th scope="row" class="text-center">${cont}</th>
        <td class="text-center">${doc.id}</td>
        <td class="text-center">${doc.data().pago_por_conductor}</td>
        <td class="text-center">${doc.data().generado}</td>
        <td class="text-center">${doc.data().deducciones}</td>
        <td class="text-center">${doc.data().pagado}</td>
        <td class="text-center">${doc.data().saldo}</td>
    
        <td class="text-center"> <div class="btn-group">
        <button class="btn btn-sm btn-warning w-50" type="button" 
        onclick="abrirModalEdit('${doc.id}','${doc.data().nombre}','${doc.data().auto}','${doc.data().telefono}','${doc.data().turno}','${doc.data().activo}')">
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





  
function eliminarD(id){

  let confirmar1 = confirm("Desea eliminar");
if (confirmar1) {
  firestore.collection("Socio").doc(id).delete().then(() => {
    console.log("Document successfully deleted!"); 
    
  }).catch((error) => {
    console.error("Error removing document: ", error);
  }); 
 
 
}
}





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
  })




