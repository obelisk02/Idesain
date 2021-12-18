$(document).ready(function(){
   
    $('#phone-number').mask('000-000-0000');
   })

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

  //Saca los autos
  
          let cont=1; let texto1="";  let texto2; sociosarray=[],autosarray=[] , turnosChecker=[] ;     
          // 2 arrays

          let x = document.getElementById("auto-driver");
          
  let db = firestore.collection("Auto").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
       // console.log(doc.id, " => ", doc.data());
      
       let option = document.createElement("option");
        texto1= doc.data().id  +" " + doc.data().marca + " " + doc.data().modelo +" " + doc.data().anio
        option.text = texto1
        x.add(option,x[cont]); cont++;


          autosarray.push(texto1);
          sociosarray.push(doc.data().inversion);
          turnosChecker.push(doc.data().matutino);
          turnosChecker.push(doc.data().vespertino);


      
    }); 
});
      console.log(autosarray);
      console.log(sociosarray);
      console.log(turnosChecker);

// Sacar socios
texto1=""; cont=1 ; let y = document.getElementById("auto-socio");
 firestore.collection("Socio").get().then((querySnapshot) => {
  
  querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     // console.log(doc.id, " => ", doc.data());
    
     let option = document.createElement("option");
      texto1= doc.id ;
      option.text = texto1
      y.add(option,y[cont]);
  });
});
//************************************************************* */




const driverform= document.getElementById('driver-form');
  
    let rentaSemanal;
    let submitBtn = document.getElementById('btn-driver-submit')

  submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();

//**************   */   POST DRIVER
db =firestore.collection("Conductor");
     
     
let nombre = driverform['name-driver'].value;
let auto = driverform['auto-driver'].value; 
let phone = driverform['phone-number'].value;
let turno = driverform['hora-driver'].value;
//let socio = driverform['auto-socio'].value;
let renta = driverform['renta-auto'].value;

let asdf = autosarray.indexOf(auto); console.log(asdf);

// Crear un checker si ya existe un turno matutino o vespsertino
let position;
if (turno == "Matutino"){
  //if (asdf ==0 ){ asdf }
  position = (asdf*2)  ;
}

if (turno == "Vespertino"){
  //if (asdf ==0 ){ asdf }
  position = (asdf*2) +1 ;
}


let indexTurno = turnosChecker[position];
if (indexTurno == ""){     // CORRE NORMAL , NO EXISTE CONDUCTOR 
  console.log(sociosarray[asdf]);

  if(renta<0){
    renta = renta * -1
  }
  
  
  db.doc(nombre).set({
      nombre: nombre,
      auto: auto,
      telefono: phone,
      turno: turno,
      renta_auto: renta,
      activo: true,
      inversion: sociosarray[asdf]
  }).then ( ()=>{
      console.log("Data enviada");  //driverform.reset();
   //alert("Se agrego correctamente conductor")

  
  }).catch((error) =>{
      console.log(error)
  });;
  
    /// sacar id del carro
   // idupdate = auto.substr(auto.length - 5);
   idupdate = auto.substr(0, 5);
    console.log(idupdate)
  
    // UPDATE
    db= firestore.collection("Auto").doc(idupdate);
    let turno1 = driverform['hora-driver'].value;
    console.log(turno1)
    if (turno1 == "Matutino"){
      return db.update({
        matutino: nombre
    })
    .then(() => {
        console.log("Documento se ha actualizado - persona matutina");  driverform.reset();
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    }
  
    if (turno1 == "Vespertino"){
      return db.update({
        vespertino: nombre
    })
    .then(() => {
        console.log("Documento se ha actualizado - persona vespertina");  driverform.reset();
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    }
   
  
  
  
          driverform.reset();
} 
// TERMINA EL NORMAL RUN , ABAJO SI YA HAY ALGUIEN ENEL TURNO

else {
let text = "Ya EXISTE conductor para este turno: \n"+indexTurno+"\nDesea cambiarlo?";
  if (confirm(text) == true) {
   // console.log(sociosarray[asdf]);


    if(renta<0){
      renta = renta * -1
    }
    
    
    db.doc(nombre).set({
        nombre: nombre,
        auto: auto,
        telefono: phone,
        turno: turno,
        renta_auto: renta,
        activo: true,
        inversion: sociosarray[asdf]
    }).then ( ()=>{
        console.log("Data enviada");  //driverform.reset();
     //alert("Se agrego correctamente conductor")
   
     
    // UPDATE QUITARLE EL TURNO AL CONDUCTOR ANTERIOR

      db= firestore.collection("Conductor").doc(indexTurno);  console.log("ENTRE !!!" +indexTurno);
     
    
       return db.update({
          turno: "",
          auto: ""
      })
      .then(() => {
          console.log("Documento se ha actualizado - quitarle turno");  //driverform.reset();
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
   
    //********************************** */
       
    
    }).catch((error) =>{
        console.log(error)
    });;
    
      /// sacar id del carro
     // idupdate = auto.substr(auto.length - 5);
     idupdate = auto.substr(0, 5);
      console.log(idupdate)
    
      // UPDATE
      db= firestore.collection("Auto").doc(idupdate);
      let turno1 = driverform['hora-driver'].value;
      console.log(turno1)
      if (turno1 == "Matutino"){
        return db.update({
          matutino: nombre
      })
      .then(() => {
          console.log("Documento se ha actualizado - persona matutina2");  //driverform.reset();
          location.reload();
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
      }
    
      if (turno1 == "Vespertino"){
        return db.update({
          vespertino: nombre
      })
      .then(() => {
          console.log("Documento se ha actualizado - persona vespertina2");  //driverform.reset();  
          location.reload();
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
      }
     
    
 
    
    
            //driverform.reset();
  } else {
        console.log("No quiere");
  }
}
///******* ************************


     
//location.reload();
location.reload();

  })




