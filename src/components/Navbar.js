import React from 'react';

const Navbar = (props) => {
    const { account } = props;
    return (
        <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-white">
                <h2>Marketplace</h2>
                <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small><span id="account">{account}</span></small>
                </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;
