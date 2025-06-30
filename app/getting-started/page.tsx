"use server"

import SimplePageLayout from "@/components/layouts/simple-page-layout"

export default async function GettingStartedPage() {
  return (
    <SimplePageLayout
      icon="📚"
      title="Getting Started"
      description="Welcome to your new workspace. This is your getting started guide."
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Quick Start</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Explore the sidebar navigation to find different features</li>
          <li>• Use the block editor to create rich content</li>
          <li>• Try the AI assistant for writing help</li>
          <li>• Organize your thoughts with the todo planner</li>
          <li>• Set goals and track your progress</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">Tips</h2>
        <p className="text-gray-700">
          This workspace is designed to help you organize your thoughts, plan
          your projects, and enhance your productivity. Each section has
          specific functionality to support different aspects of your work and
          personal development.
        </p>
      </div>
    </SimplePageLayout>
  )
}
