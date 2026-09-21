// Peta ikon eksplisit. Hindari `import * as icons from 'lucide-react'`
// karena barrel import itu menarik seluruh paket ikon ke dalam bundle.
import { Pill, Leaf, Droplets, Sparkles, Baby, Stethoscope, CupSoda, Home } from 'lucide-react';

const map = { Pill, Leaf, Droplets, Sparkles, Baby, Stethoscope, CupSoda, Home };

export const categoryIcon = (name) => map[name] || Pill;
