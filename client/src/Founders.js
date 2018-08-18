import React from 'react'; 
import './About.css';
import carlyimg from './carly.jpg';
import kamimg from './kam.jpg';


const Founders = (props) => {
    return (
        <div>
            <div className="row">
                        <div className="col-12" id="about">
                            <h2>Gross Founders</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="card">
                                <div>
                                        <img id="founders" src={ kamimg } />
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-text">Kami Kassim</h3>
                                        <p>Kamilah is a Full-Stack Software Engineer specializing in creative web development. She is the woman behind the vision and brilliance of Gross.</p>                       
                                    </div>    
                            </div>
                        </div>                       
                        <div className="col-3">
                            <div className="card">
                                <div>
                                    <img id="founders" src={ carlyimg } />
                                </div>
                                <div className="card-body">
                                    <h3 className="card-text">Carly Harper</h3>
                                    <p>Carly is a Full-Stack Software Engineer specializing in product management. She keeps those ambitious devs on track with Gross' goals and product roadmaps.</p>                       
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="card">
                                <div>
                                <img id="founders" src={ carlyimg } />
                                </div>
                                <div className="card-body">
                                    <h3 className="card-text">David Edouard</h3>
                                    <p>David is a Full-Stack Software Engineer specializing in competitive intelligence. David is a "jack-of-all-trades" and we also like to call him the "Git-Master".</p>
                                </div>
                            </div>
                        </div>
                    <div className="col-3">
                        <div className="card">
                            <div >
                                <img id="founders" src={ carlyimg } />
                            </div>
                            <div className="card-body">
                                <h3 className="card-text">Gabriel Edouard</h3>
                                <p>Gabriel is a Full-Stack Software Engineer specializing in user experience. He's the silent killer. He's quiet but is always wayyyy ahead of YOU.</p>
                            </div>
                        </div>
                    </div>                
        </div>
        </div>
);
}

export default Founders;