import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Heading, Section, GlassCard } from '@/components';
import { MOTION_CONFIG } from '@/config/motion.config';
import { useThemeStore, getThemeConfig } from '@/store/useThemeStore';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  message: string;
  rating: number;
}

/**
 * TestimonialsPage Component
 * Carousel of client testimonials
 */
export const TestimonialsPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { activeTheme } = useThemeStore();
  const theme = getThemeConfig(activeTheme);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechStart Inc',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      message:
        'Working with this developer was amazing. The code quality is exceptional and the attention to detail is remarkable. Highly recommended!',
      rating: 5,
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'CEO',
      company: 'Digital Innovations',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      message:
        'Delivered the project on time with excellent performance optimization. Great communication throughout the development process.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Design Lead',
      company: 'Creative Studios',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      message:
        'Perfect collaboration between design and development. The implementation brought our vision to life beautifully.',
      rating: 5,
    },
  ];

  const previous = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const testimonial = testimonials[currentIndex];

  return (
    <Section id="testimonials" className="relative">
      <Container>
        <Heading as="h2" className="mb-12 text-center" style={{
          color: theme.primaryColor,
          textShadow: `0 0 20px ${theme.glowColor}`,
        }}>
          What Clients Say
        </Heading>

        {/* Carousel */}
        <motion.div
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Current testimonial */}
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard className="p-6 md:p-12 text-center space-y-4 md:space-y-6">
              {/* Stars */}
              <div className="flex justify-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    fill={theme.primaryColor}
                    color={theme.primaryColor}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl text-white/90 italic">
                "{testimonial.message}"
              </blockquote>

              {/* Author */}
              <div className="space-y-2">
                <p style={{ fontWeight: 'bold', color: theme.primaryColor }}>{testimonial.name}</p>
                <p className="text-sm text-white/70">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-8">
            <motion.button
              onClick={previous}
              className="p-2 rounded-full transition-colors"
              style={{
                color: theme.primaryColor,
              }}
              whileHover={{
                boxShadow: `0 0 15px ${theme.glowColor}`,
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{
                    backgroundColor: i === currentIndex ? theme.primaryColor : 'rgba(255, 255, 255, 0.3)',
                    boxShadow: i === currentIndex ? `0 0 10px ${theme.glowColor}` : 'none',
                  }}
                  onClick={() => setCurrentIndex(i)}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="p-2 rounded-full transition-colors"
              style={{
                color: theme.primaryColor,
              }}
              whileHover={{
                boxShadow: `0 0 15px ${theme.glowColor}`,
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default TestimonialsPage;
