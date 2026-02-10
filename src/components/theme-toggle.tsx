"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const [theme, setTheme] = React.useState<"light" | "dark">("light")

    React.useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
        if (savedTheme) {
            setTheme(savedTheme)
            if (savedTheme === "dark") {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark")
            document.documentElement.classList.add("dark")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 right-4 z-[100] rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 shadow-xl w-12 h-12 text-2xl border-2 border-primary/20"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {theme === "light" ? "🌙" : "☀️"}
        </Button>
    )
}
