function register(){
    var email = document.getElementById("register-email").value;
   
   var password = document.getElementById("register-password").value;
   firebase.auth().createUserWithEmailAndPassword(email, password)
   .then((userCredential) => {
       // Signed in 
       const user = userCredential.user;
       console.log(user);
   })
   .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
      console.log(errorCode);
      if(errorCode == "auth/email-already-in-use"){
          console.log("error");
      }
      if(errorCode == "auth/invalid-email"){
          document.getElementById("register-email").style.borderColor ="red";
          document.getElementById("err-msg").innerHTML = "Invalid Email."
      }else{
        document.getElementById("register-email").style.borderColor ="white";
      }
      if(errorCode == "auth/weak-password"){
        document.getElementById("register-password").style.borderColor ="red";
        document.getElementById("err-msg").innerHTML = "Weak password."
      }
      else{
        document.getElementById("register-password").style.borderColor ="white";
      }
   });
 }