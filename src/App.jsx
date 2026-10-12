import React, { useState, useEffect, useMemo } from 'react';
import {
  Play,
  Tv,
  Film,
  Sparkles,
  CheckCircle,
  CreditCard,
  Send,
  MessageSquare,
  Search,
  Star,
  Zap,
  ShieldCheck,
  ChevronRight,
  Info,
  X,
  Copy,
  ExternalLink,
  Settings,
  HelpCircle,
  Phone,
  Clock,
  Smartphone,
  Flame,
  Radio,
  Check,
  Plus,
  ArrowRight,
  Share2,
  Volume2,
  VolumeX,
  Layers
} from 'lucide-react';

// --- Configuración y Constantes con el Nuevo Número ---
const DEFAULT_N8N_WEBHOOK = "https://n8n.example.com/webhook/mirando-order";
const WHATSAPP_NUMBER = "573174719064"; // Formato directo wa.me
const WHATSAPP_DISPLAY = "3174719064";

const PLANS_DATA = [
  {
    id: 'basico',
    name: 'Plan Básico',
    subtitle: 'Ideal para uso personal',
    price: 15000,
    formattedPrice: '$15.000',
    period: 'por mes',
    accounts: 1,
    badge: null,
    popular: false,
    color: 'from-blue-600 to-cyan-500',
    features: [
      '1 Cuenta individual activa',
      'Acceso total a TV en Vivo +400 canales',
      'Películas, Series y Documentales en HD/4K',
      'Soporte 24/7 vía WhatsApp',
      'Compatible con Smart TV, Celular, PC, TV Box'
    ]
  },
  {
    id: 'promocion',
    name: 'Plan Promoción Duo',
    subtitle: 'El más vendido • Comparte y ahorra',
    price: 20000,
    formattedPrice: '$20.000',
    period: 'por mes',
    accounts: 2,
    badge: 'MÁS POPULAR ⭐',
    popular: true,
    color: 'from-purple-600 via-pink-600 to-rose-500',
    features: [
      '2 Cuentas independientes activas',
      'Acceso simultáneo sin interrupciones',
      'Catálogo completo TV + Cine + Deportes',
      'Calidad Ultra HD 4K habilitada',
      'Soporte VIP prioritario',
      'Ahorro del 33% por pantalla'
    ]
  },
  {
    id: 'trimestral',
    name: 'Plan Trimestral',
    subtitle: 'Tranquilidad por 3 meses',
    price: 35000,
    formattedPrice: '$35.000',
    period: 'por 3 meses',
    accounts: 1,
    badge: 'AHORRA $10.000',
    popular: false,
    color: 'from-cyan-500 to-emerald-500',
    features: [
      '1 Cuenta activa por 90 días',
      'Sin pagos ni renovaciones mensuales',
      'Acceso VIP completo a todos los canales',
      'Servidor prioritario sin congelamiento',
      'Actualizaciones diarias de catálogo'
    ]
  },
  {
    id: 'anual',
    name: 'Plan Anual VIP',
    subtitle: 'Disfruta todo un año sin preocupaciones',
    price: 160000,
    formattedPrice: '$160.000',
    period: 'por 1 año (12 meses)',
    accounts: 1,
    badge: 'MEJOR VALOR 👑',
    popular: false,
    color: 'from-amber-500 via-purple-600 to-pink-600',
    features: [
      '1 Cuenta activa por 365 días',
      'Equivale a solo $13.333 COP al mes',
      'Garantía total durante los 12 meses',
      'Canales Premium de Eventos Deportivos',
      'Acceso a estrenos exclusivos de cine',
      'Soporte técnico directo preferencial'
    ]
  }
];

const CATEGORIES = [
  { id: 'todos', name: 'Todo', icon: Sparkles },
  { id: 'tv', name: 'TV en Vivo', icon: Tv },
  { id: 'peliculas', name: 'Películas', icon: Film },
  { id: 'series', name: 'Series', icon: Layers },
  { id: 'documentales', name: 'Documentales', icon: Flame },
  { id: 'deportes', name: 'Deportes', icon: Zap },
];

const MOVIES_SERIES = [
  {
    id: 1,
    title: 'Avatar: El Camino del Agua',
    type: 'peliculas',
    genre: 'Ciencia Ficción / Acción',
    rating: '4.9',
    year: '2023',
    duration: '3h 12m',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
    description: 'Jake Sully vive con su nueva familia formada en el planeta Pandora. Una amenaza conocida regresa para terminar lo que se empezó.',
    featured: true,
    is4K: true
  },
  {
    id: 2,
    title: 'Stranger Things 5',
    type: 'series',
    genre: 'Misterio / Ciencia Ficción',
    rating: '4.8',
    year: '2024',
    duration: '4 Temporadas',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    description: 'A raíz de la desaparición de un niño, un pueblo desvela un misterio relacionado con experimentos secretos y fuerzas sobrenaturales.',
    featured: true,
    is4K: true
  },
  {
    id: 3,
    title: 'Planeta Tierra III - Mirando Exclusivo',
    type: 'documentales',
    genre: 'Naturaleza / Ciencia',
    rating: '5.0',
    year: '2024',
    duration: '8 Episodios',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    description: 'Explora los rincones más lejanos y asombrosos del planeta con la tecnología de captura ultra HD exclusiva de MIRANDO.',
    featured: true,
    is4K: true
  },
  {
    id: 4,
    title: 'Champions League - Final En Vivo',
    type: 'deportes',
    genre: 'Fútbol En Directo',
    rating: '4.9',
    year: '2024',
    duration: 'EN VIVO',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop',
    description: 'Transmisión exclusiva sin retraso (Zero-Lag) en ultra alta definición con narración en español latino.',
    featured: false,
    is4K: true
  },
  {
    id: 5,
    title: 'Oppenheimer',
    type: 'peliculas',
    genre: 'Drama / Biografía',
    rating: '4.9',
    year: '2023',
    duration: '3h 00m',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200&auto=format&fit=crop',
    description: 'La historia del físico estadounidense J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.',
    featured: false,
    is4K: true
  },
  {
    id: 6,
    title: 'Fórmula 1: Gran Premio',
    type: 'deportes',
    genre: 'Automovilismo',
    rating: '4.8',
    year: '2024',
    duration: 'EN VIVO',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    description: 'Sigue cada carrera, cámara a bordo y telemetría en tiempo real desde la plataforma MIRANDO.',
    featured: false,
    is4K: true
  },
  {
    id: 7,
    title: 'Los Secretos del Cosmos',
    type: 'documentales',
    genre: 'Espacio / Astronomía',
    rating: '4.9',
    year: '2024',
    duration: '1h 45m',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop',
    description: 'Un viaje deslumbrante a través de agujeros negros, galaxias lejanas y la física cuántica del universo.',
    featured: false,
    is4K: true
  },
  {
    id: 8,
    title: 'The Last of Us',
    type: 'series',
    genre: 'Drama / Acción',
    rating: '4.9',
    year: '2023',
    duration: '1 Temporada',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    description: 'Veinte años después de la destrucción de la civilización moderna, Joel es contratado para sacar de contrabando a Ellie.',
    featured: false,
    is4K: true
  }
];

const TV_CHANNELS = [
  { id: 'c1', name: 'Win Sports + HD', category: 'Deportes', viewers: '14.2k', signal: 'FHD 60fps', active: true },
  { id: 'c2', name: 'ESPN Premium Ultra', category: 'Deportes', viewers: '28.5k', signal: '4K HDR', active: true },
  { id: 'c3', name: 'HBO Max Live 1', category: 'Cine', viewers: '19.1k', signal: 'FHD', active: true },
  { id: 'c4', name: 'Caracol HD', category: 'Nacional', viewers: '45.0k', signal: 'FHD', active: true },
  { id: 'c5', name: 'RCN HD', category: 'Nacional', viewers: '32.1k', signal: 'FHD', active: true },
  { id: 'c6', name: 'Discovery Channel', category: 'Documentales', viewers: '11.8k', signal: 'FHD', active: true },
  { id: 'c7', name: 'Star Channel Gold', category: 'Series', viewers: '15.4k', signal: 'FHD', active: true },
  { id: 'c8', name: 'Cartoon Network VIP', category: 'Infantil', viewers: '8.9k', signal: 'HD', active: true },
  { id: 'c9', name: 'TNT Series & Cine', category: 'Cine', viewers: '12.3k', signal: 'FHD', active: true },
  { id: 'c10', name: 'National Geographic 4K', category: 'Documentales', viewers: '16.7k', signal: '4K HDR', active: true },
];

const FAQS = [
  {
    q: "¿En cuántos dispositivos puedo usar mi cuenta MIRANDO?",
    a: "Depende del plan que elijas. El Plan Básico, Trimestral y Anual incluyen 1 cuenta/pantalla activa. El Plan Promoción te otorga 2 cuentas independientes simultáneas."
  },
  {
    q: "¿Cómo funciona el proceso de pago con Nequi o Bre-B?",
    a: "Al hacer tu pedido, la web te muestra el número Nequi o la Llave Bre-B para transferir el monto exacto. Una vez realizas la transferencia, la confirmación se envía automáticamente a nuestro sistema (n8n / WhatsApp) y te activamos el acceso en menos de 5 minutos."
  },
  {
    q: "¿Es compatible con mi Smart TV o celular?",
    a: "¡Sí! MIRANDO es 100% compatible con Smart TV (Samsung, LG, Android TV), Amazon Fire Stick, Xiaomi Mi TV, celulares Android y iPhone, computadores y tablets."
  },
  {
    q: "¿Qué canales y contenidos están incluidos?",
    a: "Tendrás acceso a más de 400 canales en vivo de Colombia e internacionales, deportes en directo sin cortes, miles de películas de estreno, series completas y documentales en HD y 4K."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [showN8nSettings, setShowN8nSettings] = useState(false);

  const [n8nWebhookUrl, setN8nWebhookUrl] = useState(() => {
    return localStorage.getItem('mirando_n8n_url') || DEFAULT_N8N_WEBHOOK;
  });

  const [toast, setToast] = useState(null);

  const saveN8nUrl = (url) => {
    setN8nWebhookUrl(url);
    localStorage.setItem('mirando_n8n_url', url);
    showToast("URL de Webhook n8n guardada correctamente", "success");
  };

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const filteredMedia = useMemo(() => {
    return MOVIES_SERIES.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.genre.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'todos' || item.type === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black pb-20 md:pb-0">
      
      {/* Header Corregido */}
      <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 md:gap-4">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveTab('inicio')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative w-10 h-9 sm:w-12 sm:h-10 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-600 to-pink-500 blur-sm opacity-80 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-full h-full bg-[#0B0E14] border-2 border-cyan-400/80 rounded-xl flex items-center justify-center p-1 overflow-hidden shadow-lg">
                <svg viewBox="0 0 100 80" className="w-full h-full">
                  <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00F2FE" />
                      <stop offset="50%" stopColor="#9B51E0" />
                      <stop offset="100%" stopColor="#FF007F" />
                    </linearGradient>
                  </defs>
                  <line x1="30" y1="15" x2="15" y2="2" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />
                  <line x1="70" y1="15" x2="85" y2="2" stroke="#FF007F" strokeWidth="4" strokeLinecap="round" />
                  <path d="M15 65 V 25 L 50 50 L 85 25 V 65" fill="none" stroke="url(#logoGrad)" strokeWidth="12" strokeLinejoin="round" strokeLinecap="round"/>
                  <polygon points="43,32 63,42 43,52" fill="#00F2FE" />
                </svg>
              </div>
            </div>

            <div>
              <span className="text-xl sm:text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 bg-clip-text text-transparent uppercase drop-shadow-sm whitespace-nowrap">
                MIRANDO
              </span>
              <span className="hidden sm:block text-[9px] sm:text-[10px] tracking-widest text-cyan-400 uppercase font-semibold -mt-1 whitespace-nowrap">
                STREAMING HD & 4K
              </span>
            </div>
          </div>

          {/* Nav Links Desktop - Con whitespace-nowrap para impedir saltos de línea */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('inicio')}
              className={`px-3 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'inicio' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Inicio
            </button>

            <button
              onClick={() => setActiveTab('tv')}
              className={`px-3 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'tv' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"></span>
              TV en Vivo
            </button>

            <button
              onClick={() => setActiveTab('peliculas')}
              className={`px-3 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'peliculas' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Películas & Series
            </button>

            <button
              onClick={() => setActiveTab('documentales')}
              className={`px-3 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'documentales' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Documentales
            </button>

            <button
              onClick={() => setActiveTab('compras')}
              className={`px-3.5 xl:px-5 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'compras' 
                  ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-lg shadow-pink-500/40 ring-2 ring-pink-400' 
                  : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:opacity-90 animate-pulse'
              }`}
            >
              <Zap className="w-3.5 h-3.5 shrink-0 fill-current" />
              Compras / Planes
            </button>

            <button
              onClick={() => setActiveTab('soporte')}
              className={`px-3 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'soporte' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Soporte
            </button>
          </nav>

          {/* Acciones del Header */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowN8nSettings(true)}
              className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-cyan-400 transition"
              title="Configuración de Integración n8n"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20MIRANDO!%20Quiero%20solicitar%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20streaming`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-full font-semibold text-xs transition shadow-lg shadow-emerald-600/30 whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>{WHATSAPP_DISPLAY}</span>
            </a>
          </div>

        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-4 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${
            toast.type === 'success' 
              ? 'bg-emerald-900/90 border-emerald-500 text-emerald-200' 
              : 'bg-cyan-900/90 border-cyan-500 text-cyan-200'
          }`}>
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ================= INICIO TAB ================= */}
        {activeTab === 'inicio' && (
          <div className="space-y-10">
            {/* Hero Cinema Banner */}
            <div className="relative rounded-3xl overflow-hidden min-h-[480px] flex items-end p-6 md:p-12 border border-white/10 shadow-2xl">
              <div className="absolute inset-0 z-0">
                <img 
                  src={MOVIES_SERIES[0].backdrop} 
                  alt="Featured" 
                  className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E14] via-[#0B0E14]/80 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 shrink-0" /> DESTACADO DE LA SEMANA
                  </span>
                  <span className="px-2.5 py-1 bg-pink-500/20 text-pink-400 border border-pink-500/40 rounded-full text-xs font-bold">
                    ULTRA HD 4K
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                  {MOVIES_SERIES[0].title}
                </h1>

                <p className="text-gray-300 text-sm md:text-base line-clamp-3 leading-relaxed">
                  {MOVIES_SERIES[0].description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setSelectedMedia(MOVIES_SERIES[0])}
                    className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-cyan-500/25 flex items-center gap-2 transform hover:-translate-y-0.5 transition"
                  >
                    <Play className="w-5 h-5 fill-current shrink-0" />
                    Ver Tráiler / Detalles
                  </button>

                  <button
                    onClick={() => setActiveTab('compras')}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold backdrop-blur-md flex items-center gap-2 transition"
                  >
                    <Zap className="w-5 h-5 text-pink-400 fill-pink-400 shrink-0" />
                    Obtener Plan Desde $15.000
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Category Badges Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'EN VIVO', icon: Radio, tab: 'tv', color: 'from-blue-600 to-cyan-500' },
                { name: 'SERIES', icon: Layers, tab: 'peliculas', color: 'from-purple-600 to-indigo-600' },
                { name: 'PELÍCULAS', icon: Film, tab: 'peliculas', color: 'from-pink-600 to-purple-600' },
                { name: 'DEPORTES', icon: Zap, tab: 'tv', color: 'from-emerald-600 to-teal-600' },
                { name: 'KIDS', icon: Star, tab: 'peliculas', color: 'from-amber-500 to-orange-600' },
                { name: 'DOCUMENTALES', icon: Flame, tab: 'documentales', color: 'from-cyan-500 to-blue-600' },
              ].map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(cat.tab)}
                  className={`bg-gradient-to-br ${cat.color} p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform duration-200 border border-white/20 group`}
                >
                  <cat.icon className="w-7 h-7 text-white shrink-0 group-hover:animate-bounce" />
                  <span className="font-extrabold text-white text-xs tracking-wider">{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Content Catalog Section */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Flame className="w-6 h-6 text-pink-500 shrink-0" />
                    Tendencias en MIRANDO
                  </h2>
                  <p className="text-xs text-gray-400">Las películas, series y directos más populares en Colombia</p>
                </div>

                {/* Filter tabs */}
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                        selectedCategory === cat.id
                          ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/25'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of movies */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMedia(item)}
                    className="group relative bg-[#131822] rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition duration-300 cursor-pointer shadow-xl flex flex-col justify-between"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden bg-gray-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#131822] via-transparent to-transparent opacity-80"></div>
                      
                      <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                        <span className="bg-black/60 backdrop-blur-md text-amber-400 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-400/30">
                          <Star className="w-3 h-3 fill-amber-400 shrink-0" /> {item.rating}
                        </span>
                        {item.is4K && (
                          <span className="bg-pink-600/90 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                            4K
                          </span>
                        )}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 backdrop-blur-xs">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center text-white shadow-2xl transform scale-75 group-hover:scale-100 transition">
                          <Play className="w-6 h-6 fill-current ml-0.5 shrink-0" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 space-y-1">
                      <h3 className="font-bold text-white text-sm truncate group-hover:text-cyan-400 transition">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{item.genre.split('/')[0]}</span>
                        <span>{item.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Banner */}
            <div className="relative rounded-3xl bg-gradient-to-r from-purple-900 via-pink-900 to-cyan-900 p-8 md:p-12 overflow-hidden border border-pink-500/30 shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-3xl font-black text-white">
                    ¿Listo para empezar a ver televisión sin límites?
                  </h3>
                  <p className="text-gray-200 text-sm max-w-xl">
                    Adquiere tu plan desde $15.000 COP al mes. Pagas por Nequi o Bre-B y activas en 5 minutos.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('compras')}
                  className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-100 transition shadow-xl transform hover:scale-105 shrink-0"
                >
                  VER PLANES DE COMPRA ➔
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TV EN VIVO TAB ================= */}
        {activeTab === 'tv' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#131822] p-6 rounded-2xl border border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-ping shrink-0"></span>
                  <h2 className="text-2xl font-black text-white">Parrilla TV En Vivo</h2>
                </div>
                <p className="text-gray-400 text-xs mt-1">Transmisiones estables sin congelamiento en FHD y 4K</p>
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400 shrink-0 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar canal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TV_CHANNELS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((channel) => (
                <div
                  key={channel.id}
                  className="bg-[#131822] p-4 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg group-hover:scale-110 transition shrink-0">
                      <Tv className="w-6 h-6 shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition">{channel.name}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 font-medium">{channel.category}</span>
                        <span className="text-emerald-400 font-semibold">{channel.signal}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold rounded-md uppercase inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0"></span> EN VIVO
                    </span>
                    <p className="text-[10px] text-gray-400">{channel.viewers} espect.</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-cyan-950/40 to-purple-950/40 p-6 rounded-2xl border border-cyan-500/20 text-center space-y-3">
              <h3 className="text-lg font-bold text-white">¿Quieres ver todos los +400 canales sin restricciones?</h3>
              <p className="text-xs text-gray-300 max-w-xl mx-auto">
                Accede a deportes premium, canales infantiles, noticias en vivo y señal internacional activando cualquiera de nuestros planes promocionales.
              </p>
              <button
                onClick={() => setActiveTab('compras')}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl shadow-lg transition"
              >
                COMPRAR ACCESO AHORA
              </button>
            </div>
          </div>
        )}

        {/* ================= PELÍCULAS & SERIES TAB ================= */}
        {activeTab === 'peliculas' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#131822] p-6 rounded-2xl border border-white/10">
              <div>
                <h2 className="text-2xl font-black text-white">Catálogo de Películas & Series</h2>
                <p className="text-xs text-gray-400">Estrenos de cine, temporadas completas y clásicos en HD</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400 shrink-0 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar título..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMedia(item)}
                  className="group relative bg-[#131822] rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition cursor-pointer"
                >
                  <div className="aspect-[2/3] relative overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold text-amber-400 border border-amber-400/30">
                      ★ {item.rating}
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-sm text-white truncate">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{item.duration} • {item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= DOCUMENTALES TAB ================= */}
        {activeTab === 'documentales' && (
          <div className="space-y-8">
            <div className="relative rounded-3xl p-8 bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-pink-900/60 border border-cyan-500/30 overflow-hidden">
              <div className="relative z-10 max-w-xl space-y-3">
                <span className="px-3 py-1 bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 rounded-full text-xs font-bold uppercase tracking-wider">
                  SECCIÓN EXCLUSIVA
                </span>
                <h2 className="text-3xl font-black text-white">MIRANDO Documentales</h2>
                <p className="text-sm text-gray-300">
                  Explora las historias reales más deslumbrantes del planeta, ciencia, astronomía, historia y deportes en calidad 4K HDR.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOVIES_SERIES.filter(m => m.type === 'documentales').concat([
                {
                  id: 101,
                  title: "La Vida en la Tierra Directa",
                  genre: "Naturaleza",
                  duration: "1h 50m",
                  rating: "4.9",
                  year: "2024",
                  image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
                  description: "Nuevos descubrimientos sobre la fauna silvestre filmados con drones de alta velocidad."
                },
                {
                  id: 102,
                  title: "Misterios de las Océanos Profundos",
                  genre: "Ciencia",
                  duration: "2h 05m",
                  rating: "5.0",
                  year: "2024",
                  image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
                  description: "Una inmersión a más de 10.000 metros de profundidad en las fosas marinas desconocidas."
                }
              ]).map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedMedia(doc)}
                  className="bg-[#131822] rounded-2xl border border-white/10 p-4 flex gap-4 hover:border-cyan-500/40 transition cursor-pointer"
                >
                  <img src={doc.image} alt={doc.title} className="w-28 h-36 object-cover rounded-xl shrink-0" />
                  <div className="space-y-2 flex flex-col justify-between py-1">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">{doc.genre}</span>
                      <h3 className="font-bold text-white text-base leading-snug">{doc.title}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2 mt-1">{doc.description}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>⏱️ {doc.duration}</span>
                      <span>⭐ {doc.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= COMPRAS / PLANES TAB ================= */}
        {activeTab === 'compras' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-500/30 text-pink-300 text-xs font-black tracking-widest uppercase inline-block">
                PLANES Y SUSCRIPCIONES MIRANDO
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Elige el plan perfecto para ti
              </h1>
              <p className="text-gray-300 text-sm md:text-base">
                Acceso ilimitado a más de 400 canales en vivo, películas de estreno, series y documentales. Pagas fácil por <strong className="text-pink-400">Nequi</strong> o <strong className="text-cyan-400">Bre-B</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {PLANS_DATA.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-[#131822] rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                    plan.popular
                      ? 'border-pink-500 ring-2 ring-pink-500/50 shadow-2xl shadow-pink-500/20 scale-102 bg-gradient-to-b from-[#1c182a] to-[#131822]'
                      : 'border-white/10 hover:border-cyan-500/40 hover:shadow-xl'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                      <span className="px-3.5 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-[10px] tracking-wider uppercase rounded-full shadow-lg border border-pink-300">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="space-y-1 mb-4 text-center">
                      <h3 className="text-xl font-black text-white">{plan.name}</h3>
                      <p className="text-xs text-gray-400 min-h-[32px]">{plan.subtitle}</p>
                    </div>

                    <div className="my-6 text-center py-4 bg-black/40 rounded-2xl border border-white/5">
                      <div className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                        {plan.formattedPrice}
                        <span className="text-xs text-gray-400 font-normal"> COP</span>
                      </div>
                      <span className="text-xs text-cyan-400 font-semibold">{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-6 text-xs text-gray-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setCheckoutPlan(plan)}
                    className={`w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition duration-200 flex items-center justify-center gap-2 shadow-lg ${
                      plan.popular
                        ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-pink-500/30 hover:opacity-95'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/25 hover:opacity-90'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 shrink-0" />
                    Comprar Ahora
                  </button>
                </div>
              ))}
            </div>

            {/* Medios de pago con el nuevo número 3196946020 */}
            <div className="bg-[#131822] rounded-3xl p-6 md:p-8 border border-white/10 space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-white">Medios de Pago Soportados</h3>
                <p className="text-xs text-gray-400">Transferencias instantáneas sin comisiones adicionales</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/40 to-purple-950/40 border border-pink-500/40 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-600/30 border border-pink-400 flex items-center justify-center font-black text-pink-300 text-sm shrink-0">
                    NEQUI
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Pago por Nequi</h4>
                    <p className="text-xs text-pink-300/80">Transferencia al {WHATSAPP_DISPLAY}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/40 to-cyan-950/40 border border-teal-500/40 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-600/30 border border-teal-400 flex items-center justify-center font-black text-teal-300 text-xs shrink-0">
                    Bre-B
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Breve Llave (Bre-B)</h4>
                    <p className="text-xs text-teal-300/80">Pago por Breve Llave de celular</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SOPORTE TAB ================= */}
        {activeTab === 'soporte' && (
          <div className="space-y-10 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-black text-white">Centro de Ayuda & Soporte</h1>
              <p className="text-sm text-gray-400">¿Tienes dudas o necesitas ayuda para instalar la app? Estamos disponibles 24/7</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/40 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold">
                  <Phone className="w-3.5 h-3.5 shrink-0" /> ATENCIÓN INMEDIATA POR WHATSAPP
                </div>
                <h3 className="text-2xl font-black text-white">Escríbenos directamente</h3>
                <p className="text-xs text-gray-300">Línea de soporte oficial: {WHATSAPP_DISPLAY}</p>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20MIRANDO!%20Necesito%20soporte%20t%C3%A9cnico`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl transition transform hover:scale-105 shrink-0 flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5 shrink-0" />
                ABRIR WHATSAPP
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                Preguntas Frecuentes
              </h3>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="bg-[#131822] p-5 rounded-2xl border border-white/10 space-y-2">
                    <h4 className="font-bold text-white text-sm">{faq.q}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#131822] rounded-3xl max-w-2xl w-full border border-white/10 overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition"
            >
              <X className="w-5 h-5 shrink-0" />
            </button>

            <div className="relative aspect-video">
              <img src={selectedMedia.backdrop || selectedMedia.image} alt={selectedMedia.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131822] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{selectedMedia.genre}</span>
                  <h2 className="text-2xl font-black text-white">{selectedMedia.title}</h2>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 text-xs text-gray-300">
                <span>Año: {selectedMedia.year}</span>
                <span>Duración: {selectedMedia.duration}</span>
                <span className="text-amber-400 font-bold">★ {selectedMedia.rating}</span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">{selectedMedia.description}</p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setSelectedMedia(null);
                    setActiveTab('compras');
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current shrink-0" />
                  ADQUIRIR PLAN PARA VER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal con el número 3196946020 */}
      {checkoutPlan && (
        <CheckoutModal
          plan={checkoutPlan}
          n8nWebhookUrl={n8nWebhookUrl}
          onClose={() => setCheckoutPlan(null)}
          onSuccess={() => {
            setCheckoutPlan(null);
            showToast("¡Pedido registrado exitosamente!", "success");
          }}
        />
      )}

      {/* N8n Settings Modal */}
      {showN8nSettings && (
        <N8nSettingsModal
          currentUrl={n8nWebhookUrl}
          onSave={saveN8nUrl}
          onClose={() => setShowN8nSettings(false)}
        />
      )}

      {/* Botón flotante WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20MIRANDO!%20Quiero%20comprar%20un%20plan%20de%20streaming`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-black p-4 rounded-full shadow-2xl hover:scale-110 transition duration-300 flex items-center justify-center group"
        title="Contactar por WhatsApp"
      >
        <Phone className="w-6 h-6 fill-current shrink-0" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-black ml-0 group-hover:ml-2">
          Chat WhatsApp
        </span>
      </a>

    </div>
  );
}

function CheckoutModal({ plan, n8nWebhookUrl, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('nequi');
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProcessOrder = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.telefono) {
      alert("Por favor completa tu nombre y teléfono.");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      orderId: `MIR-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString("es-CO"),
      planName: plan.name,
      planPrice: plan.formattedPrice,
      amountNumeric: plan.price,
      accounts: plan.accounts,
      paymentMethod: paymentMethod === 'nequi' ? 'Nequi' : 'Bre-B (Breve Llave)',
      customerName: formData.nombre,
      customerPhone: formData.telefono,
      customerEmail: formData.email || 'No especificado'
    };

    setOrderSummary(orderData);

    try {
      if (n8nWebhookUrl) {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });
      }
    } catch (error) {
      console.warn("n8n Webhook notification skipped or failed:", error);
    }

    setIsSubmitting(false);
    setStep(2);
  };

  const getWhatsAppMessageUrl = () => {
    if (!orderSummary) return '';
    const msg = `🚀 *NUEVO PEDIDO MIRANDO STREAMING*\n\n` +
      `🆔 *Orden:* ${orderSummary.orderId}\n` +
      `👤 *Cliente:* ${orderSummary.customerName}\n` +
      `📞 *Teléfono:* ${orderSummary.customerPhone}\n` +
      `📦 *Plan:* ${orderSummary.planName} (${orderSummary.accounts} pantalla/s)\n` +
      `💰 *Monto:* ${orderSummary.planPrice} COP\n` +
      `💳 *Medio de Pago:* ${orderSummary.paymentMethod}\n\n` +
      `Adjunto el comprobante de pago para la activación inmediata.`;
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#131822] rounded-3xl max-w-xl w-full border border-white/10 overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div>
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">PASARELA DE PAGO</span>
            <h3 className="text-xl font-black text-white">{plan.name} - {plan.formattedPrice} COP</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-gray-400">
            <X className="w-5 h-5 shrink-0" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleProcessOrder} className="space-y-5">
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-300 block">1. Selecciona el Medio de Pago:</label>
                
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentMethod('nequi')}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                      paymentMethod === 'nequi'
                        ? 'border-pink-500 bg-pink-950/40 ring-2 ring-pink-500/40'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-pink-600/30 border border-pink-400 flex items-center justify-center font-black text-pink-300 text-xs shrink-0">
                      NEQUI
                    </div>
                    <div>
                      <p className="font-bold text-xs text-white">Nequi</p>
                      <p className="text-[10px] text-pink-300">Transferencia</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('brebe')}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                      paymentMethod === 'brebe'
                        ? 'border-teal-400 bg-teal-950/40 ring-2 ring-teal-400/40'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-600/30 border border-teal-400 flex items-center justify-center font-black text-teal-300 text-xs shrink-0">
                      Bre-B
                    </div>
                    <div>
                      <p className="font-bold text-xs text-white">Bre-B</p>
                      <p className="text-[10px] text-teal-300">Llave Celular</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-gray-300 block">2. Tus Datos de Contacto:</label>
                
                <div>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre Completo *"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Número de WhatsApp para activación *"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Correo electrónico (Opcional)"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl transition hover:opacity-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Procesando..." : "CONTINUAR A DATOS DE PAGO ➔"}
              </button>

            </form>
          )}

          {/* STEP 2 - Con número de cuenta 319 694 6020 */}
          {step === 2 && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-2xl text-left space-y-1">
                <p className="text-[10px] font-bold text-cyan-400 uppercase">Resumen de Orden #{orderSummary.orderId}</p>
                <p className="text-sm font-bold text-white">{plan.name} • Total: {plan.formattedPrice} COP</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-950/40 via-black to-pink-950/40 rounded-3xl border border-pink-500/40 space-y-4">
                <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-[10px] font-black uppercase tracking-wider border border-pink-500/30">
                  {paymentMethod === 'nequi' ? 'TRANSFERIR A NEQUI' : 'TRANSFERIR POR BRE-B (BREVE LLAVE)'}
                </span>

                <div className="space-y-2">
                  <p className="text-xs text-gray-400">Número de Cuenta / Llave Celular:</p>
                  <div className="text-2xl font-black text-white tracking-widest bg-black/60 py-3 rounded-xl border border-white/10 flex items-center justify-center gap-3">
                    <span>{WHATSAPP_DISPLAY}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("3196946020");
                        alert("Número 3196946020 copiado al portapapeles");
                      }}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300"
                      title="Copiar número"
                    >
                      <Copy className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-semibold">Titular: MIRANDO STREAMING</p>
                </div>

                <div className="w-32 h-32 mx-auto bg-white p-2 rounded-2xl flex items-center justify-center shadow-lg border-2 border-pink-500/50">
                  <div className="w-full h-full bg-slate-900 rounded-xl flex flex-col items-center justify-center text-center p-2 text-white text-[9px] font-mono leading-tight">
                    <span className="font-bold text-pink-400 mb-1">QR {paymentMethod.toUpperCase()}</span>
                    <span>3196946020</span>
                    <span className="text-cyan-400 font-bold mt-1">{plan.formattedPrice}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-gray-300">
                  Una vez realices la transferencia, presiona el botón abajo para confirmar por WhatsApp y enviar tu comprobante.
                </p>

                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setStep(3);
                    onSuccess();
                  }}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  ENVIAR COMPROBANTE POR WHATSAPP ➔
                </a>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="text-center space-y-4 py-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shrink-0">
                <CheckCircle className="w-10 h-10 shrink-0" />
              </div>
              <h3 className="text-2xl font-black text-white">¡Gracias por tu compra!</h3>
              <p className="text-xs text-gray-300 max-w-sm mx-auto">
                Tu orden ha sido registrada. Nuestro equipo de soporte en WhatsApp activará tus credenciales de MIRANDO inmediatamente.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition"
              >
                CERRAR VENTANA
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

function N8nSettingsModal({ currentUrl, onSave, onClose }) {
  const [urlInput, setUrlInput] = useState(currentUrl);

  const N8N_WORKFLOW_JSON = `{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "mirando-order",
        "options": {}
      },
      "name": "Webhook Order MIRANDO",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "chatId": "TU_CHAT_ID_TELEGRAM",
        "text": "=🚀 *NUEVA COMPRA EN MIRANDO STREAMING* 🚀\\n\\n🆔 *Orden:* {{$json.body.orderId}}\\n👤 *Cliente:* {{$json.body.customerName}}\\n📞 *Teléfono:* {{$json.body.customerPhone}}\\n📦 *Plan:* {{$json.body.planName}}\\n💰 *Monto:* {{$json.body.planPrice}}\\n💳 *Método:* {{$json.body.paymentMethod}}\\n📅 *Fecha:* {{$json.body.date}}",
        "additionalFields": {
          "parse_mode": "Markdown"
        }
      },
      "name": "Telegram Bot Notify",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1,
      "position": [450, 300]
    }
  ]
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#131822] rounded-3xl max-w-2xl w-full border border-white/10 overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div>
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">INTEGRACIÓN DE SERVIDOR</span>
            <h3 className="text-xl font-black text-white">Configuración n8n + Webhook + Telegram</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-gray-400">
            <X className="w-5 h-5 shrink-0" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-gray-300">
          
          <div className="space-y-2 bg-black/40 p-4 rounded-2xl border border-white/10">
            <label className="font-bold text-white block">URL del Webhook de n8n:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://tu-instancia-n8n.com/webhook/mirando-order"
                className="flex-1 bg-black border border-white/20 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={() => onSave(urlInput)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition"
              >
                Guardar
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Pasos para conectar n8n con Telegram:</h4>
            
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Crea un workflow en tu instancia de **n8n** y agrega un nodo **Webhook** (método POST).</li>
              <li>Copia la URL del Webhook generado en n8n y pégala en el campo superior.</li>
              <li>Conecta un nodo **Telegram** al Webhook en n8n con la acción <code className="text-pink-400">sendMessage</code>.</li>
              <li>Copia la plantilla de flujo JSON para n8n a continuación:</li>
            </ol>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-400">Flujo n8n (Listo para importar):</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(N8N_WORKFLOW_JSON);
                  alert("Código JSON de n8n copiado al portapapeles");
                }}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-1 text-[11px]"
              >
                <Copy className="w-3.5 h-3.5 shrink-0" /> Copiar JSON
              </button>
            </div>

            <pre className="p-3 bg-black rounded-xl border border-white/10 text-[10px] text-cyan-300 overflow-x-auto font-mono max-h-40">
              {N8N_WORKFLOW_JSON}
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
}