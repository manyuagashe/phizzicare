import { Link, usePathname } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { Home, History, User } from 'lucide-react';

type Route = {
  pathname: "/" | "/history" | "/profile";
  icon: typeof Home;
  label: string;
};

const routes: Route[] = [
  { pathname: "/", icon: Home, label: "Home" },
  { pathname: "/history", icon: History, label: "History" },
  { pathname: "/profile", icon: User, label: "Profile" }
];

export const NavigationBar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const NavItem = ({ pathname, icon: Icon, label }: Route) => (
    <Link href={pathname}>
      <Pressable style={{ flex: 1 }}>
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: 8,
          gap: 4,
        }}>
          <Icon
            size={24}
            color={isActive(pathname) ? '#4ade80' : '#6b7280'}
          />
          <Text style={{
            fontSize: 12,
            fontWeight: '500',
            color: isActive(pathname) ? '#4ade80' : '#6b7280'
          }}>
            {label}
          </Text>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
    }}>
      <View style={{
        maxWidth: 512,
        marginHorizontal: 'auto',
        paddingHorizontal: 24,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
        {routes.map((route) => (
          <NavItem key={route.pathname} {...route} />
        ))}
      </View>
    </View>
  );
};