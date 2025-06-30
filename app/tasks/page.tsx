"use server"

import SimplePageLayout from "@/components/layouts/simple-page-layout"

export default async function TasksPage() {
  return (
    <SimplePageLayout
      icon="✅"
      title="Tasks"
      description="Manage your daily tasks and assignments."
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Current Tasks</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 rounded border bg-white p-3">
            <input type="checkbox" className="rounded" />
            <span className="text-gray-700">Review project documentation</span>
          </div>
          <div className="flex items-center space-x-3 rounded border bg-white p-3">
            <input type="checkbox" className="rounded" />
            <span className="text-gray-700">Update team on progress</span>
          </div>
          <div className="flex items-center space-x-3 rounded border bg-white p-3">
            <input type="checkbox" className="rounded" />
            <span className="text-gray-700">Plan next week's priorities</span>
          </div>
        </div>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">Completed</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 rounded border bg-white p-3 opacity-60">
            <input type="checkbox" checked className="rounded" />
            <span className="text-gray-700 line-through">
              Organize workspace cleanup
            </span>
          </div>
        </div>
      </div>
    </SimplePageLayout>
  )
}
