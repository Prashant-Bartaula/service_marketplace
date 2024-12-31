import notFound from '../assets/404 Not Found.png'
export default function NotFoundPage() {
  return (
    <div className="min-h-[1000px] max-w-[800px] mx-auto w-full flex justify-center items-center text-5xl text-gray-500">
      <img src={notFound} alt="not_found" className='w-full object-cover'/>
    </div>
  )
}
