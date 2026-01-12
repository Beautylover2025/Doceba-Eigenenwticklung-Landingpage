"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

export default function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ children }) => (
                                                <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>
                                            ),
                                            h2: ({ children }) => (
                                                <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h2>
                                            ),
                                            h3: ({ children }) => (
                                                <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{children}</h3>
                                            ),
                                            p: ({ children }) => (
                                                <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
                                            ),
                                            a: ({ href, children }) => (
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-700 underline"
                                                >
                                                    {children}
                                                </a>
                                            ),
                                            strong: ({ children }) => (
                                                <strong className="font-semibold text-gray-900">{children}</strong>
                                            ),
                                            ul: ({ children }) => (
                                                <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>
                                            ),
                                            li: ({ children }) => (
                                                <li className="text-gray-700">{children}</li>
                                            ),
                                        }}
                                    >
                                        {content}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-gray-100">
                                <button
                                    onClick={onClose}
                                    className="w-full px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Schließen
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
