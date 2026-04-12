export interface Testimonial {
  quote: string
  name?: string
  location?: string;
  title: string;
}

export const testimonials: Testimonial[] = [
  {
    title:"Mission Statement",
    quote:
      "To increase the active poor's engagement in economic and social decision making by offering them high-quality, reasonably priced microfinance services that enhance their current economic chances",
   
  },
  {
    title:"Our Goal",
    quote:
      "Our goal is to establish ourselves as a customer-focused, high value microfinance bank that sets new benchmarks by employing the newest technology and committed workforce to provide our stakeholders with exceptional returns. Our emphasis on client on client satisfaction and ongoing development that will stay at the forefront of the sector. By working together, we can create a more promising future which everyone has the right to use financial services, not simply a privilege",
   
  },
  {
    title:"Vision Statement",
    quote:
      "To be lagos go-to source for microfinance services. Essential values these are our guiding principles in accomplishing our objectives: Integrity and honesty, collaboration and quality, transparency and open communication, dedication and effective commitment, effective service delivery and amiable customer support.",
 
  },
  {
    title:"The Reason",
    quote:
      "This vision fuels our dedication and innovation, allowing us to adjust to our clients changing demand. our goal is to empower people and communities by cultivating strong relationships and embracing technology, breakthroughs, hence promoting sustainable economic growth.",
  },
]