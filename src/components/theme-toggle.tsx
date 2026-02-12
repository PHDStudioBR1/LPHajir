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
            className="rounded-full bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20 shadow-sm w-10 h-10 text-xl border border-primary/10 transition-all duration-300"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {theme === "light" ? "🌙" : "☀️"}
        </Button>
    )
}
