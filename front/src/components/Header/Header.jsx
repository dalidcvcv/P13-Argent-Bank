import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../../redux/authSlice";
import logo from "../../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css'

function Header() {
	const loggedIn = useSelector((state) => state.auth.loggedIn);// Accès à l'état de connexion
	const user = useSelector((state) => state.auth.user);// Accès aux infos utilisateur
	const dispatch = useDispatch();
	// Gère la déconnexion de l'utilisateur
	const handleSignOut = () => { localStorage.clear(); dispatch(signOut()); };

	return (
		<header>
			<nav className="main-nav">
				<Link to="/" className="main-nav-logo">
					<img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
					<h1 className="sr-only">Argent Bank</h1>
				</Link>
				<div>
					{!loggedIn ? (
						<Link to="/login" className="main-nav-item">
							<FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
							Sign In
						</Link>
					) : (
						<>
							<Link to="/profile" className="main-nav-item">
							<FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle"/>
								{user?.firstName || "User"}
							</Link>

							<Link to="/" onClick={handleSignOut} className="main-nav-item">
							<FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
							</Link>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Header;
