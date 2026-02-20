import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Container, Heading, Section, Button, GlassCard } from '@/components';
import { MOTION_CONFIG } from '@/config/motion.config';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

/**
 * ContactPage Component
 * Contact form with validation and submission handling
 */
export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, send to email service or backend
      console.log('Form submitted:', data);

      setSubmitted(true);
      reset();

      // Auto-reset after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" className="relative">
      <Container>
        <Heading as="h2" className="mb-4 text-center">
          Get In Touch
        </Heading>
        <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
          Have a question or want to collaborate? I'd love to hear from you.
          Send me a message and I'll respond as soon as possible.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            variants={MOTION_CONFIG.staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                label: 'Email',
                value: 'contact@rudransh.dev',
                href: 'mailto:rudransh.pardeshi@gmail.com',
              },
              {
                icon: <Linkedin className="w-6 h-6" />,
                label: 'LinkedIn',
                value: 'linkedin.com/in/rudransh-pardeshi',
                href: 'https://linkedin.com/in/rudransh-pardeshi',
              },
              {
                icon: <Github className="w-6 h-6" />,
                label: 'GitHub',
                value: 'github.com/Rudranshpardeshi09',
                href: 'https://github.com/Rudranshpardeshi09',
              },
            ].slice(0, 3).map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                variants={MOTION_CONFIG.staggerItem}
              >
                <GlassCard className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/20 transition-colors">
                  <div className="text-primary-400">{item.icon}</div>
                  <div>
                    <p className="text-sm text-white/70">{item.label}</p>
                    <p className="font-semibold text-white">{item.value}</p>
                  </div>
                </GlassCard>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8">
              {submitted ? (
                <motion.div
                  className="text-center space-y-4 py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-5xl">🎉</div>
                  <h3 className="text-2xl font-bold text-white">Thanks for reaching out!</h3>
                  <p className="text-white/70">
                    I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      Name
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-400"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      Email
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-400"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      Subject
                    </label>
                    <input
                      {...register('subject')}
                      type="text"
                      placeholder="What's this about?"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-400"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      Message
                    </label>
                    <textarea
                      {...register('message')}
                      placeholder="Your message..."
                      rows={5}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-400 resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={loading}
                    className="w-full"
                  >
                    Send Message
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactPage;
