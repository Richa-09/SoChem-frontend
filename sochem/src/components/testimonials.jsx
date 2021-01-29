import React , { useState, useEffect } from 'react';
import './assets/css/main.css';
import img1 from './images/test1.jpeg';
import img2 from './images/test2.jpeg';

function Testimonials(){
    return(
        <section className="wrapper container">
        <div className="inner">
            <div className="testimonials">
                <section>
                    <div className="content">
                        <blockquote>
                            <p className="testimonial-text">The best thing about SoChem is 
                            it gives you the feeling of a family away 
                            from home, and adds to your personal and professional growth at the same time!</p>
                        </blockquote>
                        <div className="author">
                            <div className="image">
                                <img src={img1} alt="" />
                            </div>
                            <p className="credit">- <strong>Ayush Chakraborty</strong> <span>Batch of 2020</span></p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="content">
                        <blockquote>
                            <p className="testimonial-text">Having a culture within department is one of the key things, 
                            people often miss out on. Not only does SoChem maintains the legacy, it also ensures that every 
                            batch is better equipped than their senior ones.</p>
                        </blockquote>
                        <div className="author">
                            <div className="image">
                                <img src={img2} alt="" />
                            </div>
                            <p className="credit">- <strong>Sushant Kumar Sinha</strong> <span>Batch of 2020</span></p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="content">
                        <blockquote>
                            <p className="testimonial-text">Nunc lacinia ante nunc ac lobortis ipsum. Interdum adipiscing gravida odio porttitor sem non mi integer non faucibus.</p>
                        </blockquote>
                        <div className="author">
                            <div className="image">
                                <img src="images/pic02.jpg" alt="" />
                            </div>
                            <p className="credit">- <strong>Janet Smith</strong> <span>CEO - ABC Inc.</span></p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>
    );
}
export default Testimonials;