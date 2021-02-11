import React, { useState, useEffect } from 'react';
import heroPatternImage from "./Images/hero-pattern.png";
import { avatars } from "./Images.js";

function GetGitHubProfile({ login }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.github.com/users/${login}`)
            .then(response => response.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(console.error)
    }, [login]);
    if (loading) { return (<h2>Loading ...</h2>) }
    if (data) {
        if (data.message === "Not Found") {
            return (
                <>
                    <img className="avatarImage" src={avatars.DefaultAvatar} alt="stock avatar" />
                    <h2>Sorry, profile not found.</h2>
                </>
            )
        }
        return (
            <>
                <img className="avatarImage" src={data.avatar_url} alt="User's Profile fetched from gitHub" />
                <h2>{data.name}</h2>
            </>
        )
    }
    return (
        <>
            <h2> Enter your GitHub Username.</h2>
        </>)
}

function Navbar() {
    const [login, setLogin] = useState(null);
    const [manualEntry, setManualEntry] = useState(true);
    const [uname, setUname] = useState(null);
    const [imgsrc, setImgsrc] = useState(avatars.DefaultAvatar);
    const [userInput, setUserInput] = useState("");
    return (
        <nav>
            <img src={heroPatternImage} alt="pattern for" className="heroPatternImage" />
            <div className="navbar wrapper">
                <div>
                    {(manualEntry) ?
                        <><img className="avatarImage" src={imgsrc} alt="stock avatar" />
                            <h2>{uname}</h2>
                        </> : <><GetGitHubProfile login={login} /></>}
                </div>
                <div>
                    {(manualEntry) ?
                        <>
                            <div className="avatarContainer blurContainer">
                            <p className="blurContainerTitle textWhite">Choose an Avatar </p>
                                <div><img src={avatars.Avatar1} onClick={() => setImgsrc(avatars.Avatar1)} alt="first avatar" /></div>
                                <div><img src={avatars.Avatar2} onClick={() => setImgsrc(avatars.Avatar2)} alt="second avatar" /></div>
                                <div><img src={avatars.Avatar3} onClick={() => setImgsrc(avatars.Avatar3)} alt="third avatar" /></div>
                                <div><img src={avatars.Avatar4} onClick={() => setImgsrc(avatars.Avatar4)} alt="forth avatar" /></div>
                                <div><img src={avatars.Avatar5} onClick={() => setImgsrc(avatars.Avatar5)} alt="fifth avatar" /></div>
                                <div><img src={avatars.Avatar6} onClick={() => setImgsrc(avatars.Avatar6)} alt="sixth avatar" /></div>
                                <div><img src={avatars.Avatar7} onClick={() => setImgsrc(avatars.Avatar7)} alt="seventh avatar" /></div>
                                <div><img src={avatars.Avatar8} onClick={() => setImgsrc(avatars.Avatar8)} alt="eighth avatar" /></div>
                                <div><img src={avatars.Avatar9} onClick={() => setImgsrc(avatars.Avatar9)} alt="ninth avatar" /></div>
                                <div><img src={avatars.DefaultAvatar} onClick={() => setImgsrc(avatars.DefaultAvatar)} alt="Default avatar" /></div>
                            </div>
                        </> : null}
                </div>
                <div className="blurContainer">
                    <button className="blurContainerTitle rounded_btn dark_btn" onClick={() => (manualEntry) ? setManualEntry(false) & setUserInput("") : setManualEntry(true) & setUserInput("")}>{(manualEntry) ? "Use GitHub Instead" : "Enter Manually"}</button>
                    <input className="rounded_btn" type="text" value={userInput} placeholder={(manualEntry) ? "Enter your name" : "GitHub Username"} onChange={(e) => setUserInput(e.target.value)} />
                    <button className="rounded_btn" onClick={() => (manualEntry) ? setUname(userInput) : setLogin(userInput)}>Submit</button>
                </div>
            </div>
            <div className="custom-shape-divider-bottom-1612443736">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </nav>
    )
}

export default Navbar;
