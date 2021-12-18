window.onload = function() {
  let cont=0;
 // x = document.getElementById("driver").value;
 
 let data = sessionStorage.getItem('user_pago'); console.log(data);

   //pintar select
  
    let selectDriver= document.getElementById('driver'); console.log(data);
  selectDriver.value= data;
  

 if (data !=null){
  tablapagos.innerHTML = '';
  let status1, pamp='status-tabla',pamp2;

 
  // Un addon Muestra el conductor viniendo del href Index
 firebase.firestore().collection("Pagos").where("id", "==", data)
    .get()
    .then((querySnapshot) => {                           let saldoafavor="";
        querySnapshot.forEach((doc) => {

          if (doc.data().monto_a_pagar > 0 ){
            saldoafavor = "Saldo a Favor";
          }
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());      // FLTA CALCULAR MONTO A PAGAR renta_auto - servicios - generado

            TotalGenerado = TotalGenerado + parseFloat(doc.data().uber_generado); 
            TotalPagado = TotalPagado + parseFloat(doc.data().pagado); 
            TotalGanancia =  TotalGanancia + parseFloat(doc.data().monto_a_pagar); 
            TotalRenta=  TotalRenta + parseFloat(doc.data().renta_auto); 

            tablapagos.innerHTML += ` <tr>     
            <th scope="row">${doc.data().fecha}</th>
            <td class="text-center"> <a data-lightbox="${doc.data().img_url} " data-title="${doc.data().fecha}" href="${doc.data().img_url}"><img id="myImg${cont}" src="${doc.data().img_url}" width="40" height="40"/></a> </th>
           
            <td class="text-center">${doc.data().uber_generado}</td>
            <td class="text-center" >${doc.data().descuento}</td>
            <td class="text-center" >${doc.data().varios}</td>
            <td class="text-center fw-bold text-danger" >${doc.data().monto_a_pagar}</td>  
            <td class="text-center" > <span  id="status-tabla${cont}">${doc.data().status}</span></td>  
            <td class="text-center" >${doc.data().pagado}</td>  
            <td class="text-center" >${doc.data().debe}</td> 

          

          <td class="text-center"> <div class="btn-group">
            <button class="btn  btn-dark w-50" type="button" style="width:1vh height: 1vh;"
            onclick="subirImg('${doc.id}','${doc.data().id}','${doc.data().fecha}','${doc.data().debe}','${doc.data().pagado}','${doc.data().uber_generado}','${doc.data().descuento}','${doc.data().varios}','${doc.data().monto_a_pagar}','${doc.data().status}','${doc.data().renta_auto}')">
              <i class="fas fa-upload" aria-hidden="true"></i>   ${saldoafavor}
            </button>
          </div> </td>

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


          // check image
          var elem = "myImg"+cont;
          elem = document.getElementById(elem);
          if(elem.getAttribute('src') == "undefined")
          {
            //vacio
            elem.src= "./img/NO-IMG.png"
          }
          
          cont++; saldoafavor="";
        });

        
// TOTALES TD **************************************************************

tablapagos.innerHTML += ` <tr class="bg-tr">     
<th scope="row">TOTAL</th>
<td class="text-center fw-bold"> Generado: </td>
<td class="text-center fw-bold">  <span class="badge bg-primary">${TotalGenerado.toFixed(2)}</span> </td>
<td class="text-center" > </td>
<td class="text-center fw-bold"  >Monto: </td>
<td class="text-center  "> <span class="badge bg-primary">${TotalGanancia.toFixed(2)}</span> </td>  
<td class="text-center" > Ganancia Total:</td>  
<td class="text-center" ><span class="badge bg-primary">${TotalPagado.toFixed(2)}</span> </td>  
<td class="text-center" > </td> 
<td class="text-center fw-bold" >Total Renta: </td> 
<td class="text-center" > <span class="badge bg-primary">${TotalRenta.toFixed(2) * -1}</span> </td> 
</tr>`
//***************************************************** */
TotalGenerado= 0 , TotalPagado = 0,  TotalGanancia= 0;  TotalRenta=0;

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

 }
 sessionStorage.removeItem('user_pago');
};

//************************************************************************************************* */

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


  // PINTAR LOS SERVICIOS EN MODAL 
  //const selectPintar= document.getElementById('infoService1');
   //Muestra los servicios



    
    
   let   TotalGenerado= 0 , TotalPagado = 0,  TotalGanancia= 0,  TotalRenta=0;



  const tablapagos= document.getElementById('tabla-pagos');


  //Saca los conductores
  const items=[];
          let cont=1; let texto1=""; let rentaSemanal ;let x ; let contPerson = 1;
  let dataGET = firestore.collection("Conductor").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

      items[doc.id] = doc.data();

        // doc.data() is never undefined for query doc snapshots
       // console.log(doc.id, " => ", doc.data());
       x = document.getElementById("driver");
       let option = document.createElement("option");
        texto1= doc.id ;
        option.text = texto1
        x.add(option,x[contPerson])
        rentaSemanal= doc.data().renta_auto
       //console.log(rentaSemanal)

      contPerson++;
    });
});



//Mostrar servicios en <SELect EDIT>
//const div_generador2= document.getElementById('infoService1'); 
let contador2 = 1;
   //Muestra los servicios
firestore.collection("Servicios").where("status", "==", "pendiente").onSnapshot((querySnapshot) => { contador2=1;  
       querySnapshot.forEach((doc) => {
          
      

        let x = document.getElementById('infoService1');
        let option = document.createElement("option");
 
        texto1= doc.id ; //data().id  +" " + doc.data().marca + " " + doc.data().modelo +" " + doc.data().anio
        option.text = texto1
        x.add(option,x[contador2]);
       })
      });



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
   // let concepto_descuento = driverform['descuento-concepto'].value;
    let varios = driverform['varios-pago'].value;
  //  let concepto_varios = driverform['varios-concepto'].value;
    let auto_renta= rentaSemanal; auto_renta = auto_renta *-1
    let total = driverform['total-uber'].value;
  
    base= x +" "+ fecha;
    console.log(base)

    firestore.collection("Pagos").doc(base).set({
      id: nombre,
      fecha: fecha,
      uber_generado: uber_generado,
      descuento: descuento,
      
      varios: varios,
     
      renta_auto: auto_renta,
      status: "pendiente",
      pagado: 0,
      debe: total,
      monto_a_pagar: total
  })
  .then(() => {
    console.log("Document successfully written!"); alert("Creado");
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
    .then((querySnapshot) => {                  let saldoafavor="";
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());      // FLTA CALCULAR MONTO A PAGAR renta_auto - servicios - generado

            TotalGenerado = TotalGenerado + parseFloat(doc.data().uber_generado); 
            TotalPagado = TotalPagado + parseFloat(doc.data().pagado); 
            TotalGanancia =  TotalGanancia + parseFloat(doc.data().monto_a_pagar); 
            TotalRenta=  TotalRenta + parseFloat(doc.data().renta_auto); 

            if (doc.data().monto_a_pagar > 0 ){
              saldoafavor = "Saldo a Favor";
            }

            tablapagos.innerHTML += ` <tr>     
            <th scope="row">${doc.data().fecha}</th>
            <td class="text-center"> <a data-lightbox="${doc.data().img_url} " data-title="${doc.data().fecha}" href="${doc.data().img_url}"><img id="myImg${cont}" src="${doc.data().img_url}" width="40" height="40"/></a> </th>
           
            <td class="text-center">${doc.data().uber_generado}</td>
            <td class="text-center" >${doc.data().descuento}</td>
            <td class="text-center" >${doc.data().varios}</td>
            <td class="text-center  fw-bolder text-decoration-underline" >${doc.data().monto_a_pagar}</td>  
            <td class="text-center" > <span  id="status-tabla${cont}">${doc.data().status}</span></td>  
            <td class="text-center fw-bold text-success" >${doc.data().pagado}</td>  
            <td class="text-center fw-bolder text-danger" >${doc.data().debe}</td> 

              

            <td class="text-center"> <div class="btn-group">
            <button class="btn  btn-dark w-50" type="button" style="width:1vh height: 1vh;"
            onclick="subirImg('${doc.id}','${doc.data().id}','${doc.data().fecha}','${doc.data().debe}','${doc.data().pagado}','${doc.data().uber_generado}','${doc.data().descuento}','${doc.data().varios}','${doc.data().monto_a_pagar}','${doc.data().status}','${doc.data().renta_auto}')">
              <i class="fas fa-upload" aria-hidden="true"></i>  
            </button> 
          </div>  <div class="fw-bold"> ${saldoafavor} </div> </td>

            <td class="text-center"> <div class="btn-group">
            <button class="btn btn-sm bg-success text-white w-50" type="button" 
            onclick="abrirModalEdit('${doc.id}','${doc.data().fecha}','${doc.data().uber_generado}','${doc.data().descuento}','${doc.data().varios}','${doc.data().monto_a_pagar}','${doc.data().status}','${doc.data().pagado}','${doc.data().debe}','${doc.data().renta_auto}','${doc.data().servicio}')">
              <i class="fas fa-dollar-sign" aria-hidden="true"></i>
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

          if (status1.textContent == "pendiente"){
            status1.className += " badge bg-warning text-dark";
          }
          if (status1.textContent == "pagado"){
            status1.className += " badge bg-success";
          }
          if (status1.textContent == "cancelado"){
            status1.className += " badge bg-danger";
          }

          // Check empty image
          var elem = "myImg"+cont;
          elem = document.getElementById(elem);
          if(elem.getAttribute('src') == "undefined")
          {
            //vacio
            elem.src= "./img/NO-IMG.png"
          }

          cont++; saldoafavor="";
          

        });


// TOTALES TD **************************************************************

tablapagos.innerHTML += ` <tr class="bg-tr">     
<th scope="row">TOTAL</th>
<td class="text-center fw-bold"> Generado: </td>
<td class="text-center fw-bold">  <span class="badge bg-primary">${TotalGenerado.toFixed(2)}</span> </td>
<td class="text-center" > </td>
<td class="text-center fw-bold"  >Monto: </td>
<td class="text-center  "> <span class="badge bg-primary">${TotalGanancia.toFixed(2)}</span> </td>  
<td class="text-center fw-bold" > Pagado:</td>  
<td class="text-center" ><span class="badge bg-primary">${TotalPagado.toFixed(2)}</span> </td>  
<td class="text-center" > </td> 
<td class="text-center fw-bold" >Total Renta: </td> 
<td class="text-center" > <span class="badge bg-primary">${TotalRenta.toFixed(2) * -1}</span> </td> 

</tr>`
//***************************************************** */
TotalGenerado= 0 , TotalPagado = 0,  TotalGanancia= 0;  TotalRenta = 0;
       
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    
      
  })



 // FRONT PARA CALCULO DE TOTAL A PAGAR SI LLEGA A EDITARSE
 function setTotal() {
  let Pago_rentaauto = parseFloat( document.getElementById('renta-auto').value );       console.log(Pago_rentaauto);
  let Pago_generado = parseFloat( document.getElementById('generado-edit').value );     console.log(Pago_generado);
  let Pago_descuento = parseFloat(document.getElementById('descuento-edit').value );    console.log(Pago_descuento);
  let Pago_varios =   parseFloat( document.getElementById('varios-edit').value );       console.log(Pago_varios);
  let Pago_pagado =   parseFloat( document.getElementById('pagado-edit').value );       console.log(Pago_pagado);
  let Pago_debe =   document.getElementById('debe-edit') ; 
  
  let Pago_total =  document.getElementById('totalA-edit');

  let totalF = (Pago_rentaauto + Pago_generado - Pago_descuento +Pago_varios).toFixed(2);
  
  Pago_debe.value = totalF;
  Pago_total.value = totalF;

  
  //Pago_debe.style.backgroundColor = "#e86464";
  Pago_total.style.backgroundColor = "#e86464";
 }

 function setTotal2() {
  let Pago_rentaauto = document.getElementById('renta-auto').value;
  let Pago_generado =  document.getElementById('generado-edit').value;  if(Pago_generado == ""){ Pago_generado = parseFloat( 0)};
  let Pago_descuento = document.getElementById('descuento-edit').value;  if(Pago_descuento == ""){ Pago_descuento = parseFloat( 0)};
  let Pago_varios =    document.getElementById('varios-edit').value ;  if(Pago_varios == ""){ Pago_varios = parseFloat( 0)};
  let Pago_pagado =    document.getElementById('pagado-edit').value ;  if( Pago_pagado == ""){  Pago_pagado = parseFloat( 0)};
  let Pago_debe =   document.getElementById('debe-edit') ; 
  
  let Pago_total =  document.getElementById('totalA-edit');


  Pago_rentaauto = parseFloat( Pago_rentaauto);
  Pago_generado = parseFloat( Pago_generado );
  Pago_descuento = parseFloat( Pago_descuento );
  Pago_varios =   parseFloat(Pago_varios);
  Pago_pagado =   parseFloat( Pago_pagado);



  let totalF = (Pago_rentaauto + Pago_generado - Pago_descuento +Pago_varios + Pago_pagado).toFixed(2);
  
  Pago_debe.value = totalF;

  if (Pago_debe.value == 0){
  Pago_debe.style.backgroundColor = "#42ad36";}
  else { 
    Pago_debe.style.backgroundColor = "#f2db44";
  }
  //Pago_total.style.backgroundColor = "#e86464"; #f2db44
 }

  // Edit data tabla
  const myModaledit = new bootstrap.Modal(document.getElementById('edicionModal'));
  let idE,fechaE, uberE,decuentoE,montoE,estatusE, pagadoE, debeE, monto_generado, rentaauto, servicioE;
  function abrirModalEdit(id, fecha, uber, descuento, varios, monto_pagar, estatus, pagado, debe, rentauto, servicio_name) {

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
  servicioE = servicio_name;

    document.getElementById('week-edit').value= fechaE;
    document.getElementById('generado-edit').value= uberE;
    document.getElementById('descuento-edit').value= descuentoE;
    document.getElementById('renta-auto').value= rentaauto;
    document.getElementById('varios-edit').value= variosE;
  
    document.getElementById('status-edit').value= estatusE;
    document.getElementById('pagado-edit').value= pagadoE;
    document.getElementById('debe-edit').value= debeE; 

    document.getElementById('totalA-edit').value= montoE ;
    document.getElementById('infoService1').value= servicioE ;
  }

// Update objeto de edicion
function updateE(idE){
  updateID = firestore.collection("Pagos").doc(idE);
  const editdriver= document.getElementById('driver-form');

  fechaE = document.getElementById('week-edit').value ;
  uberE = document.getElementById('generado-edit').value;
  descuentoE = document.getElementById('descuento-edit').value ;
 // document.getElementById('concepto1-edit').value= nameE;
 variosE = document.getElementById('varios-edit').value ;
 
  estatusE = document.getElementById('status-edit').value;
  pagadoE = document.getElementById('pagado-edit').value;
  debeE = document.getElementById('debe-edit').value;
  montoE = document.getElementById('totalA-edit').value ;


// Sumas restas monto a pagar
/*let total = parseFloat(monto_generado) + parseFloat(descuentoE) + parseFloat(variosE) ;
console.log(total);
let total2= total - rentaauto ;
roundToTwo(total2)
console.log(total2 + " monto total a pagar");

function roundToTwo(num) {
  total2= +(Math.round(num + "e+2")  + "e-2");
} */
  return updateID.update({
    uber_generado: uberE,
    descuento: descuentoE,
    varios: variosE,
    status: estatusE,
    pagado: pagadoE,
    debe: debeE,
    monto_a_pagar: montoE
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
  firestore.collection("Pagos").doc(id).delete().then(() => {
    console.log("Document successfully deleted!"); 
    
  }).catch((error) => {
    console.error("Error removing document: ", error);
  }); 
 
  //myModal2.hide()
 
}
}

//******************************* */

  //Generar semanas
  /*
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
*/



const sbrImg = new bootstrap.Modal(document.getElementById('subirImage'));  let debeFinal, totalMonto=0, pagadoAnterior=0; 
function subirImg(idE, quitate, fechaE,){
  let persona = document.querySelector('#persona');
  let fecha = document.querySelector('#fecha');
  persona.innerHTML = quitate;
  fecha.innerHTML = fechaE;
  sbrImg.show();
}



let docGlobal="";
function uploadIMG(){
   
  const storageRef = firebase.storage().ref();
  const file = document.querySelector('#selectedFile').files[0];
  if (file == null){
    alert("Elige una imagen")
  }
  else{
    let persona = document.querySelector('#persona').textContent;
    let fecha = document.querySelector('#fecha').textContent;

    console.log(persona, fecha);
    let name =  fecha ; //+"___"+ new Date()
    let name2 = persona + "/"+ name;

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
      eldoc = persona+" "+fecha; console.log(eldoc);
      docGlobal = eldoc;
      const washingtonRef = firestore.collection("Pagos").doc(eldoc);

      // Update a Pago
return washingtonRef.update({
    img_url: url,
  
})
.then(() => {
    console.log("Document successfully updated!");
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
    });
 
    }
  }


