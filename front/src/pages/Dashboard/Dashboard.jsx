import React, { useState } from "react";
import { useSelector } from "react-redux";
import NameForm from '../../components/NameForm/NameForm';

function Dashboard() {
    const { loggedIn, user } = useSelector((state) => state.auth);
    const [isModifying, toggleEdit] = useState(false);

    const handleSaveName = (updatedUser) => {
        toggleEdit(false); 
    };

    const handleEditClick = () => toggleEdit(true);
    const handleCancelEdit = () => toggleEdit(false);

    return (
        <main className="main bg-dark">
            <div className="header">
			<h1>
    			Welcome back<br />
    			{loggedIn ? (
        			isModifying ? (
            			<NameForm user={user} onSave={handleSaveName} onCancel={handleCancelEdit} />
        			) : (
            			<>
                			{`${user.firstName} ${user.lastName}`}
                			<div>
                    			<button className="edit-button" onClick={handleEditClick}>Edit Name</button>
                			</div>
            			</>
        			)
    			) : "Guest"}
			</h1>

            </div>
			<h2 className="sr-only">Accounts</h2>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Checking (x8349)</h3>
					<p className="account-amount">$2,082.79</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Savings (x6712)</h3>
					<p className="account-amount">$10,928.42</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
					<p className="account-amount">$184.30</p>
					<p className="account-amount-description">Current Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
		</main>
	);
}

export default Dashboard;
