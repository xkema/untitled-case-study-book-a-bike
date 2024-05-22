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
    <main>
      {/* search */}
      <input type="text" placeholder="search bike_id" value={searchQuery} onChange={event => {
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

      {/* ttl timer */}
      <div>
        {countdownDuration}
      </div>

      {/* total bookings */}
      <div>
        {
          !isLoading && Array.isArray(data.data.bikes) && getTotalBookings(data.data.bikes)
        }
        {
          !isLoading && data.data.bike && data.data.bike !== null && getTotalBookings([data.data.bike])
        }
      </div>

      {/* items */}
      <div>
        {
          !isLoading && Array.isArray(data.data.bikes) && getListItems(data.data.bikes, setDetailsModalID)
        }
        {
          !isLoading && data.data.bike && data.data.bike !== null && getListItems([data.data.bike], setDetailsModalID)
        }
      </div>

      {/* pagination */}
      <select value={pageIndex} onChange={event => setPageIndex(parseInt(event.target.value))}>
        <option value="-1">choose page</option>
        {
          !isLoading && generatePagination(data.total_count)
        }
      </select>

      {/* overlay */}
      <div>
        {
          !isLoadingOverlay && dataOverlay && dataOverlay.data.bike && getModalContent(dataOverlay.data.bike, detailsModalID, setDetailsModalID)
        }
      </div>
    </main>
  )
}
