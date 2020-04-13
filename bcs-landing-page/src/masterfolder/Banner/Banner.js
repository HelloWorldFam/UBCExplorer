import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import FirstPic from '../../Pictures/image1.jpg';
import SecondPic from '../../Pictures/image2.jpg';
import ThirdPic from '../../Pictures/image3.jpg';
import { Link } from 'react-router-dom';
import './Banner.css';

export default class Banner extends Component {
    render() {
        return (
            <section className="slider" id="home">
                <ul className="slides">
                    <li>
                        <img src={FirstPic} alt="Study" />
                        <div className="caption right-align">
                            <h2>BCS journey</h2>
                            <h5 className="">Welcome to your BCS course selector app</h5>
                            <Link to="#" className="btn btn-large blue">Find Out</Link>
                        </div>

                    
                    </li>
                    <li>
                        <img src={SecondPic} alt="Plan your timetable" />
                        <div className="caption left-align">
                            <h2>Course Schedule</h2>
                            <h5 className="">Welcome to your BCS course selector app</h5>
                            <Link to="#" className="btn btn-large blue">Find Out</Link>
                        </div>

                    
                    </li>
                    <li>
                        <img src={ThirdPic} alt="Find out your classmates" />
                        <div className="caption center-align">
                            <h2>Find your classmates</h2>
                            <h5 className="">Welcome to your BCS course selector app</h5>
                            <Link to="#" className="btn btn-large blue">Find Out</Link>
                        </div>

                    
                    </li>
                </ul>
                
            </section>
        )
    }
}
