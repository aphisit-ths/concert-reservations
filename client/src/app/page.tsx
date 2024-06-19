'use client'

import {useAuthContext} from '@/context/auth-context'
import Spinner from '@/components/loader/spinner'
import AdminContent from '@/components/admin/admin-content'
import Overview from '@/components/common/overview'

export default function Home() {
    const {me,loading} = useAuthContext()
    return (
        <main className="flex flex-col sm:p-2 lg:p-4">
            {loading && <Spinner size={85}/>}
            {me && <section>
                {me.isAdmin ? <AdminContent/> : <Overview/> }
            </section>}
        </main>
    )
}
