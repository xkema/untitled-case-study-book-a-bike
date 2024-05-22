/**
 * A utility to find the sum of the bookings
 * @param bikes 
 * @returns 
 */
const getTotalBookings = (bikes: any[]) => {
  const totalBookings = bikes.map((bike: any) => bike?.total_bookings).reduce((acc, cur) => {
    if (!Number.isNaN(parseInt(cur))) {
      acc += parseInt(cur)
    }
    return acc
  }, 0)
  return totalBookings
}

export { getTotalBookings }
