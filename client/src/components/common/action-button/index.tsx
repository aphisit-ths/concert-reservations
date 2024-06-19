import {ReservationStatus} from '@/types/reservation-status.enum'
import {GetConcertResponse} from '@/types/concert.type'

const CallToAction = ({ data }:{data: GetConcertResponse}) => {
   if(!data.availableStatus) {
       return <button className="px-4 py-2 text-white bg-red-500 rounded-md">Sold Out</button>;
   }

    return <button className="px-4 py-2 text-white bg-gray-400 rounded-md">Reserve</button>;
    switch (status) {
        case ReservationStatus.PENDING:
            return <button className="px-4 py-2 text-white bg-yellow-500 rounded-md">Awaiting Confirmation</button>;
        case ReservationStatus.RESERVED:
            return <button className="px-4 py-2 text-white bg-green-500 rounded-md">Reserved</button>;
        case ReservationStatus.UNAVAILABLE:
            return <button className="px-4 py-2 text-white bg-red-500 rounded-md">Sold Out</button>;
        case ReservationStatus.CANCELLED:
            return <button className="px-4 py-2 text-white bg-gray-400 rounded-md">Cancelled</button>;
        default:
            return <button className="px-4 py-2 text-white bg-gray-400 rounded-md">Reserve</button>;
    }
};

export default CallToAction