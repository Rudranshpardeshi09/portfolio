import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import { Badge } from './typography/Typography';
import { cn } from '@/lib/utils';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  onClick?: () => void;
}

/**
 * ProjectCard Component
 * Displays a project with image, description, and links
 */
export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      image,
      title,
      description,
      tags,
      link,
      github,
      featured = false,
      onClick,
    },
    ref,
  ) => {
    return (
      <GlassCard
        ref={ref}
        className={cn(
          'group cursor-pointer overflow-hidden',
          featured && 'md:col-span-2 md:row-span-2',
        )}
        onClick={onClick}
        animated
      >
        {/* Image container */}
        <div className="relative w-full h-48 md:h-64 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
          {title}
        </h3>

        <p className="text-white/70 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="primary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-primary-500/20 hover:bg-primary-500/40 text-primary-300 rounded-lg transition-all duration-200 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </motion.a>
          )}
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-accent-500/20 hover:bg-accent-500/40 text-accent-300 rounded-lg transition-all duration-200 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              Code
            </motion.a>
          )}
        </div>
      </GlassCard>
    );
  },
);

ProjectCard.displayName = 'ProjectCard';

/**
 * SkillCard Component
 * Displays a skill with progress bar
 */
interface SkillCardProps {
  icon?: React.ReactNode;
  name: string;
  proficiency?: number; // 0-100
  description?: string;
}

export const SkillCard = React.forwardRef<HTMLDivElement, SkillCardProps>(
  (
    { icon, name, proficiency = 80, description },
    ref,
  ) => {
    return (
      <GlassCard ref={ref} className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {icon && <div className="text-2xl">{icon}</div>}
          <div className="flex-1">
            <h3 className="font-semibold text-white">{name}</h3>
            {description && (
              <p className="text-xs text-white/60">{description}</p>
            )}
          </div>
        </div>

        {proficiency !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-white/70">
              <span>Proficiency</span>
              <span>{proficiency}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}
      </GlassCard>
    );
  },
);

SkillCard.displayName = 'SkillCard';
