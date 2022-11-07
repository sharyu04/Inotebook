import React from 'react';
import { Link, useLocation , useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid" style={{margin:"0px 15px"}}>
                <Link className="navbar-brand" to="/" style={{  
                    fontSize: "35px",
                    fontWeight: "bold",
                    margiLeft: "15px"
                }}><span style={{color:"blue"}}>i</span>Notes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-2">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/"? "active":""}`} aria-current="page" to="/" style={{fontSize:"20px"}}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about"? "active":""}`} to="/about" style={{fontSize:"20px"}}>About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                        <Link className="btn btn-outline-primary mx-2" to="/login" type="submit" style={{fontWeight: "bold"}}>Login</Link>
                        <Link className="btn btn-outline-primary mx-2" to="/signup" type="submit" style={{fontWeight: "bold"}}>SignUp</Link>
                    </form>: <button onClick={handleLogout} className='btn btn-primary' style={{
                        marginRight: "40px",
                        padding: "10px",
                        fontSize: "17px",
                        fontWeight: "bold"
                    }}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar