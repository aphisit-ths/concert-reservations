import {ReservationStatus} from '@/types/reservation-status.enum'
import {GetConcertResponse} from '@/types/concert.type'
import {useAuthContext} from '@/context/auth-context'
import {Reservation, User} from '@/types/auth.type'
import axios from 'axios'
import {API_CANCEL_CLIENT_RESERVATION_URL, API_CREATE_CLIENT_RESERVATION_URL} from '@/constants'
import {useToast} from '@/components/ui/use-toast'
import {useState} from 'react'
import LoadingButton from '@/components/common/loading-button'
import {fetcher} from '@/components/common/overview'
import useSWR from 'swr'


interface CallToActionProps {
    data: GetConcertResponse;
}

const CallToAction = ({data}: CallToActionProps) => {
    const { mutate,} = useSWR('api/common/overview', fetcher, {refreshInterval: 1500})

    const {me,fetchMe} = useAuthContext()
    const {toast} = useToast()
    const [loading, setLoading] = useState(false)

    const createReservation = async (concert: GetConcertResponse) => {
        setLoading(true)
        try {
            const response = await axios.post('/api' + API_CREATE_CLIENT_RESERVATION_URL, {concertId: concert.id})
            toast({title: 'Success!', description: 'Reservation created.'})

            console.log('Reservation created successfully:', response.data)
        } catch (error: any) {
            console.error('Error creating reservation:', error)
            toast({
                title: 'Error!',
                description: 'Failed to create reservation.' + error.response.statusText,
                variant: 'destructive'
            })
        } finally {
            fetchMe()
            await mutate()
            setLoading(false)
        }
    }

    const cancelReservation = async (reservation: Reservation ) => {
        setLoading(true)
        try {
            const response = await axios.post('/api' + API_CANCEL_CLIENT_RESERVATION_URL, {
                reservationId: reservation.id
            })
            toast({title: 'Success!', description: 'Reservation cancelled.'})
            console.log('Reservation cancelled successfully:', response.data)
            return response.data
        } catch (error: any) {
            console.error('Error cancelling reservation:', error)
            toast({
                title: 'Error!',
                description: 'Failed to cancelled reservation. :' + error.response.statusText,
                variant: 'destructive'
            })
        } finally {
            fetchMe()
            await mutate()
            setLoading(false)
        }
    }
    if (loading) {
        return <LoadingButton/>
    }

    const currentUserReservation: Reservation | undefined = me?.reservation?.find((res: Reservation) => res.concertId === data.id)
    const status = currentUserReservation?.status
    switch (status) {
        case ReservationStatus.RESERVED:
            return <button onClick={() => cancelReservation(currentUserReservation!)} className="px-4 py-2 text-white bg-red-500 rounded-md">Cancel</button>
        case ReservationStatus.CANCELLED:
            return <button disabled={true} className="px-4 py-2 text-white bg-gray-400 rounded-md">Cancelled</button>
        case ReservationStatus.PENDING:
            return <button className="px-4 py-2 text-white bg-yellow-500 rounded-md">Awaiting Confirmation</button>
        default:
            if(!data.availableStatus) {
                return <button disabled={true} className="px-4 py-2 text-white bg-gray-500 rounded-md">Sold Out</button>
            }
            return <button onClick={() => createReservation(data)} className="px-4 py-2 text-white bg-green-400 rounded-md">Reserve</button>
    }
}

export default CallToAction