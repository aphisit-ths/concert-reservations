import TabMenu from '@/components/admin/tab-menu'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'

export default async function Home() {

    return (
        <main className="flex flex-col sm:p-2 lg:p-4">
            <div className="flex w-full justify-evenly min-h-64 mb-10">
                <Card className="w-1/4  bg-blue-400">
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>
                <Card className="w-1/4  bg-blue-400">
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>
                <Card className="w-1/4  bg-blue-400">
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>
            </div>
            <TabMenu/>
        </main>
    )
}
