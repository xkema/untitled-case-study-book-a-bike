/**
 * Markup generator for the items to be listed
 * @param bikes 
 * @param setDetailsModalID 
 * @returns 
 */
const getListItems = (bikes: any[], setDetailsModalID: any) => {
  return bikes.map((bike: any) => {
    if (!bike) {
      return <div key="malformed">malformed data</div>
    } else {
      return <div key={bike.bike_id || 'malformed'}>
        <span>{bike.bike_id || 'malformed'}</span>
        <span>{bike.vehicle_type || 'malformed'}</span>
        <span>{bike.bike_id && bike.vehicle_type && <button onClick={event => setDetailsModalID(bike.bike_id)}>details</button>}</span>
      </div>
    }
  })
}

export { getListItems }
