"use client"

interface SimplePageLayoutProps {
  children: React.ReactNode
  icon?: string
  title: string
  description?: string
}

export default function SimplePageLayout({
  children,
  icon,
  title,
  description
}: SimplePageLayoutProps) {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="mb-4 flex items-center space-x-3">
            {icon && <span className="text-3xl">{icon}</span>}
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
          {description && (
            <p className="text-lg text-gray-600">{description}</p>
          )}
        </div>

        <div className="rounded-lg bg-gray-50 p-6">{children}</div>
      </div>
    </div>
  )
}
