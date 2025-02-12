import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaHeart,
} from 'react-icons/fa';

const AboutPage = () => {
  const skills = ['React.js', 'Node.js', 'REST APIs', 'MongoDB', 'Javascript'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-600 mix-blend-multiply" />
            <div className="relative bg-gradient-to-r from-orange-600 to-indigo-600 px-8 py-12 text-white">
              <h1 className="text-4xl font-bold mb-4">Vishwas Chakilam</h1>
              <p className="text-xl text-orange-100">
                Full Stack Developer & Tech Enthusiast
              </p>
            </div>
          </div>

          <div className="p-8">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Hello! I'm a passionate developer focused on creating intuitive
                and efficient web applications. With a deep love for both
                frontend and backend development, I enjoy tackling complex
                problems and turning them into simple, beautiful solutions. This
                Recipe Finder app showcases my approach to building user-centric
                applications that solve real-world problems.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaCode className="mr-3 text-orange-500" /> Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaHeart className="mr-3 text-orange-500" /> What I Love
                  </h2>
                  <ul className="space-y-2 text-gray-600">
                    <li>Building intuitive user interfaces</li>
                    <li>Solving complex technical challenges</li>
                    <li>Learning new technologies</li>
                    <li>Contributing to open source</li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Let's Connect
                </h2>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/vishwas-chakilam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <FaGithub className="text-xl mr-2" />
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/vishwas-chakilam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaLinkedin className="text-xl mr-2" />
                    LinkedIn
                  </a>
                  <a
                    href="mailto:work.vishwas1@gmail.com"
                    className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <FaEnvelope className="text-xl mr-2" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
