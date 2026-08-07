import React from 'react';
import { Monitor, Cpu, Network, Usb, Layers, ShieldCheck } from 'lucide-react';

export default function ProductCard() {
  const specs = [
    {
      icon: <Monitor className="text-emerald-505" size={24} />,
      title: 'Dual 4K Displays',
      description: 'Support for dual monitor configurations up to 4K resolution via dual micro-HDMI ports.'
    },
    {
      icon: <Cpu className="text-emerald-505" size={24} />,
      title: 'Quad-Core Processor',
      description: 'Powered by Broadcom BCM2711 64-bit Quad-core ARM Cortex-A72 at 1.5GHz.'
    },
    {
      icon: <Network className="text-emerald-505" size={24} />,
      title: 'Gigabit Connectivity',
      description: 'Equipped with Native Gigabit Ethernet, 2.4/5.0 GHz Dual-band WiFi, and Bluetooth 5.0.'
    },
    {
      icon: <Usb className="text-emerald-505" size={24} />,
      title: 'USB Redirection',
      description: '4 USB ports (2 USB 3.0 / 2 USB 2.0) with transparent redirect support for webcams, printers.'
    },
    {
      icon: <Layers className="text-emerald-505" size={24} />,
      title: 'vSpace Pro Support',
      description: 'Fully integrated with vSpace Pro Enterprise, PMC, and SuperRDP virtualization layers.'
    },
    {
      icon: <ShieldCheck className="text-emerald-505" size={24} />,
      title: 'Enterprise Security',
      description: 'Secure read-only firmware, locked bootloader, and optional encrypted storage options.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {specs.map((spec, index) => (
        <div
          key={index}
          className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 duration-200 backdrop-blur-md"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mb-4">
            {spec.icon}
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {spec.title}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {spec.description}
          </p>
        </div>
      ))}
    </div>
  );
}
