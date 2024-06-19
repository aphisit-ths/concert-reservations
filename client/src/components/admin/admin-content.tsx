import AdminSummary from '@/components/admin/summary'
import TabMenu from '@/components/admin/tab-menu'

export default function AdminContent() {
    return (
        <section className="flex flex-col gap-8">
            <AdminSummary/>
            <TabMenu/>
        </section>
    )
}