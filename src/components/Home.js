import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';  // Ensure your CSS file is named correctly
import QRCode from 'react-qr-code';
import logo from '../images/logo.png';
import android from '../images/android.png';
import iphone from '../images/iphone.png';

const Home = () => (
  <div id="page-top" style={{ direction: 'rtl' }}>
    <header className="masthead py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 align-items-center justify-content-center">
          <div className="col-lg-6">
            <div className="text-center">
              <img src={logo} alt="Logo" className="img-fluid mb-4" style={{ maxWidth: '150px' }} />
              <h1 className="display-4 fw-bold mb-3" style={{ color: '#4C6DAA' }}>خدمتك في الوقت المناسب.</h1>
              <p className="lead text-muted mb-4">توصلك إلى وجهتك بسهولة وراحة، متاحة على مدار الساعة في متناول يدك.</p>
              <div className="d-flex flex-wrap justify-content-center">
                <AppDownloadButton 
                  image={android} 
                  alt="Android" 
                  qrValue="https://play.google.com/store" 
                  storeName="متجر الاندرويد"
                />
                <AppDownloadButton 
                  image={iphone} 
                  alt="iPhone" 
                  qrValue="https://www.apple.com/app-store/" 
                  storeName="متجر الايفون"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section className="features py-5">
      <div className="container px-4 px-lg-5">
        <h2 className="text-center mb-5" style={{ color: '#4C6DAA' }}>مميزات التطبيق</h2>
        <div className="row gx-4 gx-lg-5">
          <FeatureItem icon="fa-map-marker-alt" title="تتبع المركبة" description="تابع رحلتك في الوقت الحقيقي" />
          <FeatureItem icon="fa-clock" title="توفير الوقت" description="وصول سريع إلى وجهتك" />
          <FeatureItem icon="fa-star" title="تقييم السائقين" description="ضمان جودة الخدمة" />
          <FeatureItem icon="fa-route" title="رحلات متنوعة" description="مشوارك يوصلك الى مكانك و تسافر الى مكان تريده" />
          <FeatureItem icon="fa-truck" title="نقل الأثاث" description="تبي تنقل عفشك و محتار ؟ ما عليك نوصلك الى باب بيتك" />
          <FeatureItem icon="fa-car-side" title="خدمة السطحة" description="محتاج سطحة و لا تبي تنقل سياراتك داخل او خارج المدينه ؟ انت في المكان المناسب" />
        </div>
      </div>
    </section>
  </div>
);

const AppDownloadButton = ({ image, alt, qrValue, storeName }) => (
  <div className="d-flex flex-column align-items-center mx-3 mb-4">
    <img src={image} alt={alt} className="app-mockup mb-2" style={{ maxWidth: '80px' }} />
    <QRCode value={qrValue} size={100} />
    <p className="text-muted mt-2">{storeName}</p>
  </div>
);

const FeatureItem = ({ icon, title, description }) => (
  <div className="col-md-4 mb-4 mb-md-0">
    <div className="text-center">
      <i className={`fas ${icon} fa-3x mb-3`} style={{ color: '#FFFFFF' }}></i>
      <h3 className="h4 mb-2" style={{ color: '#FFFFFF' }}>{title}</h3>
      <p className="text-white-50 mb-0">{description}</p>
    </div>
  </div>
);

export default Home;
