// app/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, FileText, Calendar, Info, Check, Phone, Mail, MapPin } from 'lucide-react';
import { Header } from '@/components/Header';

// Sinhala translations only
interface HomeTranslations {
  // Hero Section
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroDescription: string;
  searchPlaceholders: string[];
  searchSuggestions: string[];
  trustIndicators: {
    trusted: string;
    available: string;
    endorsed: string;
  };
  
  // Features Section
  featuresTitle1: string;
  featuresTitle2: string;
  featuresDescription: string;
  features: {
    documents: {
      title: string;
      description: string;
      benefits: string[];
    };
    information: {
      title: string;
      description: string;
      benefits: string[];
    };
    appointments: {
      title: string;
      description: string;
      benefits: string[];
    };
  };
  
  // About Section
  aboutTitle1: string;
  aboutTitle2: string;
  aboutDescription: string;
  aboutFeatures: {
    simplified: {
      title: string;
      description: string;
    };
    availability: {
      title: string;
      description: string;
    };
    transparent: {
      title: string;
      description: string;
    };
  };
  aboutButtons: {
    learnMore: string;
    mission: string;
  };
  aboutStats: {
    citizens: string;
    forms: string;
    departments: string;
    uptime: string;
    users: string;
    support: string;
  };
  aboutTrust: {
    title: string;
    description: string;
  };
  
  // Contact Section
  contactTitle1: string;
  contactTitle2: string;
  contactDescription: string;
  contactMethods: {
    phone: {
      title: string;
      number: string;
      hours: string;
    };
    email: {
      title: string;
      address: string;
      availability: string;
    };
    location: {
      title: string;
      address: string;
      description: string;
    };
  };
  faq: {
    title: string;
    questions: {
      forms: {
        question: string;
        answer: string;
      };
      official: {
        question: string;
        answer: string;
      };
      tracking: {
        question: string;
        answer: string;
      };
      support: {
        question: string;
        answer: string;
      };
    };
  };
  
  // Footer
  footer: {
    description: string;
    quickLinks: {
      services: string;
      about: string;
      contact: string;
      help: string;
    };
    legal: {
      privacy: string;
      terms: string;
      cookies: string;
      accessibility: string;
    };
    status: string;
    copyright: string;
    crafted: string;
    forSriLanka: string;
  };
}

// Sinhala translations
const translations: HomeTranslations = {
  // Hero Section
  heroTitle1: "රජයේ සේවා සරල කිරීම",
  heroTitle2: "සෑම ශ්‍රී ලාංකිකයා වෙනුවෙන්",
  heroSubtitle: "ප්‍රශ්න ඇසීම, සේවා සොයාගැනීම, සහ රජයේ තොරතුරු ක්ෂණිකව ලබාගැනීම.",
  heroDescription: "ශ්‍රී ලංකාවේ පොදු සේවා වෙත ඔබේ සෘජු සම්බන්ධතාවය.",
  searchPlaceholders: [
    "මගේ ගමන් බලපත්‍රය අලුත් කරන්නේ කොහොමද?",
    "මගේ ව්‍යාපාරය ලියාපදිංචි කරන්නේ කොහේද?",
    "රියදුරු බලපත්‍රයක් ලබාගන්නේ කොහොමද?",
    "විවාහ ලියාපදිංචිය සඳහා මොනවා ලේඛන අවශ්‍යද?"
  ],
  searchSuggestions: ["🛂 ගමන් බලපත්‍ර අලුත් කිරීම", "🏢 ව්‍යාපාර ලියාපදිංචිය", "💍 විවාහ සහතිකය", "🚗 රියදුරු බලපත්‍රය"],
  trustIndicators: {
    trusted: "50K+ පුරවැසියන්ගේ විශ්වාසය",
    available: "24/7 ලබාගත හැකි",
    endorsed: "රජයේ අනුමැතිය"
  },
  
  // Features Section
  featuresTitle1: "ඔබට අවශ්‍ය සියල්ල,",
  featuresTitle2: "එක තැනකම",
  featuresDescription: "GovLink නිර්මාණය කර ඇත්තේ රජයේ සේවා සමග ඔබේ අන්තර්ක්‍රියාව සුමට හා කාර්යක්ෂම කිරීමට ය.",
  features: {
    documents: {
      title: "ආකෘති පත්‍ර සහ ලේඛන වෙත ප්‍රවේශය",
      description: "ගමන් බලපත්‍ර, බලපත්‍ර සහ තවත් බොහෝ දේ සඳහා නිල රජයේ ආකෘති පත්‍ර ක්ෂණිකව සොයා බාගන්න.",
      benefits: ["📥 ක්ෂණික බාගත කිරීම්", "🕒 24/7 ලබාගත හැකි", "📁 විවිධ ආකෘති"]
    },
    information: {
      title: "ක්ෂණික තොරතුරු ලබාගන්න",
      description: "පොදු සේවා ගැන ඕනෑම ප්‍රශ්නයක් අසා පැහැදිලි, පියවරින් පියවර මඟපෙන්වීම ලබාගන්න.",
      benefits: ["⚡ තත්‍ය කාලීන පිළිතුරු", "📋 පියවරින් පියවර මාර්ගෝපදේශන", "🌐 බහුභාෂා සහාය"]
    },
    appointments: {
      title: "හමුවීම් කාලසටහන් කරන්න",
      description: "රජයේ දෙපාර්තමේන්තු සමග අන්තර්ජාලය හරහා ලබාගත හැකි වේලාවන් සොයා හමුවීම් වෙන්කරවාගන්න.",
      benefits: ["📅 අන්තර්ජාල වෙන්කිරීම්", "📱 SMS මතක්කරුවන්", "🔄 පහසු නැවත සකස් කිරීම"]
    }
  },
  
  // About Section
  aboutTitle1: "අතර පරතරය වසා දැමීම",
  aboutTitle2: "පුරවැසියන් සහ රජය",
  aboutDescription: "සෑම ශ්‍රී ලාංකික පුරවැසියකු සඳහාම රජයේ සේවා ප්‍රවේශ විය හැකි, විනිවිද පෙනෙන සහ කාර්යක්ෂම කිරීම. අපගේ වේදිකාව පුරවැසියන් රජයේ දෙපාර්තමේන්තු සමග අන්තර්ක්‍රියා කරන ආකාරය විප්ලවීය වෙනසක් ඇති කරයි.",
  aboutFeatures: {
    simplified: {
      title: "සරල කළ ප්‍රවේශය",
      description: "සියළුම රජයේ සේවා සඳහා එක ඒකාබද්ධ වේදිකාවක්. තවදුරටත් බහුවිධ දෙපාර්තමේන්තු හෝ වෙබ් අඩවි වෙත යාමක් නැත. ඔබට අවශ්‍ය සියල්ල එකම උපකරණ පුවරුවකින් ප්‍රවේශ කළ හැකිය."
    },
    availability: {
      title: "24/7 ලබාගත හැකිබව",
      description: "ඕනෑම වේලාවක, ඕනෑම තැනක රජයේ සේවා වෙත ප්‍රවේශ වන්න. අපගේ ඩිජිටල් වේදිකාව කිසි විටක වසා නොදමයි, කාර්යාල කාලයෙන් පිටත පවා ඔබට පහසුවෙන් කාර්යයන් සම්පූර්ණ කළ හැකිය."
    },
    transparent: {
      title: "විනිවිද පෙනෙන ක්‍රියාවලිය",
      description: "තත්‍ය කාලීන ලුහුබැඳීම සමඟ පැහැදිලි පියවරින් පියවර මඟපෙන්වීම. ඔබට අවශ්‍ය ලේඛන මොනවාද, ක්‍රියාවලි කොපමණ කාලයක් ගතවේද, සහ ඔබේ අයදුම්පත්‍රයේ තත්ත්වය සෑම පියවරකදීම ලුහුබැඳීම."
    }
  },
  aboutButtons: {
    learnMore: "අප ගැන වැඩි දැනගන්න",
    mission: "අපගේ මෙහෙයුම සහ දැක්ම"
  },
  aboutStats: {
    citizens: "සේවාලත් පුරවැසියන්",
    forms: "රජයේ ආකෘති පත්‍ර",
    departments: "දෙපාර්තමේන්තු",
    uptime: "ක්‍රියාකාරිත්වය",
    users: "පරිශීලකයන්",
    support: "සහාය"
  },
  aboutTrust: {
    title: "රජයේ විශ්වාසය",
    description: "මහජන පරිපාලන අමාත්‍යංශයේ නිල අනුමැතිය සහ ශ්‍රී ලංකාවේ පුරවැසි සේවා සඳහා මූලික ඩිජිටල් ගේට්වේ ලෙස පිළිගැනීම."
  },
  
  // Contact Section
  contactTitle1: "උදව්වක් අවශ්‍යද?",
  contactTitle2: "අපි ඔබ වෙනුවෙන් මෙහි සිටිමු",
  contactDescription: "රජයේ සේවා ගැන ප්‍රශ්න තිබේද? අපගේ සහාය කණ්ඩායම ඔබට සහාය වීමට සූදානම්.",
  contactMethods: {
    phone: {
      title: "📞 අපට ඇමතුම් දෙන්න",
      number: "+94 11 234 5678",
      hours: "සඳුදා - සිකුරාදා, උදෑසන 8 - සවස 6"
    },
    email: {
      title: "📧 අපට ඊමේල් කරන්න",
      address: "support@govlink.lk",
      availability: "24/7 සහාය"
    },
    location: {
      title: "📍 අප වෙත පැමිණෙන්න",
      address: "කොළඹ, ශ්‍රී ලංකාව",
      description: "රජයේ සේවා මධ්‍යස්ථානය"
    }
  },
  faq: {
    title: "නිතර අසන ප්‍රශ්න",
    questions: {
      forms: {
        question: "රජයේ ආකෘති පත්‍ර වෙත ප්‍රවේශ වන්නේ කොහොමද?",
        answer: "ඔබට අවශ්‍ය ආකෘතිය සඳහා සෙවීම හෝ අපගේ සේවා අංශය පිරික්සීම පමණි. සියළුම ආකෘති ක්ෂණික බාගත කිරීම සඳහා ලබාගත හැකිය."
      },
      official: {
        question: "GovLink නිල වේදිකාවක්ද?",
        answer: "ඔව්, GovLink ඩිජිටල් සේවා සැපයීම සඳහා ශ්‍රී ලංකා රජයේ නිල අනුමැතිය ලබා ඇත."
      },
      tracking: {
        question: "මගේ අයදුම්පත්‍රයේ තත්ත්වය ලුහුබැඳීමට හැකිද?",
        answer: "අනිවාර්යයෙන්! ඔබේ අයදුම් සිටුවම්වල ප්‍රගතිය ලුහුබැඳීම සඳහා ඔබේ අයදුම්පත්‍ර යොමු අංකය භාවිතා කරන්න."
      },
      support: {
        question: "මට තාක්ෂණික සහාය අවශ්‍ය නම් කුමක් කළ යුතුද?",
        answer: "අපගේ තාක්ෂණික සහාය කණ්ඩායම දුරකථනය, ඊමේල් හෝ සජීවි චැට් හරහා 24/7 ඔබට සහාය වීමට ලැබී ඇත."
      }
    }
  },
  
  // Footer
  footer: {
    description: "🇱🇰 සෑම ශ්‍රී ලාංකිකයකු සඳහාම රජයේ සේවා සරල කිරීම. අපගේ නවීන ඩිජිටල් වේදිකාව හරහා පහසුවෙන් තොරතුරු ප්‍රවේශ කිරීම, ආකෘති බාගත කිරීම සහ ක්‍රියාවලි සම්පූර්ණ කිරීම.",
    quickLinks: {
      services: "🛡️ සේවා",
      about: "🏛️ අප ගැන",
      contact: "📞 සම්බන්ධවීම",
      help: "❓ උදව් මධ්‍යස්ථානය"
    },
    legal: {
      privacy: "🔒 පෞද්ගලිකත්ව ප්‍රතිපත්තිය",
      terms: "📋 සේවා කොන්දේසි",
      cookies: "🍪 කුකී ප්‍රතිපත්තිය",
      accessibility: "♿ ප්‍රවේශ්‍යතාව"
    },
    status: "සියළුම පද්ධති ක්‍රියාත්මකයි",
    copyright: "GovLink ශ්‍රී ලංකාව. පොදු සේවා සරල කිරීමේ මුලපිරීමක්.",
    crafted: "සකස් කරන ලද්දේ",
    forSriLanka: "🇱🇰 ශ්‍රී ලංකාව"
  }
};

// --- ELEGANT SRI LANKAN BACKGROUND COMPONENT ---
const SriLankanBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Main background image */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95">
        <div 
          className="absolute inset-0 opacity-55 dark:opacity-15 bg-center bg-no-repeat bg-cover transition-opacity duration-1000"
          style={{
            backgroundImage: 'url("/2.png")',
            backgroundPosition: 'center 20%',
            filter: 'saturate(1.2) brightness(1.1)',
          }}
        ></div>
        {/* Overlay gradients for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 dark:from-background/40 dark:via-transparent dark:to-background/60"></div>
      </div>
      
      {/* Enhanced lotus-inspired accent patterns */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FFC72C]/8 dark:bg-[#FFC72C]/4 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#8D153A]/8 dark:bg-[#8D153A]/4 rounded-full blur-3xl animate-pulse" style={{animationDuration: '12s', animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5722]/6 dark:bg-[#FF5722]/3 rounded-full blur-3xl animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
        {/* Additional subtle accents */}
        <div className="absolute top-3/4 right-1/3 w-48 h-48 bg-[#FFA726]/6 dark:bg-[#FFA726]/3 rounded-full blur-2xl animate-pulse" style={{animationDuration: '14s', animationDelay: '1s'}}></div>
        <div className="absolute top-1/6 left-1/5 w-56 h-56 bg-[#FF9800]/5 dark:bg-[#FF9800]/2 rounded-full blur-3xl animate-pulse" style={{animationDuration: '16s', animationDelay: '6s'}}></div>
      </div>
    </div>
  );
};

// --- BEAUTIFUL SRI LANKAN ICON COMPONENTS ---
// Beautiful Detailed Lotus Flower Icon
const LotusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 100 100">
    {/* Outer layer petals */}
    <path d="M50,20 Q40,35 45,50 Q50,45 55,50 Q60,35 50,20 Z" fill="#8D153A" opacity="0.8"/>
    <path d="M50,20 Q40,35 45,50 Q50,45 55,50 Q60,35 50,20 Z" fill="#8D153A" opacity="0.8" transform="rotate(36 50 50)"/>
    <path d="M50,20 Q40,35 45,50 Q50,45 55,50 Q60,35 50,20 Z" fill="#8D153A" opacity="0.8" transform="rotate(72 50 50)"/>
    <path d="M50,20 Q40,35 45,50 Q50,45 55,50 Q60,35 50,20 Z" fill="#8D153A" opacity="0.8" transform="rotate(108 50 50)"/>
    <path d="M50,20 Q40,35 45,50 Q50,45 55,50 Q60,35 50,20 Z" fill="#8D153A" opacity="0.8" transform="rotate(144 50 50)"/>
    <path d="M50,20 Q40,35 45,50 Q50,45 55,50 Q60,35 50,20 Z" fill="#8D153A" opacity="0.8" transform="rotate(180 50 50)"/>
    <path d="M50,20 Q40,35 45,50 Q50,45 55,50 Q60,35 50,20 Z" fill="#8D153A" opacity="0.8" transform="rotate(216 50 50)"/>
    <path d="M50,20 Q40,35 45,50 Q50,45 55,50 Q60,35 50,20 Z" fill="#8D153A" opacity="0.8" transform="rotate(252 50 50)"/>
    <path d="M50,20 Q40,35 45,50 Q50,45 55,50 Q60,35 50,20 Z" fill="#8D153A" opacity="0.8" transform="rotate(288 50 50)"/>
    <path d="M50,20 Q40,35 45,50 Q50,45 55,50 Q60,35 50,20 Z" fill="#8D153A" opacity="0.8" transform="rotate(324 50 50)"/>

    {/* Middle layer petals */}
    <path d="M50,25 Q42,37 46,50 Q50,47 54,50 Q58,37 50,25 Z" fill="#FF5722" opacity="0.9" transform="rotate(18 50 50)"/>
    <path d="M50,25 Q42,37 46,50 Q50,47 54,50 Q58,37 50,25 Z" fill="#FF5722" opacity="0.9" transform="rotate(54 50 50)"/>
    <path d="M50,25 Q42,37 46,50 Q50,47 54,50 Q58,37 50,25 Z" fill="#FF5722" opacity="0.9" transform="rotate(90 50 50)"/>
    <path d="M50,25 Q42,37 46,50 Q50,47 54,50 Q58,37 50,25 Z" fill="#FF5722" opacity="0.9" transform="rotate(126 50 50)"/>
    <path d="M50,25 Q42,37 46,50 Q50,47 54,50 Q58,37 50,25 Z" fill="#FF5722" opacity="0.9" transform="rotate(162 50 50)"/>
    <path d="M50,25 Q42,37 46,50 Q50,47 54,50 Q58,37 50,25 Z" fill="#FF5722" opacity="0.9" transform="rotate(198 50 50)"/>
    <path d="M50,25 Q42,37 46,50 Q50,47 54,50 Q58,37 50,25 Z" fill="#FF5722" opacity="0.9" transform="rotate(234 50 50)"/>
    <path d="M50,25 Q42,37 46,50 Q50,47 54,50 Q58,37 50,25 Z" fill="#FF5722" opacity="0.9" transform="rotate(270 50 50)"/>
    <path d="M50,25 Q42,37 46,50 Q50,47 54,50 Q58,37 50,25 Z" fill="#FF5722" opacity="0.9" transform="rotate(306 50 50)"/>
    <path d="M50,25 Q42,37 46,50 Q50,47 54,50 Q58,37 50,25 Z" fill="#FF5722" opacity="0.9" transform="rotate(342 50 50)"/>

    {/* Inner petals */}
    <path d="M50,32 Q45,40 47,50 Q50,48 53,50 Q55,40 50,32 Z" fill="#FFC72C"/>
    <path d="M50,32 Q45,40 47,50 Q50,48 53,50 Q55,40 50,32 Z" fill="#FFC72C" transform="rotate(45 50 50)"/>
    <path d="M50,32 Q45,40 47,50 Q50,48 53,50 Q55,40 50,32 Z" fill="#FFC72C" transform="rotate(90 50 50)"/>
    <path d="M50,32 Q45,40 47,50 Q50,48 53,50 Q55,40 50,32 Z" fill="#FFC72C" transform="rotate(135 50 50)"/>
    <path d="M50,32 Q45,40 47,50 Q50,48 53,50 Q55,40 50,32 Z" fill="#FFC72C" transform="rotate(180 50 50)"/>
    <path d="M50,32 Q45,40 47,50 Q50,48 53,50 Q55,40 50,32 Z" fill="#FFC72C" transform="rotate(225 50 50)"/>
    <path d="M50,32 Q45,40 47,50 Q50,48 53,50 Q55,40 50,32 Z" fill="#FFC72C" transform="rotate(270 50 50)"/>
    <path d="M50,32 Q45,40 47,50 Q50,48 53,50 Q55,40 50,32 Z" fill="#FFC72C" transform="rotate(315 50 50)"/>

    {/* Center */}
    <circle cx="50" cy="50" r="7" fill="#FFC72C"/>
    <circle cx="50" cy="50" r="3" fill="#FF8F00"/>
  </svg>
);

// --- OTHER ICON COMPONENTS ---
const ArrowRightIcon = ArrowRight;
const DocumentIcon = FileText;
const CalendarIcon = Calendar;
const InfoIcon = Info;
const CheckIcon = Check;

// --- MOBILE-OPTIMIZED HERO SECTION ---
const Hero = () => {
  const [searchText, setSearchText] = useState('');
  const t = translations;
  
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % t.searchPlaceholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [t.searchPlaceholders.length]);

  // Allow Shift+Enter to insert newline, Enter (without Shift) will submit the form
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      // Insert newline without submitting the form
      e.stopPropagation();
      // Let the default newline behavior happen
      return;
    }
    if (e.key === 'Enter') {
      // Prevent adding a newline so the form can submit cleanly
      e.preventDefault();
      // Find the closest form and submit it
      const form = (e.currentTarget as HTMLTextAreaElement).closest('form') as HTMLFormElement | null;
      if (form) form.requestSubmit();
    }
  };

  return (
    <section className="relative min-h-[60vh] sm:min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden pt-2 pb-4 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Compact Hero Content */}
          <div className="mb-4 sm:mb-6 lg:mb-8 animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-3 sm:mb-4 lg:mb-6">
              <span className="block text-foreground mb-1 sm:mb-2">{t.heroTitle1}</span>
              <span className="block text-gradient animate-title-wave">{t.heroTitle2}</span>
            </h1>
            <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 bg-gradient-to-r from-[#FFC72C] via-[#FF5722] to-[#8D153A] mx-auto rounded-full shadow-lg"></div>
          </div>
          
          {/* Compact Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 lg:mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up font-light px-4 sm:px-0" style={{animationDelay: '0.2s'}}>
            {t.heroSubtitle}<br className="hidden sm:block" />
            <span className="text-foreground/80 font-medium">{t.heroDescription}</span>
          </p>
          
          {/* Compact Search Interface */}
          <div className="max-w-3xl mx-auto animate-fade-in-up px-4 sm:px-0" style={{animationDelay: '0.4s'}}>
            <form action="/User/Chat/Bot" method="GET" className="relative group mb-4 sm:mb-6">
              <div className="relative bg-card/90 dark:bg-card/95 backdrop-blur-md border-2 border-border/50 hover:border-[#FFC72C]/70 rounded-xl p-1.5 transition-all duration-500 hover:shadow-2xl shadow-lg modern-card">
                <textarea
                  name="q"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-foreground placeholder-muted-foreground p-3 sm:p-4 pr-14 sm:pr-16 rounded-lg resize-none focus:outline-none text-sm sm:text-base lg:text-lg leading-relaxed border-none font-medium"
                  placeholder={t.searchPlaceholders[currentPlaceholder]}
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${Math.max(target.scrollHeight, 45)}px`;
                  }}
                />
                <button 
                  type="submit" 
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-gradient-to-r from-[#FFC72C] via-[#FF5722] to-[#8D153A] hover:from-[#FF5722] hover:via-[#8D153A] hover:to-[#FFC72C] rounded-lg transition-all duration-300 hover:scale-110 shadow-xl group hover:shadow-2xl"
                >
                  <ArrowRightIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
              
              {/* Compact Suggestions */}
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                {t.searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSearchText(suggestion.split(' ').slice(1).join(' '))}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-card/80 hover:bg-accent/80 border border-border/50 hover:border-[#FFC72C]/60 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg backdrop-blur-sm modern-card"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </form>
            
            {/* Compact Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 lg:gap-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground text-xs">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span>{t.trustIndicators.trusted}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground text-xs">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span>{t.trustIndicators.available}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground text-xs">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                <span>{t.trustIndicators.endorsed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- MOBILE-OPTIMIZED FEATURES SECTION ---
const Features = () => {
  const t = translations;
  
  const featuresList = [
    { 
      icon: <DocumentIcon />, 
      title: t.features.documents.title, 
      description: t.features.documents.description,
      color: "#FF5722",
      benefits: t.features.documents.benefits
    },
    { 
      icon: <InfoIcon />, 
      title: t.features.information.title, 
      description: t.features.information.description,
      color: "#008060",
      benefits: t.features.information.benefits
    },
    { 
      icon: <CalendarIcon />, 
      title: t.features.appointments.title, 
      description: t.features.appointments.description,
      color: "#FFC72C",
      benefits: t.features.appointments.benefits
    },
  ];
  
  return (
    <section id="services" className="py-4 sm:py-8 lg:py-12 -mt-4 sm:-mt-8 lg:mt-0 relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Compact Section Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-card/90 dark:bg-card/95 backdrop-blur-md px-4 py-2 rounded-full border border-border/50 mb-3 sm:mb-4 modern-card">
            <LotusIcon className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium text-foreground">අපගේ සේවා</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight">
            <span className="block text-foreground mb-1">{t.featuresTitle1}</span>
            <span className="block text-gradient">{t.featuresTitle2}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.featuresDescription}
          </p>
        </div>        
        
        {/* Enhanced Feature Cards with Fixed Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {featuresList.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-card/90 dark:bg-card/95 backdrop-blur-md rounded-xl border border-border/50 hover:border-[#FFC72C]/70 hover:shadow-2xl transition-all duration-500 animate-fade-in-up modern-card hover-lift flex flex-col h-full"
              style={{animationDelay: `${index * 0.15}s`}}
            >
              {/* Card Content Container */}
              <div className="p-3 sm:p-6 lg:p-8 flex flex-col h-full min-h-[280px] sm:min-h-[400px] lg:min-h-[450px]">
                {/* Enhanced Icon Container */}
                <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl mb-2 sm:mb-4 lg:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                     style={{
                       background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                       border: `2px solid ${feature.color}30`
                     }}>
                  <div className="text-xl sm:text-2xl lg:text-3xl transition-transform duration-300 group-hover:scale-110" style={{color: feature.color}}>
                    {feature.icon}
                  </div>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{background: `radial-gradient(circle, ${feature.color}15, transparent 70%)`}}>
                  </div>
                </div>

                {/* Content - Flexible height containers */}
                <div className="flex-1 flex flex-col">
                  {/* Title - Flexible height */}
                  <div className="mb-2 sm:mb-4">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold group-hover:text-[#FFC72C] transition-colors duration-300 leading-tight min-h-[2.5rem] sm:min-h-[3.5rem] flex items-start break-words hyphens-auto">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description - Flexible height */}
                  <div className="mb-3 sm:mb-6 flex-1">
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm lg:text-base min-h-[3rem] sm:min-h-[5rem] break-words hyphens-auto">
                      {feature.description}
                    </p>
                  </div>

                  {/* Enhanced Benefits - Fixed at bottom */}
                  <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 mt-auto">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm group/benefit hover:translate-x-1 transition-transform duration-200">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#FFC72C] to-[#FF5722] flex items-center justify-center text-white text-xs font-bold shadow-md flex-shrink-0 mt-0.5">
                          ✓
                        </div>
                        <span className="text-muted-foreground group-hover/benefit:text-foreground transition-colors duration-200 leading-relaxed break-words hyphens-auto flex-1">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFC72C]/5 via-transparent to-[#FF5722]/5 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- BALANCED ABOUT SECTION ---
const About = () => {
  const t = translations;
  
  return (
    <section id="about" className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Centered Section Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-card/90 dark:bg-card/95 backdrop-blur-md px-4 py-2 rounded-full border border-border/50 mb-4 modern-card">
            <LotusIcon className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium text-foreground">GovLink ගැන</span>
          </div>
        </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Enhanced Left Content with Better Vertical Distribution */}
        <div className="animate-fade-in-up flex flex-col justify-between min-h-[600px] lg:min-h-[700px]">
          {/* Top Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 leading-tight">
              <span className="block text-foreground">{t.aboutTitle1}</span>
              <span className="block text-gradient">{t.aboutTitle2}</span>
            </h2>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-8 lg:mb-12 leading-relaxed">
              {t.aboutDescription}
            </p>
          </div>
          
          {/* Middle Section - Features */}
          <div className="space-y-6 lg:space-y-8 mb-8 lg:mb-12">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-gradient-to-r from-[#FFC72C] to-[#FF5722] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold text-base lg:text-lg block mb-2">{t.aboutFeatures.simplified.title}</span>
                <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                  {t.aboutFeatures.simplified.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-gradient-to-r from-[#008060] to-[#FFC72C] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold text-base lg:text-lg block mb-2">{t.aboutFeatures.availability.title}</span>
                <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                  {t.aboutFeatures.availability.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-gradient-to-r from-[#FF5722] to-[#8D153A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold text-base lg:text-lg block mb-2">{t.aboutFeatures.transparent.title}</span>
                <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                  {t.aboutFeatures.transparent.description}
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom Section - Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-[#FFC72C] via-[#FF5722] to-[#8D153A] hover:from-[#FF5722] hover:via-[#8D153A] hover:to-[#FFC72C] text-white px-6 py-3.5 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 hover:scale-105 shadow-lg">
              {t.aboutButtons.learnMore}
            </button>
            <button className="border-2 border-[#008060] text-[#008060] hover:bg-[#008060] hover:text-white px-6 py-3.5 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 hover:scale-105">
              {t.aboutButtons.mission}
            </button>
          </div>
        </div>
        
        {/* Enhanced Right Side with Better Proportions */}
        <div className="animate-fade-in-up flex flex-col min-h-[600px] lg:min-h-[700px]" style={{animationDelay: '0.2s'}}>
          {/* Hero Image - Increased height for balance */}
          <div className="mb-8 lg:mb-10 flex-1 flex items-center justify-center">
            <img 
              src="/4.png" 
              alt="GovLink සහාය කණ්ඩායම" 
              className="w-full h-auto opacity-100 dark:opacity-60 max-w-md mx-auto lg:max-w-full block rounded-xl shadow-lg"
              style={{
                filter: 'saturate(1.1) brightness(1.05)',
                maxHeight: '400px',
                objectFit: 'contain'
              }}
            />
          </div>
          
          {/* Stats Grid with Better Spacing and Flexible Heights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="text-center p-3 sm:p-4 lg:p-5 bg-card/90 dark:bg-card/95 backdrop-blur-md rounded-xl border border-border/50 modern-card hover:shadow-lg transition-all duration-300 flex flex-col justify-center min-h-[100px] sm:min-h-[110px] lg:min-h-[130px]">
              <div className="text-lg sm:text-xl lg:text-xl font-bold text-gradient mb-2 flex-shrink-0">50K+</div>
              <div className="text-muted-foreground text-xs sm:text-xs lg:text-sm leading-tight break-words hyphens-auto px-1">{t.aboutStats.citizens}</div>
            </div>
            
            <div className="text-center p-3 sm:p-4 lg:p-5 bg-card/90 dark:bg-card/95 backdrop-blur-md rounded-xl border border-border/50 modern-card hover:shadow-lg transition-all duration-300 flex flex-col justify-center min-h-[100px] sm:min-h-[110px] lg:min-h-[130px]">
              <div className="text-lg sm:text-xl lg:text-xl font-bold text-gradient mb-2 flex-shrink-0">200+</div>
              <div className="text-muted-foreground text-xs sm:text-xs lg:text-sm leading-tight break-words hyphens-auto px-1">{t.aboutStats.forms}</div>
            </div>
            
            <div className="text-center p-3 sm:p-4 lg:p-5 bg-card/90 dark:bg-card/95 backdrop-blur-md rounded-xl border border-border/50 modern-card hover:shadow-lg transition-all duration-300 flex flex-col justify-center min-h-[100px] sm:min-h-[110px] lg:min-h-[130px]">
              <div className="text-lg sm:text-xl lg:text-xl font-bold text-gradient mb-2 flex-shrink-0">25</div>
              <div className="text-muted-foreground text-xs sm:text-xs lg:text-sm leading-tight break-words hyphens-auto px-1">{t.aboutStats.departments}</div>
            </div>
            
            <div className="text-center p-3 sm:p-4 lg:p-5 bg-card/90 dark:bg-card/95 backdrop-blur-md rounded-xl border border-border/50 modern-card hover:shadow-lg transition-all duration-300 flex flex-col justify-center min-h-[100px] sm:min-h-[110px] lg:min-h-[130px]">
              <div className="text-lg sm:text-xl lg:text-xl font-bold text-gradient mb-2 flex-shrink-0">99.8%</div>
              <div className="text-muted-foreground text-xs sm:text-xs lg:text-sm leading-tight break-words hyphens-auto px-1">{t.aboutStats.uptime}</div>
            </div>
          </div>
          
          {/* Additional Info Section for Balance */}
          <div className="mt-8 lg:mt-10 p-4 lg:p-6 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-xl border border-border/30">
            <h4 className="font-semibold text-base lg:text-lg text-foreground mb-2">{t.aboutTrust.title}</h4>
            <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
              {t.aboutTrust.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

// --- CONTACT SECTION ---
const Contact = () => {
  const t = translations;
  
  return (
  <section id="contact" className="py-16 sm:py-20 relative">
    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-card/90 dark:bg-card/95 backdrop-blur-md px-4 py-2 rounded-full border border-border/50 mb-4 modern-card">
            <LotusIcon className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium text-foreground">සම්බන්ධවීම</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="block text-foreground mb-1">{t.contactTitle1}</span>
            <span className="block text-gradient">{t.contactTitle2}</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.contactDescription}
          </p>
        </div>
        
        {/* Enhanced Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
          {/* Phone */}
          <div className="group text-center p-6 sm:p-8 bg-card/90 dark:bg-card/95 backdrop-blur-md rounded-xl border border-border/50 hover:border-[#FFC72C]/70 hover:shadow-2xl transition-all duration-500 modern-card hover-lift">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-[#FFC72C] via-[#FF5722] to-[#8D153A] rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-[#FFC72C] transition-colors duration-300">{t.contactMethods.phone.title}</h3>
            <p className="text-muted-foreground mb-2 font-mono text-sm sm:text-base">{t.contactMethods.phone.number}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{t.contactMethods.phone.hours}</p>
          </div>
          
          {/* Email */}
          <div className="group text-center p-6 sm:p-8 bg-card/90 dark:bg-card/95 backdrop-blur-md rounded-xl border border-border/50 hover:border-[#008060]/70 hover:shadow-2xl transition-all duration-500 modern-card hover-lift">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-[#008060] via-[#FFC72C] to-[#FF5722] rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-[#008060] transition-colors duration-300">{t.contactMethods.email.title}</h3>
            <p className="text-muted-foreground mb-2 font-mono text-sm sm:text-base">{t.contactMethods.email.address}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{t.contactMethods.email.availability}</p>
          </div>
          
          {/* Location */}
          <div className="group text-center p-6 sm:p-8 bg-card/90 dark:bg-card/95 backdrop-blur-md rounded-xl border border-border/50 hover:border-[#FF5722]/70 hover:shadow-2xl transition-all duration-500 modern-card hover-lift">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-[#FF5722] via-[#8D153A] to-[#FFC72C] rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-[#FF5722] transition-colors duration-300">{t.contactMethods.location.title}</h3>
            <p className="text-muted-foreground mb-2 text-sm sm:text-base">{t.contactMethods.location.address}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{t.contactMethods.location.description}</p>
          </div>
        </div>
        
        {/* Enhanced FAQ Section */}
        <div className="bg-card/90 dark:bg-card/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-border/50 modern-card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFC72C]/10 via-[#FF5722]/10 to-[#8D153A]/10 px-4 py-2 rounded-full border border-border/30 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF5722]">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <path d="M12 17h.01"/>
              </svg>
              <span className="text-xs sm:text-sm font-medium text-foreground">නිතර අසන ප්‍රශ්න</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gradient">{t.faq.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="group p-4 sm:p-6 bg-background/50 dark:bg-background/30 rounded-xl border border-border/30 hover:border-[#FFC72C]/50 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#FFC72C] to-[#FF5722] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">ප්‍ර</span>
                </div>
                <h4 className="font-semibold text-sm sm:text-base group-hover:text-[#FFC72C] transition-colors duration-300">{t.faq.questions.forms.question}</h4>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#008060] to-[#FFC72C] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">පි</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.faq.questions.forms.answer}</p>
              </div>
            </div>
            
            <div className="group p-4 sm:p-6 bg-background/50 dark:bg-background/30 rounded-xl border border-border/30 hover:border-[#008060]/50 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#FFC72C] to-[#FF5722] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">ප්‍ර</span>
                </div>
                <h4 className="font-semibold text-sm sm:text-base group-hover:text-[#008060] transition-colors duration-300">{t.faq.questions.official.question}</h4>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#008060] to-[#FFC72C] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">පි</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.faq.questions.official.answer}</p>
              </div>
            </div>
            
            <div className="group p-4 sm:p-6 bg-background/50 dark:bg-background/30 rounded-xl border border-border/30 hover:border-[#FF5722]/50 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#FFC72C] to-[#FF5722] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">ප්‍ර</span>
                </div>
                <h4 className="font-semibold text-sm sm:text-base group-hover:text-[#FF5722] transition-colors duration-300">{t.faq.questions.tracking.question}</h4>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#008060] to-[#FFC72C] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">පි</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.faq.questions.tracking.answer}</p>
              </div>
            </div>
            
            <div className="group p-4 sm:p-6 bg-background/50 dark:bg-background/30 rounded-xl border border-border/30 hover:border-[#8D153A]/50 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#FFC72C] to-[#FF5722] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">ප්‍ර</span>
                </div>
                <h4 className="font-semibold text-sm sm:text-base group-hover:text-[#8D153A] transition-colors duration-300">{t.faq.questions.support.question}</h4>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#008060] to-[#FFC72C] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">පි</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.faq.questions.support.answer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

// --- ENHANCED PREMIUM FOOTER WITH ADAPTIVE BACKGROUND ---
const Footer = () => {
  const t = translations;
  
  return (
  <footer className="relative py-16 sm:py-20 mt-20">
    {/* Adaptive Background Layers */}
    <div className="absolute inset-0">
      {/* Base gradient - subtle and theme-aware */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/20 via-muted/10 to-transparent"></div>
      
      {/* Secondary gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-accent/10"></div>
      
      {/* Subtle accent dots - only visible on hover areas */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/5 dark:bg-primary/3 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl opacity-40"></div>
    </div>
    
    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
        {/* Enhanced Brand Section */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <LotusIcon className="w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-300 hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-xl animate-pulse opacity-50" style={{animationDuration: '4s'}}></div>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gradient mb-1">GovLink</h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">ශ්‍රී ලංකාව</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400">අන්තර්ජාලව හා සේවා කරමින්</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-md text-sm sm:text-base">
            {t.footer.description}
          </p>
          
          {/* Enhanced Social Links */}
          <div className="flex gap-3 mb-6">
            <button className="group w-11 h-11 rounded-xl bg-card/80 dark:bg-card/60 border border-border/50 hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 flex items-center justify-center transition-all duration-300 hover:scale-110 modern-card" aria-label="Facebook හි අනුගමනය කරන්න">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground group-hover:text-[#1877F2] transition-colors duration-300">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.91h-2.33V22C18.34 21.21 22 17.08 22 12.06z"/>
              </svg>
            </button>
            <button className="group w-11 h-11 rounded-xl bg-card/80 dark:bg-card/60 border border-border/50 hover:border-[#1DA1F2]/50 hover:bg-[#1DA1F2]/10 flex items-center justify-center transition-all duration-300 hover:scale-110 modern-card" aria-label="X හි අනුගමනය කරන්න">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground group-hover:text-[#1DA1F2] transition-colors duration-300">
                <path d="M18.244 2H21l-6.5 7.43L22 22h-6.828l-4.78-6.24L4.8 22H2l7.02-8.02L2 2h6.914l4.33 5.77L18.244 2Zm-1.196 18h1.884L7.07 4H5.092l11.956 16Z"/>
              </svg>
            </button>
            <button className="group w-11 h-11 rounded-xl bg-card/80 dark:bg-card/60 border border-border/50 hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 flex items-center justify-center transition-all duration-300 hover:scale-110 modern-card" aria-label="LinkedIn හි සම්බන්ධ වන්න">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground group-hover:text-[#0A66C2] transition-colors duration-300">
                <path d="M20.447 20.452H17.2v-5.569c0-1.328-.027-3.036-1.85-3.036-1.853 0-2.136 1.445-2.136 2.94v5.665H9.07V9h3.116v1.561h.045c.435-.824 1.498-1.692 3.083-1.692 3.298 0 3.906 2.171 3.906 4.995v6.588zM5.337 7.433a1.81 1.81 0 1 1 0-3.62 1.81 1.81 0 0 1 0 3.62zM6.96 20.452H3.71V9h3.25v11.452z"/>
              </svg>
            </button>
          </div>
          
          {/* Quick Stats with Flexible Heights */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-2 sm:p-3 bg-card/60 dark:bg-card/40 rounded-lg border border-border/30 backdrop-blur-sm min-h-[60px] sm:min-h-[70px] flex flex-col justify-center">
              <div className="text-sm sm:text-base font-bold text-gradient mb-1 flex-shrink-0">50K+</div>
              <div className="text-xs text-muted-foreground leading-tight break-words hyphens-auto">{t.aboutStats.users}</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-card/60 dark:bg-card/40 rounded-lg border border-border/30 backdrop-blur-sm min-h-[60px] sm:min-h-[70px] flex flex-col justify-center">
              <div className="text-sm sm:text-base font-bold text-gradient mb-1 flex-shrink-0">99.8%</div>
              <div className="text-xs text-muted-foreground leading-tight break-words hyphens-auto">{t.aboutStats.uptime}</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-card/60 dark:bg-card/40 rounded-lg border border-border/30 backdrop-blur-sm min-h-[60px] sm:min-h-[70px] flex flex-col justify-center">
              <div className="text-sm sm:text-base font-bold text-gradient mb-1 flex-shrink-0">24/7</div>
              <div className="text-xs text-muted-foreground leading-tight break-words hyphens-auto">{t.aboutStats.support}</div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-foreground flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            ඉක්මන් සබැඳි
          </h4>
          <div className="space-y-2">
            <a href="#services" className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 text-sm py-1">
              <div className="w-1.5 h-1.5 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span>{t.footer.quickLinks.services}</span>
            </a>
            <a href="#about" className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 text-sm py-1">
              <div className="w-1.5 h-1.5 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span>{t.footer.quickLinks.about}</span>
            </a>
            <a href="#contact" className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 text-sm py-1">
              <div className="w-1.5 h-1.5 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span>{t.footer.quickLinks.contact}</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 text-sm py-1">
              <div className="w-1.5 h-1.5 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span>{t.footer.quickLinks.help}</span>
            </a>
          </div>
        </div>

        {/* Enhanced Legal Links */}
        <div>
          <h4 className="font-semibold mb-4 text-foreground flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-accent to-secondary rounded-full"></div>
            නීතිමය හා ප්‍රතිපත්ති
          </h4>
          <div className="space-y-2">
            <a href="#" className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 text-sm py-1">
              <div className="w-1.5 h-1.5 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span>{t.footer.legal.privacy}</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 text-sm py-1">
              <div className="w-1.5 h-1.5 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span>{t.footer.legal.terms}</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 text-sm py-1">
              <div className="w-1.5 h-1.5 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span>{t.footer.legal.cookies}</span>
            </a>
            <a href="#" className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 text-sm py-1">
              <div className="w-1.5 h-1.5 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span>{t.footer.legal.accessibility}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced Footer Bottom */}
      <div className="pt-8 border-t border-border/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {t.footer.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-muted-foreground">{t.footer.crafted}</span>
            <span className="text-red-500 animate-pulse text-base">♥</span>
            <span className="text-muted-foreground">සඳහා</span>
            <span className="font-semibold text-gradient">{t.footer.forSriLanka}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen relative theme-transition-slow">
      {/* Sri Lankan Background */}
      <SriLankanBackground />
      
      {/* Content */}
      <div className="relative z-10 theme-transition-fast">
        <Header />
        <main className="theme-transition-fast">
          <Hero />
          <Features />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}