
var userId;
document.addEventListener('deviceready', onDeviceReady, false);
var favList = [];
function onDeviceReady() {
        
        screen.orientation.lock('portrait');
        document.getElementById('login').onclick = signInWithEmail;
        document.getElementById('signin').onclick = dosignin;
        document.getElementById("register-signin").onclick = register;
        document.getElementById("register").onclick = openRegisterForm;

        //Set listeners for Auth State Changed
        firebase.auth().onAuthStateChanged(function (user) {
            //if there is a user enable app functionality
            if (user) {
                document.getElementById("signin-page").style.display = "none";
                document.getElementById("home-page").style.display = "block";
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                userId = uid;
                var providerData = user.providerData;

                const dbRef = firebase.database().ref();
                dbRef.child("users").child(userId).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        favList = snapshot.val().crypto;
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
                
                //else keep the app disabled or re-disabled it
            } else {
                document.getElementById('signin').onclick = dosignin;
                document.getElementById('signintext').innerHTML = "Other Sign-In Options"


            }

        });

        //Make sure the user is logged out and not a saved session
        firebase.auth().signOut();


}


function openRegisterForm(){
    document.getElementById("register-form").style.display = "block";
}

function closeRegisterForm(){
    document.getElementById("register-form").style.display = "none";
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


function addToFavorites(curr){
    console.log(userId);
    console.log(firebase.auth().currentUser.uid);
    const database = firebase.database();
    if(favList.includes(curr, 0)){
        favList = favList.filter(item => item !== curr);
        document.getElementById(curr).innerHTML = "+";
        database.ref('/users/'+ userId).set({
            crypto : favList
        });
    }else{
        favList.push(curr);
        document.getElementById(curr).innerHTML = "-";
        database.ref('/users/'+ userId).set({
            crypto : favList
        });
    }
    console.log(favList);
}
