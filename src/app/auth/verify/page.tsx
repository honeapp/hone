'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { relative } from '@/app/fonts'
import { useSearchParams } from 'next/navigation'
import { signIn } from "next-auth/react"

export default function OTPVerification() {
    const [otp, setOtp] = useState(['', '', '', ''])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const refs = [useRef(null), useRef(null), useRef(null), useRef(null)]
    const searchParams = useSearchParams()
    const email = searchParams.get('email')

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return
        
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        setError('')

        if (value && index < 3) {
            refs[index + 1].current.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            refs[index - 1].current.focus()
        }
    }

    const handleVerify = async () => {
        setLoading(true)
        setError('')
        
        try {
            const response = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    otp: otp.join('')
                })
            })

            const data = await response.json()
            
            if (data.success) {
                await signIn('credentials', {
                    email,
                    otp: otp.join(''),
                    callbackUrl: data.redirectPath
                })
            } else {
                setError(data.message || 'Verification failed')
            }
        } catch (error) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleResendOTP = async () => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            
            if (response.ok) {
                setError('New code sent successfully')
            } else {
                throw new Error('Failed to send code')
            }
        } catch (error) {
            setError('Failed to resend code')
        }
    }

    return (
        <div className="min-h-screen bg-white relative">
            <div className="absolute inset-0 bg-black/48">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-4 py-12 relative"
                >
                    <div className="max-w-[480px] mx-auto bg-[#FBF8F1] rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8">
                            <motion.h1 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`text-3xl font-bold text-center mb-4 text-[#100F0A] ${relative.bold.className}`}
                            >
                                Verify Your Email
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className={`text-center mb-8 text-[#100F0A]/60 ${relative.book.className}`}
                            >
                                Enter the 4-digit code sent to {email}
                            </motion.p>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex justify-center space-x-4 mb-8"
                            >
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={refs[index]}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-16 h-16 text-center text-2xl border-2 border-gray-300 rounded-xl focus:border-[#100F0A] focus:outline-none transition-all"
                                    />
                                ))}
                            </motion.div>

                            {error && (
                                <p className={`text-center text-red-500 mb-4 ${relative.book.className}`}>
                                    {error}
                                </p>
                            )}

                            <motion.button
                                onClick={handleVerify}
                                disabled={loading || otp.some(digit => !digit)}
                                className={`w-full bg-[#100F0A] text-white rounded-xl p-4 flex items-center justify-center ${
                                    loading || otp.some(digit => !digit) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2d2d2d]'
                                } transition-all duration-300 ${relative.medium.className}`}
                            >
                                {loading ? 'Verifying...' : 'Verify'}
                            </motion.button>

                            <motion.button
                                onClick={handleResendOTP}
                                className={`w-full text-center mt-4 text-sm text-[#100F0A]/60 hover:text-[#100F0A] transition-all duration-300 ${relative.book.className}`}
                            >
                                Resend Code
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
