import contactImage from '../assets/contact us.png'
export default function Contact() {
  return (
    <div className='min-h-screen max-w-[1000px] mx-auto px-4 '>
        <div className='flex flex-col md:flex-row justify-center max-h-[900px] py-[40%] md:py-[20%]'>
              <div className='flex justify-center items-center'>
                <img src={contactImage} alt="contactUs" className='max-w-[450px] h-auto object-cover aspect-square'/>
              </div>

              <div className='flex flex-col gap-6 md:px-4 mt-8  md:mt-0 text-nowrap'>
                  <h1 className='text-center text-4xl font-rubik'>Contact Us</h1>
                  <p className='text-gray-700 font-light text-wrap'>If you have any questions or feedback, please don't hesitate to contact us.</p>
                  <p className='text-2xl text-[#5e5e5e] mt-5'><i className='fa-solid fa-envelope'></i> <span className='font-normal ml-5'>u2H6a@example.com</span></p>
                  <p className='text-2xl text-[#636363]'><i className='fa-solid fa-phone'></i> <span className='font-normal ml-5'>+91 9876543210</span></p>
                  <p  className='text-2xl text-[#636363]'><i className='fa-solid fa-location-dot'></i><span className='font-normal ml-5'>Khasibazar, kalanki</span></p>
              </div>
        </div>
    </div>
  )
}
