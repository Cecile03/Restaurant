import { SnackbarBuilder } from "./utils/snackbar.js";
import { setCookie } from "./utils/cookie.js";

const loginEmail = document.querySelector(".login-email");
const loginPassword = document.querySelector(".login-password");
const loginButton = document.querySelector(".login-button");



const signupUsername = document.querySelector(".signup-username");
const signupEmail = document.querySelector(".signup-email");
const signupPassword = document.querySelector(".signup-password");
const signupButton = document.querySelector(".signup-button");


const signupPage = document.querySelector(".a-signup");
const loginPage = document.querySelector(".a-login");


const signupForm = document.querySelector(".signup-form");
const loginForm = document.querySelector(".login-form");




signupPage.addEventListener("click", () => {
    console.log("signup clicked");
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
});

loginPage.addEventListener("click", () => {
    console.log("login clicked");
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
});





signupButton.addEventListener("click", async () => {
    console.log("signup button clicked");

    const username = signupUsername.value;
    const email = signupEmail.value;
    const password = signupPassword.value;
    
    if(!username || !email || !password) {
        new SnackbarBuilder('entrer tous les champs')
            .buildWarning()
            .render(document.querySelector('.snackbar-container'));
    } else {
        console.log(username, email, password);
        signup(username, email, password)
            .then((result) => {
                if(result.status === 200) {
                    new SnackbarBuilder('compte réussie, vous pouvez vous connecter')
                        .buildSuccess()
                        .render(document.querySelector('.snackbar-container'));
                    return;
                } else {
                    throw new Error('erreur lors de la création du compte');
                }
            })
            .catch((err) => {
                new SnackbarBuilder('erreur lors de la création du compte')
                    .buildError()
                    .render(document.querySelector('.snackbar-container'));
            });
    }
});





loginButton.addEventListener("click", async () => {
    console.log("login button clicked");

    const email = loginEmail.value;
    const password = loginPassword.value;

    if(!email || !password) {
        new SnackbarBuilder('entrer tous les champs')
            .buildWarning()
            .render(document.querySelector('.snackbar-container'));
    } else {
        const result = await login(email, password);
        if(result.status === 200) {
            const data = await result.json();
            setCookie("token", data.token, 1);
            setCookie("username", data.username, 1);
            setCookie("userId", data.idUser, 1);
            setCookie('email', data.email, 1);
            window.location.href = "/html/accueil.html";
        } else {
            new SnackbarBuilder('erreur de connexion')
                .buildError()
                .render(document.querySelector('.snackbar-container'));
        }
    }
});











const signup = async (username, email, password) => {
    try {
        const result = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, email, password})
        });
        return result;
        
    } catch(err) {
        console.log(err);
        return {
            status: 500,
            message: "erreur lors de la création du compte",
            error: err
        };
    }
};
 
const login = async (email, password) => {
    try {
        const result = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

        return result;
    } catch(err) {
        console.log(err);
        return {
            status: 500,
            message: "erreur lors de la connexion",
            error: err
        };
    }
};


