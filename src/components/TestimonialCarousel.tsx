import { useState } from "react"
import { testimonials } from "../data/Testimonial"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialCarousel() {

  const [index, setIndex] = useState(0)

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  return (
    <div className="relative max-w-md">

      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/25 border border-white/30 rounded-2xl p-6 shadow-xl">

        <AnimatePresence mode="wait">

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-white text-sm leading-relaxed">
              "{testimonials[index].quote}"
            </p>

            <div className="mt-5">
              <p className="text-white font-semibold text-sm">
                {testimonials[index].name}
              </p>

              <p className="text-white/80 text-xs">
                {testimonials[index].location}
              </p>
            </div>
          </motion.div>

        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={prev}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition"
          >
            <ChevronLeft size={18} color="white"/>
          </button>

          <button
            onClick={next}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition"
          >
            <ChevronRight size={18} color="white"/>
          </button>

        </div>

      </div>
    </div>
  )
}