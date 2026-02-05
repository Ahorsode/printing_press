"use client";

import { CheckCircle2, MessageSquare, UploadCloud, Wallet, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    {
        title: "Upload & Quote",
        description: "Use our Smart Form to upload files and get an instant estimate.",
        icon: <UploadCloud className="w-6 h-6 text-primary-foreground" />,
    },
    {
        title: "Confirm Details",
        description: "Chat directly with us on WhatsApp to finalize specs.",
        icon: <MessageSquare className="w-6 h-6 text-primary-foreground" />,
    },
    {
        title: "Secure Payment",
        description: "Pay via Mobile Money. Secure, fast, and convenient.",
        icon: <Wallet className="w-6 h-6 text-primary-foreground" />,
    },
    {
        title: "Premium Delivery",
        description: "Your order is printed and delivered to your doorstep.",
        icon: <CheckCircle2 className="w-6 h-6 text-primary-foreground" />,
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Seamless Process</h2>
                    <p className="mt-4 text-muted-foreground">From design to delivery in 4 simple steps.</p>
                </div>

                <div className="grid gap-12 md:grid-cols-4 relative px-4">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center relative group"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-8 transition-transform group-hover:scale-110 duration-300">
                                {step.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">{step.description}</p>

                            {/* Mobile Connector Arrow */}
                            {index < steps.length - 1 && (
                                <ArrowRight className="md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/30 w-6 h-6 rotate-90" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
