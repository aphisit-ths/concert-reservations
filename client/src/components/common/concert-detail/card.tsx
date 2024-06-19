import {useAuthContext} from '@/context/auth-context'
import CallToActionButton from '@/components/common/action-button'
import DeleteActionButton from '../delete-button'
import {UsersRound} from 'lucide-react'
import {GetConcertResponse} from '@/types/concert.type'
interface ConcertDetailCardProps {
    data: GetConcertResponse,
}
const ConcertDetailCard = ({data} :ConcertDetailCardProps) => {
    const { me } = useAuthContext();
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden border-[1.5px] border-grey-500">
            <div className="p-4 flex flex-col">
                <h2 className="text-xl font-bold">{data.name}</h2>
                <p className="text-gray-600 description prose max-h-500 min-h-250 overflow-hidden text-ellipsis transition-all duration-300 ease-in-out">
                    {data.description}
                </p>
            </div>
            <div className="flex px-4 py-2 items-center justify-between bg-gray-100">
                <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                    <UsersRound />
                    {data.countReserved}/
                    {data.seat}</p>
                {me?.isAdmin ? (
                    <DeleteActionButton target={data}/>
                ) : (
                    <CallToActionButton data={data} />
                )}
            </div>
        </div>
    );
};

export default ConcertDetailCard;