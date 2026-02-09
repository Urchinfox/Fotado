'use client';

import style from './contact.module.scss'
import { contactData } from '@/app/staticData/contactData'
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [status, setStatus] = useState(null); // sending / success / error
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' }); // 清空表單
            } else {
                setStatus('error');
                setErrorMsg(data.error || '傳送失敗，請稍後再試');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg('網路錯誤，請檢查連線');
        }
    };
    return (<>
        <h1 className="sr-only">Contact Us</h1>
        <h2 className="text-center mt-13 mb-15">Get in touch, let us know <br />
            how we can help</h2>

        <div className="container bg-white rounded-5 p-8">
            <div className="row align-items-center">
                <div className="col-6">
                    <div className={`${style.map} `}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.6415937835604!2d121.46186537499442!3d25.04623437780841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a861138c6661%3A0xa7ebc084e1b6bed4!2sNo.%2010%E8%99%9F%2C%20Lane%2063%2C%20Huacheng%20Rd%2C%20Xinzhuang%20District%2C%20New%20Taipei%20City%2C%20242!5e0!3m2!1ses!2stw!4v1770625377512!5m2!1ses!2stw"
                            width="100%"
                            height="440"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Map to Our Office – Xinzhuang Plant (Drag to view nearby areas)"
                        ></iframe>
                    </div>
                </div>
                <div className="col-6">

                    <form onSubmit={handleSubmit} >
                        <div className="d-flex flex-column flex-lg-row gap-4">
                            <div className="flex-grow-1">
                                <label htmlFor="name" className="form-label">Your Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex-grow-1">
                                <label htmlFor="email" className="form-label">Your Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Write something..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="mt-auto">
                            <button
                                type="submit"
                                className="w-100 btn btn-neutral-80"
                                disabled={status === 'sending'}
                            >
                                {status === 'sending' ? 'sending...' : 'Send Message'}
                            </button>
                        </div>


                        {status === 'success' && (
                            <p className="text-success text-center mt-3">Message sent, We'll respond to you soon!</p>
                        )}
                        {status === 'error' && (
                            <p className="text-danger text-center mt-3">{errorMsg}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>

        <div className="container my-9">
            <div className="row">
                {contactData.map((item, index) => {
                    return (
                        <div className="col-4" key={index}>
                            <div className='bg-white rounded-4 d-flex align-items-center p-4'>
                                <div className={`bg-neutral-80 p-4 me-2 rounded-2 ${style.frame}`}><i className={`text-white fs-5 ${item.icon}`}></i></div>
                                <div >
                                    <p className='text-neutral-60'>{item.title}</p>
                                    <p>{item.txt}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>
        </div>

    </>)
}