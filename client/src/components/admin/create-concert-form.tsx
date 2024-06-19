import {useForm} from 'react-hook-form'
import {Input} from '@/components/ui/input'
import {z} from 'zod'
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import {zodResolver} from '@hookform/resolvers/zod'
import axios from 'axios'
import {useToast} from '@/components/ui/use-toast'
import {Loader2} from 'lucide-react'

const schema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters')
        .max(255, 'Name can not be longer than 300 characters'),
    description: z
        .string()
        .trim()
        .min(10, 'Description must be at least 10 characters'),
    seat: z
        .number()
        .positive()
        .min(1, 'Seats must be a positive number'),
})

type CreateConcertSchemaType = z.infer<typeof schema>;

const seatNumbers = [10, 20, 40, 50, 100]

const ConcertForm = () => {
    const {toast} =useToast()
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        reset,
        formState
    } = useForm<CreateConcertSchemaType>({resolver: zodResolver(schema)})
    const handleSeatSuggestionClick = (seatNumber: number) => {
        setValue('seat', seatNumber)
    }
    async function onSubmit(data: CreateConcertSchemaType) {
        try {
            const  response = await axios.post('api/concert/create', {
                ...data,
            })
            if(response.data) {
                toast({
                    title:"Concert have been created",
                    className:"bg-green-400 text-green-800"
                })
                reset()
            }
        } catch (e: any) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: e?.response?.statusText
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
                <div className="form-field">
                    <label htmlFor="name">Concert Name</label>
                    <Input id="name" {...register('name')} placeholder="Enter concert name"/>
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>
                <div className="form-field">
                    <label htmlFor="description">Description</label>
                    <Textarea id="description" {...register('description')} placeholder="Describe the concert"
                              rows={5}/>
                    {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                </div>
                <div className="form-field">
                    <label htmlFor="seat">Available Seats</label>
                    <Input id="seat" type="number" {...register('seat', {valueAsNumber: true})}
                           placeholder="Enter available seats"/>
                    {errors.seat && <span className="text-red-500">{errors.seat.message}</span>}
                </div>
                <div className="seat-suggestions">
                    <h4>Suggested Seats</h4>
                    <div className="flex flex-wrap gap-2">
                        {seatNumbers.map((seatNumber) => (
                            <Button
                                key={seatNumber}
                                type="button"
                                className="seat-suggest-button rounded-full px-2 py-1 bg-gray-400 hover:bg-gray-300 text-sm"
                                onClick={() => handleSeatSuggestionClick(seatNumber)}
                            >
                                {seatNumber}
                            </Button>
                        ))}
                    </div>
                </div>
                {formState.isSubmitting
                    ? <ButtonLoading></ButtonLoading>
                    : <Button type="submit">Create Concert</Button> }

            </div>
        </form>
    )
}

export default ConcertForm

export function ButtonLoading() {
    return (
        <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </Button>
    )
}