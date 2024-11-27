import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './HomePage.css'; // Custom styles
import sliderImg1 from './images/slider_img1.jpg';
import sliderImg2 from './images/slider_img2.jpg';
import sliderImg4 from './images/slider_img4.jpg';

const HomePage = () => {
    const slides = [
        { img: sliderImg4, caption: 'Grievance Entry', link: '/grievance-entry' },
        { img: sliderImg2, caption: 'About Us', link: '/about-us' }
    ];

    return (
        <div className="homepage-content">
            {/* Carousel Section */}
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {slides.map((_, index) => (
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                            key={index}
                        ></button>
                    ))}
                </div>

                <div className="carousel-inner">
                    {slides.map((item, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                            <img src={item.img} className="d-block w-100" alt={`Slide ${index + 1}`} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{item.caption}</h5>
                                <Link to={item.link} className="btn btn-primary">Go to {item.caption}</Link>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <section className="homepage__content container mt-4" style={{ maxWidth: '800px' }}>
                <h2 className="text-center">Introduction</h2>
                <p className="text-center">
                    Grievance Redressal System (GRS) is an efficient tool designed for employees in the Zilla Parishad (ZP) office to monitor, track, and manage grievances.
                    The system simplifies the process of handling grievances by providing real-time updates, detailed records, and status tracking for each issue.
                </p>
                <p className="text-center">
                    GRS ensures that every grievance is recorded, categorized, and addressed systematically, enhancing transparency and accountability within the office.
                    With built-in reporting features and easy access to grievance histories, the system streamlines communication and resolution, ensuring swift action and better service to the public.
                </p>
            </section>

            <div className="homepage__content container mt-4" style={{ maxWidth: '800px' }}>
                <section>
                    <h2 className="text-center section-title">Get Started</h2>
                    <p className="text-center section-text">Click on the options below to manage grievances efficiently and effectively.</p>
                </section>
            </div>

            <footer className="homepage__footer">
                <div className="container text-center">
                    <div className="social-icons">
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>
                    <p className="mt-2">© 2024 GRS. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
