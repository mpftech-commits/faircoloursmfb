
import TestimonialCarousel from "../components/TestimonialCarousel";
export const LeftSection = () => {
return(

    <div className="relative min-h-screen hidden md:block">
          <img
            src="/background.png"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Testimonial overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <TestimonialCarousel />
          </div>
        </div>
);
}