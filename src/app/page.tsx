"use client"

import useItems from "@/hooks/useItems";
import { generatePagination } from "@/other/generatePagination";
import { getListItems } from "@/other/getListItems";
import { getModalContent } from "@/other/getModalContent";
import { getTotalBookings } from "@/other/getTotalBookings";
import { getVehicleTypeOptions } from "@/other/getVehicleTypeOptions";
import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [pageIndex, setPageIndex] = useState(1)
  const [countdownDuration, setCountdownDuration] = useState(0)
  const [debouncedSearchQuery] = useDebounce(searchQuery, 333)
  const [detailsModalID, setDetailsModalID] = useState('')

  const { data, mutate, error, isLoading } = useItems(`page=${pageIndex}&vehicle_type=${filterQuery}&bike_id=${debouncedSearchQuery}`)
  const { data: dataOverlay, mutate: mutateOverlay, error: errorOverlay, isLoading: isLoadingOverlay } = useItems(`bike_id=${detailsModalID}`)

  // initial timer set
  useEffect(() => {
    !isLoading && setCountdownDuration(data.ttl)
  }, [data, isLoading])

  // countdown timer
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (countdownDuration > 0) {
        setCountdownDuration(prev => prev - 1)
      }
      if (countdownDuration === 1) {
        mutate({ ...data, ttl: 0 })
      }
    }, 1000)
    return () => clearTimeout(timeoutID)
  }, [countdownDuration, data, mutate])

  return (
    <main className="container mx-auto my-8 flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-2 md:flex-row md:gap-4">
        {/* search */}
        <input type="text" placeholder="Search with Bike ID" value={searchQuery} onChange={event => {
          setSearchQuery(event.target.value)
          setFilterQuery('')
          if (event.target.value === '') {
            setPageIndex(1)
          } else {
            setPageIndex(-1)
          }
        }} />

        {/* filter */}
        <select value={filterQuery} onChange={event => setFilterQuery(event.target.value)}>
          <option value="">choose a vehicle type</option>
          {
            !isLoading && Array.isArray(data.data.bikes) && getVehicleTypeOptions(data.data.bikes)
          }
          {
            !isLoading && data.data.bike && (data.data.bike !== null) && getVehicleTypeOptions([data.data.bike])
          }
        </select>

        <div className="flex flex-col items-end ml-auto">
          {/* ttl timer */}
          <div>
            <span className="font-bold">TTL: </span>
            <span className="bg-black text-white font-light text-xs leading-6 inline-block min-w-6 font-mono text-center rounded-md">
              {countdownDuration}
            </span>
          </div>

          {/* total bookings */}
          <div>
            <span className="font-bold">Total Bookings: </span>
            <span>
              {
                !isLoading && Array.isArray(data.data.bikes) && getTotalBookings(data.data.bikes)
              }
              {
                !isLoading && data.data.bike && data.data.bike !== null && getTotalBookings([data.data.bike])
              }
            </span>
          </div>
        </div>
      </div>

      {/* items */}
      <div className="flex flex-col border border-black/25 rounded-md p-2">
        {
          !isLoading && Array.isArray(data.data.bikes) && getListItems(data.data.bikes, setDetailsModalID)
        }
        {
          !isLoading && data.data.bike && data.data.bike !== null && getListItems([data.data.bike], setDetailsModalID)
        }
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center gap-4">
        <button disabled={isLoading || pageIndex < 2} onClick={event => setPageIndex(p => p - 1)}>Prev</button>
        <select value={pageIndex} onChange={event => setPageIndex(parseInt(event.target.value))} className="m-0">
          <option value="-1">choose page</option>
          {
            !isLoading && generatePagination(data.total_count)
          }
        </select>
        <button disabled={isLoading || !data.nextPage} onClick={event => setPageIndex(p => p + 1)}>Next</button>
      </div>

      {/* overlay */}
      <div>
        {
          !isLoadingOverlay && dataOverlay && dataOverlay.data.bike && getModalContent(dataOverlay.data.bike, detailsModalID, setDetailsModalID)
        }
      </div>
    </main>
  )
}
