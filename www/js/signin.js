function dosignin() {

  //Clear Content
  document.getElementById("content").innerHTML = "";

  var btn = document.createElement("button");
  btn.setAttribute('id', 'google');
  btn.innerHTML = '<img class="googlelogo" src="img/googlelogo.png" />';
  btn.onclick = toggleSignIn;

  document.getElementById("content").appendChild(btn);

}

function handleAuthError(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/account-exists-with-different-credential') {
    alert('You have already signed up with a different auth provider for that email.');
    // If you are using multiple auth providers on your app you should handle linking
    // the user's accounts here.
  } else {
    console.error(error);
  }
  alert('Make sure you have updated your Firebase Config in firebase_creds.js! Check console.log for more details. \n' + errorMessage);
}

function toggleSignIn() {
  //If the current user object does not exist
  if (!firebase.auth().currentUser) {
    //Set the auth provider to Google
    var provider = new firebase.auth.GoogleAuthProvider();
    //And sign in with a popup
    firebase.auth().signInWithRedirect(provider)
      .then(function () {
        // signInWithRedirect does not provide any result
        // We can get it with getRedirectResult()
        firebase.auth().getRedirectResult()
          .then(function (result) { //On Success save the token to session storage and output it to console
            // Make sure the credential exists:
            if (result && result.credential) {
              var token = result.credential.accessToken;
              window.sessionStorage.setItem("token", token);
              console.log(token)
            }
          })
          .catch(handleAuthError);

      })
      .catch(handleAuthError);
  } else {
    firebase.auth().signOut();
  }
}

