import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, History, User } from "lucide-react";
import { usePathname } from 'expo-router';


export const NavigationBar = () => {

    const pathname = usePathname();
    
    const isActive = (path: string) => pathname === path;
  
  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: typeof Home; label: string }) => (
    <Link to={to} className="flex-1">
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors
          ${isActive(to) ? "text-mint" : "text-gray-500 hover:text-gray-700"}`}
      >
        <Icon className="w-6 h-6" />
        <span className="text-xs font-medium">{label}</span>
      </motion.div>
    </Link>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200">
      <nav className="max-w-lg mx-auto px-6 py-2 flex items-center justify-around">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/history" icon={History} label="History" />
        <NavItem to="/profile" icon={User} label="Profile" />
      </nav>
    </div>
  );
};