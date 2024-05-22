/**
 * Modal content markup and close handling
 * @param bike 
 * @param detailsModalID 
 * @param setDetailsModalID 
 * @returns 
 */
const getModalContent = (bike: any, detailsModalID: any, setDetailsModalID: any) => {
  return detailsModalID !== '' &&
    <div className="flex items-center justify-center fixed h-screen w-screen left-0 top-0 z-50 bg-black/25 backdrop-blur-[1px]">
      <div className="bg-gray-100 rounded-lg px-8 py-6 border border-black/25 m-4">
        <ul>
          <table className="border border-collapse border-black/25">
            <tbody>
              <tr>
                <td className="border p-2 font-bold border-black/25">bike_id</td>
                <td className="border p-2 border-black/25">{bike.bike_id || 'malformed'}</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold border-black/25">lat</td>
                <td className="border p-2 border-black/25">{bike.lat || 'malformed'}</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold border-black/25">lon</td>
                <td className="border p-2 border-black/25">{bike.lon || 'malformed'}</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold border-black/25">is_reserved</td>
                <td className="border p-2 border-black/25">{bike.is_reserved || 'malformed'}</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold border-black/25">is_disabled</td>
                <td className="border p-2 border-black/25">{bike.is_disabled || 'malformed'}</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold border-black/25">vehicle_type</td>
                <td className="border p-2 border-black/25">{bike.vehicle_type || 'malformed'}</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold border-black/25">total_bookings</td>
                <td className="border p-2 border-black/25">{bike.total_bookings || 'malformed'}</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold border-black/25">android</td>
                <td className="border p-2 border-black/25">{bike.android || 'malformed'}</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold border-black/25">ios</td>
                <td className="border p-2 border-black/25">{bike.ios || 'malformed'}</td>
              </tr>
            </tbody>
          </table>
        </ul>
        <div className="text-center mt-4">
          <button onClick={event => setDetailsModalID('')}>Close</button>
        </div>
      </div>
    </div>
}

export { getModalContent }
