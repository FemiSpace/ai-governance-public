'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldCheck,
  ScrollText,
  ClipboardList,
  BarChart3,
  BotMessageSquare,
} from 'lucide-react';

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/models', label: 'Model Registry', icon: BotMessageSquare },
  { href: '/policies', label: 'Policies', icon: ScrollText },
  { href: '/bias', label: 'Bias & Fairness', icon: BarChart3 },
  { href: '/compliance', label: 'Compliance', icon: ShieldCheck },
  { href: '/audit', label: 'Audit Log', icon: ClipboardList },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-[#1a1035] text-white flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">F</div>
          <div>
            <p className="font-semibold text-sm leading-tight">FemiSpace</p>
            <p className="text-[10px] text-purple-300 leading-tight">AI Governance</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-fuchsia-600 text-white'
                  : 'text-purple-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/10 text-xs text-purple-400">
        v1.0.0 · March 2026
      </div>
    </aside>
  );
}
