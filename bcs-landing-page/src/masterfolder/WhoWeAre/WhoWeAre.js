import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import Pic3 from '../../Pictures/gg.jpg';
import './Gallery.css';

const Photo = ({ img, alt }) => {
    return (
        <div className="col s12 m4 marg">
            <img className="materialboxed responsive-img" src={img} alt={alt} />
        </div>
    )
}



class PhotoGallery extends Component {
    state = {
        photo: [
            {
                id: 1,
                img: Pic3,
                alt: "robot"

            },
            {
                id: 2,
                img: Pic3,
                alt: "robot"

            },
            {
                id: 3,
                img: Pic3,
                alt: "robot"

            },
            {
                id: 4,
                img: Pic3,
                alt: "robot"

            },
            {
                id: 5,
                img: Pic3,
                alt: "robot"

            },
            {
                id: 6,
                img: Pic3,
                alt: "robot"

            },

        ]
    }
    render() {
        return (
            <div className="row">
                {this.state.photo.map(gal => (
                    <Photo key={gal.id}
                        img={gal.img} alt={gal.alt} />
                ))}
            </div>

        );

    }
}


export default class WhoWeAre extends Component {
    render() {
        return (

            <section id="WhoWeAre" className="section section-WhoWeAre scrollspy">
                <div className="navbarpadding">
                    <div className="container">
                        <h4 className="center">
                            <span className="blue-text text-darken-1">FOUNDERS</span> WHO WE ARE

                        <p className="sizeFont">
                                We are a team of six, current BCS students
                        </p>
                        </h4>
                        <PhotoGallery />
                    </div>


                    <div className="col s12 m6">
                        <div className="card-panel white center">
                            <i class="material-icons">emoji_people</i>
                            <h4>Our Vision</h4>
                            {/* <form>
                                <div className="input-field">
                                    <input type="text" id="vision" className="validate" /> */}
                            {/* <label for="vision" className="blue-text">With the BCS course-selector App, we hope to deliver a one-in-all website</label> */}
                            <p>With the BCS course-selector App, we aim to deliver a one-in-all with course planning</p>
                        </div>


                        {/* </form> */}
                    </div>
                </div>
            </section>
        )
    }
}