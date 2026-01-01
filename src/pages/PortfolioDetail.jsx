import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, TrendingUp, Users, Heart, Play, Quote } from 'lucide-react';
import { Button, Card, SectionTitle } from '../components/ui';
import api from '../services/api';
import { useState, useEffect } from 'react';

const PortfolioDetail = () => {
  const { portfolioId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await api.getPortfolios();
        if (response.success && response.data) {
          const allProjects = response.data;
          const currentProject = allProjects.find(p => p.id == portfolioId || p.slug === portfolioId);
          
          if (currentProject) {
            setProject(currentProject);
            const related = allProjects.filter(p => p.id !== currentProject.id && p.category === currentProject.category).slice(0, 3);
            setRelatedProjects(related);
          }
        }
      } catch (error) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [portfolioId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">پروژه یافت نشد</h1>
          <Link to="/portfolio">
            <Button>بازگشت به نمونه کارها</Button>
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'بازدید', value: project.views || '0', icon: Eye },
    { label: 'رشد', value: project.growth || '0%', icon: TrendingUp },
    { label: 'تعامل', value: project.results?.engagement || '0%', icon: Heart },
  ];

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-dark-400 max-w-3xl">
              {project.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                {project.type === 'video' && project.video_url ? (
                  <video
                    src={project.video_url}
                    poster={project.thumbnail}
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            <div className="space-y-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-dark-400">{stat.label}</div>
                      </div>
                      <stat.icon className="w-8 h-8 text-primary-500" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">درباره پروژه</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-dark-300 leading-relaxed mb-6">
                  {project.full_description || project.description}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">خدمات ارائه شده</h3>
                <div className="flex flex-wrap gap-3">
                  {(Array.isArray(project.services) ? project.services : JSON.parse(project.services || '[]')).map((service, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 text-primary-400"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {project.testimonial && (
                <Card className="p-8">
                  <Quote className="w-10 h-10 text-primary-500/30 mb-4" />
                  <p className="text-dark-300 leading-relaxed mb-6">
                    "{typeof project.testimonial === 'string' ? JSON.parse(project.testimonial).content : project.testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                      {(typeof project.testimonial === 'string' ? JSON.parse(project.testimonial).client_name : project.testimonial.client_name)?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <div className="font-bold text-white">
                        {typeof project.testimonial === 'string' ? JSON.parse(project.testimonial).client_name : project.testimonial.client_name}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              <div className="mt-6">
                <Link to="/start">
                  <Button className="w-full">
                    همین نتیجه رو می‌خوای؟
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {relatedProjects.length > 0 && (
            <div>
              <SectionTitle
                title="پروژه‌های مشابه"
                align="right"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
                  <Link key={p.id} to={`/portfolio/${p.id}`}>
                    <Card className="overflow-hidden group">
                      <div className="relative aspect-video bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-xl text-white text-xs">
                            {p.views}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-white group-hover:text-primary-400 transition-colors">
                          {p.title}
                        </h3>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetail;