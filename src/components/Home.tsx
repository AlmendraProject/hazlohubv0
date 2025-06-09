"use client";

import SidebarMenu from "@/components/Option"; // importa tu sidebar
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  image: string;
};

const jobList: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    description: "React + TypeScript. 2 años de experiencia.",
    image:
      "https://res.cloudinary.com/dbfoqawil/image/upload/v1740530814/cld-sample-4.jpg",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSys",
    location: "Madrid, España",
    description: "Node.js, PostgreSQL, AWS",
    image:
      "https://res.cloudinary.com/dbfoqawil/image/upload/v1740530814/cld-sample-4.jpg",
  },
];

export default function Home() {
  const [jobs, setJobs] = useState(jobList);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );

  const handleSwipe = (id: number, direction: "left" | "right") => {
    setSwipeDirection(direction);
    setTimeout(() => {
      setJobs((prev) => prev.filter((job) => job.id !== id));
      setSwipeDirection(null);
    }, 400);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="w-full max-w-md h-full relative">
          <AnimatePresence>
            {jobs.length > 0 ? (
              <motion.div
                key={jobs[0].id}
                className="absolute w-full h-full"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={
                  swipeDirection === "right"
                    ? { x: 300, rotate: 20, opacity: 0 }
                    : { x: -300, rotate: -20, opacity: 0 }
                }
                transition={{ duration: 0.4 }}>
                <Card className="h-full flex flex-col rounded-2xl shadow-2xl bg-white overflow-hidden">
                  <div className="relative w-full h-[75%]">
                    <Image
                      src={jobs[0].image}
                      alt={jobs[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="flex flex-col justify-between p-6 space-y-4 flex-1">
                    <div>
                      <h3 className="text-2xl font-semibold">
                        {jobs[0].title}
                      </h3>
                      <p className="text-muted-foreground">
                        {jobs[0].company} • {jobs[0].location}
                      </p>
                      <p className="mt-2">{jobs[0].description}</p>
                    </div>
                    <div className="flex justify-between mt-auto pt-4 gap-4">
                      <Button
                        variant="outline"
                        onClick={() => handleSwipe(jobs[0].id, "left")}>
                        Ignorar
                      </Button>
                      <motion.button
                        whileTap={{ scale: 1.2 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleSwipe(jobs[0].id, "right")}
                        className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white">
                        <Heart className="w-6 h-6 fill-current" />
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <p className="text-center text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                No hay más empleos por mostrar.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
