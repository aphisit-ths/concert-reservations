import {Button} from '@/components/ui/button'
import {Loader2} from 'lucide-react'

function ButtonLoading() {
    return (
        <Button disabled className="px-4 py-2">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </Button>
    )
}

export default ButtonLoading