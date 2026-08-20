import * as React from "react"
import { cn } from "../../lib/utils";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Button } from "./button";

function MagnetizeButton({
    className,
    particleCount = 12,
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
        await particlesControl.start((i) => ({
            x: particles[i].x,
            y: particles[i].y,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        }));
    }, [particlesControl, particles]);

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
                        "absolute w-1.5 h-1.5 rounded-full",
                        "bg-current",
                        "transition-opacity duration-300 pointer-events-none",
                        isAttracting ? "opacity-30" : "opacity-0"
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
