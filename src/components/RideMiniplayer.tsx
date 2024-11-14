"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronUp, ChevronDown, Phone, MessageSquare, AlertTriangle, X, Play, Pause, StopCircle } from 'lucide-react'

export default function RideMiniplayer(startRide, pauseRide, endRide) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [rideStatus, setRideStatus] = useState('En route to pickup')
  const [isRideActive, setIsRideActive] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)
  const toggleMinimize = () => setIsMinimized(!isMinimized)

  const startRide = () => {
    setIsRideActive(true)
    setRideStatus('Ride in progress')
  }

  const pauseRide = () => {
    setRideStatus('Ride paused')
  }

  const endRide = () => {
    setIsRideActive(false)
    setRideStatus('Ride ended')
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 md:bottom-4 md:right-4 md:left-auto md:w-80 lg:w-96"
      animate={isMinimized ? { y: "calc(100% - 40px)" } : { y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="rounded-t-lg md:rounded-lg shadow-lg">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Current Ride</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={toggleExpand}>
                {isExpanded ? <ChevronDown /> : <ChevronUp />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleMinimize}>
                {isMinimized ? <ChevronUp /> : <X />}
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Status: {rideStatus}</span>
            <span className="text-sm font-medium">ETA: 15 mins</span>
          </div>

          <div className="flex justify-between gap-2 mb-4">
            <Button className="flex-1" onClick={startRide} disabled={isRideActive}>
              <Play className="w-4 h-4 mr-2" /> Start
            </Button>
            <Button className="flex-1" onClick={pauseRide} disabled={!isRideActive}>
              <Pause className="w-4 h-4 mr-2" /> Pause
            </Button>
            <Button className="flex-1" onClick={endRide} disabled={!isRideActive}>
              <StopCircle className="w-4 h-4 mr-2" /> End
            </Button>
          </div>

          <div className="flex justify-between gap-2 mb-4">
            <Button variant="outline" className="flex-1">
              <Phone className="w-4 h-4 mr-2" /> Contact
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => alert('Emergency assistance requested')}>
              <AlertTriangle className="w-4 h-4 mr-2" /> Emergency
            </Button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-2">Passenger Details</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span>John Doe (4.8 ★)</span>
                    <span>2 passengers</span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" /> Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" /> Message
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Special instructions: Please wait at the main entrance.</p>

                  <h3 className="font-semibold mb-2">Route Details</h3>
                  <p className="text-sm mb-4">123 Main St → 456 Elm St</p>

                  <h3 className="font-semibold mb-2">Fare Breakdown</h3>
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>Base fare:</span>
                      <span>$10.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Distance:</span>
                      <span>$5.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>$3.00</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2">
                      <span>Total:</span>
                      <span>$18.00</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}