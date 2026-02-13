import Python from '../assets/Python.jpg'
import react from '../assets/react.jpg'
import javascript from '../assets/javascript.jpg'
import HTML from '../assets/HTML.webp'
import vite from '../assets/vite.png'
import CSS from '../assets/CSS.webp'
import tailwind from '../assets/tailwind.jpg'
import figma from '../assets/figma.png'
const Skills = ({darkMode}) => {
    const skills = [
        {name: 'Python', icon: Python, level: 90, 
              color: 'from-amber-500 to-amber-500'},
        {name: 'React', icon: react, level: 95, 
              color: 'from-blue-500 to-blue-500'},
        {name: 'Javascript', icon: javascript, level: 89, 
              color: 'from-violet-500 to-violet-500'},
        {name: 'HTML', icon: HTML, level: 96, 
              color: 'from-red-500 to-red-500'},
        {name: 'Vite', icon: vite, level: 90, 
              color: 'from-cyan-500 to-cyan-500'},
        {name: 'CSS', icon: CSS, level: 93, 
              color: 'from-green-500 to-green-500'},
        {name: 'Tailwind', icon: tailwind, level: 85, 
              color: 'from-teal-500 to-teal-500'},
        {name: 'Figma', icon: figma, level: 92, 
              color: 'from-orange-500 to-orange-500'},
    ]
  return (
    <section id="skills"
    style={{
        backgroundColor: darkMode ? "#111827" : "#f9fafb"
    }}
    className='py-14 relative overflow-hidden'>
        <div className='py-14 relative overflow-hidden'>
            <div className='container px-5 py-14 mx-auto'>
                <div className="text-center mb-10" data-aos='fade-up'>
                    <h1 className='sm:text-4xl text-3xl font-bold title-font
                    m-4'
                    style={{
                        color: darkMode ? 'white' : '#1f2937'
                    }}>
                        My <span style={{
            background: 'linear-gradient(to right, #f97316, #f59e0b)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
                        }}>
                            Skills
                        </span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto leading-relaxed"
                    style={{
                        color: darkMode ? '#d1d5db' : '#4b5563'
                    }}>
                        Please take a moment to explore my skills
                        
                    </p>
                </div>
                <div className="flex flex-wrap -m-4"
                data-aos='fade-up'
                data-aos-delay='200'>
                    {skills.map((skill, index) => (
                        <div
                        key={index}
                        className='p-4 lg:w-1/4 md:w-1/2 w-full'
                        data-aos='fade-up'
                        data-aos-delay={`${300 + index *100}`}>
                            <div
                            style={{
                            background: darkMode
                            ? 'linear-gradient(to bottom right, #1f2937, #111827)'
                            : 'linear-gradient(to bottom right, #ffffff, #f3f4f6)',
                            borderColor: darkMode ? '#374151' : '#e5e7eb'
                            }}
                            className='h-full p-6 rounded-2xl border-2
                            hover:border-orange-500/50 transition-all
                            duration-300 hover:-translate-y-2 group
                             hover:shadow-[0_0_30px_rgb(255, 165, 0, 0, 0.15)]'>
                                <div className='flex items-center mb-6'>
                                    <div
                                    style={{
                            background: darkMode
                            ? 'linear-gradient(to bottom right, #374151, #1f2937)'
                            : 'linear-gradient(to bottom right, #f3f4f4, #e5e7eb)',
                            }}
                            className='w-16 h-16 rounded-xl p-3 flex items-center
                            justify-center group-hover:scale-110 transition-transform duration-300'>
                                <img src={skill.icon}
                                 alt={skill.name}
                                 className='w-full h-full object-contain' />
                                    </div>
                                    <h3 className='text-2xl font-bold ml-4'
                                    style={{
                                        color: darkMode ? 'white' : '1f2937'
                                    }}>
                                        {skill.name}
                                    </h3>
                                </div>
                                <div className="mb-2  flex justify-between items-center">
                                    <span
                                    className='font-medium'
                                    style={{
                                        color: darkMode ? '#d1d5db' : '#6b7280'
                                    }}>
                                        Proficienccy
                                    </span>
                                    <span
                                    style={{
                                background: 'linear-gradient(to right, #f97316, #f59e0b)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent' 
                                    }}
                                    className='font-bold'>
                                        {skill.level}%

                                    </span>
                                </div>
                                <div
                                className='w-full rounded-full h-3 overflow-hidden'
                                style={{
                                    backgroundColor: darkMode ? '#374151' : '#e5e7eb'
                                }}>
                                    <div
                                    className={`h-full rounded-full bg-linear-to-r 
                                    ${skill.color} transition-all duration-1000 ease-out`}
                                    style={{
                                        width: `${skill.level}%`
                                    }}>

                                    </div>
                                </div>
                                <div className={`mt-6 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                                    <div className="h-1 rounded-full oopacity-70
                                    group-hover:w-full transition-all duration-500 w-1/3"
                                    style={{
                                        background: 'linear-gradient(to right, #f97316, #f59e0b)'

                                    }}>

                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </div>

    </section>
  );
}

export default Skills;