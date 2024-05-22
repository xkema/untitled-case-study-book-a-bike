/**
 * Modal content markup and close handling
 * @param bike 
 * @param detailsModalID 
 * @param setDetailsModalID 
 * @returns 
 */
const getModalContent = (bike: any, detailsModalID: any, setDetailsModalID: any) => {
  return detailsModalID !== '' && <div>
    <ul>
      <li><span>bike_id</span>: <span>{bike.bike_id || 'malformed'}</span></li>
      <li><span>lat</span>: <span>{bike.lat || 'malformed'}</span></li>
      <li><span>lon</span>: <span>{bike.lon || 'malformed'}</span></li>
      <li><span>is_reserved</span>: <span>{bike.is_reserved || 'malformed'}</span></li>
      <li><span>is_disabled</span>: <span>{bike.is_disabled || 'malformed'}</span></li>
      <li><span>vehicle_type</span>: <span>{bike.vehicle_type || 'malformed'}</span></li>
      <li><span>total_bookings</span>: <span>{bike.total_bookings || 'malformed'}</span></li>
      <li><span>android</span>: <span>{bike.android || 'malformed'}</span></li>
      <li><span>ios</span>: <span>{bike.ios || 'malformed'}</span></li>
    </ul>
    <button onClick={event => setDetailsModalID('')}>close modal</button>
  </div>
}

export { getModalContent }
