'use client'

import {useAuthContext} from '@/context/auth-context'
import AdminContent from '@/components/admin/admin-content'
import Overview from '@/components/common/overview'
import {SkeletonLoader} from '@/components/loader/skeleton'

export default function Home() {
    const {me,loading} = useAuthContext()
    return (
        <main className="flex flex-col sm:p-2 lg:p-4">
            {loading && <SkeletonLoader />}
            {me && <section>
                {me.isAdmin ? <AdminContent/> : <Overview/> }
            </section>}
        </main>
    )
}
