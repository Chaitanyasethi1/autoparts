import * as React from "react"
import { cn } from "../../lib/utils";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Button } from "./button";

function MagnetizeButton({
    className,
    particleCount = 24,
    href,
    target,
    rel,
    children,
    ...props
}) {
    const [isAttracting, setIsAttracting] = useState(false);
    const [particles, setParticles] = useState([]);
    const particlesControl = useAnimation();

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 360 - 180,
            y: Math.random() * 360 - 180,
        }));
        setParticles(newParticles);
    }, [particleCount]);

    const handleInteractionStart = useCallback(async () => {
        setIsAttracting(true);
        await particlesControl.start({
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 10,
            },
        });
    }, [particlesControl]);

    const handleInteractionEnd = useCallback(async () => {
        setIsAttracting(false);
        // We let the useEffect take over the continuous random animation
    }, []);

    // Continuous floating animation when not attracting
    useEffect(() => {
        if (!isAttracting && particles.length > 0) {
            particlesControl.start((i) => {
                // Generate a continuous random path for each particle
                const randomX1 = particles[i].x + (Math.random() * 100 - 50);
                const randomY1 = particles[i].y + (Math.random() * 100 - 50);
                const randomX2 = particles[i].x + (Math.random() * 100 - 50);
                const randomY2 = particles[i].y + (Math.random() * 100 - 50);

                return {
                    x: [particles[i].x, randomX1, randomX2, particles[i].x],
                    y: [particles[i].y, randomY1, randomY2, particles[i].y],
                    transition: {
                        duration: 8 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "linear"
                    }
                };
            });
        }
    }, [isAttracting, particles, particlesControl]);

    const Comp = href ? 'a' : 'button';

    return (
        <Comp
            href={href}
            target={target}
            rel={rel}
            className={cn(
                "relative touch-none overflow-hidden transition-all duration-300 inline-flex items-center justify-center rounded-md font-medium disabled:pointer-events-none disabled:opacity-50",
                className
            )}
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            {...props}
        >
            {particles.map((_, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    initial={{ x: particles[index] ? particles[index].x : 0, y: particles[index] ? particles[index].y : 0 }}
                    animate={particlesControl}
                    className={cn(
                        "absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full",
                        "bg-current",
                        "transition-opacity duration-300 pointer-events-none",
                        isAttracting ? "opacity-90 scale-125" : "opacity-40"
                    )}
                />
            ))}
            <span className="relative w-full flex items-center justify-center gap-2 z-10">
                {children}
            </span>
        </Comp>
    );
}

export { MagnetizeButton }
