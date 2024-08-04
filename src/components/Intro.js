import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Intro.css'; // Ensure you include this import
import QRCode from 'react-qr-code';
import logo from '../images/logo.png';
import android from '../images/android.png';
import iphone from '../images/iphone.png';

const Intro = () => (
  <div id="page-top" style={{ direction: 'rtl' }}>
    <header className="masthead">
      <div className="container px-5">
        <div className="row gx-5 align-items-center justify-content-center">
          <div className="col-lg-6">
            <div className="mb-5 mb-lg-0 text-center">
              <h1 className="display-1 lh-1 mb-3">خدمتك في الوقت المناسب.</h1>
              <p className="lead fw-normal text-muted mb-5">توصلك إلى وجهتك بسهولة وراحة، متاحة على مدار الساعة في متناول يدك.</p>
              <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center">
                <div className="d-flex flex-column align-items-center mx-3">
                  <img src={android} alt="Android" className="app-mockup mb-2" style={{ maxWidth: '100px' }} />
                  <QRCode value="https://play.google.com/store" size={128} />
                  <p className="text-muted mt-2">متجر الاندرويد</p>
                </div>
                <div className="d-flex flex-column align-items-center mx-3">
                  <img src={iphone} alt="iPhone" className="app-mockup mb-2" style={{ maxWidth: '100px' }} />
                  <QRCode value="https://www.apple.com/app-store/" size={128} />
                  <p className="text-muted mt-2">متجر الايفون</p>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </header>
    {/* Add other sections like Features, Call to Action, etc., similarly */}
  </div>
);

export default Intro;
