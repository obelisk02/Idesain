window.onload = function() {
  let cont=0;
 // x = document.getElementById("driver").value;
 
 let data = sessionStorage.getItem('user_pago'); console.log(data);
 if (data !=''){
  tablapagos.innerHTML = '';
  let status1, pamp='status-tabla',pamp2;


  // Un addon Muestra el conductor viniendo del href Index
 firebase.firestore().collection("Pagos").where("id", "==", data)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());      // FLTA CALCULAR MONTO A PAGAR renta_auto - servicios - generado

           
     

            tablapagos.innerHTML += ` <tr>     
            <th scope="row">${doc.data().fecha}</th>
            <td class="text-center">${doc.data().uber_generado}</td>
            <td class="text-center" >${doc.data().descuento}</td>
            <td class="text-center" >${doc.data().varios}</td>
            <td class="text-center fw-bold text-danger" >${doc.data().monto_a_pagar}</td>  
            <td class="text-center" > <span  id="status-tabla${cont}">${doc.data().status}</span></td>  
            <td class="text-center" >${doc.data().pagado}</td>  
            <td class="text-center" >${doc.data().debe}</td> 

            <td class="text-center">
        <button class="btn btn-sm btn-success w-50" type="button" onclick="">
        <i class="fas fa-file-invoice-dollar"></i></button></td>
              
            <td class="text-center"> <div class="btn-group">
            <button class="btn btn-sm btn-warning w-50" type="button" 
            onclick="abrirModalEdit('${doc.id}','${doc.data().fecha}','${doc.data().uber_generado}','${doc.data().descuento}','${doc.data().varios}','${doc.data().monto_a_pagar}','${doc.data().status}','${doc.data().pagado}','${doc.data().debe}','${doc.data().renta_auto}')">
              <i class="fa fa-pencil" aria-hidden="true"><i class="far fa-edit"></i></i>
            </button>
            <button class="btn btn-sm w-50 btn-danger" type="button"  
            onclick="eliminarD('${doc.id}')">
              <i class="fa fa-trash-o" aria-hidden="true"><i class="fas fa-trash-alt"></i>
            </button>
          </div> </td>
          </tr>`
    
    
          // M . front-end pintar status FOREACH arriba
          pamp2 = pamp+cont;
            status1 = document.getElementById(pamp2);
           console.log(status1.textContent);
          
          
          if (status1.textContent == "pendiente"){
            status1.className += " badge bg-warning text-dark";
          }
          if (status1.textContent == "pagado"){
            status1.className += " badge bg-success";
          }
          if (status1.textContent == "cancelado"){
            status1.className += " badge bg-danger";
          }

          cont++;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

 }
 sessionStorage.removeItem('user_pago');
};


const firebaseConfig = {
    apiKey: "AIzaSyCWVd8mU-V5rLgbVygpvlN9EMBBJQe5nE8",
    authDomain: "idesain-uber.firebaseapp.com",
    projectId: "idesain-uber",
    storageBucket: "idesain-uber.appspot.com",
    messagingSenderId: "1069226085704",
    appId: "1:1069226085704:web:9d73d993b334002722777d"
  };

  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore()

  const tablapagos= document.getElementById('tabla-pagos');
  //Saca los conductores
  const items={}
          let cont=1; let texto1=""; let rentaSemanal ;let x
  let dataGET = firestore.collection("Conductor").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

      items[doc.id] = doc.data();

        // doc.data() is never undefined for query doc snapshots
       // console.log(doc.id, " => ", doc.data());
       x = document.getElementById("driver");
       let option = document.createElement("option");
        texto1= doc.id ;
        option.text = texto1
        x.add(option,x[cont])
        rentaSemanal= doc.data().renta_auto
       //console.log(rentaSemanal)


    });
});

console.log(items)


// Agregar pago
db =firestore.collection("Pagos")
let submitBtn = document.getElementById('btn-pago')
submitBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const driverform= document.getElementById('driver-form');
    x = document.getElementById("driver").value;
    let nombre= x;
    let fecha = driverform['week'].value;
    let uber_generado = driverform['generado-uber'].value; 
    let descuento = driverform['descuento-pago'].value;
    let concepto_descuento = driverform['descuento-concepto'].value;
    let varios = driverform['varios-pago'].value;
    let concepto_varios = driverform['varios-concepto'].value;
    let auto_renta= rentaSemanal;
  
    base= x +" "+ fecha;
    console.log(base)

    var washingtonRef = db.collection("Pagos").doc(base);
    return washingtonRef.update({
      id: nombre,
      fecha: fecha,
      uber_generado: uber_generado,
      descuento: descuento,
      concepto_descuento: concepto_descuento,
      varios: varios,
      concepto_varios: concepto_varios,
      renta_auto: auto_renta,
      status: "pendiente",
      pagado: 0,
      debe: 0
  })
  .then(() => {
      console.log("Document successfully updated!");
  })
  .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
  

})



// BUSCAR  MMOSTRAR EN TABLA
let btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click',(e)=>{
  let cont=0;
  x = document.getElementById("driver").value;
  console.log(x)
  tablapagos.innerHTML = '';
  let status1, pamp='status-tabla',pamp2;
//Buscar conductor WHERE
//db.collection("Pagos").where("id", "==", x)
 firebase.firestore().collection("Pagos").where("id", "==", x)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());      // FLTA CALCULAR MONTO A PAGAR renta_auto - servicios - generado

           
     

            tablapagos.innerHTML += ` <tr>     
            <th scope="row">${doc.data().fecha}</th>
            <td class="text-center">${doc.data().uber_generado}</td>
            <td class="text-center" >${doc.data().descuento}</td>
            <td class="text-center" >${doc.data().varios}</td>
            <td class="text-center fw-bold text-danger" >${doc.data().monto_a_pagar}</td>  
            <td class="text-center" > <span  id="status-tabla${cont}">${doc.data().status}</span></td>  
            <td class="text-center" >${doc.data().pagado}</td>  
            <td class="text-center" >${doc.data().debe}</td> 

            <td class="text-center">
        <button class="btn btn-sm btn-success w-50" type="button" onclick="">
        <i class="fas fa-file-invoice-dollar"></i></button></td>
              
            <td class="text-center"> <div class="btn-group">
            <button class="btn btn-sm btn-warning w-50" type="button" 
            onclick="abrirModalEdit('${doc.id}','${doc.data().fecha}','${doc.data().uber_generado}','${doc.data().descuento}','${doc.data().varios}','${doc.data().monto_a_pagar}','${doc.data().status}','${doc.data().pagado}','${doc.data().debe}','${doc.data().renta_auto}')">
              <i class="fa fa-pencil" aria-hidden="true"><i class="far fa-edit"></i></i>
            </button>
            <button class="btn btn-sm w-50 btn-danger" type="button"  
            onclick="eliminarD('${doc.id}')">
              <i class="fa fa-trash-o" aria-hidden="true"><i class="fas fa-trash-alt"></i>
            </button>
          </div> </td>
          </tr>`
    
    
          // M . front-end pintar status FOREACH arriba  // FRONT COLORS EDIT 


          pamp2 = pamp+cont;
            status1 = document.getElementById(pamp2);
           //console.log(status1.textContent);
          
          
          if (status1.textContent == "pendiente"){
            status1.className += " badge bg-warning text-dark";
          }
          if (status1.textContent == "pagado"){
            status1.className += " badge bg-success";
          }
          if (status1.textContent == "cancelado"){
            status1.className += " badge bg-danger";
          }

          cont++;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

  })



 


  // Edit data tabla
  const myModaledit = new bootstrap.Modal(document.getElementById('edicionModal'));
  let idE,fechaE, uberE,decuentoE,montoE,estatusE, pagadoE, debeE, monto_generado, rentaauto;
  function abrirModalEdit(id, fecha, uber, descuento, varios, monto_pagar, estatus, pagado, debe, rentauto) {

    myModaledit.show()
  idE= id;
  fechaE= fecha;
  uberE= uber;
  descuentoE= descuento;
  montoE= monto_pagar;
  variosE= varios;
  estatusE = estatus;
  pagadoE = pagado;
  debeE = debe;
  monto_generado= uber;
  rentaauto = rentauto;

    document.getElementById('week-edit').value= fechaE;
    document.getElementById('generado-edit').value= uberE;
    document.getElementById('descuento-edit').value= descuentoE;
   // document.getElementById('concepto1-edit').value= nameE;
    document.getElementById('varios-edit').value= variosE;
    //document.getElementById('concepto2-edit').value= nameE;
    document.getElementById('status-edit').value= estatusE;
    document.getElementById('pagado-edit').value= pagadoE;
    document.getElementById('debe-edit').value= debeE;
  }

// Update objeto de edicion
function updateE(idE){
  updateID = db.collection("Pagos").doc(idE);
  const editdriver= document.getElementById('driver-form');

  fechaE = document.getElementById('week-edit').value ;
  uberE = document.getElementById('generado-edit').value;
  descuentoE = document.getElementById('descuento-edit').value ;
 // document.getElementById('concepto1-edit').value= nameE;
 variosE = document.getElementById('varios-edit').value ;
  //document.getElementById('concepto2-edit').value= nameE;
  estatusE = document.getElementById('status-edit').value;
  pagadoE = document.getElementById('pagado-edit').value;
  debeE = document.getElementById('debe-edit').value;


// Sumas restas monto a pagar
let total = parseFloat(monto_generado) + parseFloat(descuentoE) + parseFloat(variosE) ;
console.log(total);
let total2= total - rentaauto ;
roundToTwo(total2)
console.log(total2 + " monto total a pagar");

function roundToTwo(num) {
  total2= +(Math.round(num + "e+2")  + "e-2");
}
  return updateID.update({
    uber_generado: uberE,
    descuento: descuentoE,
    varios: variosE,
    status: estatusE,
    pagado: pagadoE,
    debe: debeE,
    monto_a_pagar: total2
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


//********************  DELETE FILA */

function eliminarD(id){

  let confirmar1 = confirm("Desea eliminar");
if (confirmar1) {
  db.collection("Pagos").doc(id).delete().then(() => {
    console.log("Document successfully deleted!"); 
    
  }).catch((error) => {
    console.error("Error removing document: ", error);
  }); 
 
  //myModal2.hide()
 
}
}

//******************************* */

  //Generar semanas
  let btngenerar = document.getElementById('btn-generar')
  db= firebase.firestore();
  const myModal1 = new bootstrap.Modal(document.getElementById('generarModal'));
  const myModal2 = new bootstrap.Modal(document.getElementById('pago-semanaModal'));
  const pagoform= document.getElementById('generador-form');
    
  let contrr=0;
  const fech = document.getElementById('fechia');
let fetchia;
btngenerar.addEventListener('click',(e)=>{
  e.preventDefault()
  let fecha2 = pagoform['pago-week'].value;
  fetchia= fecha2;
// Get a new write batch
 let batch = db.batch();
//let nycRef = db.collection("Pagos").doc("");


$(fech).append('<span class="badge bg-warning text-dark" id="fecha_modal">'+fecha2+'</span>');   //poner fecha en el modal



// Pagar a conductores activos
db.collection("Conductor").where("activo", "==", true)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let ids = doc.id;
            ids = ids+" "+fecha2;
     
  
            contrr++;
            const div_generador= document.getElementById('generator');
            $(div_generador).append('<div class="row" > <div class="col-sm-12"> <label id="name'+contrr+'"class="col-form-label fw-bold">'+doc.id+'</label>'  +  
           '<div class="row padd-div"> <div class="col-8 col-sm-6">Monto Generado</div>  <div class="col-4 col-sm-6"> <input type="number" class="form-control" id="monto-uber'+contrr+'" placeholder="Monto" autofocus> </div>  </div> ' +
           '<div class="row padd-div"> <div class="col-8 col-sm-6">Descuento</div> <div class="col-4 col-sm-6"> <input type="number" class="form-control" id="descuento-uber'+contrr+'" placeholder="Descuento" > </div>  </div>' +
           '<div class="row padd-div"> <div class="col-8 col-sm-6">Varios</div> <div class="col-4 col-sm-6"> <input type="number" class="form-control" id="varios-uber'+contrr+'" placeholder="Varios" > </div>  </div> </div> </div>  <hr>' );   


            nycRef = db.collection("Pagos").doc(ids);
            
            databatch={id: doc.data().nombre,
              renta_auto: doc.data().renta_auto,
              auto: doc.data().auto,
              fecha: fecha2,
              uber_generado: 0,
              descuento: 0,
              concepto_descuento: "",
              varios: 0,
              concepto_varios: "",
              status: "pendiente",
              pagado: 0,
              debe: 0  ,
              monto_a_pagar: doc.data().renta_auto,
              inversion: doc.data().inversion
              }

            batch.set(nycRef, databatch);
            

          });

          batch.commit().then(() => {
            //alert("Se registro correctamente")
            console.log("Subio Correctamente");
          });

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

  
    //contrr=0
    myModal1.hide()
   myModal2.show()
// pago-semanaModal

})




  // GET USERS WHERE FECHA SEA LA QUE PICKE 
  //PINTAR USERS CON INPUTS
  //HACER UPDATE DE ESOS IDS



  let btnupdatpay = document.getElementById('btn-updatePago');





  btnupdatpay.addEventListener('click',(e)=>{

    // sacar los valores 
    let cunt = 0;
    let canxu= 1, canxu2=1; 
    let idnm,plan1;
    let idpay,plan2; let montoupdate
    let ie=0; let montos = [];
    let descuentosA = [], variosA = [];
  //let fetchia = document.getElementById('fecha_modal').value;
  //const div_generador= document.getElementById('generator');
  e.preventDefault();
  //const batch2 = db.batch();
  console.log(contrr);
  console.log(fetchia);


 
  for(;ie<contrr;){
console.log(canxu);
     
    plan1 = "name" + canxu;
   
    canxu++;
      //console.log(plan1);
     // idnm= $(div_generador).find(plan1).value;
  
     idnm = document.getElementById(plan1).textContent;
 
      let idnm2 = idnm+" "+fetchia;
  
  console.log(idnm2 + " id");

  plan2 = "monto-uber"+canxu2;
  plan3 = "descuento-uber" + canxu2;
  plan4 = "varios-uber" + canxu2;

  plan3 = document.getElementById(plan3).value;
  plan4 = document.getElementById(plan4).value;
  descuentosA.push(parseFloat(plan3));
  variosA.push(parseFloat(plan4));

        idpay = document.getElementById(plan2).value;   console.log(idpay + " paga");
        montos.push(parseFloat(idpay));
     canxu2++;

     console.log(montos);

  //Saca lal perra data transaccion //
     // Create a reference to the SF doc.

  let sfDocRef = db.collection("Pagos").doc(idnm2);
 db.runTransaction((transaction) => {


    return transaction.get(sfDocRef).then((sfDoc) => {
        if (!sfDoc.exists) {
            throw "Document does not exist!";
        }

      

         montoupdate = sfDoc.data().monto_a_pagar; console.log(montoupdate);
        montoupdate= montos[cunt]-montoupdate;  
        // 
        console.log(montos[cunt] + " LA paga anadidad");
        console.log(cunt + " mi contador");
      
        transaction.update(sfDocRef, { 
          monto_a_pagar: montoupdate ,
          uber_generado: montos[cunt],
          descuento: descuentosA[cunt],
          varios: variosA[cunt]
        
        } ) 
       
        cunt++; 
        montoupdate=0; 
    });
}).then(() => {
    console.log("Transaction successfully committed!");       
}).catch((error) => {
    console.log("Transaction failed: ", error);
});


ie++;   }

/* 
  batch2.commit().then(() => {
    alert("Se ha registrado correctamente");
    console.log(batch2);

    myModal2.hide()
});  */

})