
export default function Rating({rating}) {
  return (
    <div className="flex gap-1 text-gray-500">
        <span ><i className={`fa-${rating >= 1 ? "solid" : "regular"} fa-star ${rating>=1 && 'text-yellow-500'}`}></i></span>
        <span ><i className={`fa-${rating >= 2 ? "solid" : "regular"} fa-star ${rating>=2 && 'text-yellow-500'}`}></i></span>
        <span ><i className={`fa-${rating >= 3 ? "solid" : "regular"} fa-star ${rating>=3 && 'text-yellow-500'}`}></i></span>
        <span ><i className={`fa-${rating >= 4 ? "solid" : "regular"} fa-star ${rating>=4 && 'text-yellow-500'}`}></i></span>
        <span ><i className={`fa-${rating >= 5 ? "solid" : "regular"} fa-star ${rating>=5 && 'text-yellow-500'}`}></i></span>
        <span className="ml-2 ">({rating})</span>
    </div>
  )
}
