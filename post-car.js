//import { initializeApp } from "firebase/app";
//import { getFirestore } from "firebase/firestore";


//const db = firebase.firestore();


/*
const db= require("firebase");
// Required for side-effects
require("firebase/firestore");


carform.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const nombre = carform['nombre-car'].value;
    const apellido = carform['apellido-car'].value;

    const response = await db.collection('sexo').doc().set({
        name: nombre,
        lastname: apellido
    })

    console.log(response)

    console.log(nombre,apellido);
})

*/

// Your web app's Firebase configuration
$(document).ready(function(){
    $('#birth-date').mask('00/00/0000');
    $('#phone-number').mask('0000-0000');
   })

const firebaseConfig = {
    apiKey: "AIzaSyCWVd8mU-V5rLgbVygpvlN9EMBBJQe5nE8",
    authDomain: "idesain-uber.firebaseapp.com",
    projectId: "idesain-uber",
    storageBucket: "idesain-uber.appspot.com",
    messagingSenderId: "1069226085704",
    appId: "1:1069226085704:web:9d73d993b334002722777d"
  };

  const carform= document.getElementById('form-car');
firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore()




  // Scar inversion

  let texto1=""; let rentaSemanal; let cont=1;  let x = document.getElementById("inversion-auto");
  let db = firestore.collection("Socio").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
       // console.log(doc.id, " => ", doc.data());
      
       let option = document.createElement("option");
        texto1= doc.id ;
        option.text = texto1
        x.add(option,x[cont]);
    });
});

  db =firestore.collection("Auto")
  let submitBtn = document.getElementById('btn-auto-submit')

  submitBtn.addEventListener('click',(e)=>{
      e.preventDefault()

      let id = carform['id-auto'].value;
      let marca = carform['marca-auto'].value;
      let modelo = carform['modelo-auto'].value;
      let anio = carform['anio-auto'].value;
      let placa = carform['placa-auto'].value;
      //let renta = carform['renta-auto'].value;
      let inversion = carform['inversion-auto'].value;

      db.doc(id).set({
          id: id,
          activo: true,
          marca: marca,
          modelo: modelo,
          anio: anio,
          placa: placa,
          kilometros: "",
          kmviejo: "",
          servicios: "",
          inversion: inversion,
          matutino: "",
          vespertino: "",
          reparar:"",
          observaciones: ""
          


      }).then ( ()=>{
          console.log("Data enviada")
      }).catch((error) =>{
          console.log(error)
      })
      alert("Se registro correctamente")

      carform.reset()
  })