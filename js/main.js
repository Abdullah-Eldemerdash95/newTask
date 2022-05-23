// constants 
const RegisterButton = document.getElementById("RegisterButton");
const SignInButton = document.getElementById("SignInButton");




window.addEventListener("load" , 
()=> {
      //def-page
RegisterButton.addEventListener("click", redirect);
SignInButton.addEventListener("click", redirect2);
})


// redirect function register page
function redirect() {
  window.location.href = "/register.html";
}
// redirect2 function sign in page
function redirect2() {
    window.location.href = "/signIn.html";
  }