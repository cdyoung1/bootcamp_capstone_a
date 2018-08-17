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

let username, findUser, selectedDate, dateValue, dateSelector;
function padMonth (month){
    if((month.getMonth()+1)<10){
        return '0' + (month.getMonth()+1);
    } else{
        return month.getMonth()+1;
    }
}
function padDate (date){
    if(date.getDate()<10){
        return '0' + date.getDate();
    } else{
        return date.getDate();
    }
}
function defaultDate(){
    dateValue = '';
    dateSelector = '';
    selectedDate = new Date();
    dateValue += selectedDate.getFullYear() + '-' + padMonth(selectedDate) + '-' + padDate(selectedDate);
    dateSelector += selectedDate.getFullYear()+padMonth(selectedDate) + padDate(selectedDate)
    $('#date-picker').find('#date-selector')[0].value = dateValue;
}
$('.prev').on('click', function(e){
    dateValue = '';
    dateSelector = '';
    console.log('before', selectedDate);
    selectedDate.setDate(selectedDate.getDate()-1);
    console.log('after', selectedDate);
    dateValue += selectedDate.getFullYear() + '-' + padMonth(selectedDate) + '-' + padDate(selectedDate);
    dateSelector += selectedDate.getFullYear()+padMonth(selectedDate) + padDate(selectedDate)
    $('#date-picker').find('#date-selector')[0].value = dateValue;
    console.log($('#date-picker').find('#date-selector')[0].value);
    loadData(dateSelector);
})
$('.next').on('click', function(e){
    dateValue = '';
    dateSelector = '';
    console.log('before', selectedDate);
    selectedDate.setDate(selectedDate.getDate()+1);
    console.log('after', selectedDate);
    dateValue += selectedDate.getFullYear() + '-' + padMonth(selectedDate) + '-' + padDate(selectedDate);
    dateSelector += selectedDate.getFullYear()+padMonth(selectedDate) + padDate(selectedDate)
    $('#date-picker').find('#date-selector')[0].value = dateValue;
    console.log($('#date-picker').find('#date-selector')[0].value);
    loadData(dateSelector);
})
$('#submit').on('click', function(e){
    e.preventDefault();
    defaultDate();
    exists = 0;
    username = loginForm.find('#login-username')[0].value;
    password = loginForm.find('#login-password')[0].value;
    console.log('entered username', username);
    findUser = users.doc(username).get().then(function(doc) {
        console.log(doc.data());
        if(doc.exists && (doc.data().password == password)){
            console.log('Document data: ', doc.data());
            $('body').removeClass('body-fixed');
            $('#login-modal').addClass('hidden');
            alert("Successful Login.")
            loadData(dateSelector);
        } else if(doc.exists && (doc.data().password != password)){
            alert("Incorrect Password. Please try again.")
        } else{
            if(confirm('Invalid Login. Would you like to create an account under this username?')){
                $('body').removeClass('body-fixed');
                $('#login-modal').addClass('hidden');
                alert(`Account created under username \'${username}\'.`);  
                users.doc(username).set({
                    username: username,
                    password: password
                })
                loadData(dateSelector);
            }
        }
    }).catch(function(error){
        console.log('Error found: ', error)
    })
    loginForm.find('#login-username')[0].value = '';
    loginForm.find('#login-password')[0].value = '';

})
$('#sign-out-btn').on('click', function(){
    $('body').addClass('body-fixed');
    $('#login-modal').removeClass('hidden');
})
$('#date-selector').change(function(){
    dateValue = '';
    dateSelector = '';
    let tempValue = $('#date-picker').find('#date-selector')[0].value;
    console.log('temp', tempValue);
    let tempYear = parseInt(tempValue.substring(0,4));
    let tempMonth = parseInt(tempValue.substring(5,7))-1;
    let tempDate = parseInt(tempValue.substring(8,10));
    console.log(tempValue);
    selectedDate = new Date(tempYear, tempMonth, tempDate);
    dateValue += selectedDate.getFullYear() + '-' + padMonth(selectedDate) + '-' + padDate(selectedDate);
    dateSelector += selectedDate.getFullYear()+padMonth(selectedDate) + padDate(selectedDate);
    $('#date-picker').find('#date-selector')[0].value = dateValue;
    loadData(dateSelector);
})
function loadData(dateSelector){
    console.log('entered')
    users.doc(username).collection('date').doc(dateSelector).set({
        date: parseInt(dateSelector)
    }, {merge: true});
    // users.doc(username).collection('date').doc(dateSelector).collection('breakfast').doc('burger').set({
    //     food_name: 'chicken1',
    //     calories: 540.14,
    //     cholesterol: 122.04,
    //     dietary_fiber: null,
    //     potassium: 569.52,
    //     protein: 34.28,
    //     saturated_fat: 10.52,
    //     sodium: 791,
    //     sugars: null,
    //     carbohyrdrates: 40.27,
    //     total_fat: 26.56,
    //     quantity: 1,
    //     serving_qty: 1,
    //     serving_unit: 'sandwich',
    //     tag_id: 608,
    //     nix_item_id: null,
    // }, {merge: true})
    // console.log(users.doc(username).collection('date').doc(dateSelector).collection('breakfast').doc('burger').get().then(function(doc){
    //     if(doc.exists){
    //         console.log(doc.data());
    //     } else{
    //         console.log('No document');
    //     }
    // }).catch(function(error){
    //     console.log("error", error);
    // }))
}
