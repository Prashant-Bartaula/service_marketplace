import {Link} from 'react-router-dom'
export default function Footer() {
  return (
    <div className='border-t border-gray-400  bg-slate-100'>
      <div className='py-9 px-5 mx-auto flex flex-wrap justify-between gap-16 items-center'>
        <div>
          <h1 className='  font-rubik font-semibold text-4xl'>Service Bazar</h1>
        </div>
        <div>
            <ul className='flex flex-wrap gap-5 sm:gap-10 md:gap-16 text-lg'>
              <Link to='/'  className='hover:text-purple-400 duration-200 ease-linear transition-all'>Home</Link>
              <Link to='/about'  className='hover:text-purple-400 duration-200 ease-linear transition-all'>About</Link>
              <Link to='/contact'  className='hover:text-purple-400 duration-200 ease-linear transition-all'>Contact</Link>
            </ul>
        </div>
      </div>
        <div className='w-full border-t border-gray-300  py-2 px-4'>
          <p>Copyright &copy; 2025 Service Bazar</p>
        </div>
    </div>
  )
}
