import { CursorButton, CursorInput, CursorProvider } from "@/components/highlight-cursor"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateUserPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateUserPanel({ isOpen, onClose }: CreateUserPanelProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
              <CursorProvider className="max-h-full rounded-lg border flex flex-col" as={Card}>
        <CardHeader className="flex flex-row items-start gap-4">
          <CursorButton variant="ghost" size="icon" onClick={onClose} className="shrink-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Close panel</span>
          </CursorButton>
          <div>
            <CardTitle>Add New User</CardTitle>
            <CardDescription>Fill in the details to create a new user account.</CardDescription>
          </div>
        </CardHeader>
        <Separator />
        <form
          onSubmit={(e) => {
            e.preventDefault()
            // Handle form submission logic here
            console.log("Create user form submitted")
            onClose() // Close panel on submit
          }}
        >
          <CardContent className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-first-name" className="text-right">
                  First Name
                </Label>
                <CursorInput id="new-first-name" placeholder="John" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-last-name" className="text-right">
                  Last Name
                </Label>
                <CursorInput id="new-last-name" placeholder="Doe" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-email" className="text-right">
                  Email
                </Label>
                <CursorInput id="new-email" placeholder="john.doe@example.com" type="email" className="col-span-3" />
              </div>
              <Separator />
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-password" className="text-right">
                  Password
                </Label>
                <CursorInput id="new-password" type="password" className="col-span-3" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-auto border-t pt-6">
            <CursorButton variant="outline" type="button" onClick={onClose}>
              Cancel
            </CursorButton>
            <CursorButton type="submit" className="ml-auto">
              Create User
            </CursorButton>
          </CardFooter>
        </form>
      </CursorProvider>
    </div>
  )
}
