import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Globe, Smartphone, Search, ShoppingCart, Palette, Code } from 'lucide-react';
import { webProjects as defaultProjects, projectTypes as defaultTypes } from '../../data/webProjects';
import { SectionTitle, ScrollReveal } from '../ui';
import api from '../../services/api';

const iconMap = {
  Globe,
  Smartphone,
  Search,
  ShoppingCart,
  Palette,
  Code,
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = typeof project.icon === 'string' ? iconMap[project.icon] : project.icon || iconMap.Globe;
  const projectSlug = project.slug || project.id;
  const technologies = project.technologies || [];
  const results = project.results || {};

  return (
    <ScrollReveal delay={index * 0.1}>
      <Link to={`/web-projects/${projectSlug}`}>
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -8 }}
          className="relative h-[420px] rounded-2xl overflow-hidden group cursor-pointer"
        >
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-dark-950/30" />
        </div>

        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <motion.div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${project.color} flex items-center justify-center shadow-lg`}
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
            </motion.div>
            <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs">
              {project.category}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-dark-400 text-sm">{project.client}</span>
              <span className="text-dark-600">•</span>
              <span className="text-dark-400 text-sm">{project.year}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
              {project.title}
            </h3>

            <p className="text-dark-300 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-md bg-white/10 text-white text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {Object.entries(results).slice(0, 3).map(([key, value], i) => (
                <div key={i} className="text-center p-2 rounded-lg bg-white/5">
                  <div className="text-primary-400 font-bold text-sm">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-2 text-primary-400 font-medium"
                animate={{ x: isHovered ? -5 : 0 }}
              >
                <span className="text-sm">مشاهده جزئیات</span>
                <ArrowLeft className="w-4 h-4" />
              </motion.div>
              {project.link && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.link, '_blank', 'noopener,noreferrer');
                  }}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        </motion.div>
      </Link>
    </ScrollReveal>
  );
};

const WebProjects = () => {
  const [activeType, setActiveType] = useState('all');
  const [projects, setProjects] = useState(defaultProjects);
  const [projectTypes, setProjectTypes] = useState(defaultTypes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, typesRes] = await Promise.all([
          api.getWebProjects(),
          api.getWebProjectTypes()
        ]);
        
        if (projectsRes.success && projectsRes.data?.length > 0) {
          setProjects(projectsRes.data);
        }
        if (typesRes.success && typesRes.data) {
          setProjectTypes(typesRes.data.map(t => ({
            ...t,
            icon: iconMap[t.icon] || Palette
          })));
        }
      } catch (error) {
        console.error('Error fetching web projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProjects = activeType === 'all'
    ? projects
    : projects.filter(p => p.type === activeType);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container-custom mx-auto relative">
        <ScrollReveal>
          <SectionTitle
            subtitle="نمونه کارهای دیجیتال"
            title="وب‌سایت‌ها، اپلیکیشن‌ها و پروژه‌های سئو"
            description="پروژه‌های موفقی که برای مشتریان‌مان طراحی و توسعه داده‌ایم"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {projectTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <motion.button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeType === type.id
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-white/5 text-dark-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {type.title}
                </motion.button>
              );
            })}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-primary-400 hover:bg-primary-500/10 hover:border-primary-500/30 font-medium transition-all duration-300"
            >
              مشاهده همه نمونه کارها
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WebProjects;
