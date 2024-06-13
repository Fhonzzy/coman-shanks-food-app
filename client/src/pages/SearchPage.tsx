import { useSearchRestaurant } from '@/api/Restaurant'
import SearchResultCard from '@/components/custom/SearchResultCard'
import SearchResultInfo from '@/components/custom/SearchResultInfo'
import {useParams} from 'react-router-dom'

const SearchPage = () => {
    const {city} = useParams()
    const {results, isLoading} = useSearchRestaurant(city)

    if(isLoading) {
      return <span>Loading...</span>
    }

    if (!results?.data || !city) {
      return <span>No result found</span>
    }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisines-list' className='bg-yellow-300'>
        Cuisines List
      </div>
      <div id='main-content' className='flex flex-col gap-5'>
        <SearchResultInfo total={results.pagination.total} city={city} />
        {
          results.data.map((restaurant) => {
            return <SearchResultCard restaurant={restaurant}/>
          })
        }
      </div>
    </div>
  )
}

export default SearchPage