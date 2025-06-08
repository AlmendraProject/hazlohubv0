"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
};

const jobList: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    description: "React + TypeScript. 2 años de experiencia.",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSys",
    location: "Madrid, España",
    description: "Node.js, PostgreSQL, AWS",
  },
  // Agrega más ofertas aquí
];

export default function Home() {
  const [jobs, setJobs] = useState(jobList);
  const [post, setPost] = useState("");
  const [feed, setFeed] = useState<string[]>([]);

  const handleSwipe = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const handlePost = () => {
    if (post.trim() !== "") {
      setFeed([post, ...feed]);
      setPost("");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Publicar algo */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">¿Qué estás pensando?</h2>
        <Textarea
          placeholder="Comparte algo profesional..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <Button onClick={handlePost}>Publicar</Button>
        </div>
      </div>

      {/* Swipe Jobs estilo Tinder */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Explora empleos</h2>
        <div className="relative h-[300px] w-full">
          <AnimatePresence>
            {jobs.length > 0 ? (
              <motion.div
                key={jobs[0].id}
                className="absolute w-full h-full"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}>
                <Card className="h-full flex flex-col justify-between p-6 rounded-2xl shadow-xl bg-white">
                  <CardContent className="space-y-4">
                    <h3 className="text-2xl font-semibold">{jobs[0].title}</h3>
                    <p className="text-muted-foreground">
                      {jobs[0].company} • {jobs[0].location}
                    </p>
                    <p>{jobs[0].description}</p>
                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline"
                        onClick={() => handleSwipe(jobs[0].id)}>
                        Ignorar
                      </Button>
                      <Button onClick={() => handleSwipe(jobs[0].id)}>
                        Me interesa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <p className="text-center text-muted-foreground">
                No hay más empleos por mostrar.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Feed de publicaciones */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Últimas publicaciones</h2>
        {feed.length === 0 ? (
          <p className="text-muted-foreground">Aún no hay publicaciones.</p>
        ) : (
          feed.map((item, idx) => (
            <Card key={idx} className="bg-white shadow rounded-xl p-4">
              <CardContent className="text-base">{item}</CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
