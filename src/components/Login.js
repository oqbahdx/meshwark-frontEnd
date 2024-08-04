import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Intro.css'; // Ensure you include this import
import QRCode from 'react-qr-code';
import logo from '../images/logo.png';

const Intro = () => (
  <div id="page-top" style={{ direction: 'rtl' }}>
    <header className="masthead">
      <div className="container px-5">
        <div className="row gx-5 align-items-center">
          <div className="col-lg-6">
            <div className="mb-5 mb-lg-0 text-center text-lg-end">
              <h1 className="display-1 lh-1 mb-3">خدمتك في الوقت المناسب.</h1>
              <p className="lead fw-normal text-muted mb-5">توصلك إلى وجهتك بسهولة وراحة، متاحة على مدار الساعة في متناول يدك.</p>
              <div className="d-flex flex-column flex-lg-row align-items-center justify-content-lg-end">
                <a className="ms-lg-3 mb-4 mb-lg-0" href="#!"><img className="app-badge" src="assets/img/google-play-badge.svg" alt="Google Play Badge" /></a>
                <a href="#!"><img className="app-badge" src="assets/img/app-store-badge.svg" alt="App Store Badge" /></a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="masthead-device-mockup">
              <div className="device-wrapper">
                <div className="device" data-device="iPhoneX" data-orientation="portrait" data-color="black">
                  <div className="screen bg-black d-flex justify-content-center align-items-center">
                    <QRCode value="https://example.com" />
                  </div>
                </div>
              </div>
              <img src={logo} alt="Logo" className="mt-4 mx-auto d-block" style={{ maxWidth: '50%' }} />
            </div>
          </div>
        </div>
      </div>
    </header>
    {/* Add other sections like Features, Call to Action, etc., similarly */}
  </div>
);

export default Intro;
