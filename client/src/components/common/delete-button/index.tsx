import {useState} from 'react'
import {useToast} from '@/components/ui/use-toast'
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import ButtonLoading from '@/components/common/loading-button'
import axios from 'axios'
import {Trash2} from 'lucide-react'
import {GetConcertResponse} from '@/types/concert.type'

const DeleteActionButton = ({target}:{target: GetConcertResponse}) => {
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()
    async function onDeleteAction() {
        setLoading(true)
        try {
            await axios.post(`/api/concert/delete-concert`,{
                ...target
            })
            toast({
                title:`Concert ID ${target.id} was deleted`,
                className:'bg-green-400 text-green-600'
            })
        }catch (e: any){
            toast({
                variant: "destructive",
                title:`Something went wrong`,
                description: e?.response?.statusText
            })
        }
        finally {
            setLoading(false)
        }
    }
    if (loading){
        return <ButtonLoading/>
    }
    return(
        <Dialog>
            <DialogTrigger asChild>
                    <button className="px-4 py-2 text-white flex justify-center items-center gap-2 bg-red-500 rounded-md">
                        <Trash2  />
                        Delete
                    </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Concert</DialogTitle>
                    <DialogDescription>
                        {`Are you sure to delete? ”${target.name}” `}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={() => onDeleteAction()}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteActionButton