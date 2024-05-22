import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function useItems(searchParams: string) {
  // strip empty params for a better caching
  const params = new URLSearchParams(searchParams)
  params.delete(`page`, `-1`)
  params.delete(`vehicle_type`, ``)
  params.delete(`bike_id`, ``)

  const queryString = params.toString()
  const fullURL = `${process.env.NEXT_PUBLIC_API_URL_ITEMS}/?${queryString}`

  // skips fetching without page info
  const { data, mutate, error, isLoading } = useSWR(queryString === '' ? null : fullURL, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  })

  return {
    data,
    mutate,
    error,
    isLoading,
  }
}
