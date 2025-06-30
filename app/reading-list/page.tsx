"use server"

import SimplePageLayout from "@/components/layouts/simple-page-layout"

export default async function ReadingListPage() {
  return (
    <SimplePageLayout
      icon="📖"
      title="Reading List"
      description="Track books and articles you want to read or have completed."
    >
      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Currently Reading
          </h2>
          <div className="space-y-3">
            <div className="rounded border border-blue-200 bg-white p-4">
              <h3 className="font-medium text-gray-900">
                The Pragmatic Programmer
              </h3>
              <p className="text-sm text-gray-600">
                By David Thomas & Andrew Hunt
              </p>
              <div className="mt-2 h-2 rounded-full bg-blue-100">
                <div className="h-2 w-3/4 rounded-full bg-blue-500"></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">75% complete</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Want to Read
          </h2>
          <div className="space-y-3">
            <div className="rounded border bg-white p-4">
              <h3 className="font-medium text-gray-900">Clean Architecture</h3>
              <p className="text-sm text-gray-600">By Robert C. Martin</p>
            </div>
            <div className="rounded border bg-white p-4">
              <h3 className="font-medium text-gray-900">
                System Design Interview
              </h3>
              <p className="text-sm text-gray-600">By Alex Xu</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Completed
          </h2>
          <div className="space-y-3">
            <div className="rounded border border-green-200 bg-white p-4">
              <h3 className="font-medium text-gray-900">You Don't Know JS</h3>
              <p className="text-sm text-gray-600">By Kyle Simpson</p>
              <span className="mt-2 inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </SimplePageLayout>
  )
}
