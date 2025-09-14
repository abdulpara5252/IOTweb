"use client";

import React, { useState } from 'react';
import { 
  Wifi, 
  Shield, 
  BarChart3, 
  Zap, 
  Globe, 
  Smartphone,
  Database,
  Cpu,
  Activity,
  TrendingUp,
  Eye,
  Settings
} from 'lucide-react';

const IoTFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Wifi,
      title: "Wireless Connectivity",
      description: "Advanced wireless communication protocols for seamless device connectivity across all environments.",
      benefits: ["LoRaWAN Technology", "4G/5G Connectivity", "Mesh Networking", "Low Power Consumption"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade security protocols to protect your critical infrastructure and data.",
      benefits: ["End-to-End Encryption", "Multi-Factor Authentication", "Secure Data Transmission", "Compliance Ready"]
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Advanced analytics and reporting tools for data-driven decision making.",
      benefits: ["Live Dashboards", "Predictive Analytics", "Custom Reports", "AI-Powered Insights"]
    },
    {
      icon: Zap,
      title: "Instant Alerts",
      description: "Immediate notification system for critical events and anomalies.",
      benefits: ["SMS/Email Alerts", "Mobile Push Notifications", "Custom Alert Rules", "Escalation Management"]
    },
    {
      icon: Globe,
      title: "Global Monitoring",
      description: "Monitor and control your assets from anywhere in the world with our cloud platform.",
      benefits: ["Cloud Infrastructure", "Remote Access", "Multi-Site Management", "24/7 Availability"]
    },
    {
      icon: Smartphone,
      title: "Mobile Control",
      description: "Complete control and monitoring through intuitive mobile applications.",
      benefits: ["iOS & Android Apps", "Offline Capability", "Push Notifications", "Touch Controls"]
    }
  ];

  const stats = [
    { icon: Database, label: "Data Points", value: "10M+", description: "Processed daily" },
    { icon: Cpu, label: "Devices", value: "50K+", description: "Connected worldwide" },
    { icon: Activity, label: "Uptime", value: "99.9%", description: "System reliability" },
    { icon: TrendingUp, label: "ROI", value: "300%", description: "Average improvement" }
  ];

  return (
    <section className="py-20 iot-gradient-bg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <Eye className="w-4 h-4" />
            IoT Technology Features
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 text-white">
            <span className="neon-text">Smart Solutions</span> for
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Connected World
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience the power of next-generation IoT technology with our comprehensive suite of 
            monitoring, control, and analytics solutions.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="iot-card-glow bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center data-stream"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-blue-300 font-semibold mb-1">{stat.label}</div>
              <div className="text-slate-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feature Navigation */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">Core Capabilities</h3>
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeFeature === index
                    ? 'iot-card-glow bg-slate-800/70 border-blue-500/50'
                    : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50'
                } border backdrop-blur-sm`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      : 'bg-slate-700'
                  }`}>
                    <feature.icon className={`w-6 h-6 ${
                      activeFeature === index ? 'text-white' : 'text-slate-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                      activeFeature === index ? 'text-white' : 'text-slate-300'
                    }`}>
                      {feature.title}
                    </h4>
                    <p className={`text-sm transition-colors duration-300 ${
                      activeFeature === index ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Feature Details */}
          <div className="iot-card-glow bg-slate-800/50 backdrop-blur-sm rounded-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                {React.createElement(
                  features[activeFeature].icon,
                  { className: "w-8 h-8 text-white" }
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {features[activeFeature].title}
                </h3>
                <p className="text-slate-300">
                  {features[activeFeature].description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white mb-4">Key Benefits:</h4>
              {features[activeFeature].benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                  <span className="text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700">
              <div className="flex items-center gap-2 text-blue-400">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Advanced Configuration Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="iot-card-glow bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Operations?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Join thousands of companies already using our IoT solutions to optimize their processes, 
              reduce costs, and improve efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 font-semibold rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IoTFeatures;
