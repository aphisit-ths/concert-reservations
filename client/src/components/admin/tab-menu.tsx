import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

enum MenuBar {
    OVERVIEW = "Overview",
    CREATE = "Create"
}
export default function TabMenu() {
    return (
        <Tabs defaultValue={MenuBar.OVERVIEW} className="max-w-full min-w-full h-auto">
            <TabsList className="w-1/2 flex flex-row justify-start mb-5 bg-white focus:text-blue-800">
                <TabsTrigger className="text-2xl" value={MenuBar.OVERVIEW}>Overview</TabsTrigger>
                <TabsTrigger className="text-2xl" value={MenuBar.CREATE}>Create</TabsTrigger>
            </TabsList>
            <TabsContent className='w-full bg-red-100 max-h-full min-h-[1000px]' value={MenuBar.OVERVIEW}>
                <div className=""></div>
            </TabsContent>
            <TabsContent className='w-full bg-blue-200 max-h-full min-h-[1000px]' value={MenuBar.CREATE}>
                <div className=""></div>
            </TabsContent>
        </Tabs>

    )
}