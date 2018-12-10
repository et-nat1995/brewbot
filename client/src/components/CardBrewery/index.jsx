import React from "react";
// import Button from "../Button"

function JumboTron(props) {
    console.log(props);
    return (
        <div className="card">
            <img className="card-img-top" 
            src={props.URL}
            alt="" />
            <hr/>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <a className="card-text" href={props.link} target="_blank">Website</a>
                {/* <Button type="success" onClick={props.onClick}>Save</Button> */}
            </div>
        </div>
    )
}

export default JumboTron;