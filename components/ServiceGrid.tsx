"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, StickyNote, FileText, BookOpen, Image as ImageIcon } from "lucide-react";

const services = [
    {
        title: "Premium Business Cards",
        description: "make a lasting impression with gold foil, spot UV, and thick matte finishes.",
        icon: <Printer className="h-8 w-8 text-primary" />,
    },
    {
        title: "Custom Stickers & Labels",
        description: "Die-cut vinyl stickers perfect for branding packaging and products.",
        icon: <StickyNote className="h-8 w-8 text-primary" />,
    },
    {
        title: "Corporate Documents",
        description: "High-volume printing for annual reports, proposals, and letterheads.",
        icon: <FileText className="h-8 w-8 text-primary" />,
    },
    {
        title: "Funeral Programs",
        description: "Respectful, high-quality tributes designed with elegance and care.",
        icon: <BookOpen className="h-8 w-8 text-primary" />,
    },
    {
        title: "Large Format Banners",
        description: "Durable, vibrant outdoor banners that command attention.",
        icon: <ImageIcon className="h-8 w-8 text-primary" />,
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6
        }
    },
};

export default function ServiceGrid() {
    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                        Our <span className="text-primary">Premium Services</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
                        Everything you need to promote your business, crafted with precision.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {services.map((service, index) => (
                        <motion.div key={index} variants={item} whileHover={{ y: -5 }}>
                            <Card className="h-full border-primary/10 bg-card/80 backdrop-blur-sm shadow-md hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 group">
                                <CardHeader>
                                    <div className="mb-6 inline-flex p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        {service.icon}
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                        {service.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {service.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
