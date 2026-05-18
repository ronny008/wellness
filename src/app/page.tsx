"use client";

import { FormEvent, MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  HeartPulse,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Quote,
  Send,
  Sparkles,
  Star,
  SunMedium,
  Twitter,
  Waves,
  Wind,
  Youtube
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navItems = ["About", "Services", "Journey", "Journal", "Contact"];

const heroStats = [
  { value: "500+", label: "Lives Rebalanced" },
  { value: "10+", label: "Years Coaching" },
  { value: "95%", label: "Wellness Success" }
];

const trustStats = [
  { value: 500, suffix: "+", label: "Happy Clients", detail: "Guided through bespoke transformation plans." },
  { value: 10, suffix: "+", label: "Years Experience", detail: "A decade of evidence-informed wellness coaching." },
  { value: 95, suffix: "%", label: "Wellness Success", detail: "Clients report meaningful improvements in daily energy." }
];

const services = [
  {
    icon: HeartPulse,
    title: "Wellness Coaching",
    text: "A complete mind-body reset with weekly coaching, rituals, reflection, and measurable growth."
  },
  {
    icon: Wind,
    title: "Meditation Guidance",
    text: "Guided breathwork, stillness practices, and nervous-system support built around your real life."
  },
  {
    icon: Leaf,
    title: "Nutrition Planning",
    text: "Grounded, elegant nutrition rhythms that restore energy without obsession or rigid rules."
  },
  {
    icon: Waves,
    title: "Stress Management",
    text: "Somatic tools, boundary design, and daily decompression systems for sustained calm."
  },
  {
    icon: SunMedium,
    title: "Lifestyle Transformation",
    text: "A high-touch operating system for sleep, movement, focus, rituals, and emotional clarity."
  },
  {
    icon: Sparkles,
    title: "Holistic Healing",
    text: "Gentle integrative practices that reconnect your habits, environment, energy, and purpose."
  }
];

const journeySteps = [
  {
    step: "01",
    title: "Listen Deeply",
    text: "We begin with your story, your energy patterns, and the emotional architecture of your days.",
    metric: "90 min intake",
    rituals: ["Energy audit", "Values mapping", "Stress pattern review"]
  },
  {
    step: "02",
    title: "Design Rituals",
    text: "Your bespoke wellness plan becomes a calm set of rituals for mornings, meals, movement, and rest.",
    metric: "4-week reset",
    rituals: ["Morning rhythm", "Nutrition anchors", "Sleep sanctuary"]
  },
  {
    step: "03",
    title: "Embody Change",
    text: "Coaching turns insight into rhythm with reflective feedback, accountability, and elegant adjustments.",
    metric: "weekly support",
    rituals: ["Private sessions", "Somatic practice", "Reflection loops"]
  },
  {
    step: "04",
    title: "Live Expanded",
    text: "You leave with a lifestyle system that feels spacious, sustainable, and deeply yours.",
    metric: "lifelong tools",
    rituals: ["Personal playbook", "Resilience plan", "Seasonal recalibration"]
  }
];

const testimonials = [
  {
    name: "Maya R.",
    role: "Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    quote: "Aurelia helped me rebuild my mornings and my nervous system. The work felt luxurious, precise, and human."
  },
  {
    name: "Elena W.",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    quote: "I came for wellness coaching and found a completely new relationship with energy, food, and rest."
  },
  {
    name: "Nora C.",
    role: "Investor",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    quote: "Every session felt like a reset. Strategic, soulful, and beautifully tailored to a demanding life."
  },
  {
    name: "Amara S.",
    role: "Designer",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=160&q=80",
    quote: "The transformation was quiet at first, then undeniable. My sleep, focus, and self-trust changed."
  }
];

// Programs data removed

const routines = [
  {
    icon: SunMedium,
    title: "Morning Routine",
    front: "Awaken with clarity, sunlight, hydration, and intention.",
    back: "A 22-minute ritual for breath, mobility, journaling, and energy mapping."
  },
  {
    icon: Wind,
    title: "Meditation Practices",
    front: "Daily stillness that feels gentle, grounded, and repeatable.",
    back: "Breath-led sessions for focus, compassion, release, and nervous-system repair."
  },
  {
    icon: Moon,
    title: "Evening Detox",
    front: "Close the day without carrying it into your sleep.",
    back: "Digital sunset, mineral tea, reflection prompts, and restorative wind-down cues."
  },
  {
    icon: Leaf,
    title: "Nutrition Habits",
    front: "Eat in a way that supports stable energy and emotional ease.",
    back: "Seasonal plates, protein anchors, mindful cravings, and simple weekly prep."
  }
];

const posts = [
  {
    title: "The Quiet Power of a Nervous-System Morning",
    tag: "Mindfulness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
    read: "6 min"
  },
  {
    title: "Designing Nutrition Rituals Without Losing Pleasure",
    tag: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
    read: "8 min"
  },
  {
    title: "How to Build a Recovery Practice for Ambitious Lives",
    tag: "Recovery",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80",
    read: "5 min"
  }
];

const faqs = [
  {
    question: "How personal is the coaching plan?",
    answer:
      "Every plan is built after a detailed intake covering your schedule, energy, stress patterns, nutrition preferences, emotional goals, and the life you are trying to grow into."
  },
  {
    question: "Do I need prior meditation or wellness experience?",
    answer:
      "No. The work is designed to feel welcoming and exact. We start with accessible rituals and deepen only when your body and calendar can sustain them."
  },
  {
    question: "Can coaching support a demanding career?",
    answer:
      "Yes. The method is especially useful for founders, executives, and creatives who need calm systems that work inside high-responsibility lives."
  },
  {
    question: "How quickly will I feel a difference?",
    answer:
      "Most clients feel a shift in the first two weeks as sleep, mornings, and stress rituals become more intentional. Deeper transformation compounds over months."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 }
};

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.18,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
}

function useCursorGlow() {
  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);
}

function useGsapAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42, filter: "blur(14px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%"
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const depth = Number(element.dataset.parallax || 20);
        gsap.to(element, {
          yPercent: depth,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((element) => {
        const end = Number(element.dataset.count || 0);
        const suffix = element.dataset.suffix || "";
        const counter = { value: 0 };
        gsap.to(counter, {
          value: end,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true
          },
          onUpdate: () => {
            element.textContent = `${Math.round(counter.value)}${suffix}`;
          }
        });
      });

      gsap.fromTo(
        ".journey-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: "#journey",
            start: "top 64%",
            end: "bottom 42%",
            scrub: true
          }
        }
      );

      gsap.fromTo(
        ".about-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top 70%",
            end: "bottom 35%",
            scrub: true
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);
}

function MagneticButton({
  children,
  className = "",
  href = "#contact",
  variant = "primary"
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "dark";
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 170, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 170, damping: 15, mass: 0.2 });

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.28);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles =
    variant === "primary"
      ? "bg-forest text-cream shadow-glow hover:bg-moss"
      : variant === "secondary"
      ? "border border-forest/15 bg-white/35 text-forest backdrop-blur-xl hover:border-gold/60"
      : "border border-cream/20 bg-cream/10 text-cream backdrop-blur-xl hover:border-gold/60";

  return (
    <motion.a
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`magnetic group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition ${styles} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </motion.a>
  );
}

function SpotlightCard({
  children,
  className = "",
  variant = "light"
}: {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
}) {
  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--spot-x", `${x}%`);
    event.currentTarget.style.setProperty("--spot-y", `${y}%`);
  };

  const spotlightClass = variant === "dark" ? "spotlight-dark" : "spotlight";

  return (
    <div
      onMouseMove={handleMove}
      className={`${spotlightClass} gradient-border relative overflow-hidden rounded-[2rem] ${className}`}
    >
      {children}
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/50 bg-cream/58 px-3 py-2.5 shadow-[0_18px_50px_rgba(63,89,67,0.12)] backdrop-blur-2xl sm:px-4 sm:py-3">
        <a href="#" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-forest text-cream sm:h-10 sm:w-10">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-serif text-lg font-bold tracking-normal text-forest sm:text-xl">Aurelia</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full bg-white/30 p-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-forest/72 transition hover:bg-white/60 hover:text-forest"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <MagneticButton href="#contact" className="min-h-10 px-5">
            Begin
          </MagneticButton>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setOpen((value) => !value)}
          suppressHydrationWarning
          className="grid h-10 w-10 place-items-center rounded-full bg-white/50 text-forest sm:h-11 sm:w-11 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 flex max-h-[calc(100dvh-5.5rem)] max-w-7xl flex-col gap-2 overflow-y-auto rounded-[1.25rem] border border-white/50 bg-cream/88 p-3 shadow-premium backdrop-blur-2xl sm:mt-3 sm:rounded-[1.5rem] lg:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item}
              onClick={() => setOpen(false)}
              href={`#${item.toLowerCase()}`}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-forest/78 hover:bg-white/60"
            >
              {item}
            </a>
          ))}
        </motion.div>
      ) : null}

      <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-gold-sage scroll-progress" />
    </motion.header>
  );
}

function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imageX = useTransform(mouseX, [-0.5, 0.5], [-18, 18]);
  const imageY = useTransform(mouseY, [-0.5, 0.5], [14, -14]);

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      onMouseMove={handleMove}
      className="relative flex min-h-screen lg:items-center px-4 pb-24 pt-28 sm:pt-36 lg:overflow-hidden"
    >
      <div className="absolute inset-0 bg-soft-radial" />
      <div className="noise" />
      <motion.div
        aria-hidden
        className="absolute left-[6%] top-[18%] h-64 w-64 rounded-full bg-gold/35 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, -24, 18, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[4%] top-[8%] h-80 w-80 rounded-full bg-sage/34 blur-3xl"
        animate={{ x: [0, -32, 20, 0], y: [0, 34, -16, 0], scale: [1, 0.95, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-shell relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] xl:gap-16 py-6 lg:py-0">
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.18 } }
          }}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-moss backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4 text-gold" />
            Luxury wellness coaching
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance font-serif text-[clamp(2.25rem,6.4vw,3.8rem)] font-bold leading-[0.95] sm:leading-[0.9] tracking-normal text-forest lg:text-[clamp(4.1rem,4.7vw,5.6rem)]"
          >
            Transform Your Life Through <span className="headline-gradient">Wellness</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-base leading-7 text-forest/70 sm:text-lg"
          >
            Bespoke coaching for high-performing lives seeking a softer rhythm: calmer mornings, nourished
            energy, emotional clarity, and rituals that make transformation feel deeply human.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <MagneticButton href="#programs">Start Your Journey</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Book Consultation
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 grid max-w-2xl grid-cols-3 gap-3"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="glass rounded-[1.35rem] p-4">
                <div className="font-serif text-3xl font-bold text-forest sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-forest/52">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[560px]" data-parallax="-5">
          <div className="absolute left-1/2 top-1/2 h-[min(70vw,310px)] w-[min(70vw,310px)] sm:h-[min(70vw,420px)] sm:w-[min(70vw,420px)] lg:h-[560px] lg:w-[560px] -translate-x-1/2 -translate-y-1/2">
            <motion.div style={{ x: imageX, y: imageY }} className="relative h-full w-full">
              <div className="absolute inset-6 rounded-full bg-gold/26 blur-3xl" />
              <div className="absolute inset-12 rounded-full bg-sage/26 blur-2xl" />
              <div className="relative h-full overflow-hidden rounded-[48%_52%_45%_55%/58%_42%_58%_42%] border border-white/60 bg-linen shadow-premium">
                <Image
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1100&q=86"
                  alt="Wellness coach leading a calm mindfulness practice"
                  fill
                  sizes="(min-width: 1024px) 560px, min(70vw, 420px)"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/28 via-transparent to-cream/18" />
              </div>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute left-1 sm:left-0 top-10 sm:top-24 w-44 sm:w-56 rounded-[1.6rem] p-3 sm:p-4 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 sm:h-11 sm:w-11 place-items-center rounded-full bg-sage/20 text-moss shrink-0">
                <HeartPulse className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-bold text-forest">Energy score</div>
                <div className="text-xs text-forest/58">Up 42% this month</div>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-forest/10">
              <div className="h-full w-[78%] rounded-full bg-gold-sage" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute bottom-10 sm:bottom-20 right-1 sm:right-0 w-52 sm:w-64 rounded-[1.6rem] p-3 sm:p-4 text-xs sm:text-sm"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1 grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full bg-gold/24 text-clay shrink-0">
                <Quote className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <p className="text-sm leading-6 text-forest/70">
                &quot;Small rituals, practiced beautifully, become a new life.&quot;
              </p>
            </div>
          </motion.div>

          <motion.div
            animate={{ rotate: [0, 7, 0], y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="glass-dark absolute right-3 sm:right-10 top-1 sm:top-8 rounded-full px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-cream"
          >
            Live 1:1 sessions
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-7 left-0 right-0 overflow-hidden border-y border-forest/8 bg-white/25 py-4 backdrop-blur-xl">
        <div className="flex w-[200%] animate-marquee items-center gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-[0.32em] text-forest/62">
          {Array.from({ length: 2 }).map((_, groupIndex) => (
            <div key={groupIndex} className="flex min-w-1/2 items-center gap-8">
              {["Mindfulness", "Healing", "Nutrition", "Meditation", "Self Growth", "Wellness"].map((item) => (
                <span key={`${groupIndex}-${item}`} className="flex items-center gap-8">
                  {item}
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="relative px-4 py-24 scroll-mt-24" id="trust">
      <div className="section-shell">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-clay">Trusted outcomes</p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl font-bold leading-none text-forest md:text-7xl">
              A calmer life, measured in meaningful change.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-forest/62">
            Premium coaching blends emotional intelligence, habit design, and integrative wellness.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {trustStats.map((stat) => (
            <SpotlightCard key={stat.label} className="p-7" data-reveal>
              <div
                data-count={stat.value}
                data-suffix={stat.suffix}
                className="font-serif text-6xl font-bold leading-tight py-1 text-forest"
              >
                0{stat.suffix}
              </div>
              <h3 className="mt-5 text-xl font-bold text-forest">{stat.label}</h3>
              <p className="mt-3 text-sm leading-6 text-forest/62">{stat.detail}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden px-4 py-28 scroll-mt-24">
      <div className="absolute left-[-10%] top-20 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="section-shell grid gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="relative min-h-[620px]" data-reveal>
          <div className="absolute left-8 top-10 h-80 w-72 rounded-[42%_58%_61%_39%/50%_50%_50%_50%] bg-sage/22 blur-xl" />
          <div className="absolute right-10 top-4 h-56 w-56 rounded-full bg-gold/22 blur-2xl" />

          <div className="absolute left-0 top-0 h-[430px] w-[72%] overflow-hidden rounded-[2.2rem] border border-white/60 shadow-premium">
            <Image
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=86"
              alt="Mindful movement practice"
              fill
              sizes="(min-width: 1024px) 340px, 72vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[360px] w-[64%] overflow-hidden rounded-[2.2rem] border border-white/70 shadow-premium">
            <Image
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=86"
              alt="Warm wellness ritual setting"
              fill
              sizes="(min-width: 1024px) 340px, 64vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="glass absolute bottom-20 left-8 max-w-[260px] rounded-[1.5rem] p-5">
            <div className="mb-3 flex text-gold">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm leading-6 text-forest/70">Certified holistic coach with a decade of private client transformations.</p>
          </div>
        </div>

        <div className="relative pl-0 lg:pl-14">
          <div className="absolute left-0 top-1 hidden h-full w-px bg-forest/12 lg:block">
            <div className="about-line-fill h-full w-full origin-top scale-y-0 bg-gold" />
          </div>
          <div data-reveal>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-clay">About the method</p>
            <h2 className="mt-4 font-serif text-5xl font-bold leading-none text-forest md:text-7xl">
              Wellness that feels intimate, intelligent, and sustainable.
            </h2>
          </div>
          <div className="mt-8 space-y-6 text-lg leading-9 text-forest/68">
            <p data-reveal>
              Aurelia was created for people who have achieved so much, yet quietly know their inner life needs
              more tenderness, structure, and space. The work is not about becoming a different person. It is
              about returning to your own center with better rituals.
            </p>
            <p data-reveal>
              Each coaching arc blends somatic awareness, nutrition design, meditation, sleep refinement,
              emotional processing, and beautifully practical accountability.
            </p>
          </div>
          <div className="glass mt-10 rounded-[2rem] p-7" data-reveal>
            <Quote className="mb-5 h-9 w-9 text-gold" />
            <p className="font-serif text-3xl font-semibold leading-snug text-forest">
              “The most luxurious thing we can build is a life our nervous system can finally trust.”
            </p>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-forest/46">Dr. Lina Vale, Founder</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden px-4 py-28 scroll-mt-24">
      <div className="absolute inset-x-0 top-20 h-[520px] bg-[linear-gradient(180deg,transparent,rgba(143,168,138,0.12),transparent)]" />
      <div className="section-shell relative">
        <div className="mx-auto mb-14 max-w-3xl text-center" data-reveal>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-clay">Services</p>
          <h2 className="mt-4 font-serif text-5xl font-bold leading-none text-forest md:text-7xl">
            Deep support for every layer of your wellbeing.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: index * 0.05 }}
              >
                <SpotlightCard className="group h-full p-7 transition duration-500 hover:-translate-y-2 hover:shadow-glow">
                  <div className="mb-10 flex items-start justify-between gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest text-cream shadow-glow transition group-hover:scale-105">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-serif text-4xl font-bold text-forest/12">0{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-forest">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-forest/62">{service.text}</p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-moss">
                    Explore ritual <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section id="journey" className="relative overflow-hidden bg-forest px-4 py-28 text-cream scroll-mt-24">
      <div className="noise" />
      <div className="absolute left-[-14rem] top-[-8rem] h-[34rem] w-[34rem] rounded-full bg-gold/18 blur-3xl" />
      <div className="absolute bottom-[-10rem] right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-sage/18 blur-3xl" />

      <div className="section-shell relative">
        <div className="mx-auto max-w-4xl text-center" data-reveal>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">Transformation path</p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-none sm:text-5xl md:text-6xl">
            A graceful path from depletion to embodied calm.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-cream/62">
            Four focused phases, each designed to become a lived ritual before the next layer begins.
            A calm progression through listening, ritual design, embodied practice, and lifelong integration.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 bg-cream/12 lg:block">
            <div className="journey-line-fill h-full w-full origin-top scale-y-0 bg-gold" />
          </div>

          <div className="space-y-8">
            {journeySteps.map((step, index) => (
              <motion.article
                key={step.step}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="journey-card relative grid items-center gap-5 lg:grid-cols-[1fr_5rem_1fr]"
              >
                <div className={index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-3"}>
                  <div className="glass-dark relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
                    <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-gold/10 blur-3xl" />

                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <span className="font-serif text-6xl font-bold leading-none text-gold">{step.step}</span>
                      <span className="w-fit rounded-full border border-cream/18 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cream/64">
                        {step.metric}
                      </span>
                    </div>

                    <div className="relative mt-8">
                      <h3 className="font-serif text-4xl font-bold leading-none sm:text-5xl">{step.title}</h3>
                      <p className="mt-5 max-w-xl text-base leading-7 text-cream/68">{step.text}</p>
                    </div>

                    <div className="relative mt-7 grid gap-3 sm:grid-cols-3">
                      {step.rituals.map((ritual) => (
                        <div key={ritual} className="rounded-2xl border border-cream/10 bg-cream/10 px-4 py-3 text-sm text-cream/70">
                          {ritual}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative hidden h-20 place-items-center lg:col-start-2 lg:row-start-1 lg:grid">
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/60 bg-forest text-sm font-bold text-gold shadow-glow">
                    {index + 1}
                  </div>
                </div>

                <div className={index % 2 === 0 ? "hidden lg:col-start-3 lg:block" : "hidden lg:col-start-1 lg:row-start-1 lg:block"}>
                  <div className="rounded-[2rem] border border-cream/10 bg-cream/5 p-6 text-sm leading-6 text-cream/54">
                    <Sparkles className="mb-4 h-5 w-5 text-gold" />
                    {index === 0
                      ? "Begin with a clear picture of what your body, calendar, and inner life are asking for."
                      : index === 1
                      ? "Turn insight into gentle rhythms that can survive real schedules and real emotions."
                      : index === 2
                      ? "Practice change with private support, reflection, and elegant course correction."
                      : "Leave with tools that feel spacious enough to keep, even as your life evolves."}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const repeated = [...testimonials, ...testimonials];
  return (
    <section className="relative overflow-hidden px-4 py-28">
      <div className="section-shell mb-12 text-center" data-reveal>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-clay">Client love</p>
        <h2 className="mx-auto mt-4 max-w-4xl font-serif text-5xl font-bold leading-none text-forest md:text-7xl">
          Private transformations, softly spoken.
        </h2>
      </div>

      <div className="group relative -mx-4 overflow-hidden">
        <div className="flex w-max animate-marquee gap-5 px-4 group-hover:[animation-play-state:paused]">
          {repeated.map((testimonial, index) => (
            <div key={`${testimonial.name}-${index}`} className="glass w-[340px] rounded-[2rem] p-6 transition hover:-translate-y-2 hover:shadow-glow">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    sizes="48px"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-forest">{testimonial.name}</div>
                    <div className="text-xs uppercase tracking-[0.16em] text-forest/46">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex text-gold">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-base leading-7 text-forest/68">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ProgramsSection component removed

function RoutineSection() {
  return (
    <section className="px-4 py-28">
      <div className="section-shell">
        <div className="mx-auto mb-14 max-w-3xl text-center" data-reveal>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-clay">Daily routine</p>
          <h2 className="mt-4 font-serif text-5xl font-bold leading-none text-forest md:text-7xl">
            Small rituals with a cinematic sense of care.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {routines.map((routine) => {
            const Icon = routine.icon;
            return (
              <div key={routine.title} className="flip-card h-80" data-reveal>
                <div className="flip-inner relative h-full">
                  <div className="flip-face glass absolute inset-0 flex flex-col justify-between rounded-[2rem] p-6">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sage/18 text-moss">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-forest">{routine.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-forest/62">{routine.front}</p>
                    </div>
                  </div>
                  <div className="flip-face flip-back glass-dark absolute inset-0 flex flex-col justify-between rounded-[2rem] p-6 text-cream">
                    <Sparkles className="h-8 w-8 text-gold" />
                    <div>
                      <h3 className="text-2xl font-bold">{routine.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-cream/68">{routine.back}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section id="journal" className="px-4 py-28 scroll-mt-24">
      <div className="section-shell">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-clay">Journal</p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl font-bold leading-none text-forest md:text-7xl">
              Editorial notes for a more nourished life.
            </h2>
          </div>
          <MagneticButton href="#contact" variant="secondary">
            Read Insights
          </MagneticButton>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.title}
              className={`group ${index === 0 ? "lg:col-span-2" : ""}`}
              data-reveal
            >
              <div className={`relative overflow-hidden rounded-[2rem] ${index === 0 ? "h-[460px]" : "h-[300px]"}`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes={index === 0 ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 370px, 100vw"}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-clay">
                <span>{post.tag}</span>
                <span className="h-1 w-1 rounded-full bg-gold" />
                <span>{post.read}</span>
              </div>
              <h3 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-tight text-forest">{post.title}</h3>
              <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-moss">
                Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="px-4 py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-reveal>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-clay">FAQ</p>
          <h2 className="mt-4 font-serif text-5xl font-bold leading-none text-forest md:text-7xl">
            Questions before the first breath.
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const open = active === index;
            return (
              <div key={faq.question} className="glass rounded-[1.6rem] p-2" data-reveal>
                <button
                  type="button"
                  onClick={() => setActive(open ? -1 : index)}
                  suppressHydrationWarning
                  className="flex w-full items-center justify-between gap-4 rounded-[1.25rem] px-5 py-4 text-left"
                >
                  <span className="text-lg font-bold text-forest">{faq.question}</span>
                  <motion.span animate={{ rotate: open ? 180 : 0 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/50">
                    <ChevronDown className="h-5 w-5 text-forest" />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-base leading-7 text-forest/64">{faq.answer}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden px-3 py-20 pt-28 scroll-mt-28 sm:px-4 sm:py-28 sm:scroll-mt-24">
      <div className="pointer-events-none absolute left-[-12rem] top-20 h-[26rem] w-[26rem] rounded-full bg-gold/22 blur-3xl sm:h-[34rem] sm:w-[34rem]" />
      <div className="pointer-events-none absolute right-[-10rem] top-28 h-[26rem] w-[26rem] rounded-full bg-sage/24 blur-3xl sm:h-[34rem] sm:w-[34rem]" />
      <div className="section-shell relative grid gap-5 sm:gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="glass-dark rounded-[1.6rem] p-5 text-cream sm:rounded-[2.4rem] sm:p-8 md:p-10" data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm sm:tracking-[0.28em]">Contact</p>
          <h2 className="mt-3 text-balance font-serif text-[clamp(2.3rem,12vw,3.25rem)] font-bold leading-[0.95] sm:mt-4 sm:text-5xl md:text-7xl">
            Begin with a private consultation.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-cream/68 sm:mt-6 sm:text-lg sm:leading-8">
            Tell us what life is asking of you right now. We will respond with the most fitting next step.
          </p>

          <div className="mt-7 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
            {[
              { icon: CalendarDays, label: "Availability", text: "New clients: June" },
              { icon: Clock3, label: "Response", text: "Within 24 hours" },
              { icon: Mail, label: "Email", text: "hello@aurelia.co" },
              { icon: MapPin, label: "Studio", text: "Soho, New York" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-[1.15rem] border border-cream/12 bg-cream/8 p-3.5 sm:rounded-[1.4rem] sm:p-4">
                  <Icon className="mb-3 h-5 w-5 text-gold sm:mb-4" />
                  <div className="text-sm font-bold">{item.label}</div>
                  <div className="mt-1 text-sm text-cream/60">{item.text}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex gap-3 sm:mt-8">
            {[Instagram, Twitter, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label="Social media link"
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/12 bg-cream/8 text-cream transition hover:border-gold/60 hover:text-gold"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <form onSubmit={handleSubmit} className="glass rounded-[1.6rem] p-4 sm:rounded-[2.4rem] sm:p-6 md:p-8" data-reveal>
            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              {["Name", "Email"].map((label) => (
                <label key={label} className="group relative block">
                  <input
                    required
                    placeholder=" "
                    suppressHydrationWarning
                    className="peer h-14 w-full rounded-[1rem] border border-forest/10 bg-white/42 px-4 pt-5 text-forest outline-none transition focus:border-gold sm:h-16 sm:rounded-2xl sm:px-5"
                  />
                  <span className="pointer-events-none absolute left-4 top-4 text-sm text-forest/48 transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-moss peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs sm:left-5 sm:top-5">
                    {label}
                  </span>
                </label>
              ))}
            </div>
            <label className="group relative mt-4 block sm:mt-5">
              <select
                defaultValue=""
                required
                suppressHydrationWarning
                className="peer h-14 w-full appearance-none rounded-[1rem] border border-forest/10 bg-white/42 px-4 pt-5 text-forest outline-none transition focus:border-gold sm:h-16 sm:rounded-2xl sm:px-5"
              >
                <option value="" disabled />
                <option>Starter Wellness</option>
                <option>Premium Transformation</option>
                <option>Elite Coaching</option>
              </select>
              <span className="pointer-events-none absolute left-4 top-2 text-xs text-moss transition-all sm:left-5">Program interest</span>
            </label>
            <label className="group relative mt-4 block sm:mt-5">
              <textarea
                required
                placeholder=" "
                rows={4}
                suppressHydrationWarning
                className="peer min-h-32 w-full resize-none rounded-[1rem] border border-forest/10 bg-white/42 px-4 pt-7 text-forest outline-none transition focus:border-gold sm:rounded-2xl sm:px-5"
              />
              <span className="pointer-events-none absolute left-4 top-5 text-sm text-forest/48 transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-moss peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs sm:left-5">
                What would you like to transform?
              </span>
            </label>
            <button
              type="submit"
              suppressHydrationWarning
              className="mt-5 inline-flex h-[3.25rem] min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full bg-gold-sage px-5 text-sm font-bold text-forest shadow-glow transition hover:scale-[1.01] sm:mt-6 sm:h-14 sm:px-6"
            >
              {sent ? "Request received" : "Send Private Request"}
              <Send className="h-4 w-4" />
            </button>
          </form>

          <div className="map-grid relative h-60 overflow-hidden rounded-[1.6rem] border border-white/60 shadow-premium sm:h-72 sm:rounded-[2.2rem]" data-reveal>
            <div className="absolute left-[52%] top-[45%] grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest text-cream shadow-glow">
              <MapPin className="h-7 w-7" />
            </div>
            <div className="glass absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-[1.2rem] px-4 py-3 sm:bottom-5 sm:left-5">
              <p className="text-sm font-bold text-forest">Aurelia Studio</p>
              <p className="text-xs text-forest/58">Private coaching by appointment</p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/15550101444"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-forest text-cream shadow-glow transition hover:scale-105 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-8">
      <div className="section-shell glass overflow-hidden rounded-[2.4rem] p-8 md:p-10">
        <div className="h-px bg-gold-sage" />
        <div className="grid gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-forest text-cream">
                <Leaf className="h-5 w-5" />
              </span>
              <span className="font-serif text-2xl font-bold text-forest">Aurelia Wellness</span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-forest/62">
              Luxury wellness coaching for people ready to feel calm, nourished, and fully present in the life
              they are building.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-clay">Newsletter</h3>
            <div className="mt-5 flex overflow-hidden rounded-full border border-forest/10 bg-white/44 p-1">
              <input
                suppressHydrationWarning
                className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
                placeholder="Email address"
              />
              <button
                aria-label="Subscribe"
                suppressHydrationWarning
                className="grid h-11 w-11 place-items-center rounded-full bg-forest text-cream"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-clay">Navigate</h3>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-semibold text-forest/62">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-forest">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-forest/10 pt-6 text-sm text-forest/50 md:flex-row">
          <p>© 2026 Aurelia Wellness. All rights reserved.</p>
          <p>Mindfulness • Healing • Nutrition • Meditation</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);
  const progress = useMotionValue(0);
  const progressScale = useSpring(progress, { stiffness: 140, damping: 30, mass: 0.2 });

  useSmoothScroll();
  useCursorGlow();
  useGsapAnimations();

  useEffect(() => {
    const updateProgress = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(height > 0 ? window.scrollY / height : 0);
      gsap.set(".scroll-progress", { scaleX: height > 0 ? window.scrollY / height : 0 });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, [progress]);

  return (
    <main ref={mainRef} className="relative overflow-hidden">
      <motion.div
        aria-hidden
        style={{ scaleX: progressScale }}
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gold-sage"
      />
      <Navbar />
      <HeroSection />
      <TrustSection />
      <AboutSection />
      <ServicesSection />
      <JourneySection />
      <TestimonialsSection />
      <RoutineSection />
      <BlogSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
