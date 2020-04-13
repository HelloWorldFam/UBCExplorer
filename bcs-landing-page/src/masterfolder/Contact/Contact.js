import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'

export default class Contact extends Component {
    render() {
        return (
            <section id="contact" className="section section-contact scrollspy">
                <div className="container">
                    <div className="row">
                    <div className="col s12 m6">
                        <div className="card-panel blue white-text center">
                        <span class="material-icons">mail</span>
                        <h4>Email</h4>
                        <p>Please email us for any questions:_____ @gmail.com</p>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card-panel white center">
                        <i class="material-icons">emoji_people</i>
                            <h4>Our Vision</h4>
                            {/* <form>
                                <div className="input-field">
                                    <input type="text" id="vision" className="validate" /> */}
                                        {/* <label for="vision" className="blue-text">With the BCS course-selector App, we hope to deliver a one-in-all website</label> */}
                                        <p>With the BCS course-selector App, we hope to deliver a one-in-all with course planning</p>
                                        <p>More description to be added here</p>
                                </div>


                            {/* </form> */}

                        </div>
                    </div>
                    </div>
                {/* </div> */}


            </section>

        )
    }
}
