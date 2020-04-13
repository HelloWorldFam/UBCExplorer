import React, { Component } from 'react'
import Pic1 from '../../Pictures/yes2.jpg';
import Pic2 from '../../Pictures/yes3.jpg';
import Pic3 from '../../Pictures/yes1.jpg';
import { HashLink as Link } from 'react-router-hash-link';

export default class About extends Component {
         render() {
        return (
            <section id="about" className="section section-about scrollspy">
                <div className="container">
                    <div className="row">
                        <h4 className="center">
                             <span className="purple-text darken-1">OUR</span> FEATURES
                         </h4>
                         <div className="col s12 m4">
                             <div className="card">
                                 <div className="card-image">
                                     <img src={Pic1} alt="Schedule" />
                                     <span className="card-title">Schedule</span>
        <Link className="btn-floating activator halfway-fab waves-effect waves-light purple"><i class="material-icons">search</i></Link>
        
                                 </div>
                                 <div className="card-content">
                                 <p>description to be added here</p>
                                 </div>
                                 <div className="card-reveal">
                                 <span className="card-title grey-text text-darken-4">description to be added here<i className="material-icons right">close</i></span>
                                 <p>description to be added here</p>
                                 </div>
                             </div>
                             
                         </div>
                         <div className="col s12 m4">
                             <div className="card">
                                 <div className="card-image">
                                     <img src={Pic2} alt="Course Finder" />
                                     <span className="card-title">Course Finder</span>
        <Link className="btn-floating activator halfway-fab waves-effect waves-light purple"><i class="material-icons">search</i></Link>
        
                                 </div>
                                 <div className="card-content">
                                 <p>description to be added here</p>
                                 </div>
                                 <div className="card-reveal">
                                 <span className="card-title grey-text text-darken-4">description to be added here<i className="material-icons right">close</i></span>
                                 <p>description to be added here</p>
                                 </div>
                             </div>
                             
                         </div>
                         <div className="col s12 m4">
                             <div className="card">
                                 <div className="card-image">
                                     <img src={Pic3} alt="Discussion Forum" />
                                     <span className="card-title">Discussion Forum</span>
        <Link className="btn-floating activator halfway-fab waves-effect waves-light purple"><i class="material-icons">search</i></Link>
        
                                 </div>
                                 <div className="card-content">
                                 <p>description to be added here</p>
                                 </div>
                                 <div className="card-reveal">
                                 <span className="card-title grey-text text-darken-4">description to be added here<i className="material-icons right">close</i></span>
                                 <p>description to be added here</p>
                                 </div>
                             </div>
                             
                         </div>
                         </div>
                    </div>
            </section>
        )
    
}
}



