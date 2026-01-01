import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Twitter } from 'lucide-react';
import { teamMembers as defaultTeamMembers } from '../../data/team';
import { SectionTitle, ScrollReveal } from '../ui';
import api from '../../services/api';

const TeamMemberCard = ({ member, index }) => {
  return (
    <ScrollReveal delay={index * 0.1} variant="fadeUp">
      <motion.div
        whileHover={{ y: -8 }}
        className="relative group"
      >
        <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10">
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />
            
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            >
              <div className="flex justify-center gap-3">
                {member.social.linkedin && (
                  <a 
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-primary-500 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                )}
                {member.social.instagram && (
                  <a 
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-primary-500 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                )}
                {member.social.twitter && (
                  <a 
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-primary-500 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
          
          <div className="p-5 text-center">
            <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
            <p className="text-primary-400 text-sm mb-3">{member.role}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {member.skills.slice(0, 2).map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white/5 text-dark-400 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

const Team = () => {
  const [teamMembers, setTeamMembers] = useState(defaultTeamMembers);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.request('/team');
        if (response.success && response.data?.length > 0) {
          const transformed = response.data.map(m => ({
            id: m.id,
            name: m.name,
            role: m.role,
            avatar: m.image,
            skills: m.skills || [],
            social: {
              instagram: m.social_links?.instagram ? `https://instagram.com/${m.social_links.instagram}` : null,
              linkedin: m.social_links?.linkedin ? `https://linkedin.com/in/${m.social_links.linkedin}` : null,
              twitter: m.social_links?.twitter ? `https://twitter.com/${m.social_links.twitter}` : null,
            }
          }));
          setTeamMembers(transformed);
        }
      } catch (error) {
        // Fallback to default team members
      }
    };
    fetchTeam();
  }, []);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="container-custom mx-auto relative">
        <ScrollReveal>
          <SectionTitle
            subtitle="تیم ما"
            title="متخصصین پشت موفقیت شما"
            description="تیمی از افراد خلاق و باتجربه که عاشق کارشان هستند"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.slice(0, 4).map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
