var config = {
    apiKey: "AIzaSyBlMJp9jBQyHUH8Khcqv8p09quHbDChXYc",
    authDomain: "my-food-nutrition-tracker.firebaseapp.com",
    databaseURL: "https://my-food-nutrition-tracker.firebaseio.com",
    projectId: "my-food-nutrition-tracker",
    storageBucket: "my-food-nutrition-tracker.appspot.com",
    messagingSenderId: "488189533802"
};
firebase.initializeApp(config);
let db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const loginForm = $('#login-input');
const users = db.collection('users');
let loggedUser,findUser, exists= 0, username='';
$('#submit').on('click', function(e){
    e.preventDefault();
    exists = 0;
    let temp = loginForm.find('#login-username')[0].value;
    console.log('entered username', temp);
    findUser = users.where('username', '==', temp);
    console.log(findUser);
    // users.get().then((snapshot) => {
    //     snapshot.docs.forEach(doc => {
    //         if(doc.data().username === temp){
    //             username = temp;
    //             console.log('username inside', username)
    //             $('body').removeClass('body-fixed');
    //             $('#login-modal').addClass('hidden');

    //             exists = 1;
    //         } else{
    //             alert('Invalid username');
    //         }
    //     })
    // }).catch(function(error){
    //     alert('Error: ', error);
    // }).then(function(){
    //     console.log('hello', username);
    // })
    loginForm.find('#login-username')[0].value = '';

})
console.log('find user', findUser);
// function userLogin

// function generateUserData(username){
//     let tempUser = users.doc(username).get().then(function(doc){
//         if(doc.exists){
//             console.log('Data', data.doc())
//         } else {
//             console.log('No Document.')
//         }
//     }).catch(function(error){
//         console.log('Error: ', error)
//     })
// }
