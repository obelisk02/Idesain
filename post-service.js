
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


  // GET autos
  
  let cont=1; let texto1=""; sociosarray=[],autosarray=[] ;     
  // 2 arrays

  let x = document.getElementById("auto-driver");
  
firestore.collection("Auto").get().then((querySnapshot) => {
querySnapshot.forEach((doc) => {
// doc.data() is never undefined for query doc snapshots
// console.log(doc.id, " => ", doc.data());

let option = document.createElement("option");
texto1= doc.data().id  +" " + doc.data().marca + " " + doc.data().modelo +" " + doc.data().anio
option.text = texto1
x.add(option,x[cont]);


  autosarray.push(texto1);
  sociosarray.push(doc.data().inversion);


}); 
});

  //GET servicios
  const tabladriver= document.getElementById('tabla-service');

  firestore.collection("Servicios").onSnapshot((querySnapshot) => {
    tabladriver.innerHTML = '';

    cont = 1;
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tabladriver.innerHTML += ` <tr>
        <th scope="row" class="text-center">${cont}</th>
        <td >${doc.data().auto}</td>
        <td >${doc.data().titulo}</td>
        <td >${doc.data().descripcion}</td>
        <td class="text-center">${doc.data().fecha}</td>
        <td class="text-center">${doc.data().total}</td>
        <td class="text-center"> <a data-lightbox="${doc.data().img_url} " data-title="${doc.data().fecha}" href="${doc.data().img_url}"><img id="myImg${cont}" src="${doc.data().img_url}" width="40" height="40"/></a> </th>
          
        <td class="text-center"> <div class="btn-group">
            <button class="btn btn-dark w-50" type="button" style="width:1vh height: 1vh;"
            onclick="subirImg('${doc.id}','${doc.data().auto}')">
              <i class="fas fa-upload" aria-hidden="true"></i>
            </button>
          </div> </td>
       
        <td class="text-center"> <div class="btn-group">
        <button class="btn btn-sm btn-warning w-50" type="button" 
        onclick="abrirModalEdit('${doc.id}','${doc.data().titulo}','${doc.data().descripcion}','${doc.data().total}','${doc.data().pagado}','${doc.data().status}')">
          <i class="fa fa-pencil" aria-hidden="true"><i class="far fa-edit"></i></i>
        </button>
        <button class="btn btn-sm w-50 btn-danger" type="button"  
        onclick="eliminarD('${doc.id}')" >
          <i class="fa fa-trash-o" aria-hidden="true"><i class="fas fa-trash-alt"></i>
        </button>
      </div> </td>
      </tr>`

     // Check empty image
     var elem = "myImg"+cont;
     elem = document.getElementById(elem);
     if(elem.getAttribute('src') == "undefined")
     {
       //vacio
       elem.src= "./img/NO-IMG.png"
     }
      cont++;
    });
});

//SUBIR IMAGE 

//Abrir modal
let autoIMG="";
const sbrImg = new bootstrap.Modal(document.getElementById('subirImage'));
function subirImg(idE, auto){
  let persona = document.querySelector('#persona');
  //let fecha = document.querySelector('#fecha');
  persona.innerHTML = idE
  //fecha.innerHTML = fechaE
  autoIMG= auto;
  console.log(autoIMG);
  sbrImg.show();

  

}


function uploadIMG(){
    const storageRef = firebase.storage().ref();
    const file = document.querySelector('#selectedFile').files[0];
    if (file == null){
      alert("Elige una imagen")
    }
    else{
      let persona = document.querySelector('#persona').textContent;
      let fecha = autoIMG;
  
      console.log(persona, fecha);
      let name =  persona ; //+"___"+ new Date()
      let name2 = fecha + "/"+ persona;
  
      const metadata = {
          contentType: 'image/jpeg'
      }
  
      const task = storageRef.child(name2).put(file,metadata);
  
      task
      .then(snapshot => 
        snapshot.ref.getDownloadURL())
      .then(url=>{
        console.log(url);
        alert("imagen subida"); 
        const imagenElement = document.querySelector('#ticketImg');
        imagenElement.src = url;
  
  
        //update en pagos en url-img
       // eldoc = persona+" "+fecha; console.log(eldoc);
       eldoc = persona;
        const washingtonRef = firestore.collection("Servicios").doc(eldoc);
  
  return washingtonRef.update({
      img_url: url
  })
  .then(() => {
      console.log("Document successfully updated!");
  })
  .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
      })
        
      }
    }
  




  // SUBIR SERVICIO
        let texto2=""
  firestore.collection("Auto").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
       // console.log(doc.id, " => ", doc.data());
       let x = document.getElementById("auto-driver");
       let option = document.createElement("option");
        texto2= doc.data().id + " "+doc.data().marca + " " + doc.data().modelo +" " + doc.data().anio  
        option.text = texto2
        x.add(option)
       

    });
});

const myModal1 = new bootstrap.Modal(document.getElementById('exampleModal'));

  // POST
  let id="";
  const serviceform= document.getElementById('form-service');
  db =firestore.collection("Servicios")
  let submitBtn = document.getElementById('btn-servicio-submit')

  submitBtn.addEventListener('click',(e)=>{
      e.preventDefault()

      let auto = serviceform['auto-driver'].value;
      let titulo = serviceform['titulo-servicio'].value;
      let descripcion = serviceform['desc-service'].value;
      let fecha = serviceform['fecha-service'].value;
      let costototal = serviceform['total-service'].value;
      let idN= auto.substr(0, 5);
      id = auto.substr(0, 5) +" "+titulo;
  
      db.doc(id).set({
          id: idN,
          auto: auto,
          titulo: titulo,
          descripcion: descripcion,
          fecha: fecha,
          total: costototal,
          status: "pendiente",
          pagado: 0
      
      }).then ( ()=>{
          console.log("Data enviada")
      }).catch((error) =>{
          console.log(error)
      })
      alert("Se registro correctamente")

      serviceform.reset()
      myModal1.hide()
  });




  // EDIT SERVICE
  //EDITAR SERVICIOS
const myModaledit = new bootstrap.Modal(document.getElementById('edicionModal'));
let idE,tituloE,descE,totalE,pagadoE,estatusE;
  function abrirModalEdit(id, titulo, descripcion, total, pagado, status) {

    myModaledit.show()
  idE= id;
tituloE = titulo;
descE = descripcion;
totalE = total;
pagadoE = pagado;
estatusE = status;

    document.getElementById('titulo-edit').value= tituloE;
    document.getElementById('desc-edit').value= descE;
    document.getElementById('pagado-edit').value= pagadoE;
    document.getElementById('total-edit').value= totalE;
    document.getElementById('status-edit').value= estatusE;

  }

// Update objeto de edicion
function updateE(idE){
  updateID = firestore.collection("Servicios").doc(idE);
  const editdriver= document.getElementById('driver-form');

  tituloE = document.getElementById('titulo-edit').value ;
  descE = document.getElementById('desc-edit').value;
  totalE = document.getElementById('total-edit').value ;
  pagadoE = document.getElementById('pagado-edit').value;
  estatusE = document.getElementById('status-edit').value;
  
  return updateID.update({
    titulo: tituloE,
    descripcion: descE,
    status: estatusE,
    pagado: pagadoE,
    total: totalE
})
.then(() => {
    console.log("Document successfully updated!"); myModaledit.hide(); editdriver.reset();
    alert('Edicion con exito')
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
}