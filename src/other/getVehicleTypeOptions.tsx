/**
 * Vehicle type extractor for the incoming response
 * @param bikes 
 * @returns 
 */
const getVehicleTypeOptions = (bikes: any[]) => {
  const vehicleTypes = new Set(bikes.map((bike: any) => bike?.vehicle_type))
  return Array.from(vehicleTypes).sort().map((vehicleType: any) => {
    if (!vehicleType) {
      return <option key="malformed" value="malformed" disabled>malformed</option>
    }
    return <option key={vehicleType} value={vehicleType}>{vehicleType}</option>
  })
}

export { getVehicleTypeOptions }
