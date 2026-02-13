import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.png';
import project5 from '../assets/project5.png';
import project6 from '../assets/project6.png';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaHeart,
  FaRegHeart,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

const Projects = ({ darkMode }) => {

  const [visibleCount, setVisibleCount] = useState(3);
  const [filter, setFilter] = useState('All');
  const [favorites, setFavorites] = useLocalStorage('favourite', []);

  const projects = [
    { id: 1, title: 'Legal', desc: 'Made with React, HTML, CSS', image: project1, tags: ['React', 'HTML', 'CSS'] },
    { id: 2, title: 'Auriga', desc: 'Made with React, HTML, Tailwind', image: project2, tags: ['React', 'HTML', 'Tailwind'] },
    { id: 3, title: 'Portfolio', desc: 'Made with HTML, CSS', image: project3, tags: ['HTML', 'CSS'] },
    { id: 4, title: 'Sleep', desc: 'Made with React, JS, Tailwind', image: project4, tags: ['React', 'JS', 'Tailwind'] },
    { id: 5, title: 'Wine Store', desc: 'Made with HTML, CSS, Figma', image: project5, tags: ['HTML', 'CSS', 'Figma'] },
    { id: 6, title: 'Yucca', desc: 'Made with React, Tailwind', image: project6, tags: ['React', 'Tailwind'] },
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const allTags = projects.reduce((acc, project) => {
    project.tags.forEach(tag => {
      if (!acc.includes(tag)) acc.push(tag);
    });
    return acc;
  }, ['All', 'Favourites']);

  const filteredProjects =
    filter === 'All'
      ? projects
      : filter === 'Favourites'
        ? projects.filter(p => favorites.includes(p.id))
        : projects.filter(p => p.tags.includes(filter));

  const displayProjects = filteredProjects.slice(0, visibleCount);

  const handleViewMore = () => {
    if (visibleCount >= filteredProjects.length) {
      setVisibleCount(3);
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    } else {
      setVisibleCount(filteredProjects.length);
    }
  };

  return (
    <section
      id="projects"
      style={{ backgroundColor: darkMode ? '#111827' : '#f9fafb' }}
      className='relative py-20 transition-colors duration-300 scroll-mt-24'
    >
      <div className='container mx-auto px-4'>

        {/* TITLE */}
        <div className='text-center mb-10'>
          <motion.h2
            data-aos="fade-up"
            className='text-center sm:text-4xl font-bold mb-3'
            style={{ color: darkMode ? 'white' : '#1f2937' }}
          >
            My <span style={{
              background: 'linear-gradient(to right, #f97316, #f59e0b)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>Projects</span>
          </motion.h2>

          {/* FILTER BUTTONS */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-wrap justify-center gap-2 mt-6 mb-8"
          >
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => { setFilter(tag); setVisibleCount(3); }}
                style={{
                  background: filter === tag
                    ? 'linear-gradient(to right, #f97316, #f59e0b)'
                    : (darkMode ? '#374151' : '#e5e7eb'),
                  color: filter === tag
                    ? 'white'
                    : (darkMode ? '#d1d5db' : '#4b5563')
                }}
                className='px-4 py-1.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 shadow-sm active:scale-95'
              >
                {tag === 'Favourites'
                  ? `❤️ Favourites (${favorites.length})`
                  : tag}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECT GRID */}
        <motion.div
          layout
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          <AnimatePresence mode='popLayout'>
            {displayProjects.map((project) => {
              const isFav = favorites.includes(project.id);

              return (
                <motion.div
                  layout
                  key={project.id}
                  data-aos="fade-up"
                  data-aos-delay={project.id * 100}
                  style={{
                    background: darkMode ? '#1f2937' : '#ffffff',
                    borderColor: darkMode ? '#374151' : '#e5e7eb'
                  }}
                  className="group relative rounded-xl border transition-all hover:border-orange-500/50 shadow-sm overflow-hidden"
                >

                  <button
                    onClick={() => toggleFavorite(project.id)}
                    className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md transition-all hover:scale-125 active:scale-90"
                  >
                    {isFav
                      ? <FaHeart className="text-red-500" />
                      : <FaRegHeart className="text-white" />}
                  </button>

                  <div className='h-48 overflow-hidden relative'>
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                    />
                  </div>

                  <div className='p-5'>
                    <h3
                      className='text-xl font-bold mb-2'
                      style={{ color: darkMode ? 'white' : '#1f2937' }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className='text-sm mb-4'
                      style={{ color: darkMode ? '#d1d5db' : '#6b7280' }}
                    >
                      {project.desc}
                    </p>

                    <div className='flex flex-wrap gap-2 mb-5'>
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          style={{
                            backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                            color: darkMode ? '#d1d5db' : '#4b5563'
                          }}
                          className='px-3 py-1 text-xs rounded-full font-medium'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <a
                        href="#"
                        className='flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg bg-gray-500/10 hover:bg-gray-500/20 transition-all font-semibold'
                        style={{ color: darkMode ? 'white' : '#374151' }}
                      >
                        <FaGithub /> Code
                      </a>

                      <a
                        href="#"
                        className='flex-1 flex items-center justify-center gap-2 px-3 py-2 text-white text-sm rounded-lg transition-all font-semibold'
                        style={{ background: 'linear-gradient(to right, #f97316, #f59e0b)' }}
                      >
                        <FaExternalLinkAlt /> Demo
                      </a>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* VIEW ALL BUTTON */}
        {filteredProjects.length > 3 && (
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewMore}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-lg transition-all border-2 border-orange-500 ${
                darkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-white text-gray-900 hover:bg-orange-50'
              }`}
            >
              {visibleCount >= filteredProjects.length
                ? <>Show Less <FaChevronUp className="text-orange-500" /></>
                : <>View All Projects <FaChevronDown className="text-orange-500" /></>}
            </motion.button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;

