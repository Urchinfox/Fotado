import style from './contact.module.scss'
import { contactData } from '@/app/staticData/contactData'
export default function Contact() {
    return (<>
        <h1 className="sr-only">Contact Us</h1>
        <h2 className="text-center mt-13 mb-15">Get in touch, let us know <br />
            how we can help</h2>

        <div className="container bg-white rounded-5">
            <div className="row align-items-center">
                <div className="col-6">
                    <div className={`${style.map}`}>

                    </div>
                </div>
                <div className="col-6">
                    <form>
                        <div className='d-flex'>

                            <div className="me-4">
                                <label for="name" className="form-label">Your Name</label>
                                <input type="password" className="form-control" id="name" />
                            </div>
                            <div>
                                <label for="email" className="form-label">Your Email</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>

                        </div>
                        <div className="mb-3 mb-8">
                            <label for="exampleFormControlTextarea1" className="form-label">Message</label>
                            <textarea placeholder='Write something...' className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>

                        <div>
                            <button type="submit" className="w-100 btn btn-neutral-80">Send Message</button>
                        </div>
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
                                <div className={`bg-neutral-80 p-4 me-2 rounded-2 ${style.frame}`}><i class={`text-white fs-5 ${item.icon}`}></i></div>
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