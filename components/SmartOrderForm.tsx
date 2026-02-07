"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, File, Calculator, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { upload } from "@vercel/blob/client";

const SERVICES = [
    { id: "cards", name: "Business Cards", basePrice: 50, unit: "pack of 100" },
    { id: "stickers", name: "Stickers", basePrice: 30, unit: "sheet" },
    { id: "documents", name: "Documents", basePrice: 1, unit: "page" },
    { id: "flyers", name: "Flyers/Handouts", basePrice: 2, unit: "piece" },
    { id: "banner", name: "Large Banner", basePrice: 150, unit: "piece" },
    { id: "passport", name: "Passport Pictures", basePrice: 15, unit: "set of 8" },
];

export default function SmartOrderForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [pageCount, setPageCount] = useState(0); // New state for pages

    // New Options State
    const [printColor, setPrintColor] = useState("bw"); // bw | color
    const [printSide, setPrintSide] = useState("simplex"); // simplex | duplex

    const [instructions, setInstructions] = useState("");
    const [estTotal, setEstTotal] = useState(0);
    const [files, setFiles] = useState<{ name: string; url: string; pages?: number }[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const selectedService = SERVICES.find(s => s.id === service);
        if (!selectedService) {
            setEstTotal(0);
            return;
        }

        if (selectedService.id === "documents") {
            const pages = pageCount > 0 ? pageCount : 1;
            const sheetsPerCopy = printSide === "duplex" ? Math.ceil(pages / 2) : pages;
            const totalSheets = sheetsPerCopy * quantity;
            const pricePerSheet = printColor === "color" ? 2 : 1;
            setEstTotal(totalSheets * pricePerSheet);
        } else {
            setEstTotal(selectedService.basePrice * quantity);
        }
    }, [service, quantity, pageCount, printColor, printSide]);

    const countPdfPages = async (file: File): Promise<number> => {
        try {
            const pdfjsLib = await import("pdfjs-dist");
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            return pdf.numPages;
        } catch (error) {
            console.error("Error reading PDF:", error);
            return 0;
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            setIsUploading(true);

            toast.info(`Uploading ${selectedFiles.length} file(s)...`);

            const uploadPromises = selectedFiles.map(async (file) => {
                let pages = 0;
                if (file.type === "application/pdf") {
                    pages = await countPdfPages(file);
                }

                try {
                    const newBlob = await upload(file.name, file, {
                        access: 'public',
                        handleUploadUrl: '/api/upload',
                    });

                    return { name: file.name, url: newBlob.url, pages };
                } catch (error) {
                    console.error(`Upload failed for ${file.name}:`, error);
                    toast.error(`Failed to upload ${file.name}`);
                    return null;
                }
            });

            try {
                const results = await Promise.all(uploadPromises);
                const successfulUploads = results.filter((f): f is { name: string; url: string; pages: number } => f !== null);

                setFiles(prev => [...prev, ...successfulUploads]);

                // If the first file is a PDF, update pageCount for pricing (legacy behavior helper)
                const firstPdf = successfulUploads.find(f => f.pages > 0);
                if (firstPdf) {
                    setPageCount(firstPdf.pages);
                    toast.success(`Detected ${firstPdf.pages} pages in ${firstPdf.name}`);
                }

                toast.success(`Successfully uploaded ${successfulUploads.length} file(s).`);
            } catch (error) {
                console.error("Global upload error:", error);
                toast.error("An error occurred during upload.");
            } finally {
                setIsUploading(false);
            }
        }
    };

    const generateWhatsAppLink = () => {
        const selectedService = SERVICES.find(s => s.id === service);
        const serviceName = selectedService?.name || "Printing";
        const serviceUnit = selectedService?.unit || "";
        const serviceId = selectedService?.id;
        const timestamp = new Date().toLocaleString('en-GH', { timeZone: 'Africa/Accra' });

        let detailsText = `*Service:* ${serviceName} ${serviceUnit ? `(${serviceUnit})` : ""}\n- *Quantity:* ${quantity}`;

        if (serviceId === "documents") {
            if (pageCount > 0) detailsText += `\n- *Pages per Copy:* ${pageCount}`;
            detailsText += `\n- *Color:* ${printColor === "color" ? "Colored" : "Black & White"}`;
            detailsText += `\n- *Sides:* ${printSide === "duplex" ? "Front/Back" : "Front Only"}`;
        }

        const fileLinksText = files.length > 0
            ? files.map((f, i) => `${i + 1}. ${f.name}: ${f.url}`).join('\n')
            : "No files attached";

        const text = `🚀 *New Order from OB_Print*

*Customer Info:*
- *Name:* ${name}
- *Phone:* ${phone}

*Order Details:*
${detailsText}
- *Note:* ${instructions || "None"}

*Uploaded Files:*
${fileLinksText}

*Estimated Total:* GHS ${estTotal.toFixed(2)}

*Order Date:* ${timestamp}

Please confirm my order. Thank you!`;

        const encodedText = encodeURIComponent(text);
        return `https://wa.me/233550091091?text=${encodedText}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone || !service) {
            toast.error("Missing Details", { description: "Please fill in all required fields." });
            return;
        }

        if (isUploading) {
            toast.loading("Uploading File...", { description: "Please wait for the upload to finish." });
            return;
        }

        window.open(generateWhatsAppLink(), '_blank');
        toast.success("Opening WhatsApp...", { description: "Hit send to finalize your order!" });
    };

    return (
        <section className="py-24 bg-muted/20 relative" id="order-form">
            {/* Decorative Blur */}
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10" />

            <div className="container px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold tracking-tight mb-3">Start Your <span className="text-primary">Premium Order</span></h2>
                            <p className="text-muted-foreground">Fill out the details below for an instant quote link.</p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-primary/20 shadow-2xl bg-background/60 backdrop-blur-xl">
                            <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10">
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Sparkles className="w-5 h-5" /> Smart Estimator
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 md:p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="Kwame Doe"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className="bg-background/50 border-primary/20 focus:border-primary focus:ring-primary/20 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">WhatsApp Number</Label>
                                            <Input
                                                id="phone"
                                                placeholder="054 289 7396"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                                type="tel"
                                                className="bg-background/50 border-primary/20 focus:border-primary focus:ring-primary/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>Service Type</Label>
                                            <Select onValueChange={(val) => setService(val)}>
                                                <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary focus:ring-primary/20">
                                                    <SelectValue placeholder="Select a service..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {SERVICES.map((s) => (
                                                        <SelectItem key={s.id} value={s.id}>
                                                            {s.name} (GHS {s.basePrice}/{s.unit})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="quantity">Quantity</Label>
                                            <Input
                                                id="quantity"
                                                type="number"
                                                min="1"
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                                                className="bg-background/50 border-primary/20 focus:border-primary focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>

                                    {/* Document Specific Options */}
                                    {service === "documents" && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-primary/5 rounded-lg border border-primary/10"
                                        >
                                            <div className="space-y-3">
                                                <Label>Color Preference</Label>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="color"
                                                            checked={printColor === "bw"}
                                                            onChange={() => setPrintColor("bw")}
                                                            className="accent-primary"
                                                        />
                                                        <span className="text-sm">Black/White (GHS 1/sheet)</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="color"
                                                            checked={printColor === "color"}
                                                            onChange={() => setPrintColor("color")}
                                                            className="accent-primary"
                                                        />
                                                        <span className="text-sm">Colored (GHS 2/sheet)</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <Label>Print Sides</Label>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="side"
                                                            checked={printSide === "simplex"}
                                                            onChange={() => setPrintSide("simplex")}
                                                            className="accent-primary"
                                                        />
                                                        <span className="text-sm">Front Only</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="side"
                                                            checked={printSide === "duplex"}
                                                            onChange={() => setPrintSide("duplex")}
                                                            className="accent-primary"
                                                        />
                                                        <span className="text-sm">Front/Back (Saves Paper)</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div className="space-y-4">
                                        <Label>Upload Design (PDF/Image/Word/Excel)</Label>
                                        <div className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center hover:bg-primary/5 hover:border-primary/40 transition-all relative cursor-pointer group">
                                            <input
                                                type="file"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                                onChange={handleFileChange}
                                                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                                                multiple
                                            />
                                            <div className="flex flex-col items-center justify-center space-y-2 relative z-10">
                                                {isUploading ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                        <span className="text-sm font-medium text-primary">Uploading...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                                                        <span className="text-sm text-muted-foreground group-hover:text-foreground">
                                                            Drag & drop or Click to Upload Multiple Files
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* File List */}
                                        {files.length > 0 && (
                                            <div className="space-y-2">
                                                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Uploaded Files ({files.length})</Label>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {files.map((file, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                                                            <File className="w-4 h-4 text-primary" />
                                                            <span className="text-sm font-medium truncate flex-1">{file.name}</span>
                                                            <span className="text-xs text-green-600 font-bold">✓ Ready</span>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-7 w-7 p-0 hover:text-destructive"
                                                                onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
                                                            >
                                                                &times;
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="instructions">Special Instructions</Label>
                                        <Textarea
                                            id="instructions"
                                            placeholder="E.g., Matte finish, round corners..."
                                            value={instructions}
                                            onChange={(e) => setInstructions(e.target.value)}
                                            className="bg-background/50 border-primary/20 focus:border-primary focus:ring-primary/20"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-6 bg-primary/5 rounded-xl border border-primary/10">
                                        <div>
                                            <span className="text-sm text-muted-foreground font-medium">Estimated Total</span>
                                            <p className="text-3xl font-bold text-primary">GHS {estTotal.toFixed(2)}</p>
                                            {pageCount > 0 && service === "documents" && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    ({quantity} copies × {Math.ceil(pageCount / (printSide === "duplex" ? 2 : 1))} sheets × GHS {printColor === "color" ? 2 : 1})
                                                </p>
                                            )}
                                        </div>
                                        <Button size="lg" className="gap-2 rounded-full px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform" type="submit">
                                            Send Order <Send className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
