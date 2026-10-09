/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  MapPin, 
  ChevronDown, 
  Calendar as CalendarIcon, 
  ExternalLink 
} from 'lucide-react';
import { Countdown } from './components/Countdown';
import { GoldDivider, GoldHeart } from './components/Ornaments';
import { MusicPlayer } from './components/MusicPlayer';

// Generated watercolor botanical images
import floralCornerTopLeft from './assets/images/floral_corner_top_left_1791503670584.jpg';
import floralCornerBottomRight from './assets/images/floral_corner_bottom_right_1791503680705.jpg';
import floralDividerAccent from './assets/images/floral_divider_accent_1791503690257.jpg';

// Google Maps URL provided by user
const MAPS_URL = 'https://maps.app.goo.gl/hSSP7k5BSbkA2j5W9';

// Official WhatsApp confirmation URL with Peruvian phone number
const WHATSAPP_URL = 'https://wa.me/51965400244?text=Hola%20River%20y%20Angely%2C%20confirmo%20mi%20asistencia%20a%20su%20pedida%20de%20mano.%20Mi%20nombre%20es%3A%20';

// Google Calendar URL helper for guests (October 16, 2026 at 15:00 Peru Time / 20:00 UTC)
const GOOGLE_CALENDAR_URL = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pedida+de+Mano+-+River+%26+Angely&dates=20261016T200000Z/20261017T010000Z&details=Con+mucha+alegr%C3%ADa+queremos+invitarte+a+nuestra+pedida+de+mano.+River+%26+Angely&location=https%3A%2F%2Fmaps.app.goo.gl%2FhSSP7k5BSbkA2j5W9';

export default function App() {
  const scrollToNext = () => {
    const section = document.getElementById('fecha-evento');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFDF9] text-[#64605E] flex justify-center items-center py-4 px-3 sm:py-8 sm:px-6 relative overflow-x-hidden">
      {/* Outer wrapper to center the card on desktop */}
      <div className="w-full max-w-[680px] relative">
        
        {/* Double Fine Gold Rectangular Frame Container */}
        <div className="relative bg-[#FFFDF9] rounded-sm p-4 sm:p-8 md:p-12 shadow-[0_10px_35px_rgba(197,162,70,0.08)] border border-[#C5A246]/60">
          
          {/* Inner fine gold frame */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#C5A246]/35 pointer-events-none rounded-[2px]" />

          {/* Delicate Top-Left Floral Corner Arrangement */}
          <div className="absolute top-0 left-0 w-32 sm:w-48 md:w-56 pointer-events-none select-none z-10 overflow-hidden">
            <img 
              src={floralCornerTopLeft} 
              alt="Flores en acuarela esquina superior" 
              className="w-full h-auto object-contain mix-blend-multiply opacity-95 transition-opacity"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Delicate Bottom-Right Floral Corner Arrangement */}
          <div className="absolute bottom-0 right-0 w-32 sm:w-48 md:w-56 pointer-events-none select-none z-10 overflow-hidden">
            <img 
              src={floralCornerBottomRight} 
              alt="Flores en acuarela esquina inferior" 
              className="w-full h-auto object-contain mix-blend-multiply opacity-95 transition-opacity"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* ============================================================== */}
          {/* SECCIÓN 1: PORTADA */}
          {/* ============================================================== */}
          <header className="relative z-20 text-center pt-10 sm:pt-14 md:pt-16 pb-10">
            {/* Título en mayúsculas con espaciado elegante */}
            <p className="font-cormorant text-xs sm:text-sm md:text-base tracking-[0.28em] text-[#8C7335] uppercase font-semibold mb-6">
              NUESTRA PEDIDA DE MANO
            </p>

            {/* Nombres de los novios en caligrafía Great Vibes */}
            <div className="my-4 sm:my-6 space-y-1 sm:space-y-2">
              <h1 className="font-great-vibes text-5xl sm:text-6xl md:text-7xl text-[#3A3533] leading-none drop-shadow-xs font-normal">
                River
              </h1>
              <span className="block font-cormorant italic text-2xl sm:text-3xl text-[#C5A246] font-light my-1 select-none">
                &amp;
              </span>
              <h2 className="font-great-vibes text-5xl sm:text-6xl md:text-7xl text-[#3A3533] leading-none drop-shadow-xs font-normal">
                Angely
              </h2>
            </div>

            {/* Separador ornamental dorado */}
            <GoldDivider className="my-7" />

            {/* Frases emotivas de la portada */}
            <div className="max-w-[480px] mx-auto space-y-4 px-2">
              <p className="font-cormorant text-base sm:text-lg md:text-xl italic text-[#595553] leading-relaxed">
                &ldquo;Hay momentos en la vida que se vuelven aún más especiales cuando los compartimos con las personas que queremos.&rdquo;
              </p>
              
              <p className="font-cormorant text-sm sm:text-base md:text-lg text-[#64605E] leading-relaxed">
                Con mucha alegría queremos invitarte a ser parte de un día inolvidable para nosotros.
              </p>
            </div>

            {/* Indicador de flecha animada que invita a desplazarse hacia abajo */}
            <div className="mt-8 pt-2 flex justify-center">
              <button
                type="button"
                onClick={scrollToNext}
                className="group p-2 rounded-full text-[#C5A246] hover:text-[#8C7335] transition-all duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C5A246] cursor-pointer"
                aria-label="Desplazarse a la fecha del evento"
              >
                <ChevronDown className="w-6 h-6 animate-bounce transition-transform group-hover:translate-y-1" />
              </button>
            </div>
          </header>

          {/* Guirnalda floral delicada como divisor artístico */}
          <div className="relative z-20 flex justify-center my-4 select-none pointer-events-none">
            <img 
              src={floralDividerAccent} 
              alt="Separador floral en acuarela" 
              className="w-48 sm:w-64 md:w-72 h-auto object-contain mix-blend-multiply opacity-80"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* ============================================================== */}
          {/* SECCIÓN 2: FECHA DEL EVENTO */}
          {/* ============================================================== */}
          <section id="fecha-evento" className="relative z-20 text-center py-8 sm:py-10">
            <p className="font-cormorant text-xs sm:text-sm tracking-[0.25em] text-[#8C7335] uppercase font-semibold mb-6">
              UN DÍA MUY ESPECIAL
            </p>

            {/* Bloque central de fecha con tipografía caligráfica en el número 16 */}
            <div className="my-6 max-w-xs mx-auto py-6 px-4 bg-[#FFFDF9] border-y border-[#C5A246]/40 relative">
              <span className="font-cormorant text-sm sm:text-base tracking-[0.2em] uppercase text-[#64605E] block font-medium">
                VIERNES
              </span>

              {/* Número 16 en caligrafía destacada */}
              <div className="my-1">
                <span className="font-great-vibes text-7xl sm:text-8xl md:text-9xl text-[#C5A246] leading-none block select-none">
                  16
                </span>
              </div>

              <span className="font-cormorant text-base sm:text-lg tracking-[0.22em] uppercase text-[#3A3533] font-semibold block">
                OCTUBRE
              </span>

              <span className="font-cormorant text-xs sm:text-sm tracking-[0.25em] text-[#8C7335] block mt-1">
                2026
              </span>

              {/* Hora del evento */}
              <div className="mt-5 pt-4 border-t border-[#C5A246]/25">
                <span className="font-montserrat text-[10px] tracking-[0.2em] text-[#8C847E] uppercase block mb-1">
                  HORA
                </span>
                <span className="font-cormorant text-lg sm:text-xl font-semibold text-[#3A3533] tracking-wide">
                  2:00 P. M.
                </span>
              </div>
            </div>

            {/* Texto de unión */}
            <p className="font-cormorant italic text-base sm:text-lg text-[#595553] max-w-md mx-auto px-4 mt-6 leading-relaxed">
              &ldquo;El amor nos une y tu presencia hará que este momento sea todavía más hermoso.&rdquo;
            </p>

            {/* Botón sutil para agendar en Google Calendar */}
            <div className="mt-5">
              <a
                href={GOOGLE_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-montserrat text-xs tracking-wider text-[#8C7335] hover:text-[#5e4c20] transition-colors py-2 px-3 border border-[#C5A246]/40 rounded hover:border-[#C5A246] bg-[#FFFDF9]"
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>AGREGAR A MI CALENDARIO</span>
              </a>
            </div>
          </section>

          <GoldDivider className="my-4 relative z-20" />

          {/* ============================================================== */}
          {/* SECCIÓN 3: CUENTA REGRESIVA EN TIEMPO REAL */}
          {/* ============================================================== */}
          <section className="relative z-20 py-8 text-center">
            <Countdown />
          </section>

          <GoldDivider className="my-4 relative z-20" />

          {/* ============================================================== */}
          {/* SECCIÓN: NUESTRA CANCIÓN (SPOTIFY) */}
          {/* ============================================================== */}
          <section className="relative z-20 py-6 sm:py-8 text-center max-w-md mx-auto px-2">
            <p className="font-cormorant text-xs sm:text-sm tracking-[0.25em] text-[#8C7335] uppercase font-semibold mb-2">
              NUESTRA CANCIÓN
            </p>
            <h3 className="font-cormorant text-xl sm:text-2xl font-semibold tracking-wider text-[#3A3533] uppercase mb-1">
              HOUSE OF CARDS
            </h3>
            <p className="font-cormorant italic text-sm sm:text-base text-[#64605E] mb-4">
              Radiohead &middot; Presiona Play para escuchar
            </p>

            {/* Official Spotify Embed Player */}
            <div className="bg-[#FFFDF9] border border-[#C5A246]/50 rounded-xl p-2 sm:p-2.5 shadow-[0_4px_16px_rgba(197,162,70,0.08)] overflow-hidden">
              <iframe
                title="Reproductor Spotify House of Cards"
                style={{ borderRadius: '12px', border: 0 }}
                src="https://open.spotify.com/embed/track/48X4D1FYOShPz2VF3YdfCF?utm_source=generator&theme=0"
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full"
              />
              <div className="mt-2.5 pt-2 border-t border-[#C5A246]/20 flex items-center justify-between text-[11px] font-montserrat text-[#64605E] px-1">
                <span className="text-[#8C7335]">
                  💡 Regulador de volumen en la barra inferior
                </span>
                <a
                  href="https://open.spotify.com/intl-es/track/48X4D1FYOShPz2VF3YdfCF?si=57d2ee2a984c45bc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1DB954] hover:underline font-medium inline-flex items-center gap-1"
                >
                  <span>Abrir en Spotify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </section>

          <GoldDivider className="my-4 relative z-20" />

          {/* ============================================================== */}
          {/* SECCIÓN 4: UBICACIÓN */}
          {/* ============================================================== */}
          <section className="relative z-20 text-center py-8 sm:py-10">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FFFDF9] border border-[#C5A246]/50 flex items-center justify-center text-[#C5A246] mb-4 shadow-xs">
              <MapPin className="w-6 h-6 stroke-[1.5]" />
            </div>

            <h3 className="font-cormorant text-xl sm:text-2xl font-semibold tracking-wider text-[#3A3533] uppercase mb-3">
              ¿DÓNDE CELEBRAREMOS?
            </h3>

            <p className="font-cormorant text-base sm:text-lg text-[#64605E] max-w-sm mx-auto px-4 mb-6 leading-relaxed">
              Av. 28 de Julio, a dos cuadras de la plaza de Huamancaca.
            </p>

            {/* Botón dorado Ver Ubicación (mínimo 48px de alto para accesibilidad) */}
            <div className="mt-4 flex justify-center">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn-gradient min-h-[48px] px-8 py-3.5 rounded font-montserrat text-xs sm:text-sm font-semibold tracking-[0.16em] text-white uppercase inline-flex items-center justify-center gap-2.5 shadow-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C5A246] focus-visible:ring-offset-2 active:scale-[0.99]"
              >
                <span>VER UBICACIÓN</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </section>

          <GoldDivider className="my-4 relative z-20" />

          {/* ============================================================== */}
          {/* SECCIÓN 5: CONFIRMACIÓN POR WHATSAPP */}
          {/* ============================================================== */}
          <section className="relative z-20 text-center py-8 sm:py-10">
            <h3 className="font-cormorant text-xl sm:text-2xl font-semibold tracking-wider text-[#3A3533] uppercase mb-3">
              CONFIRMA TU ASISTENCIA
            </h3>

            <p className="font-cormorant text-base sm:text-lg text-[#64605E] max-w-md mx-auto px-4 mb-6 leading-relaxed">
              Nos encantaría contar con tu presencia en esta fecha tan importante para nosotros.
            </p>

            {/* Botón dorado Confirmar por WhatsApp con ícono oficial */}
            <div className="mt-4 flex justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn-gradient min-h-[48px] px-8 py-3.5 rounded font-montserrat text-xs sm:text-sm font-semibold tracking-[0.16em] text-white uppercase inline-flex items-center justify-center gap-2.5 shadow-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C5A246] focus-visible:ring-offset-2 active:scale-[0.99]"
              >
                {/* SVG auténtico de WhatsApp */}
                <svg 
                  className="w-5 h-5 fill-current text-white shrink-0" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.882-9.89 9.882zM20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.58 0 11.943-5.336 11.946-11.896 0-3.176-1.24-6.165-3.477-8.45z"/>
                </svg>
                <span>CONFIRMAR POR WHATSAPP</span>
              </a>
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECCIÓN 6: PIE DE PÁGINA */}
          {/* ============================================================== */}
          <footer className="relative z-20 text-center pt-8 pb-10 sm:pb-14">
            <GoldHeart className="mb-4" />

            <p className="font-cormorant italic text-base sm:text-lg text-[#595553]">
              Con mucho cariño,
            </p>

            <p className="font-great-vibes text-4xl sm:text-5xl md:text-6xl text-[#3A3533] my-2">
              River &amp; Angely
            </p>

            <p className="font-cormorant text-base sm:text-lg tracking-widest text-[#8C7335] uppercase font-semibold mt-3">
              ¡Te esperamos!
            </p>
          </footer>

        </div>
      </div>

      {/* Floating Music Player with real volume regulation */}
      <MusicPlayer />
    </main>
  );
}
