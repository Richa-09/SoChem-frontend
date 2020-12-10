import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Person from './person';
import Navbar from './navbar';
import Footer from './footer';
import PeopleBlock from './people-block';
var FontAwesome = require('react-fontawesome');



function People(){
    const [family, setFamily] = useState([]);
    const [token, setToken] = useCookies();
    const [showDetails, setShowDetails] = useState(null);
    useEffect(() => {
        fetch(`http://13.71.44.98/api/family`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mr-token']}`,
            }
            }).then(res => res.json()).then(res => setFamily(res))
            .catch( error => console.log(error))    
    }, [])

    return (
        <div>
            <Navbar/>        
            <div className="jumbotron text-center cont-home-sochem" style={{marginTop:'95px'}}>
                    {showDetails ? <h1>{showDetails.first_name}'s Profile
                    <span className="ml-3 p-3 d-inline d-md-none"><a href="#"><FontAwesome  style={{fontSize:'1.5rem'}} name="times-circle" onClick={() =>setShowDetails(null)}/></a></span>
                    </h1>
                        : <h1>SoChem Family</h1>
                    }
            </div>
            <div className="container">
                {showDetails ? <Person userId={showDetails} setShowDetails={setShowDetails}/>:
                <div>
                {family.map((family, index) => {
                    return (
                        <div className="border p-4 m-3 bg-light">
                            <h4 className="mb-4">{family.batch}</h4>
                            {JSON.parse(family.user_id).map((id, index) => {
                                return (
                                    <div>
                                        <PeopleBlock user_id={id} setShowDetails={setShowDetails}/>
                                    </div>
                                );
                            })}

                        </div>
                    );
                })}</div>}
            </div>
            <Footer/>
        </div>

    );
}

export default People;