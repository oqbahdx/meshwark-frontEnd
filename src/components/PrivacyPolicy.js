import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { FaShieldAlt, FaUserLock, FaShareAlt, FaLock, FaUserCog, FaHistory, FaPhoneAlt } from 'react-icons/fa';

const PrivacyPolicy = () => {
    const sections = [
        {
            title: 'المعلومات التي نجمعها',
            icon: <FaUserLock />,
            content: (
                <>
                    <p>نجمع المعلومات التالية لتحسين تجربتك في استخدام التطبيق:</p>
                    <ul>
                        <li><strong>معلومات شخصية:</strong> الاسم، رقم الهاتف، عنوان البريد الإلكتروني، والمعلومات المتعلقة بالحساب مثل تفاصيل التسجيل.</li>
                        <li><strong>معلومات الموقع:</strong> الموقع الجغرافي لجهازك لتحديد موقعك الحالي وتقديم خدمات نقل دقيقة.</li>
                        <li><strong>معلومات الدفع:</strong> تفاصيل الدفع اللازمة لإتمام عمليات الدفع، مثل رقم بطاقة الائتمان أو معلومات الحساب البنكي.</li>
                        <li><strong>معلومات الرحلات:</strong> تفاصيل الرحلات التي قمت بها، بما في ذلك أوقات الانطلاق والوصول والنقاط التي توقفت عندها.</li>
                        <li><strong>معلومات الاستخدام:</strong> بيانات حول كيفية استخدامك للتطبيق، مثل الصفحات التي تزورها والأوقات التي تقضيها في استخدام التطبيق.</li>
                    </ul>
                </>
            )
        },
        {
            title: 'كيفية استخدام المعلومات',
            icon: <FaUserCog />,
            content: (
                <>
                    <p>نستخدم المعلومات التي نجمعها لأغراض مختلفة، بما في ذلك:</p>
                    <ul>
                        <li><strong>تقديم الخدمات:</strong> لتحديد موقعك، ترتيب رحلاتك، وإتمام عمليات الدفع.</li>
                        <li><strong>تحسين الخدمة:</strong> لتحليل كيفية استخدام التطبيق وتحسين تجربة المستخدم.</li>
                        <li><strong>التواصل معك:</strong> لإرسال إشعارات، تحديثات، وعروض خاصة.</li>
                        <li><strong>التسويق:</strong> لتقديم عروض ترويجية وخدمات مخصصة تتعلق بنقل الركاب.</li>
                        <li><strong>الأمان:</strong> لضمان سلامة وأمان النظام والتطبيق وحمايته من الاحتيال.</li>
                    </ul>
                </>
            )
        },
        {
            title: 'كيفية مشاركة المعلومات',
            icon: <FaShareAlt />,
            content: (
                <>
                    <p>قد نشارك معلوماتك مع أطراف ثالثة في الحالات التالية:</p>
                    <ul>
                        <li><strong>شركاء الخدمة:</strong> شركات معالجة الدفع، مقدمي خدمات الدعم الفني، ومزودي الخدمات الآخرين الذين يساعدوننا في تشغيل التطبيق.</li>
                        <li><strong>الامتثال للقانون:</strong> عندما يكون ذلك ضروريًا للامتثال للقوانين واللوائح المعمول بها أو لحماية حقوقنا.</li>
                        <li><strong>الأغراض التجارية:</strong> في حالة بيع أو دمج أو نقل أصول الشركة، قد يتم نقل المعلومات كجزء من الصفقة.</li>
                    </ul>
                </>
            )
        },
        {
            title: 'حماية المعلومات',
            icon: <FaLock />,
            content: (
                <p>نتخذ تدابير أمان مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الاستخدام أو التغيير أو الإتلاف. ومع ذلك، لا يمكن ضمان أمان المعلومات التي ترسلها عبر الإنترنت بشكل كامل.</p>
            )
        },
        {
            title: 'حقوقك',
            icon: <FaUserCog />,
            content: (
                <p>لك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها أو حذفها وفقًا للقوانين المعمول بها. يمكنك أيضًا إلغاء الاشتراك في تلقي الرسائل الترويجية في أي وقت.</p>
            )
        },
        {
            title: 'تغييرات في سياسة الخصوصية',
            icon: <FaHistory />,
            content: (
                <p>قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة، ويعتبر استمرارك في استخدام التطبيق بعد نشر التحديثات بمثابة قبول للتعديلات.</p>
            )
        }
    ];

    return (
        <Container className="my-5" style={{direction: 'rtl'}}>
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="shadow-lg">
                        <Card.Body>
                            <h1 className="text-center mb-4" style={{ color: '#4C6DAA' }}>
                                <FaShieldAlt className="me-2" />
                                سياسة الخصوصية
                            </h1>
                            <p className="lead text-center mb-5">
                                نحن في مشوارك نلتزم بحماية خصوصيتك وسرية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام ومشاركة المعلومات التي نقدمها أثناء استخدامك لتطبيقنا لنقل الركاب بين المدن.
                            </p>
                            
                            <Accordion defaultActiveKey="0">
                                {sections.map((section, index) => (
                                    <Accordion.Item eventKey={index.toString()} key={index}>
                                        <Accordion.Header>
                                            {section.icon}
                                            <span className="ms-2">{section.title}</span>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {section.content}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>

                            <Card className="mt-5 bg-light">
                                <Card.Body>
                                    <h5 className="card-title">
                                        <FaPhoneAlt className="me-2" />
                                        الاتصال بنا
                                    </h5>
                                    <p>إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، يرجى الاتصال بنا على:</p>
                                    <ul>
                                        <li><strong>مشوارك</strong></li>
                                        <li><strong>السعودية - جده - شارع الاندلس</strong></li>
                                        <li><strong>info@meshwark.com</strong></li>
                                        <li><strong>050 123 4567</strong></li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PrivacyPolicy;