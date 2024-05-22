/**
 * Markup generator for the items to be listed
 * @param bikes 
 * @param setDetailsModalID 
 * @returns 
 */
const getListItems = (bikes: any[], setDetailsModalID: any) => {
  return bikes.map((bike: any, index) => {
    if (!bike) {
      return <div key="malformed" className="text-center even:bg-gray-100 p-4 hover:bg-gray-50">malformed data</div>
    } else {
      return <div key={bike.bike_id || 'malformed'} className="flex items-center justify-center even:bg-gray-100 p-2 hover:bg-gray-50">
        <span className="flex-1 text-center">{bike.bike_id || 'malformed'}</span>
        <span className="flex-1 text-center">{bike.vehicle_type || 'malformed'}</span>
        <span className="flex-1 text-center">{bike.bike_id && <button onClick={event => setDetailsModalID(bike.bike_id)}>details</button>}</span>
      </div>
    }
  })
}

export { getListItems }
