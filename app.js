$(document).ready(function () {

    });

       
    const firebaseConfig  = {
            apiKey: "AIzaSyCWVd8mU-V5rLgbVygpvlN9EMBBJQe5nE8",
            authDomain: "idesain-uber.firebaseapp.com",
            projectId: "idesain-uber",
            storageBucket: "idesain-uber.appspot.com",
            messagingSenderId: "1069226085704",
            appId: "1:1069226085704:web:9d73d993b334002722777d"
    };    
 

    sessionStorage.setItem('key', 'value');




    // TABLa Main 
    firebase.initializeApp(firebaseConfig);
    const firestore = firebase.firestore()
  const tabladriver= document.getElementById('tabla-main');

  firestore.collection("Auto").onSnapshot((querySnapshot) => {
    tabladriver.innerHTML = '';

    cont = 1;
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tabladriver.innerHTML += ` <tr>
      
        <td >${doc.id}</td>
        <td >${doc.data().marca} ${doc.data().modelo}</td>
        <td class="text-center">${doc.data().anio}</td>
        <td class="text-center">${doc.data().placa}</td>
        <td class="text-center">${doc.data().inversion}</td>
        <td class="text-left"><a href="#" id="matutino${cont}" onclick='showtime(this.id)'>${doc.data().matutino}</a></td>
        <td class="text-left"><a href="#" id="vespertino${cont}" onclick='showtime(this.id)'>${doc.data().vespertino}</a></td>
       
        
       
      </tr>`

      cont++;
    }); 
}); //href="pago-conductor.html



// HREF AL SHOW CONDUCTOR
function showtime(user_id){
    let data_id = document.getElementById(user_id).textContent;
    console.log(data_id);
    sessionStorage.setItem('user_pago', data_id);
    window.location.href = "pago-conductor.html";
}