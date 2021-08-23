
let RestrntName = document.getElementById("restrntName")
let RestrntEmail = document.getElementById("restrntemail")
let RestrntPass = document.getElementById("restrntpass")
let RestrntCont = document.getElementById("restrntcont")
let RestrntCity = document.getElementById("restrntcity")
let RestrntImage = document.getElementById("restrntImg")

let db = firebase.firestore();
let storage=firebase.storage();
 
let activeUser;
let UserName = document.getElementById("Username")
let UserEmail = document.getElementById("Useremail")
let UserPass = document.getElementById("Userpass")
let UserCont = document.getElementById("Usercont")
let UserCity = document.getElementById("Usercity")
let UserPhone = document.getElementById("Userphone")


let LoginEmail=document.getElementById("LoginEmail")
let LoginPass=document.getElementById("LoginPass")


let DishImage=document.getElementById("DishImage");
let DishName=document.getElementById("DishName");
let DishDesc=document.getElementById("DishDesc");
let Dishprice=document.getElementById("Dishprice");

let RestrntImgUrl;
let RestaurantDishes;


function CreateRestaurent() {

    firebase.auth().createUserWithEmailAndPassword(RestrntEmail.value, RestrntPass.value)
        .then((userCredential) => {
            // Signed in 

            var user = userCredential.user;
            console.log(userCredential, userCredential, "User saved")
            // RestrntImgUrl= GetRestImage();

                console.log("ssaasd")
            
            let RestaurantToSave = {
                UserId: user.uid,
                RestaurantName: RestrntName.value,
                RestaurantEmail: RestrntEmail.value,
                Country: RestrntCont.value,
                City: RestrntCity.value,
                UserRole:"Restaurant"
            };
            SaveRestaurant(RestaurantToSave);
        })

        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });


}


let RestrntImageId=Math.round(Math.random()*10000);

function CreateUser() {

    firebase.auth().createUserWithEmailAndPassword(UserEmail.value, UserPass.value)
        .then((userCredential) => {
            // Signed in 

            var user = userCredential.user;
            console.log(userCredential, userCredential, "User saved")



            

            let UserToSave = {
                UserId: user.uid,
                UserName: UserName.value,
                UserEmail: UserEmail.value,
                Country: UserCont.value,
                City: UserCity.value,
                Phone: UserPhone.value,
                UserRole:"Customer"
            };


            SaveUser(UserToSave);

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });


}


function GetRestImage(para1,para2){
    let file=RestrntImage.files[0];
    let displayRestImgRef=storage.ref().child('Restaurent images/'+RestrntImageId)
    console.log(file.name);
    displayRestImgRef.put(file)
    .then(()=>{
        // RestrntImgUrl= displayRestImgRef.getDownloadURL()
        // console.log(RestrntImgUrl)
            //  return displayRestImgRef.getDownloadURL();
            let prrra=para1+para2
            return prrra;
    })

}



function SaveRestaurant(RestaurantSave) {

    db.collection("Restaurant").doc(RestaurantSave.UserId).set(RestaurantSave).then(console.log("Done"));


}

function SaveUser(UserToSave) {

    db.collection("Users").doc(UserToSave.UserId).set(UserToSave).then(console.log("Done"));


}


function LoginUser(){
    // console.log("Succses")
    // alert("userLogin");
    firebase.auth().signInWithEmailAndPassword(LoginEmail.value, LoginPass.value)
  .then((userCredential) => {
    

    // Signed in

    
    var user = userCredential.user;
    // console.log("Succses",userCredential,user)
    let userid=user.uid;

    var docRef = db.collection("Restaurant").doc(userid);

     // var docref2= db.collection("Users").doc(userid);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            let userRoleData=doc.data().UserRole;
            if(userRoleData==="Restaurant"){
                window.location="adminpanel.html";
            }
            
        }
            
        
        else {
            window.location="index.html"
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
       
        
}).catch((error) => {
    console.log("Error getting document:", error);
});
    
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  });
}
    

function userRedirect(userRoleCheck)
{
    console.log(userRoleCheck.UserRole);
    if(userRoleCheck==="Restaurant"){
        window.location="adminpanel.html";
    }
    else if(userRoleCheck1="Restaurant"){
        window.location="index.html";
    }
}

function forgetPass () {
    var emailAddress = UserEmail.value
    firebase
    .auth()
    .sendPasswordResetEmail(emailAddress)
    .then(() => {
        alert('email sent')
        // Password reset email sent!
        // ..
    })
    .catch(error => {
        var errorCode = error.code
        var errorMessage = error.message
        console.error(error)
    })
}

function SignOut(){
    alert
    firebase
    .auth()
    .signOut()
    .then(() => {
        // Sign-out successful.
        alert('Signout')
        window.location="login.html"
    })
    .catch(error => {
        // An error happened.
    })
}

function authCheck(){
    // console.log(activeUser);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // alert("SignIn")
            activeUser=user.uid;
            return activeUser
            
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          // ...
        } else {
            // alert("SignOut")
          // User is signed out
          // ...
        }
      });
      
}




var card = document.getElementById("card");
var restcard = document.getElementById("restcard");


function FecthList(){
    db.collection("Restaurant")
  .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
              console.log(change.doc.data())
              addProductsinDom(change.doc.data())
           
            }
          if (change.type === "modified") {
              console.log("Modified ListItems: ", change.doc.data());
             
              updateInDom(change.doc.id);
          }
          if (change.type === "removed") {
            console.log("Removed Item: ", change.doc.id);
            removeListFromDOM(change.doc.id);
          }
      });
  });
  } 




  function FecthRest(){
    db.collection("Dishes")
  .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
              console.log(change.doc.data())
            //   addProductsinDom(change.doc.data())
            addresinDom(change.doc.data())

           
            }
          if (change.type === "modified") {
              console.log("Modified ListItems: ", change.doc.data());
             
              updateInDom(change.doc.id);
          }
          if (change.type === "removed") {
            console.log("Removed Item: ", change.doc.id);
            removeListFromDOM(change.doc.id);
          }
      });
  });
  } 



  let randomNum=Math.round(Math.random()*10000);


function getimage(){
    let file=DishImage.files[0];
    let displayImgRef=storage.ref().child('images/'+randomNum)
    console.log(file.name);
    displayImgRef.put(file)
    .then(()=>{
      displayImgRef.getDownloadURL()

        .then((url)=>{
            console.log(url);
            SaveProduct(url);
          
        })
    })

}


function SaveProduct(imgUrl){
    
        console.log(imgUrl);

    let saveproduct={
        RestaurantId:activeUser,
        imageUrl:imgUrl,
        product:DishName.value,
        productDesc:DishDesc.value,
        productPrice:Dishprice.value
    }

    db.collection("Dishes").add(saveproduct)
    .then((result) => {
        console.log("success")
    }).catch((err) => {
        
    });

}


function addProductsinDom(recieveData){

    var mainDiv=document.createElement("div");
    mainDiv.setAttribute("class","productDiv");
    mainDiv.setAttribute("onclick","RestrntRedirect('"+recieveData.UserId +"')");
    mainDiv.setAttribute("id",recieveData.UserId);
    var imageDiv=document.createElement("div");
    var productImg = document.createElement("img");
    productImg.setAttribute("src","images/kfc.png")
    productImg.setAttribute("class", "img")
    imageDiv.setAttribute("class","imageDiv");
    // imageDiv.setAttribute("id","imageDiv");
    var ProductHeading=document.createElement("h3");
    ProductHeading.setAttribute("class","PHeadDiv");
    ProductHeading.setAttribute("id","PHeadDiv");
    var productDetails=document.createElement("p");
    productDetails.setAttribute("class","PDetailDiv");
    // var productPrice=document.createElement("h5");
    // productPrice.setAttribute("class","PriceDiv");

    let headingText=document.createTextNode(recieveData.RestaurantName);
    let DescText=document.createTextNode(recieveData.City);
    // let PriceText=document.createTextNode(recieveData.productPrice);

    ProductHeading.appendChild(headingText);
    imageDiv.appendChild(productImg);
    productDetails.appendChild(DescText);
    // productPrice.appendChild(PriceText);

    


    mainDiv.appendChild(imageDiv);
    mainDiv.appendChild(ProductHeading);
    mainDiv.appendChild(productDetails);
    // mainDiv.appendChild(imageDiv);
    // mainDiv.appendChild(productPrice);

    card.appendChild(mainDiv);

}


let card2=document.getElementById("card2")

function addresinDom(recieveData1){

    

    
    var mainDiv=document.createElement("div");
    mainDiv.setAttribute("class","productDiv");
    mainDiv.setAttribute("onclick","RestrntRedirect('"+recieveData1.UserId +"')");
    mainDiv.setAttribute("id",recieveData1.UserId);
    var imageDiv=document.createElement("div");
    var productImg = document.createElement("img");
    productImg.setAttribute("src","images/kfc.png")
    productImg.setAttribute("class", "img")
    imageDiv.setAttribute("class","imageDiv");
    // imageDiv.setAttribute("id","imageDiv");
    var ProductHeading=document.createElement("h3");
    ProductHeading.setAttribute("class","PHeadDiv");
    ProductHeading.setAttribute("id","PHeadDiv");
    var productDetails=document.createElement("p");
    productDetails.setAttribute("class","PDetailDiv");
    // var productPrice=document.createElement("h5");
    // productPrice.setAttribute("class","PriceDiv");

    let headingText=document.createTextNode("Food");
    let DescText=document.createTextNode("Food Descrp");
    // let PriceText=document.createTextNode(recieveData1.productPrice);

    ProductHeading.appendChild(headingText);
    imageDiv.appendChild(productImg);
    productDetails.appendChild(DescText);
    // productPrice.appendChild(PriceText);

    


    mainDiv.appendChild(imageDiv);
    mainDiv.appendChild(ProductHeading);
    mainDiv.appendChild(productDetails);
    // mainDiv.appendChild(imageDiv);
    // mainDiv.appendChild(productPrice);

    card2.appendChild(mainDiv);

}


// function addrestsinDom(recieveData1){

//     var mainDiv=document.createElement("div");
//     mainDiv.setAttribute("class","productDiv");
//     mainDiv.setAttribute("id","productDiv");
//     var imageDiv=document.createElement("div");
//     var productImg = document.createElement("img");
//     productImg.setAttribute("src",recieveData1.imageUrl)
//     productImg.setAttribute("class", "img")
//     imageDiv.setAttribute("class","imageDiv");
//     // imageDiv.setAttribute("id","imageDiv");
//     var ProductHeading=document.createElement("h3");
//     ProductHeading.setAttribute("class","PHeadDiv");
//     ProductHeading.setAttribute("id","PHeadDiv");
//     var productDetails=document.createElement("p");
//     productDetails.setAttribute("class","PDetailDiv");
//     var productPrice=document.createElement("h5");
//     productPrice.setAttribute("class","PriceDiv");

//     let headingText=document.createTextNode(recieveData1.product);
//     let DescText=document.createTextNode(recieveData1.productDesc);
//     let PriceText=document.createTextNode(recieveData1.productPrice);

//     ProductHeading.appendChild(headingText);
//     imageDiv.appendChild(productImg);
//     productDetails.appendChild(DescText);
//     productPrice.appendChild(PriceText);

    


//     mainDiv.appendChild(imageDiv);
//     mainDiv.appendChild(ProductHeading);
//     mainDiv.appendChild(productDetails);
//     // mainDiv.appendChild(imageDiv);
//     mainDiv.appendChild(productPrice);

//     restcard.appendChild(mainDiv);

// }

function RestrntRedirect(restrntCard){
    
    console.log(restrntCard);

    RestaurantDishes=restrntCard



    window.location="restraunts.html?id="+restrntCard;
}