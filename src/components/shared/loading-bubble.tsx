interface LoadingBubbleProps {
  type: "ai" | "user"
}

export function LoadingBubble({ type }: LoadingBubbleProps) {
  return (
    <div className={`flex ${type === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`rounded-lg px-4 py-2 ${type === "user" ? "bg-blue-600" : "bg-gray-700"}`}>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
