 
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
 
 



// Front - pintar el total en el input Onchange 
function getTotal(cont) {

  let  plan1 = document.getElementById("renta-driver"+cont);
  let  plan2 = document.getElementById("monto-uber"+cont);
  let  plan3 = document.getElementById("descuento-uber" + cont);
  let  plan4 = document.getElementById("varios-uber" + cont);
  let  plan5 = document.getElementById("monto-pagar" + cont);

  let renta =     parseFloat( plan1.value ); 
  let generado =  parseFloat(plan2.value);      if (isNaN(generado)) { generado = 0 } ;    if(generado>0){plan2.style.backgroundColor = "#e6ffe7";} ;if(generado<0){plan2.style.backgroundColor = "#ffe6e6";}
  let descuento = parseFloat( plan3.value);     if (isNaN(descuento)) { descuento = 0 }; if(descuento>0){plan3.style.backgroundColor = "#e6ffe7";} ;if(descuento<0){plan3.style.backgroundColor = "#ffe6e6";}
  let varios =    parseFloat(plan4.value);      if (isNaN(varios)) { varios = 0 }     ; if(varios>0){plan4.style.backgroundColor = "#e6ffe7";} ;if(varios<0){plan4.style.backgroundColor = "#ffe6e6";}
  let total = plan5;

  let total1 = 0;
  total1 = (renta + generado - descuento + varios).toFixed(2); if(total1>0){plan5.style.backgroundColor = "#42ad36";} ;if(total1<0){plan5.style.backgroundColor = "#e86464";}
  total.value = 0;
  total.value = total1;
}

 //Generar semanas
 db= firebase.firestore();
 let contador=1, contador2=1;
 let fecha;
 let inversionlist=[];



// Muestra los conductores activos 
// PICALE AL LINK DE ERROR EN EL CONSOLE DE LA WEB, PARA QUE TE CREE EL INDICE EN FIRESTORE O SOLO QQUITA EL orderby("auto")
db.collection("Conductor").where("activo", "==", true).orderBy("auto")
   .get()
   .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
           // doc.data() is never undefined for query doc snapshots
 
          inversionlist[contador-1]= doc.data().inversion; 
           //const div_generador= document.getElementById('infoDriver'+contador);
           const div_generador= document.getElementById('infoDriver1');
           $(div_generador).append('   <div class="card"><div class="card-body" > <label id="nameDriver'+contador+'"class="col-form-label fw-bold" style="display: inline-block;">'+doc.id+ '</label> <span class="badge bg-warning text-dark  justify-content-end" style="margin-left: auto; " id="auto'+contador+'">'+ doc.data().auto+'</span>'  +  
           '<div class="row padd-div" style="padding: 2px 2px;"> <div class="col-8 col-sm-6">Renta de Conductor</div>  <div class="col-4 col-sm-6" > <input type="number"  class="form-control" id="renta-driver'+contador+'" value="'+(-1* doc.data().renta_auto)+'" readonly > </div>  </div> ' +
           '<div class="row padd-div" style="padding: 2px 2px;"> <div class="col-8 col-sm-6">Asociar Servicio</div>  <div class="col-4 col-sm-6" > <select name="auto" class="form-control" id="servicio-driver'+contador+'" placeholder="Elige Servicio" >  <option value=""></option> </select> </div>  </div> ' +
          '<div class="row padd-div" style="padding: 2px 2px;"> <div class="col-8 col-sm-6">Ganancias Totales</div>  <div class="col-4 col-sm-6" > <input type="number"  class="form-control" id="monto-uber'+contador+'" placeholder="Monto" onchange="getTotal('+contador+')"> </div>  </div> ' +
          '<div class="row padd-div" style="padding: 2px 2px;"> <div class="col-8 col-sm-6">Pagos</div> <div class="col-4 col-sm-6"> <input type="number" class="form-control" id="descuento-uber'+contador+'" placeholder="Descuento" onchange="getTotal('+contador+')"> </div>  </div>' +
          '<div class="row padd-div" style="padding: 2px 2px;"> <div class="col-8 col-sm-6">Reembolsos</div> <div class="col-4 col-sm-6"> <input type="number" class="form-control" id="varios-uber'+contador+'" placeholder="Varios" onchange="getTotal('+contador+')" > </div>  </div> <hr>' +
          '<div class="row padd-div" style="padding: 2px 2px;"> <div class="col-8 col-sm-6 fw-bolder">Monto a Pagar</div> <div class="col-4 col-sm-6"> <input type="number" class="form-control fw-bolder" id="monto-pagar'+contador+'" placeholder="Monto a Pagar"  > </div>  </div> </div> </div>  <hr>' );   

          console.log("conductores:"+contador);      //<select name="auto" class="form-control" id="auto-driver'+contador+'" placeholder="Elige Servicio" >  </select>
         
          contador++;

         });
         console.log(inversionlist);
   })
   .catch((error) => {
       console.log("Error getting documents: ", error);
   });

//**********************************************************************************8 */
const div_generador2= document.getElementById('infoService1');
   //Muestra los servicios
firestore.collection("Servicios").where("status", "==", "pendiente").onSnapshot((querySnapshot) => { contador2=1;   $(div_generador2).empty();
       querySnapshot.forEach((doc) => {
          
        
        for (let cunt = 1 ; cunt < contador; cunt ++) {

          // poner un blanco primero
    
          
        let x = document.getElementById("servicio-driver"+cunt);
        let option = document.createElement("option");
 
        texto1= doc.id ; //data().id  +" " + doc.data().marca + " " + doc.data().modelo +" " + doc.data().anio
        option.text = texto1
        x.add(option,x[contador2]);
        }
         //****************************************************************************** */
     
           //const div_generador= document.getElementById('infoDriver'+contador);
        
         
           $(div_generador2).append('   <div class="card"><div class="card-body " >' +
           '<div class="container"> <div class="row"> <div class="col-2">' +
           '<a class="align-items-center" data-lightbox="'+doc.data().img_url+ '" data-title="'+doc.data().fecha+'" href="'+doc.data().img_url+'"><img id="myImg'+contador2+'" src="'+doc.data().img_url+'" width="100%" /></a></div>' +
           ' <div class="col-8">'+
           '<label id="name'+contador2+'"class="col-form-label fw-bold" style="display: inline-block;">'+doc.data().titulo+ '</label> <span class="badge bg-info text-dark  justify-content-end" style="margin-left: auto;"id="auto'+contador2+'">'+ doc.data().auto+'</span>'  +  
          '<div class="row padd-div"> <div class="col-8 col-sm-6">Fecha: '+doc.data().fecha+'</div>  <div class="col-4 col-sm-6">  </div>  </div> ' +
          '<div class="row padd-div"> <div class="col-8 col-sm-6">Descripcion: '+doc.data().descripcion+' </div> <div class="col-4 col-sm-6">  </div>  </div>' +
          '<div class="row padd-div"> <div class="col-8 col-sm-6">Total: '+doc.data().total+' </div> Pagado: '+doc.data().pagado+' <div class="col-4 col-sm-6">  </div>  </div> </div> '+

          '<div class="col-2">  <button class="btn btn-sm btn-warning w-50" type="button" onclick="abrirModalEdit(\''+doc.id+'\' , \''+doc.data().titulo+'\' , \''+doc.data().descripcion+'\' , \''+doc.data().total+'\' , \''+doc.data().pagado+'\' , \''+doc.data().status+'\')">'+
          '<i class="fa fa-pencil" aria-hidden="true"><i class="far fa-edit"></i></i>  </button> '+
       
          '</div> </div> </div>  </div> </div>  <hr>' );   

          var elem = "myImg"+contador2;
          elem = document.getElementById(elem);
          if(elem.getAttribute('src') == "undefined")
          {
            //vacio
            elem.src= "./img/NO-IMG.png"
          }
          console.log(contador2);
          contador2++;

         });
    
   })
   /*.catch((error) => {
       console.log("Error getting documents: ", error);
   }); */

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
  updateID = db.collection("Servicios").doc(idE);
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


//************************************************************************************************** */

// SUBIR DATA PAGOS

 let btnCrear = document.getElementById('btnCrear');

 btnCrear.addEventListener('click',(e)=>{
  let fecha2 = document.getElementById('week-edit').value;

  // Si no hay fecha no corre pa
  if (fecha2 == ""){
    alert("Elige fecha");
  }

  else {
   // sacar los valores 
   let canxu= 1, canxu2=1; 
   let idnm,plan1;
   let ie=0; 
   let descuentosA = [], variosA = [];

 e.preventDefault();

//Bache para set data
 var batch = db.batch();

 for(;ie<contador-1;){
console.log(canxu);
    
  //Name id
   plan1 = "nameDriver" + canxu;
   
   console.log(plan1);
    
   //idnm = nombre conductor
  idnm = document.getElementById(plan1).textContent;
  let idnm2 = idnm+" "+fecha2; //Id para el doc
 
 console.log(idnm2 + " id");

 let servicioSelect= document.getElementById("servicio-driver"+canxu).value;
 plan2 = "monto-uber"+canxu;
 plan3 = "descuento-uber" + canxu;
 plan4 = "varios-uber" + canxu;
 plan5 = "monto-pagar" + canxu;


  //Saca lal perra data transaccion //
    // Create a reference to the SF doc.
    let autoB = 'auto'+canxu;
    let rentaB = 'renta-driver'+canxu;
 autoB =  document.getElementById(autoB).textContent;
 rentaB =  parseFloat(document.getElementById(rentaB).value);

 console.log(autoB);
 console.log(rentaB);

 plan2 = document.getElementById(plan2).value;  if(plan2 == ""){ plan2 = parseFloat( 0)};
 plan3 = document.getElementById(plan3).value;  if(plan3 == ""){ plan3 = parseFloat( 0)};
 plan4 = document.getElementById(plan4).value;  if(plan4 == ""){ plan4 = parseFloat( 0)};
 plan5 = document.getElementById(plan5).value;  if(plan5 == ""){plan5 = parseFloat(rentaB)};
 descuentosA.push(parseFloat(plan3));
 variosA.push(parseFloat(plan4));

       



// Set the value of 'NYC'
var nycRef = db.collection("Pagos").doc(idnm2);
batch.set(nycRef, {
        auto: autoB,
        debe: plan5,
        descuento: plan3,
        fecha: fecha2,
        id:idnm,
        inversion: inversionlist[canxu-1],
        monto_a_pagar: plan5,
        pagado: 0,
        renta_auto: rentaB,
        servicio: servicioSelect,
        status: "pendiente",
        uber_generado: plan2,
        varios: plan4
});

       canxu++; 
        ie++;   
}
  } // Fin else
         
batch.commit().then(() => {
  console.log("Se ha subido");  alert("Se ha subido con exito"); location.reload();
 });
 



})
 