import React from 'react'; 
import './Header.css';

const header = (props) => {
    return (
    <div className="wrapper">
        <span className="border border-dark">
            <div className="row" id="App-header">
                <div className="col-sm-12"><h1 className="App-title">Gross</h1></div>
                <div className="col-sm-12" id="App-subtitle">
                    <h3 className="Subtitle-bar">
                        <span>
                        Your Guide to Financial Growth and Literacy
                        </span>
                    </h3>
                </div>
                <div className="col-sm-12">
                    <div className="Spacing"/>
                </div>
            </div>
        </span>
    </div>
    );
}

export default header;