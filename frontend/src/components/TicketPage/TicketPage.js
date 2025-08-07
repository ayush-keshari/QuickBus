import React from 'react';
import { useHistory } from 'react-router-dom';
import './TicketPage.css';

export default function TicketPage() {
    const history = useHistory(); // ✅ Use useHistory for navigation

    // ✅ Handle sign-out
    const handleSignOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('authToken');
        localStorage.removeItem('reservedSeats');
        localStorage.removeItem('nameData');
        localStorage.clear();
        history.push('/'); // ✅ Redirect to homepage
    };

    // ✅ Navigate to book again
    const handleBookAgainIcon = (e) => {
        e.preventDefault();
        history.push('/routes'); // ✅ Redirect to route selection
    };

    // ✅ Get location info safely
    const getLocationData = () => {
        const from = localStorage.getItem("start") || "Unknown";
        const to = localStorage.getItem("destination") || "Unknown";
        return (
            <div>
                <p>From: {from}</p>
                <p>To: {to}</p>
            </div>
        );
    };

    // ✅ Get passenger names safely
    const getPassengerName = () => {
        let names = [];
        try {
            names = JSON.parse(localStorage.getItem("nameData")) || [];
        } catch {
            names = [];
        }
        return names.map((name, idx) => (
            <p key={idx} className="names">{name}</p>
        ));
    };

    // ✅ Get seat numbers safely
    const getSeatNumbers = () => {
        let arr = [];
        try {
            arr = JSON.parse(localStorage.getItem("reservedSeats")) || [];
        } catch {
            arr = [];
        }
        return arr.map((seat, idx) => (
            <p key={idx} className="seatNo">{seat}</p>
        ));
    };

    // ✅ Get bus ID safely
    const getIdNumber = () => {
        const tokenData = localStorage.getItem("selectedBusId") || "N/A";
        return <p className="idData">{tokenData}</p>;
    };

    // ✅ Get date safely
    const getDateValue = () => {
        const dat = localStorage.getItem("date") || "N/A";
        return <span>On: {dat}, 10 AM (Hourly commute)</span>;
    };

    return (
        <div className="container">
            {/* ✅ Navbar */}
            <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">
                <a href="/#" className="navbar-brand Company-Log">UT</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto nav-flex-icons ic">
                        <li className="nav-item">
                            <a href="/#" className="nav-link" onClick={handleBookAgainIcon}>Book Again</a>
                        </li>
                        <li className="nav-item">
                            <a href="/#" className="nav-link" onClick={handleSignOut}>Sign-Out</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* ✅ Ticket UI */}
            <div className="tpMain">
                <article className="ticket">
                    <header className="ticket__wrapper">
                        <div className="ticket__header">1 🎟 UNIQUE TRAVELS</div>
                    </header>

                    <div className="ticket__divider">
                        <div className="ticket__notch"></div>
                        <div className="ticket__notch ticket__notch--right"></div>
                    </div>

                    <div className="ticket__body">
                        <section className="ticket__section">
                            {getLocationData()}
                            {getSeatNumbers()}
                            <p>Your seats are together <strong>{getDateValue()}</strong></p>
                        </section>

                        <section className="ticket__section">
                            <h3>Passenger Names</h3>
                            {getPassengerName()}
                        </section>

                        <section className="ticket__section">
                            <h3>Payment Method</h3>
                            <p>Credit Card</p>
                        </section>
                    </div>

                    <footer className="ticket__footer">
                        <p>Transaction-ID</p>
                        {getIdNumber()}
                    </footer>
                </article>
            </div>
        </div>
    );
}
