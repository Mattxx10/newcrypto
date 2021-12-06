

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
        screen.orientation.lock('portrait');
        
        document.getElementById('signin').onclick = dosignin;

        //Set listeners for Auth State Changed
        firebase.auth().onAuthStateChanged(function (user) {
            //if there is a user enable app functionality
            if (user) {
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                window.location.href = "../www/home.html";
                document.getElementById('signintext').innerHTML = "Sign-out";
                document.getElementById('signin').onclick = function (){
                    firebase.auth().signOut();

                }

                //else keep the app disabled or re-disabled it
            } else {
                document.getElementById('signin').onclick = dosignin;
                document.getElementById('signintext').innerHTML = "Other Sign-In Options"


            }

        });

        //Make sure the user is logged out and not a saved session
        firebase.auth().signOut();


}

function togglePopUpMenu(){
    if(document.getElementById("popup-menu").style.display == "none")
        document.getElementById("popup-menu").style.display = "block";
    else
        document.getElementById("popup-menu").style.display = "none";
}

function signout(){
    firebase.auth().signOut();
    window.location.href = "../www/index.html";
}
