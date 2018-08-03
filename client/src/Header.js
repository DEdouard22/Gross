import React from 'react'; 
import './Header.css';
import GrossNavbar from './GrossNavbar';

const Header = (props) => {
    return (
        <div>
        <GrossNavbar />
    <div className="wrapper">

            <div className="row">
                <div className="col-12" id="App-header">
                    <h1 className="App-title">Gross</h1>
                </div>
            </div>    
            <div className="row">
                <div className="col-12" id="App-subtitle">
                    <h3 className="Subtitle-bar">
                        <span>
                        Your Guide to Financial Growth and Literacy
                        </span>
                    </h3>
                </div>
            </div>

                {/* <div className="col-sm-12">
                    <div className="Spacing"/>
                </div> */}

        </div>
    </div>
    );
}

export default Header;