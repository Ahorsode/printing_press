"use client";

import { Printer, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="bg-card text-card-foreground border-t border-primary/20">
            <div className="container px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-bold text-xl text-primary">
                            <Printer className="h-6 w-6" />
                            <span>PrintPro Ghana</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Elevating brands with premium printing solutions. From business cards to large format banners, we deliver excellence.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full">
                                <Instagram className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full">
                                <Twitter className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Services</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Business Cards</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Stickers & Labels</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Flyers & Brochures</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Large Fomat Banners</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Funeral Programs</a></li>
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Order Now</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>Accra, Ghana</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+233 54 289 7396</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>orders@printprogh.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-primary/10 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} PrintPro Ghana. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
