"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Printer } from "lucide-react";

export default function Hero() {
    const scrollToOrder = () => {
        const orderSection = document.getElementById("order-form");
        if (orderSection) {
            orderSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative overflow-hidden bg-background py-24 md:py-32">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-6 py-2 text-sm font-medium text-primary backdrop-blur-sm"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-3 animate-pulse shadow-[0_0_10px_#d4af37]"></span>
                        Premium Printing Services
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
                    >
                        Elevate Your Brand with{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#F7E7CE] to-primary">
                            Luxury Print.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="max-w-[700px] text-muted-foreground md:text-xl font-light tracking-wide leading-relaxed"
                    >
                        Experience the finest detail in business cards, stickers, and banners.
                        Ordered seamlessly online, delivered with white-glove service.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-5 min-[400px]:flex-row pt-4"
                    >
                        <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-105" onClick={scrollToOrder}>
                            Start Your Order <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-primary/30 hover:bg-primary/5 hover:text-primary transition-all">
                            Explore Services
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />
            </div>
        </section>
    );
}
