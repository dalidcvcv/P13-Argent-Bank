import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/authSlice"; 
import "./NameForm.css";

const EditNameForm = ({ user, onSave, onCancel }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const dispatch = useDispatch();

    const handleSave = () => {
        const updatedUserData = { firstName, lastName };
        dispatch(updateUserProfile(updatedUserData))
            .then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    onSave(updatedUserData); 
                } else {
                    console.error("Failed to update profile");
                }
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    };

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

