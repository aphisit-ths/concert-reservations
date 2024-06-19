import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from '@/components/common/overview'
import ConcertForm from '@/components/admin/create-concert-form'

enum MenuBar {
    OVERVIEW = "Overview",
    CREATE = "Create"
}
export default function TabMenu() {
    return (
        <Tabs defaultValue={MenuBar.OVERVIEW} className="max-w-full min-w-full h-auto">
            <TabsList className="w-1/2 flex flex-row justify-start mb-5 focus:text-blue-600">
                <TabsTrigger className="text-2xl" value={MenuBar.OVERVIEW}>Overview</TabsTrigger>
                <TabsTrigger className="text-2xl" value={MenuBar.CREATE}>Create</TabsTrigger>
            </TabsList>
                <TabsContent className='w-full max-h-full min-h-[1000px]' value={MenuBar.OVERVIEW}>
                <div className="">
                    <Overview/>
                </div>
            </TabsContent>
            <TabsContent className='w-full max-h-full min-h-[1000px]' value={MenuBar.CREATE}>
                <div className="">
                    <ConcertForm/>
                </div>
            </TabsContent>
        </Tabs>

    )
}