"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToOrder = () => {
        const orderSection = document.getElementById("order-form");
        if (orderSection) {
            orderSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className={cn(
            "fixed top-0 z-50 w-full transition-all duration-300",
            scrolled
                ? "bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-sm"
                : "bg-transparent border-transparent"
        )}>
            <div className="container flex h-20 items-center px-4 md:px-6">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Printer className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-foreground">OB_Print</span>
                </div>
                <div className="ml-auto flex gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={scrollToOrder}
                        className="hidden md:inline-flex text-muted-foreground hover:text-primary hover:bg-primary/5"
                    >
                        Order Now
                    </Button>
                    <Button
                        size="sm"
                        onClick={scrollToOrder}
                        className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </header>
    );
}
