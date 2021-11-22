
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

  //GET autos
         
        let texto1=""
  let db = firestore.collection("Auto").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
       // console.log(doc.id, " => ", doc.data());
       let x = document.getElementById("auto-driver");
       let option = document.createElement("option");
        texto1= doc.data().id + " "+doc.data().marca + " " + doc.data().modelo +" " + doc.data().anio  
        option.text = texto1
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
          total: costototal
      
      }).then ( ()=>{
          console.log("Data enviada")
      }).catch((error) =>{
          console.log(error)
      })
      alert("Se registro correctamente")

      serviceform.reset()
      myModal1.hide()
  });