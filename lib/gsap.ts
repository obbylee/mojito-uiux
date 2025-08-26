"use client";

import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins once, outside the component
gsap.registerPlugin(ScrollTrigger, SplitText);
