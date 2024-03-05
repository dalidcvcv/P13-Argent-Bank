import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice"; 
import "./Login.css"

function SignIn() {
    // État local pour les champs du formulaire
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    // Hooks pour la navigation et le dispatch d'actions Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Gestionnaire pour le bouton de connexion
    const handleSignIn = () => {
        ("Sign In clicked");
        dispatch(login({ email: username, password }))
            .then((response) => {
 
                if (response.meta.requestStatus === 'fulfilled') {
                    navigate("/profile");
                } else {
                    alert("Mot de passe ou login erronés");
                }
            })
    };
    // Éléments DOM du formulaire de connexion
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="button" onClick={handleSignIn} className="sign-in-button">
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
}

export default SignIn;
