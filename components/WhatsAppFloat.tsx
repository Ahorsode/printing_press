"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function WhatsAppFloat() {
    const phoneNumber = "233550091091"; // Updated number
    const message = "Hello! I would like to make an inquiry.";

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
    )}`;

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed bottom-6 right-6 z-50"
        >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                    size="icon"
                    className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all hover:scale-110 border-2 border-white/20"
                >
                    <MessageCircle className="h-8 w-8 text-white" />
                    <span className="sr-only">Chat on WhatsApp</span>
                </Button>
            </a>
        </motion.div>
    );
}
