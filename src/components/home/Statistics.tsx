"use client";

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Award,
  Zap,
  Shield,
  Clock,
  Target
} from 'lucide-react';

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('statistics-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const stats = [
    {
      icon: TrendingUp,
      value: "500+",
      label: "Projects Completed",
      description: "Successfully delivered IoT solutions",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      value: "200+",
      label: "Happy Clients",
      description: "Satisfied customers worldwide",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      value: "25+",
      label: "Countries Served",
      description: "Global presence and reach",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      value: "15+",
      label: "Years Experience",
      description: "Industry expertise and knowledge",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      value: "99.9%",
      label: "System Uptime",
      description: "Reliable and consistent performance",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      value: "100%",
      label: "Data Security",
      description: "Enterprise-grade protection",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  const achievements = [
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical assistance"
    },
    {
      icon: Target,
      title: "99% Success Rate",
      description: "Project delivery excellence"
    }
  ];

  return (
    <section id="statistics-section" className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/10 via-transparent to-cyan-900/10"></div>
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            Our Achievements
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 text-white">
            <span className="neon-text">Proven Track Record</span> of
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Excellence & Innovation
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Numbers that speak for themselves. Our commitment to quality and innovation has resulted in 
            remarkable achievements across the globe.
          </p>
        </div>

        {/* Main Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="iot-card-glow bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center data-stream"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-1000 ${
                isVisible ? 'animate-pulse' : ''
              }`}>
                {stat.value}
              </div>
              <div className="text-blue-300 font-semibold mb-1 text-sm">{stat.label}</div>
              <div className="text-slate-400 text-xs">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="iot-card-glow bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                  <p className="text-slate-300">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="iot-card-glow bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join Our Success Story?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Experience the same level of excellence and innovation that has made us a trusted partner 
              for industry leaders worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                Start Your Project
              </button>
              <button className="px-8 py-4 border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 font-semibold rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
