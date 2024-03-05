import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/authSlice"; 
import "./NameForm.css";

// Composant du formulaire de modification du nom
const EditNameForm = ({ user, onSave, onCancel }) => {
    // États locaux pour le prénom et le nom de famille
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const dispatch = useDispatch();

    // Gestionnaire de sauvegarde des modifications du profil
    const handleSave = () => {
        const updatedUserData = { firstName, lastName }; // Objet contenant les données màj
        dispatch(updateUserProfile(updatedUserData))// Dispatch de l'action pour mettre à jour le profil 
            .then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {// Vérification si la màj a réussi
                    onSave(updatedUserData); // Appel de la fonction onSave avec les données màj
                } else {
                    console.error("Failed to update profile");
                }
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    };

    // Construction du DOM pour le formulaire de modification du nom
    return (
        <div className="editName">
            <div className="inputBox">
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div className="btnBox">
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditNameForm;

