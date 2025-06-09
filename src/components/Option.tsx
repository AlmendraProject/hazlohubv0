"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Compass,
  Filter,
  Home,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import type React from "react";

interface OptionProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  badge?: string | number;
  hasNotification?: boolean;
  onClick?: () => void;
}

function Option({
  icon,
  label,
  isActive,
  badge,
  hasNotification,
  onClick,
}: OptionProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-4 px-4 py-3 h-auto text-white hover:bg-gray-800/50 relative",
        isActive && "text-gray-300" // Changed from text-red-500 to text-gray-300
      )}
      onClick={onClick}>
      <div className="relative">
        {icon}
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-400 rounded-full" /> // Changed from bg-red-500 to bg-gray-400
        )}
      </div>
      <span className="text-base font-normal">{label}</span>
      {badge && (
        <Badge
          className="ml-auto bg-gray-600 hover:bg-gray-700 text-white text-xs px-2 py-1" // Changed from bg-red-500 and hover:bg-red-600 to grayscale
        >
          {badge}
        </Badge>
      )}
    </Button>
  );
}

export default function SidebarMenu() {
  const menuOptions = [
    {
      icon: <Home className="w-6 h-6" />,
      label: "Para ti",
      isActive: true,
    },
    {
      icon: <Compass className="w-6 h-6" />,
      label: "Explorar",
    },
    {
      icon: <UserPlus className="w-6 h-6" />,
      label: "Siguiendo",
      hasNotification: true,
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Friends",
    },
    {
      icon: <Plus className="w-6 h-6" />,
      label: "Cargar",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "Actividad",
      badge: "14",
    },
    {
      icon: <Filter className="w-6 h-6" />,
      label: "Mensajes",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      label: "LIVE",
    },
  ];

  return (
    <div className="w-64 h-screen bg-black border-r border-gray-800 flex flex-col items-start">
      {/* Search Bar */}
      <div className="p-4 w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Buscar"
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600"
          />
        </div>
      </div>

      {/* Menu Options */}
      <div className="flex-1 w-full px-2">
        <div className="space-y-1">
          {menuOptions.map((option, index) => (
            <Option
              key={index}
              icon={option.icon}
              label={option.label}
              isActive={option.isActive}
              badge={option.badge}
              hasNotification={option.hasNotification}
              onClick={() => console.log(`Clicked: ${option.label}`)}
            />
          ))}
        </div>

        {/* Profile Section */}
        <div className="mt-6">
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 px-4 py-3 h-auto text-white hover:bg-gray-800/50">
            <Avatar className="w-6 h-6">
              <AvatarImage src="/placeholder.svg?height=24&width=24" />
              <AvatarFallback className="bg-gray-600 text-white text-xs">
                U
              </AvatarFallback>
            </Avatar>
            <span className="text-base font-normal">Perfil</span>
          </Button>
        </div>

        {/* More Option */}
        <div className="mt-2">
          <Option
            icon={<MoreHorizontal className="w-6 h-6" />}
            label="Más"
            onClick={() => console.log("Clicked: Más")}
          />
        </div>
      </div>
    </div>
  );
}
