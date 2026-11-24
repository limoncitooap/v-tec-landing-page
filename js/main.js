/* ==========================================================================
   V-TEC — Motor de Pre-selección Vehicular (Taggle Inc.)
   Implementación funcional de las 30 Historias de Usuario Core
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Catálogo de Carrocerías, Prioridades e Íconos SVG
     ------------------------------------------------------------------------ */
  const BODY_TYPES = [
    {
      id: 'Sedán',
      label: 'Sedán',
      desc: 'Cómodo y equilibrado',
      svg: `<svg viewBox="0 0 84 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 24h68v-6l-8-2-10-9H28l-10 9-10 2v6z"/><circle cx="22" cy="25" r="5" fill="#FFFFFF"/><circle cx="62" cy="25" r="5" fill="#FFFFFF"/><path d="M29 16h26"/></svg>`
    },
    {
      id: 'Station Wagon',
      label: 'Station Wagon',
      desc: 'Espacio sin perder manejo',
      svg: `<svg viewBox="0 0 84 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 24h68v-7l-4-10H26l-10 9-8 2v6z"/><circle cx="22" cy="25" r="5" fill="#FFFFFF"/><circle cx="62" cy="25" r="5" fill="#FFFFFF"/><path d="M27 16h40"/></svg>`
    },
    {
      id: 'Hatchback',
      label: 'Hatchback',
      desc: 'Ágil para la ciudad',
      svg: `<svg viewBox="0 0 84 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 24h56v-7l-6-10H32l-10 9-8 2v6z"/><circle cx="26" cy="25" r="5" fill="#FFFFFF"/><circle cx="58" cy="25" r="5" fill="#FFFFFF"/><path d="M32 16h28"/></svg>`
    },
    {
      id: 'SUV',
      label: 'SUV',
      desc: 'Altura y versatilidad',
      svg: `<svg viewBox="0 0 84 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 24h66v-8l-5-10H24l-8 8-7 2v8z"/><circle cx="23" cy="25" r="5.5" fill="#FFFFFF"/><circle cx="61" cy="25" r="5.5" fill="#FFFFFF"/><path d="M25 14h40"/></svg>`
    },
    {
      id: 'Pick Up',
      label: 'Pick Up',
      desc: 'Trabajo y aventura',
      svg: `<svg viewBox="0 0 84 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 24h68v-8H46l-4-9H22l-8 8-6 2v7z"/><circle cx="22" cy="25" r="5.5" fill="#FFFFFF"/><circle cx="62" cy="25" r="5.5" fill="#FFFFFF"/><path d="M23 15h19"/></svg>`
    },
    {
      id: 'Crossover',
      label: 'Crossover',
      desc: 'Comodidad urbana elevada',
      svg: `<svg viewBox="0 0 84 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 24h64v-7l-8-9H30l-11 8-9 2v6z"/><circle cx="24" cy="25" r="5" fill="#FFFFFF"/><circle cx="60" cy="25" r="5" fill="#FFFFFF"/><path d="M30 15h32"/></svg>`
    },
    {
      id: 'Van / Monovolumen',
      label: 'Van / Monovolumen',
      desc: 'Máxima capacidad interior',
      svg: `<svg viewBox="0 0 84 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 24h68V9a3 3 0 0 0-3-3H22l-10 9-4 3v6z"/><circle cx="22" cy="25" r="5" fill="#FFFFFF"/><circle cx="62" cy="25" r="5" fill="#FFFFFF"/><path d="M23 14h48"/></svg>`
    }
  ];

  const PRIORITIES = [
    {
      id: 'deportividad',
      label: 'Deportividad',
      desc: 'Respuesta rápida y manejo preciso',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 14l4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`
    },
    {
      id: 'comodidad',
      label: 'Comodidad',
      desc: 'Marcha suave y cabina silenciosa',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M6 16V9a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v7"/><path d="M4 12h2v4H4zM18 12h2v4h-2z"/></svg>`
    },
    {
      id: 'ahorro',
      label: 'Ahorro de combustible',
      desc: 'Más kilómetros por cada sol',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M15 10h2a2 2 0 0 1 2 2v5a2 2 0 0 0 4 0V9.83a2 2 0 0 0-.59-1.42L19 5"/><path d="M6 10h6"/><path d="M2 22h14"/></svg>`
    },
    {
      id: 'mantenimiento',
      label: 'Bajo costo de mantenimiento',
      desc: 'Repuestos disponibles y servicio accesible',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
    },
    {
      id: 'offroad',
      label: 'Todoterreno o carga',
      desc: 'Para rutas exigentes y trabajo operativo',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3l4 8 5-5 5 15H2L8 3z"/></svg>`
    }
  ];

  /* ------------------------------------------------------------------------
     2. Dataset Local del Mercado Peruano de Segunda Mano (Precios en Soles)
     ------------------------------------------------------------------------ */
  const VEHICLES = [
    // --- SEDÁN ---
    {
      id: 'nissan-primera',
      brand: 'Nissan',
      model: 'Primera / Sentra SR20',
      years: '1995-2002',
      body: 'Sedán',
      priceMin: 8000,
      priceMax: 17000,
      summary: 'Sedán low-cost ágil, motor de cadena resistente y excelente relación precio-desempeño.',
      scores: { deportividad: 8, comodidad: 7, ahorro: 7, mantenimiento: 8, offroad: 3 },
      consumption: { main: '35 - 40 km/gal', urban: '33 km/gal', highway: '44 km/gal', mixed: '37 km/gal' },
      specs: {
        motor: '2.0L 4 cilindros DOHC (SR20DE)',
        potencia: '140 HP a 6,400 rpm',
        torque: '181 Nm a 4,800 rpm',
        caja: 'Mecánica 5 vel.',
        combustible: 'Gasolina 95',
        traccion: 'Delantera (FWD)'
      },
      supportLevel: 'Alto',
      supportText: 'Motor de distribución por cadena muy conocido por mecánicos locales; repuestos mecánicos accesibles en Lima y costa peruana.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Confirma que el timón sea original o bien convertido',
      tipText: 'Muchos sedanes noventeros fueron convertidos; revisa cremallera, tablero y cableado bajo el timón antes de cerrar trato.'
    },
    {
      id: 'corolla-90s',
      brand: 'Toyota',
      model: 'Corolla (8va / 9na Gen)',
      years: '1998-2006',
      body: 'Sedán',
      priceMin: 13000,
      priceMax: 24000,
      summary: 'El estándar de durabilidad low-cost en Perú: repuestos en cada esquina y mecánica simple.',
      scores: { deportividad: 5, comodidad: 7, ahorro: 8, mantenimiento: 10, offroad: 3 },
      consumption: { main: '40 - 46 km/gal', urban: '38 km/gal', highway: '50 km/gal', mixed: '43 km/gal' },
      specs: {
        motor: '1.6L 4 cilindros (4A-FE / 3ZZ-FE)',
        potencia: '105 - 110 HP',
        torque: '145 - 150 Nm',
        caja: 'Mecánica 5 vel. / Automática 4 vel.',
        combustible: 'Gasolina / Compatible GLP',
        traccion: 'Delantera (FWD)'
      },
      supportLevel: 'Alto',
      supportText: 'Máxima disponibilidad de repuestos originales y alternativos en Lima y todas las provincias del país a precios muy económicos.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Verifica que no haya tenido uso intensivo de taxi',
      tipText: 'Revisa desgaste de pedales, timón, compresión de motor y registro de kilometraje en revisiones técnicas.'
    },
    {
      id: 'toyota-yaris-sedan',
      brand: 'Toyota',
      model: 'Yaris Sedán',
      years: '2010-2017',
      body: 'Sedán',
      priceMin: 23000,
      priceMax: 39000,
      summary: 'Ahorro sobresaliente de combustible y rentabilidad probada para ciudad o trabajo urbano.',
      scores: { deportividad: 4, comodidad: 7, ahorro: 10, mantenimiento: 10, offroad: 2 },
      consumption: { main: '48 - 55 km/gal', urban: '46 km/gal', highway: '58 km/gal', mixed: '51 km/gal' },
      specs: {
        motor: '1.3L 4 cilindros VVT-i (2NZ-FE)',
        potencia: '84 - 98 HP',
        torque: '121 Nm a 4,400 rpm',
        caja: 'Mecánica 5 vel. / Automática',
        combustible: 'Gasolina / GLP / GNV',
        traccion: 'Delantera (FWD)'
      },
      supportLevel: 'Alto',
      supportText: 'El soporte más amplio del mercado peruano. Repuestos inmediatos y mano de obra económica en cualquier distrito o provincia.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Revisa el historial de conversión a gas',
      tipText: 'Si tiene GNV o GLP, comprueba la compresión de cilindros y el estado de las válvulas antes de comprar.'
    },
    {
      id: 'honda-civic',
      brand: 'Honda',
      model: 'Civic (8va / 9na Gen)',
      years: '2007-2014',
      body: 'Sedán',
      priceMin: 24000,
      priceMax: 41000,
      summary: 'Manejo deportivo y cabina moderna con mecánica confiable si se mantiene a tiempo.',
      scores: { deportividad: 9, comodidad: 8, ahorro: 7, mantenimiento: 7, offroad: 2 },
      consumption: { main: '38 - 44 km/gal', urban: '35 km/gal', highway: '48 km/gal', mixed: '40 km/gal' },
      specs: {
        motor: '1.8L i-VTEC (R18A1)',
        potencia: '140 HP a 6,300 rpm',
        torque: '174 Nm a 4,300 rpm',
        caja: 'Mecánica 5 vel. / Automática 5 vel.',
        combustible: 'Gasolina 95',
        traccion: 'Delantera (FWD)'
      },
      supportLevel: 'Alto',
      supportText: 'Buena red de repuestos en Lima y ciudades principales; piezas ligeramente más costosas que Toyota pero muy duraderas.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Revisa soportes de motor y suspensión baja',
      tipText: 'Por su despeje bajo al suelo, revisa golpes en el cárter y el estado del soporte hidráulico derecho del motor.'
    },
    {
      id: 'mazda-3-sedan',
      brand: 'Mazda',
      model: 'Mazda 3 SkyActiv Sedán',
      years: '2015-2019',
      body: 'Sedán',
      priceMin: 40000,
      priceMax: 60000,
      summary: 'Acabados superiores, dirección precisa y gran eficiencia en carretera.',
      scores: { deportividad: 8, comodidad: 9, ahorro: 9, mantenimiento: 6, offroad: 2 },
      consumption: { main: '45 - 52 km/gal', urban: '42 km/gal', highway: '56 km/gal', mixed: '48 km/gal' },
      specs: {
        motor: '2.0L SkyActiv-G inyección directa',
        potencia: '153 HP a 6,000 rpm',
        torque: '200 Nm a 4,000 rpm',
        caja: 'Automática 6 vel. / Mecánica 6 vel.',
        combustible: 'Gasolina 97/98',
        traccion: 'Delantera (FWD)'
      },
      supportLevel: 'Medio',
      supportText: 'Excelente soporte en Lima y concesionarios, pero en provincias los repuestos de carrocería y sensores demoran más.',
      complexMaintenance: true,
      complexReason: 'Motor de alta compresión con inyección directa SkyActiv: exige combustible de alto octanaje y escaneo especializado para sensores.',
      tipTitle: 'Confirma uso de gasolina de alto octanaje',
      tipText: 'Evita unidades con cascabeleo o historial de gasolina de bajo octanaje; revisa limpieza de inyectores.'
    },

    // --- STATION WAGON ---
    {
      id: 'legacy-90s',
      brand: 'Subaru',
      model: 'Legacy Touring Wagon',
      years: '1994-2002',
      body: 'Station Wagon',
      priceMin: 8500,
      priceMax: 18000,
      summary: 'Low-cost con tracción AWD real, gran espacio de carga y marcha muy estable en ruta.',
      scores: { deportividad: 7, comodidad: 8, ahorro: 6, mantenimiento: 6, offroad: 8 },
      consumption: { main: '30 - 36 km/gal', urban: '27 km/gal', highway: '39 km/gal', mixed: '32 km/gal' },
      specs: {
        motor: '2.0L / 2.2L Boxer atmosférico (EJ20 / EJ22)',
        potencia: '125 - 155 HP',
        torque: '175 - 196 Nm',
        caja: 'Mecánica 5 vel. / Automática 4 vel.',
        combustible: 'Gasolina 95',
        traccion: 'Symmetrical AWD integral'
      },
      supportLevel: 'Medio',
      supportText: 'Buen mercado de repuestos y mecánicos conocedores de la serie EJ en Lima y sierra sur; en provincias chicas conviene pedir piezas a Lima.',
      complexMaintenance: true,
      complexReason: 'El motor Boxer (pistones opuestos) exige mecánicos que conozcan el cambio de empaques de culata y distribución.',
      tipTitle: 'Revisa empaques de culata y recalentamiento',
      tipText: 'En motores EJ noventeros verifica que no haya aceite en el refrigerante ni fugas en tapas laterales antes de comprar.'
    },
    {
      id: 'toyota-carib',
      brand: 'Toyota',
      model: 'Sprinter Carib / Corolla Touring',
      years: '1993-2001',
      body: 'Station Wagon',
      priceMin: 9500,
      priceMax: 18000,
      summary: 'Mecánica tradicional sin electrónica compleja, guerrera para provincia y carga liviana.',
      scores: { deportividad: 5, comodidad: 6, ahorro: 8, mantenimiento: 9, offroad: 8 },
      consumption: { main: '36 - 42 km/gal', urban: '34 km/gal', highway: '45 km/gal', mixed: '38 km/gal' },
      specs: {
        motor: '1.6L 4 cilindros (4A-FE)',
        potencia: '105 - 115 HP',
        torque: '142 Nm a 4,800 rpm',
        caja: 'Mecánica 5 vel.',
        combustible: 'Gasolina 90/95',
        traccion: 'Delantera / 4WD integral (Carib)'
      },
      supportLevel: 'Alto',
      supportText: 'Motor serie 4A ampliamente conocido en todo el Perú; repuestos genéricos y originales fáciles y baratos de conseguir.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Revisa sistema 4WD y óxido en guardafangos',
      tipText: 'Comprueba que el diferencial trasero no zumbe en carretera y verifica el estado de mangueras y radiador.'
    },
    {
      id: 'toyota-probox',
      brand: 'Toyota',
      model: 'Probox / Succeed',
      years: '2004-2014',
      body: 'Station Wagon',
      priceMin: 18000,
      priceMax: 32000,
      summary: 'Herramienta de trabajo incansable: maletera gigante, mecánica simple y repuestos baratísimos.',
      scores: { deportividad: 3, comodidad: 5, ahorro: 9, mantenimiento: 10, offroad: 7 },
      consumption: { main: '44 - 50 km/gal', urban: '42 km/gal', highway: '52 km/gal', mixed: '46 km/gal' },
      specs: {
        motor: '1.5L VVT-i (1NZ-FE)',
        potencia: '105 HP a 6,000 rpm',
        torque: '138 Nm a 4,200 rpm',
        caja: 'Mecánica 5 vel. / Automática',
        combustible: 'Gasolina / GLP',
        traccion: 'Delantera / 4WD opcional'
      },
      supportLevel: 'Alto',
      supportText: 'Uno de los vehículos con mayor soporte de repuestos en costa y sierra peruana; reparable con herramientas básicas.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Inspecciona carga previa y chasis trasero',
      tipText: 'Revisa amortiguadores posteriores, espirales reforzados y la calidad del cambio de timón si es importado.'
    },
    {
      id: 'subaru-outback',
      brand: 'Subaru',
      model: 'Outback 2.5i AWD',
      years: '2013-2017',
      body: 'Station Wagon',
      priceMin: 38000,
      priceMax: 58000,
      summary: 'Combinación superior de espacio familiar, confort de viaje y altura real para trocha.',
      scores: { deportividad: 7, comodidad: 10, ahorro: 7, mantenimiento: 6, offroad: 8 },
      consumption: { main: '34 - 40 km/gal', urban: '31 km/gal', highway: '43 km/gal', mixed: '36 km/gal' },
      specs: {
        motor: '2.5L Boxer FB25',
        potencia: '173 HP a 5,600 rpm',
        torque: '235 Nm a 4,100 rpm',
        caja: 'Automática CVT con modo manual',
        combustible: 'Gasolina 95',
        traccion: 'Symmetrical AWD con X-Mode'
      },
      supportLevel: 'Medio',
      supportText: 'Soporte confiable en Lima y ciudades grandes; costos de mantenimiento moderados a altos.',
      complexMaintenance: true,
      complexReason: 'Caja CVT y tracción integral permanente requieren cambios sincronizados de neumáticos y fluidos específicos.',
      tipTitle: 'Comprueba que las 4 llantas tengan igual desgaste',
      tipText: 'En vehículos AWD, llantas desiguales dañan el diferencial central con el tiempo.'
    },

    // --- HATCHBACK ---
    {
      id: 'toyota-starlet',
      brand: 'Toyota',
      model: 'Starlet / Yaris Hatchback',
      years: '1997-2005',
      body: 'Hatchback',
      priceMin: 10000,
      priceMax: 19000,
      summary: 'Primer auto ideal low-cost: económico en gasolina, fácil de estacionar y baratísimo de reparar.',
      scores: { deportividad: 6, comodidad: 6, ahorro: 10, mantenimiento: 10, offroad: 2 },
      consumption: { main: '48 - 56 km/gal', urban: '46 km/gal', highway: '60 km/gal', mixed: '52 km/gal' },
      specs: {
        motor: '1.3L 4 cilindros (4E-FE / 2NZ-FE)',
        potencia: '82 - 86 HP',
        torque: '115 - 121 Nm',
        caja: 'Mecánica 5 vel. / Automática',
        combustible: 'Gasolina 90/95',
        traccion: 'Delantera (FWD)'
      },
      supportLevel: 'Alto',
      supportText: 'Repuestos en todo el país a precios mínimos; cualquier taller mecánico lo atiende sin necesidad de escáneres complejos.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Revisa chasis delantero y calidad de pintura',
      tipText: 'Al ser un auto escolar/universitario muy buscado, revisa posibles choques frontales reparados y fugas de aceite.'
    },
    {
      id: 'suzuki-swift',
      brand: 'Suzuki',
      model: 'Swift Hatchback',
      years: '2012-2018',
      body: 'Hatchback',
      priceMin: 22000,
      priceMax: 38000,
      summary: 'Compacto, ágil para estacionar y con uno de los mejores consumos urbanos del mercado.',
      scores: { deportividad: 7, comodidad: 7, ahorro: 10, mantenimiento: 9, offroad: 2 },
      consumption: { main: '50 - 58 km/gal', urban: '48 km/gal', highway: '62 km/gal', mixed: '54 km/gal' },
      specs: {
        motor: '1.2L / 1.4L 4 cilindros K-Series',
        potencia: '85 - 94 HP',
        torque: '118 - 130 Nm',
        caja: 'Mecánica 5 vel. / Automática',
        combustible: 'Gasolina 95',
        traccion: 'Delantera (FWD)'
      },
      supportLevel: 'Alto',
      supportText: 'Repuestos accesibles y alta rotación en el mercado peruano; excelente opción para primer auto universitario o urbano.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Revisa suspensión delantera en baches',
      tipText: 'Prueba el auto en pista irregular para verificar amortiguadores, terminales y ruidos en la cremallera.'
    },
    {
      id: 'kia-rio-hb',
      brand: 'Kia',
      model: 'Rio Hatchback',
      years: '2013-2019',
      body: 'Hatchback',
      priceMin: 24000,
      priceMax: 40000,
      summary: 'Práctico, juvenil y muy fácil de mantener en cualquier ciudad del Perú.',
      scores: { deportividad: 6, comodidad: 7, ahorro: 9, mantenimiento: 9, offroad: 2 },
      consumption: { main: '45 - 50 km/gal', urban: '43 km/gal', highway: '54 km/gal', mixed: '47 km/gal' },
      specs: {
        motor: '1.4L 4 cilindros DOHC (Gamma)',
        potencia: '106 HP a 6,300 rpm',
        torque: '135 Nm a 4,200 rpm',
        caja: 'Mecánica 6 vel. / Automática',
        combustible: 'Gasolina 95',
        traccion: 'Delantera (FWD)'
      },
      supportLevel: 'Alto',
      supportText: 'Comparte plataforma y repuestos con Hyundai; piezas económicas y disponibles en todo el país.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Verifica el kilometraje real y embrague',
      tipText: 'Asegúrate de que los cambios entren suaves sin patinamiento y revisa historial de siniestros en SOAT.'
    },
    {
      id: 'mazda-3-hb',
      brand: 'Mazda',
      model: 'Mazda 3 SkyActiv Hatchback',
      years: '2014-2018',
      body: 'Hatchback',
      priceMin: 38000,
      priceMax: 55000,
      summary: 'Estética deportiva, interior silencioso y consumo destacado para su potencia.',
      scores: { deportividad: 9, comodidad: 9, ahorro: 9, mantenimiento: 6, offroad: 2 },
      consumption: { main: '46 - 52 km/gal', urban: '43 km/gal', highway: '56 km/gal', mixed: '49 km/gal' },
      specs: {
        motor: '2.0L SkyActiv-G 16 válvulas',
        potencia: '153 HP a 6,000 rpm',
        torque: '200 Nm a 4,000 rpm',
        caja: 'Automática 6 vel. / Mecánica 6 vel.',
        combustible: 'Gasolina 97/98',
        traccion: 'Delantera (FWD)'
      },
      supportLevel: 'Medio',
      supportText: 'Soporte sólido en Lima y principales capitales; repuestos originales de costo medio-alto respecto a compactos básicos.',
      complexMaintenance: true,
      complexReason: 'Sistema de inyección directa SkyActiv y electrónica embarcada requieren mantenimiento preventivo estricto con escáner.',
      tipTitle: 'Revisa los neumáticos de perfil bajo',
      tipText: 'Los aros grandes suelen sufrir golpes en pistas limeñas; inspecciona llantas, aros y alineamiento.'
    },
    {
      id: 'vw-golf-mk7',
      brand: 'Volkswagen',
      model: 'Golf 1.4 TSI (Mk7)',
      years: '2015-2018',
      body: 'Hatchback',
      priceMin: 44000,
      priceMax: 64000,
      summary: 'Sensación deportiva europea, gran calidad de marcha y respuesta turbo inmediata.',
      scores: { deportividad: 10, comodidad: 9, ahorro: 8, mantenimiento: 4, offroad: 2 },
      consumption: { main: '44 - 50 km/gal', urban: '40 km/gal', highway: '55 km/gal', mixed: '46 km/gal' },
      specs: {
        motor: '1.4L TSI Turbo inyección directa',
        potencia: '150 HP a 5,000 rpm',
        torque: '250 Nm a 1,500 rpm',
        caja: 'Automática DSG 7 vel. / Mecánica 6 vel.',
        combustible: 'Gasolina 97/98',
        traccion: 'Delantera (FWD)'
      },
      supportLevel: 'Bajo',
      supportText: 'Soporte concentrado únicamente en talleres especializados de Lima. Repuestos importados y costosos fuera de la capital.',
      complexMaintenance: true,
      complexReason: 'Caja de doble embrague DSG y motor turbo TSI exigen diagnósticos con escáner VAG-COM y repuestos de costo elevado.',
      tipTitle: 'Prioriza la versión mecánica o revisa mecatrónica DSG',
      tipText: 'Si eliges versión automática DSG, exige reporte de escáner de embragues y mecatrónica sin códigos de fallo.'
    },

    // --- SUV ---
    {
      id: 'grand-nomade-90s',
      brand: 'Suzuki',
      model: 'Grand Nomade / Vitara (2da Gen)',
      years: '1999-2005',
      body: 'SUV',
      priceMin: 16000,
      priceMax: 27000,
      summary: 'SUV 4x4 real con chasis independiente a precio aterrizado y mecánica fácil de mantener.',
      scores: { deportividad: 5, comodidad: 6, ahorro: 7, mantenimiento: 8, offroad: 9 },
      consumption: { main: '30 - 36 km/gal', urban: '28 km/gal', highway: '38 km/gal', mixed: '32 km/gal' },
      specs: {
        motor: '2.0L 4 cilindros (J20A)',
        potencia: '128 HP a 6,000 rpm',
        torque: '174 Nm a 3,000 rpm',
        caja: 'Mecánica 5 vel. / Automática 4 vel.',
        combustible: 'Gasolina 95',
        traccion: '4x4 conectable con reductora (Low)'
      },
      supportLevel: 'Alto',
      supportText: 'Repuestos mecánicos y de suspensión abundantes en Lima y provincias; muy valorada por su sencillez en trocha.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Escucha la cadena de distribución en frío',
      tipText: 'En motores J20A revisa si suena el tensor de cadena al encender en frío y prueba el enganche de la 4x4.'
    },
    {
      id: 'montero-sport',
      brand: 'Mitsubishi',
      model: 'Montero Sport',
      years: '2001-2008',
      body: 'SUV',
      priceMin: 22000,
      priceMax: 35000,
      summary: 'Gran capacidad fuera de pista con una cabina cómoda para viajes largos.',
      scores: { deportividad: 5, comodidad: 7, ahorro: 5, mantenimiento: 7, offroad: 9 },
      consumption: { main: '26 - 30 km/gal', urban: '24 km/gal', highway: '32 km/gal', mixed: '28 km/gal' },
      specs: {
        motor: '3.0L V6 / 2.5L Turbo Diésel',
        potencia: '175 HP a 5,000 rpm',
        torque: '255 Nm a 4,000 rpm',
        caja: 'Automática / Mecánica 5 vel.',
        combustible: 'Gasolina / Diésel',
        traccion: '4x4 seleccionable'
      },
      supportLevel: 'Alto',
      supportText: 'Buena disponibilidad de repuestos mecánicos y de suspensión en Lima y sierra peruana, con mecánicos familiarizados con la plataforma.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Inspecciona el chasis y los retenes',
      tipText: 'Revisa posibles fugas de aceite en tapas de válvulas y corrosión en la parte baja si trabajó en zonas mineras o costeras.'
    },
    {
      id: 'prado-j90',
      brand: 'Toyota',
      model: 'Land Cruiser Prado J90',
      years: '1996-2002',
      body: 'SUV',
      priceMin: 25000,
      priceMax: 40000,
      summary: 'Confiabilidad legendaria, tracción 4x4 y amplio soporte en todo el Perú.',
      scores: { deportividad: 5, comodidad: 8, ahorro: 4, mantenimiento: 8, offroad: 10 },
      consumption: { main: '24 - 28 km/gal', urban: '22 km/gal', highway: '30 km/gal', mixed: '26 km/gal' },
      specs: {
        motor: '3.4L V6, 24 válvulas (5VZ-FE)',
        potencia: '178 HP a 4,600 rpm',
        torque: '303 Nm a 3,600 rpm',
        caja: 'Automática 4 vel. / Mecánica 5 vel.',
        combustible: 'Gasolina 95',
        traccion: '4x4 permanente con reductora'
      },
      supportLevel: 'Alto',
      supportText: 'Cuenta con una red amplia de repuestos originales y alternativos en Lima y provincias. Hay talleres especializados en Toyota 4x4 en las principales ciudades del país.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Revisa el sistema de refrigeración',
      tipText: 'Antes de comprar, verifica radiador, mangueras y registros de cambio de refrigerante. Es clave en unidades con más de 20 años.'
    },
    {
      id: 'grand-vitara',
      brand: 'Suzuki',
      model: 'Grand Vitara (3ra Gen)',
      years: '2006-2012',
      body: 'SUV',
      priceMin: 26000,
      priceMax: 39000,
      summary: 'Equilibra consumo, maniobrabilidad urbana y una tracción 4x4 competente.',
      scores: { deportividad: 6, comodidad: 7, ahorro: 7, mantenimiento: 8, offroad: 8 },
      consumption: { main: '32 - 36 km/gal', urban: '30 km/gal', highway: '38 km/gal', mixed: '34 km/gal' },
      specs: {
        motor: '2.0L / 2.4L 4 cilindros DOHC',
        potencia: '140 - 166 HP',
        torque: '183 - 225 Nm',
        caja: 'Mecánica 5 vel. / Automática 4 vel.',
        combustible: 'Gasolina 95',
        traccion: '4x4 permanente con bloqueo central'
      },
      supportLevel: 'Alto',
      supportText: 'Modelo muy comercial en el Perú; repuestos de afinamiento, frenos y suspensión disponibles a costos razonables.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Verifica el estado del block en versiones 2.4 (2008-2009)',
      tipText: 'En unidades 2.4L de los años 2008 y 2009, revisa que no presente fisuras por sobrecalentamiento ni pérdida de refrigerante.'
    },
    {
      id: 'rav4-xa30',
      brand: 'Toyota',
      model: 'RAV4 (3ra Gen)',
      years: '2008-2012',
      body: 'SUV',
      priceMin: 36000,
      priceMax: 54000,
      summary: 'Alta confiabilidad diaria, valor de reventa sólido y mantenimiento predecible.',
      scores: { deportividad: 6, comodidad: 8, ahorro: 7, mantenimiento: 9, offroad: 6 },
      consumption: { main: '34 - 38 km/gal', urban: '31 km/gal', highway: '40 km/gal', mixed: '35 km/gal' },
      specs: {
        motor: '2.4L 4 cilindros (2AZ-FE)',
        potencia: '166 HP a 6,000 rpm',
        torque: '224 Nm a 4,000 rpm',
        caja: 'Automática 4 vel. / Mecánica 5 vel.',
        combustible: 'Gasolina 95',
        traccion: '4x2 / AWD bajo demanda'
      },
      supportLevel: 'Alto',
      supportText: 'Soporte sobresaliente en todo el Perú. Repuestos abundantes en Lima y provincias, fácil de atender en cualquier taller.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Controla el consumo de aceite',
      tipText: 'El motor 2.4L puede consumir aceite si superó los 150,000 km sin mantenimiento riguroso; revisa el historial de servicios.'
    },
    {
      id: 'subaru-forester-xt',
      brand: 'Subaru',
      model: 'Forester 2.0 XT / AWD',
      years: '2014-2017',
      body: 'SUV',
      priceMin: 48000,
      priceMax: 72000,
      summary: 'Excelente estabilidad en carretera y trocha ligera, con gran respuesta dinámica.',
      scores: { deportividad: 9, comodidad: 9, ahorro: 6, mantenimiento: 5, offroad: 8 },
      consumption: { main: '30 - 35 km/gal', urban: '27 km/gal', highway: '38 km/gal', mixed: '32 km/gal' },
      specs: {
        motor: '2.0L Boxer Turbo / 2.5L Boxer',
        potencia: '240 HP a 5,600 rpm',
        torque: '350 Nm a 2,400 rpm',
        caja: 'Automática Lineartronic CVT',
        combustible: 'Gasolina 97/98',
        traccion: 'Symmetrical AWD permanente'
      },
      supportLevel: 'Medio',
      supportText: 'Buen soporte técnico en Lima y Arequipa, pero limitado en provincias pequeñas donde pocos mecánicos dominan motores Boxer.',
      complexMaintenance: true,
      complexReason: 'Combina motor Boxer con turbo, inyección directa y caja CVT Lineartronic; requiere talleres especializados y fluidos originales específicos.',
      tipTitle: 'Escanea la caja CVT antes de cerrar trato',
      tipText: 'Solicita pruebas de temperatura de transmisión y comprobantes de cambio de aceite CVT cada 40,000 km.'
    },

    // --- PICK UP ---
    {
      id: 'nissan-d21',
      brand: 'Nissan',
      model: 'Pick Up D21 / Terrano',
      years: '1995-2004',
      body: 'Pick Up',
      priceMin: 16000,
      priceMax: 27000,
      summary: 'Pick-up clásica 100% mecánica, sin sensores electrónicos y con muelles hechos para chacra.',
      scores: { deportividad: 3, comodidad: 4, ahorro: 7, mantenimiento: 10, offroad: 9 },
      consumption: { main: '28 - 34 km/gal', urban: '26 km/gal', highway: '35 km/gal', mixed: '30 km/gal' },
      specs: {
        motor: '2.4L Gasolina (KA24) / 2.7L Diésel (TD27)',
        potencia: '85 - 134 HP',
        torque: '177 - 208 Nm',
        caja: 'Mecánica 5 vel.',
        combustible: 'Diésel / Gasolina',
        traccion: '4x2 / 4x4 con muelles traseros'
      },
      supportLevel: 'Alto',
      supportText: 'Máxima facilidad de reparación en provincias agrícolas; cero dependencia de escáneres ni mano de obra especializada.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Revisa largueros de chasis y tolva',
      tipText: 'Inspecciona soldaduras en el chasis trasero y holguras en la caja de dirección por años de trabajo de carga.'
    },
    {
      id: 'nissan-d22-frontier',
      brand: 'Nissan',
      model: 'Frontier / Navara D22 (TD27)',
      years: '2004-2012',
      body: 'Pick Up',
      priceMin: 26000,
      priceMax: 42000,
      summary: 'Mecánica diésel pura sin sensores complicados, suspensión de muelles hecha para carga.',
      scores: { deportividad: 4, comodidad: 5, ahorro: 7, mantenimiento: 10, offroad: 10 },
      consumption: { main: '29 - 35 km/gal', urban: '27 km/gal', highway: '36 km/gal', mixed: '31 km/gal' },
      specs: {
        motor: '2.7L Diésel (TD27) / 2.5L Diésel',
        potencia: '85 - 133 HP',
        torque: '177 - 304 Nm',
        caja: 'Mecánica 5 vel.',
        combustible: 'Diésel',
        traccion: '4x2 / 4x4 con muelles traseros'
      },
      supportLevel: 'Alto',
      supportText: 'Excelente disponibilidad de piezas en provincias agrícolas; mecánica sencilla que no depende de escáneres costosos.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Revisa bomba de inyección y paquetes de muelles',
      tipText: 'Asegúrate de que las hojas de muelle no estén vencidas por sobrecarga y revisa holgura en crucetas del cardán.'
    },
    {
      id: 'ssangyong-actyon',
      brand: 'SsangYong',
      model: 'Actyon Sports / Musso Pick Up',
      years: '2012-2017',
      body: 'Pick Up',
      priceMin: 28000,
      priceMax: 43000,
      summary: 'Cabina más cómoda a precio accesible, pero exige mayor cuidado en repuestos.',
      scores: { deportividad: 5, comodidad: 8, ahorro: 7, mantenimiento: 5, offroad: 7 },
      consumption: { main: '32 - 38 km/gal', urban: '30 km/gal', highway: '40 km/gal', mixed: '34 km/gal' },
      specs: {
        motor: '2.0L e-XDi Turbo Diésel',
        potencia: '153 HP a 4,000 rpm',
        torque: '360 Nm a 1,500 rpm',
        caja: 'Mecánica 6 vel. / Automática',
        combustible: 'Diésel',
        traccion: '4x4 conectable'
      },
      supportLevel: 'Bajo',
      supportText: 'Disponibilidad limitada fuera de Lima. Repuestos electrónicos e inyectores suelen requerir pedido especial.',
      complexMaintenance: true,
      complexReason: 'Sensores electrónicos y sistema de inyección diésel Delphi requieren técnicos y escáner específico poco común en provincias.',
      tipTitle: 'Verifica sensores de 4x4 e inyectores',
      tipText: 'Prueba la activación electrónica del 4x4 en terreno seguro y confirma que no tenga testigo Check Engine activo.'
    },
    {
      id: 'mitsubishi-l200',
      brand: 'Mitsubishi',
      model: 'L200 4x4 Diésel',
      years: '2010-2016',
      body: 'Pick Up',
      priceMin: 38000,
      priceMax: 58000,
      summary: 'Excelente alternativa laboral con mejor precio que Hilux y gran capacidad de carga.',
      scores: { deportividad: 5, comodidad: 7, ahorro: 7, mantenimiento: 8, offroad: 10 },
      consumption: { main: '31 - 37 km/gal', urban: '29 km/gal', highway: '39 km/gal', mixed: '33 km/gal' },
      specs: {
        motor: '2.5L Turbo Diésel Intercooler (4D56)',
        potencia: '136 HP a 4,000 rpm',
        torque: '314 Nm a 2,000 rpm',
        caja: 'Mecánica 5 vel.',
        combustible: 'Diésel',
        traccion: '4x4 con reductora y muelles'
      },
      supportLevel: 'Alto',
      supportText: 'Muy usada en agroindustria y minería en Perú; repuestos disponibles en Lima y principales provincias.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Verifica el estado del turbo y faja de distribución',
      tipText: 'Consulta cuándo fue el último cambio de kit de distribución y revisa que el turbo no silbe ni bote aceite.'
    },
    {
      id: 'toyota-hilux-vigo',
      brand: 'Toyota',
      model: 'Hilux 4x4 (7ma Gen)',
      years: '2006-2014',
      body: 'Pick Up',
      priceMin: 46000,
      priceMax: 74000,
      summary: 'La reina del trabajo pesado en el Perú: chasis indestructible, muelles y soporte total.',
      scores: { deportividad: 5, comodidad: 6, ahorro: 7, mantenimiento: 9, offroad: 10 },
      consumption: { main: '30 - 36 km/gal', urban: '28 km/gal', highway: '38 km/gal', mixed: '32 km/gal' },
      specs: {
        motor: '2.5L / 3.0L Turbo Diésel (2KD / 1KD)',
        potencia: '102 - 163 HP',
        torque: '260 - 343 Nm',
        caja: 'Mecánica 5 vel.',
        combustible: 'Diésel DB5',
        traccion: '4x4 con reductora y muelles traseros'
      },
      supportLevel: 'Alto',
      supportText: 'Cobertura absoluta en costa, sierra y selva. Cualquier mecánico en provincia conoce esta plataforma y sus repuestos.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Prueba inyectores en frío',
      tipText: 'En motores Common Rail con alto kilometraje, revisa humo negro excesivo o golpeteo en arranque en frío.'
    },

    // --- CROSSOVER ---
    {
      id: 'suzuki-sx4',
      brand: 'Suzuki',
      model: 'SX4 / S-Cross',
      years: '2009-2015',
      body: 'Crossover',
      priceMin: 20000,
      priceMax: 34000,
      summary: 'Opción subvalorada: motor japonés confiable, consumo contenido y precio justo.',
      scores: { deportividad: 6, comodidad: 7, ahorro: 9, mantenimiento: 8, offroad: 6 },
      consumption: { main: '42 - 48 km/gal', urban: '40 km/gal', highway: '52 km/gal', mixed: '45 km/gal' },
      specs: {
        motor: '1.6L VVT 4 cilindros (M16A)',
        potencia: '115 HP a 6,000 rpm',
        torque: '156 Nm a 4,400 rpm',
        caja: 'Mecánica 5 vel. / Automática',
        combustible: 'Gasolina 95',
        traccion: '4x2 / AWD opcional'
      },
      supportLevel: 'Alto',
      supportText: 'Motor de cadena muy duradero y repuestos mecánicos fáciles de encontrar en Lima y ciudades intermedias.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Revisa repuestos de carrocería específicos',
      tipText: 'La mecánica es muy accesible, pero faros y parachoques pueden demorar más que en un Swift; verifica que no tenga choques.'
    },
    {
      id: 'nissan-qashqai',
      brand: 'Nissan',
      model: 'Qashqai',
      years: '2011-2017',
      body: 'Crossover',
      priceMin: 30000,
      priceMax: 48000,
      summary: 'Posición de manejo alta, diseño moderno y gran confort para ciudad y autopista.',
      scores: { deportividad: 6, comodidad: 9, ahorro: 8, mantenimiento: 7, offroad: 5 },
      consumption: { main: '38 - 44 km/gal', urban: '35 km/gal', highway: '48 km/gal', mixed: '41 km/gal' },
      specs: {
        motor: '2.0L 4 cilindros (MR20DE)',
        potencia: '140 HP a 6,000 rpm',
        torque: '196 Nm a 4,800 rpm',
        caja: 'Mecánica 6 vel. / Xtronic CVT',
        combustible: 'Gasolina 95',
        traccion: '4x2 / 4x4 seleccionable'
      },
      supportLevel: 'Alto',
      supportText: 'Muy comercial en Perú; amplia disponibilidad de repuestos de suspensión, frenos y carrocería.',
      complexMaintenance: true,
      complexReason: 'En versiones automáticas, la caja Xtronic CVT es sensible a recalentamiento si no tuvo mantenimiento cada 40,000 km.',
      tipTitle: 'Prefiere la versión mecánica de 6 velocidades',
      tipText: 'Si optas por la automática CVT, realiza una prueba de manejo de al menos 20 minutos en tráfico para descartar tirones.'
    },
    {
      id: 'subaru-xv',
      brand: 'Subaru',
      model: 'XV 2.0i AWD',
      years: '2013-2018',
      body: 'Crossover',
      priceMin: 36000,
      priceMax: 56000,
      summary: 'Tamaño urbano ágil con altura libre real y tracción integral para viajes a la sierra.',
      scores: { deportividad: 7, comodidad: 8, ahorro: 8, mantenimiento: 6, offroad: 8 },
      consumption: { main: '38 - 44 km/gal', urban: '35 km/gal', highway: '47 km/gal', mixed: '40 km/gal' },
      specs: {
        motor: '2.0L Boxer atmosférico (FB20)',
        potencia: '150 HP a 6,200 rpm',
        torque: '196 Nm a 4,200 rpm',
        caja: 'Automática CVT / Mecánica 6 vel.',
        combustible: 'Gasolina 95',
        traccion: 'Symmetrical AWD permanente'
      },
      supportLevel: 'Medio',
      supportText: 'Buen respaldo en Lima y ciudades grandes; mantenimiento ligeramente superior al promedio de crossovers 4x2.',
      complexMaintenance: true,
      complexReason: 'Transmisión CVT y motor Boxer exigen mantenimiento en talleres especializados para evitar fallas prematuras.',
      tipTitle: 'Escucha ruidos en rodajes traseros',
      tipText: 'Es común cambiar bocinas o rodajes traseros alrededor de los 80,000 km; compruébalo circulando a 70 km/h.'
    },
    {
      id: 'hyundai-creta',
      brand: 'Hyundai',
      model: 'Creta 1.6',
      years: '2016-2020',
      body: 'Crossover',
      priceMin: 42000,
      priceMax: 60000,
      summary: 'Alta para los baches de Lima, económica de mantener y con excelente reventa.',
      scores: { deportividad: 5, comodidad: 8, ahorro: 8, mantenimiento: 9, offroad: 5 },
      consumption: { main: '40 - 46 km/gal', urban: '38 km/gal', highway: '49 km/gal', mixed: '42 km/gal' },
      specs: {
        motor: '1.6L Dual CVVT (Gamma)',
        potencia: '121 HP a 6,300 rpm',
        torque: '151 Nm a 4,850 rpm',
        caja: 'Mecánica 6 vel. / Automática 6 vel.',
        combustible: 'Gasolina 95',
        traccion: 'Delantera (FWD)'
      },
      supportLevel: 'Alto',
      supportText: 'Red nacional muy sólida con repuestos originales y alternativos en prácticamente todo el Perú.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Verifica el estado de los frenos y suspensión',
      tipText: 'Revisa discos delanteros y amortiguadores traseros; la mecánica base es sencilla y confiable.'
    },

    // --- VAN / MONOVOLUMEN ---
    {
      id: 'suzuki-apv',
      brand: 'Suzuki',
      model: 'APV Van / Furgón',
      years: '2008-2015',
      body: 'Van / Monovolumen',
      priceMin: 18000,
      priceMax: 29000,
      summary: 'Gran volumen de carga a bajo costo inicial, ideal para emprendedores y reparto.',
      scores: { deportividad: 3, comodidad: 5, ahorro: 8, mantenimiento: 9, offroad: 6 },
      consumption: { main: '36 - 42 km/gal', urban: '34 km/gal', highway: '44 km/gal', mixed: '38 km/gal' },
      specs: {
        motor: '1.6L 4 cilindros (G16A)',
        potencia: '91 HP a 5,750 rpm',
        torque: '127 Nm a 4,500 rpm',
        caja: 'Mecánica 5 vel.',
        combustible: 'Gasolina / GLP',
        traccion: 'Trasera (RWD) con muelles'
      },
      supportLevel: 'Alto',
      supportText: 'Motor sencillo muy difundido en reparto urbano y provincias; repuestos económicos y de alta rotación.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Revisa sistema de enfriamiento bajo el asiento',
      tipText: 'Al ir el motor debajo de los asientos delanteros, comprueba mangueras, radiador y temperatura estable en tráfico.'
    },
    {
      id: 'toyota-avanza',
      brand: 'Toyota',
      model: 'Avanza 1.5 (3 filas)',
      years: '2012-2019',
      body: 'Van / Monovolumen',
      priceMin: 30000,
      priceMax: 48000,
      summary: 'Tracción trasera resistente, 7 asientos reales y la mejor rentabilidad familiar/comercial.',
      scores: { deportividad: 4, comodidad: 7, ahorro: 9, mantenimiento: 10, offroad: 6 },
      consumption: { main: '42 - 48 km/gal', urban: '40 km/gal', highway: '50 km/gal', mixed: '44 km/gal' },
      specs: {
        motor: '1.5L Dual VVT-i (3SZ-VE / 2NR-VE)',
        potencia: '103 HP a 6,000 rpm',
        torque: '136 Nm a 4,200 rpm',
        caja: 'Mecánica 5 vel. / Automática 4 vel.',
        combustible: 'Gasolina / GLP',
        traccion: 'Trasera (RWD)'
      },
      supportLevel: 'Alto',
      supportText: 'Soporte masivo en todo el Perú; ideal tanto para familias numerosas como para reparto urbano ligero.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Revisa suspensión trasera y diferencial',
      tipText: 'Al ser tracción trasera y usada para carga o pasajeros, verifica ausencia de zumbidos atrás y buen estado de amortiguadores.'
    },
    {
      id: 'suzuki-ertiga',
      brand: 'Suzuki',
      model: 'Ertiga 1.4 / 1.5',
      years: '2015-2020',
      body: 'Van / Monovolumen',
      priceMin: 34000,
      priceMax: 52000,
      summary: 'Más suave y silenciosa en ciudad que una van comercial, con excelente economía.',
      scores: { deportividad: 5, comodidad: 9, ahorro: 9, mantenimiento: 9, offroad: 3 },
      consumption: { main: '44 - 52 km/gal', urban: '42 km/gal', highway: '55 km/gal', mixed: '47 km/gal' },
      specs: {
        motor: '1.4L / 1.5L 4 cilindros K-Series',
        potencia: '95 - 103 HP',
        torque: '130 - 138 Nm',
        caja: 'Mecánica 5 vel. / Automática 4 vel.',
        combustible: 'Gasolina 95',
        traccion: 'Delantera (FWD)'
      },
      supportLevel: 'Alto',
      supportText: 'Excelente red de repuestos Suzuki en Lima y provincias principales, con servicios preventivos económicos.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Comprueba aire acondicionado de segunda fila',
      tipText: 'Verifica que el evaporador trasero enfríe correctamente y que los asientos abatibles traben sin holgura.'
    },
    {
      id: 'hyundai-h1',
      brand: 'Hyundai',
      model: 'H-1 Minibús / Panel',
      years: '2011-2017',
      body: 'Van / Monovolumen',
      priceMin: 44000,
      priceMax: 70000,
      summary: 'Máxima capacidad para turismo, familia grande o transporte de carga voluminosa.',
      scores: { deportividad: 4, comodidad: 8, ahorro: 6, mantenimiento: 8, offroad: 6 },
      consumption: { main: '28 - 34 km/gal', urban: '26 km/gal', highway: '36 km/gal', mixed: '30 km/gal' },
      specs: {
        motor: '2.5L CRDi Turbo Diésel',
        potencia: '134 - 168 HP',
        torque: '343 - 441 Nm',
        caja: 'Mecánica 6 vel. / Automática',
        combustible: 'Diésel',
        traccion: 'Trasera (RWD)'
      },
      supportLevel: 'Alto',
      supportText: 'Estándar del transporte turístico y comercial en Perú; amplia disponibilidad de repuestos en Lima y provincias.',
      complexMaintenance: false,
      complexReason: '',
      tipTitle: 'Revisa kilometraje real e inyectores CRDi',
      tipText: 'Muchos ejemplares tienen uso comercial intensivo; realiza escaneo de inyectores y compresión antes de comprar.'
    }
  ];

  /* ------------------------------------------------------------------------
     3. Estado de la Aplicación y Claves de Persistencia (HU-23)
     ------------------------------------------------------------------------ */
  const STORAGE_PROGRESS_KEY = 'vtec_wizard_progress_v1';
  const STORAGE_SAVED_KEY = 'vtec_saved_result_v1';

  const state = {
    step: 1, // 1, 2, 3, 'loading', 'results', 'detail'
    bodyType: null,
    priorities: {}, // { id: weight (1..10) }
    budget: 35000,
    results: [],
    selectedCompare: [],
    activeVehicleId: null,
    tensionInfo: null,
    isNavigating: false
  };

  /* ------------------------------------------------------------------------
     4. Referencias al DOM
     ------------------------------------------------------------------------ */
  const els = {
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mainNav: document.getElementById('main-nav'),
    btnOpenSaved: document.getElementById('btn-open-saved'),
    btnStartHero: document.getElementById('btn-start-hero'),
    btnStartSecondary: document.getElementById('btn-start-secondary'),

    wizardSection: document.getElementById('diagnostico'),
    wizardTopbar: document.getElementById('wizard-topbar'),
    stepLabel: document.getElementById('wizard-step-label'),
    progressBar: document.getElementById('wizard-progress-bar'),
    progressFill: document.getElementById('wizard-progress-fill'),
    btnResetWizard: document.getElementById('btn-reset-wizard'),

    views: {
      1: document.getElementById('step-1'),
      2: document.getElementById('step-2'),
      3: document.getElementById('step-3'),
      loading: document.getElementById('step-loading'),
      results: document.getElementById('step-results'),
      detail: document.getElementById('step-detail')
    },

    bodyOptions: document.getElementById('body-options'),
    step1Hint: document.getElementById('step-1-hint'),
    step1Error: document.getElementById('step-1-error'),
    btnStep1Next: document.getElementById('btn-step-1-next'),

    priorityOptions: document.getElementById('priority-options'),
    priorityCounter: document.getElementById('priority-counter'),
    prioritySummary: document.getElementById('priority-summary'),
    prioritySummaryChips: document.getElementById('priority-summary-chips'),
    step2Error: document.getElementById('step-2-error'),
    btnStep2Back: document.getElementById('btn-step-2-back'),
    btnStep2Next: document.getElementById('btn-step-2-next'),

    budgetNumber: document.getElementById('budget-number'),
    budgetSlider: document.getElementById('budget-slider'),
    marginPreviewText: document.getElementById('margin-preview-text'),
    step3Error: document.getElementById('step-3-error'),
    btnStep3Back: document.getElementById('btn-step-3-back'),
    btnCalculate: document.getElementById('btn-calculate'),

    resultsRangeDesc: document.getElementById('results-range-desc'),
    resultsFilterBadges: document.getElementById('results-filter-badges'),
    btnEditSearch: document.getElementById('btn-edit-search'),
    resultsEmpty: document.getElementById('results-empty'),
    emptyStateReason: document.getElementById('empty-state-reason'),
    btnEmptyBudget: document.getElementById('btn-empty-budget'),
    btnEmptyBody: document.getElementById('btn-empty-body'),
    resultsContent: document.getElementById('results-content'),
    resultsGrid: document.getElementById('results-grid'),
    btnOpenCompare: document.getElementById('btn-open-compare'),
    compareCount: document.getElementById('compare-count'),
    tensionAlert: document.getElementById('tension-alert'),
    tensionMessage: document.getElementById('tension-message'),
    btnAdjustPriorities: document.getElementById('btn-adjust-priorities'),

    btnBackToResults: document.getElementById('btn-back-to-results'),
    detailEyebrow: document.getElementById('detail-eyebrow'),
    detailModelName: document.getElementById('detail-model-name'),
    detailYears: document.getElementById('detail-years'),
    detailPriceBadge: document.getElementById('detail-price-badge'),
    detailBodyBadge: document.getElementById('detail-body-badge'),
    btnCopyDetailModel: document.getElementById('btn-copy-detail-model'),
    detailCompatRing: document.getElementById('detail-compat-ring'),
    detailConsumptionMain: document.getElementById('detail-consumption-main'),
    detailConsumptionBreakdown: document.getElementById('detail-consumption-breakdown'),
    detailComplexWrap: document.getElementById('detail-complex-wrap'),
    btnToggleComplexInfo: document.getElementById('btn-toggle-complex-info'),
    detailComplexReason: document.getElementById('detail-complex-reason'),
    detailSpecsList: document.getElementById('detail-specs-list'),
    detailMatchFactors: document.getElementById('detail-match-factors'),
    detailSupportText: document.getElementById('detail-support-text'),
    detailSupportLevel: document.getElementById('detail-support-level'),
    detailTipTitle: document.getElementById('detail-tip-title'),
    detailTipText: document.getElementById('detail-tip-text'),
    btnSaveResult: document.getElementById('btn-save-result'),
    btnDetailRestart: document.getElementById('btn-detail-restart'),

    faqList: document.getElementById('faq-list'),
    contactForm: document.getElementById('contact-form'),
    contactName: document.getElementById('contact-name'),
    contactEmail: document.getElementById('contact-email'),
    contactMessage: document.getElementById('contact-message'),
    contactError: document.getElementById('contact-error'),
    contactSuccess: document.getElementById('contact-success'),

    modalCompare: document.getElementById('modal-compare'),
    compareModalBody: document.getElementById('compare-modal-body'),
    modalReset: document.getElementById('modal-reset'),
    btnConfirmReset: document.getElementById('btn-confirm-reset'),
    modalLegal: document.getElementById('modal-legal'),
    legalModalTitle: document.getElementById('legal-modal-title'),
    legalModalBody: document.getElementById('legal-modal-body'),
    toast: document.getElementById('toast')
  };

  /* ------------------------------------------------------------------------
     5. Utilidades (Formato Soles, Toast, Clipboard, LocalStorage)
     ------------------------------------------------------------------------ */
  function formatPEN(value) {
    return 'S/ ' + Number(value).toLocaleString('es-PE');
  }

  let toastTimer = null;
  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.toast.classList.add('hidden');
    }, 3000);
  }

  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      showToast(`Copiado: "${text}"`);
    } catch {
      showToast(`Modelo listo para buscar: ${text}`);
    }
  }

  function saveProgress() {
    try {
      const payload = {
        step: typeof state.step === 'number' ? state.step : 3,
        bodyType: state.bodyType,
        priorities: state.priorities,
        budget: state.budget
      };
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(payload));
    } catch {
      // Silencioso si el navegador bloquea storage
    }
  }

  function clearProgress() {
    try {
      localStorage.removeItem(STORAGE_PROGRESS_KEY);
    } catch {
      // No-op
    }
  }

  function restoreProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.bodyType && BODY_TYPES.some((b) => b.id === saved.bodyType)) {
        state.bodyType = saved.bodyType;
      }
      if (saved.priorities && typeof saved.priorities === 'object') {
        state.priorities = saved.priorities;
      }
      if (typeof saved.budget === 'number' && saved.budget >= 5000) {
        state.budget = saved.budget;
      }
      if ([1, 2, 3].includes(saved.step)) {
        state.step = saved.step;
      }
    } catch {
      clearProgress();
    }
  }

  function refreshSavedButton() {
    try {
      const saved = localStorage.getItem(STORAGE_SAVED_KEY);
      if (saved) {
        els.btnOpenSaved.classList.remove('hidden');
      } else {
        els.btnOpenSaved.classList.add('hidden');
      }
    } catch {
      els.btnOpenSaved.classList.add('hidden');
    }
  }

  /* ------------------------------------------------------------------------
     6. Control de Vistas y Barra de Progreso (HU-05, HU-21)
     ------------------------------------------------------------------------ */
  function showView(viewKey, shouldScroll = false) {
    state.step = viewKey;
    Object.entries(els.views).forEach(([key, node]) => {
      node.classList.toggle('hidden', key !== String(viewKey));
    });

    if (viewKey === 1 || viewKey === 2 || viewKey === 3) {
      els.stepLabel.textContent = `PASO ${viewKey} DE 3`;
      els.progressBar.setAttribute('aria-valuenow', String(viewKey));
      els.progressFill.style.width = `${(viewKey / 3) * 100}%`;
    } else if (viewKey === 'loading') {
      els.stepLabel.textContent = 'PROCESANDO DIAGNÓSTICO';
      els.progressBar.setAttribute('aria-valuenow', '3');
      els.progressFill.style.width = '100%';
    } else if (viewKey === 'results') {
      els.stepLabel.textContent = 'DIAGNÓSTICO COMPLETADO';
      els.progressBar.setAttribute('aria-valuenow', '3');
      els.progressFill.style.width = '100%';
    } else if (viewKey === 'detail') {
      els.stepLabel.textContent = 'FICHA TÉCNICA Y SOPORTE';
      els.progressBar.setAttribute('aria-valuenow', '3');
      els.progressFill.style.width = '100%';
    }

    if (typeof viewKey === 'number') {
      saveProgress();
    }

    if (shouldScroll) {
      els.wizardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ------------------------------------------------------------------------
     7. Renderizado Paso 1: Carrocería (HU-01, HU-04)
     ------------------------------------------------------------------------ */
  function renderBodyOptions() {
    els.bodyOptions.innerHTML = BODY_TYPES.map((item) => {
      const selected = state.bodyType === item.id;
      return `
        <button
          type="button"
          class="body-card ${selected ? 'selected' : ''}"
          role="radio"
          aria-checked="${selected}"
          data-body="${item.id}"
        >
          <div class="body-card-top">
            <span class="body-icon">${item.svg}</span>
            <span class="radio-indicator" aria-hidden="true"></span>
          </div>
          <h3>${item.label}</h3>
          <p>${item.desc}</p>
        </button>
      `;
    }).join('');

    els.step1Hint.textContent = state.bodyType
      ? `Carrocería elegida: ${state.bodyType}`
      : 'Selecciona una carrocería para continuar';

    els.bodyOptions.querySelectorAll('.body-card').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.bodyType = btn.dataset.body;
        els.step1Error.textContent = '';
        renderBodyOptions();
        saveProgress();
      });
    });
  }

  /* ------------------------------------------------------------------------
     8. Renderizado Paso 2: Prioridades (HU-06, HU-07, HU-08, HU-09)
     ------------------------------------------------------------------------ */
  function renderPriorityOptions() {
    const selectedIds = Object.keys(state.priorities);
    els.priorityCounter.innerHTML = `<strong>${selectedIds.length}</strong> de 3 seleccionadas`;

    els.priorityOptions.innerHTML = PRIORITIES.map((p) => {
      const isSelected = Object.prototype.hasOwnProperty.call(state.priorities, p.id);
      const weight = isSelected ? state.priorities[p.id] : 7;

      return `
        <div class="priority-card ${isSelected ? 'selected' : ''}" data-priority-card="${p.id}">
          <button
            type="button"
            class="priority-head-btn"
            role="checkbox"
            aria-checked="${isSelected}"
            data-toggle-priority="${p.id}"
          >
            <span class="priority-meta">
              <span class="priority-icon">${p.icon}</span>
              <span>
                <h3>${p.label}</h3>
                <p>${p.desc}</p>
              </span>
            </span>
            <span class="checkbox-indicator" aria-hidden="true">${isSelected ? '✓' : ''}</span>
          </button>

          ${
            isSelected
              ? `
            <div class="importance-box">
              <div class="importance-header">
                <label for="slider-${p.id}">Nivel de importancia</label>
                <span class="importance-value" id="val-${p.id}">${weight}/10</span>
              </div>
              <input
                type="range"
                id="slider-${p.id}"
                class="range-slider"
                min="1"
                max="10"
                step="1"
                value="${weight}"
                data-weight-slider="${p.id}"
                aria-label="Nivel de importancia para ${p.label}"
              >
              <div class="importance-labels">
                <span>Poco</span>
                <span>Mucho</span>
              </div>
            </div>
          `
              : ''
          }
        </div>
      `;
    }).join('');

    // Resumen de prioridades elegidas (HU-09)
    if (selectedIds.length > 0) {
      els.prioritySummary.classList.remove('hidden');
      els.prioritySummaryChips.innerHTML = selectedIds
        .map((id) => {
          const item = PRIORITIES.find((p) => p.id === id);
          return `
            <span class="chip">
              ${item.label} (${state.priorities[id]}/10)
              <button type="button" class="chip-remove" data-remove-chip="${id}" aria-label="Quitar ${item.label}">×</button>
            </span>
          `;
        })
        .join('');
    } else {
      els.prioritySummary.classList.add('hidden');
      els.prioritySummaryChips.innerHTML = '';
    }

    // Eventos de selección/deselección
    els.priorityOptions.querySelectorAll('[data-toggle-priority]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.togglePriority;
        const already = Object.prototype.hasOwnProperty.call(state.priorities, id);

        if (already) {
          delete state.priorities[id];
          els.step2Error.textContent = '';
        } else {
          if (Object.keys(state.priorities).length >= 3) {
            els.step2Error.textContent = 'Máximo 3 prioridades. Deselecciona una para elegir otra.';
            return;
          }
          state.priorities[id] = 7;
          els.step2Error.textContent = '';
        }
        renderPriorityOptions();
        saveProgress();
      });
    });

    // Eventos de sliders de importancia
    els.priorityOptions.querySelectorAll('[data-weight-slider]').forEach((slider) => {
      slider.addEventListener('input', (e) => {
        const id = slider.dataset.weightSlider;
        const val = Number(e.target.value);
        state.priorities[id] = val;
        const label = document.getElementById(`val-${id}`);
        if (label) label.textContent = `${val}/10`;
        updatePriorityChipsText();
        saveProgress();
      });
    });

    // Eventos para quitar desde el resumen (HU-09 CA02)
    els.prioritySummaryChips.querySelectorAll('[data-remove-chip]').forEach((btn) => {
      btn.addEventListener('click', () => {
        delete state.priorities[btn.dataset.removeChip];
        els.step2Error.textContent = '';
        renderPriorityOptions();
        saveProgress();
      });
    });
  }

  function updatePriorityChipsText() {
    const selectedIds = Object.keys(state.priorities);
    els.prioritySummaryChips.innerHTML = selectedIds
      .map((id) => {
        const item = PRIORITIES.find((p) => p.id === id);
        return `
          <span class="chip">
            ${item.label} (${state.priorities[id]}/10)
            <button type="button" class="chip-remove" data-remove-chip="${id}" aria-label="Quitar ${item.label}">×</button>
          </span>
        `;
      })
      .join('');

    els.prioritySummaryChips.querySelectorAll('[data-remove-chip]').forEach((btn) => {
      btn.addEventListener('click', () => {
        delete state.priorities[btn.dataset.removeChip];
        renderPriorityOptions();
        saveProgress();
      });
    });
  }

  /* ------------------------------------------------------------------------
     9. Paso 3: Presupuesto y Margen Inteligente ±15% (HU-10, HU-18)
     ------------------------------------------------------------------------ */
  function syncBudgetUI(amount) {
    const safeNum = Number(amount);
    els.budgetNumber.value = isNaN(safeNum) ? '' : safeNum;
    if (!isNaN(safeNum) && safeNum >= 5000) {
      els.budgetSlider.value = Math.min(80000, Math.max(5000, safeNum));
      const minRange = Math.round(safeNum * 0.85);
      const maxRange = Math.round(safeNum * 1.15);
      els.marginPreviewText.textContent = `Evaluaremos opciones con hasta 15% de flexibilidad (${formatPEN(minRange)} – ${formatPEN(maxRange)}) para no dejar fuera una buena oportunidad.`;
    }
  }

  /* ------------------------------------------------------------------------
     10. Motor Algorítmico de Compatibilidad y Diagnóstico de Tensión
         (HU-11, HU-13, HU-17, HU-18)
     ------------------------------------------------------------------------ */
  function calculateDiagnosis() {
    const budget = state.budget;
    const minBudget = Math.round(budget * 0.85);
    const maxBudget = Math.round(budget * 1.15);
    const selectedEntries = Object.entries(state.priorities); // [[id, weight], ...]

    // 1. Filtrar por carrocería y margen ±15% de presupuesto
    const candidates = VEHICLES.filter((v) => {
      if (v.body !== state.bodyType) return false;
      return v.priceMin <= maxBudget && v.priceMax >= minBudget;
    });

    if (candidates.length === 0) {
      state.results = [];
      state.tensionInfo = null;
      return;
    }

    // 2. Calcular puntaje de compatibilidad ponderado
    const totalWeight = selectedEntries.reduce((acc, [, w]) => acc + w, 0) || 1;

    const scored = candidates.map((vehicle) => {
      let weightedSum = 0;
      const factorScores = [];

      selectedEntries.forEach(([prioId, weight]) => {
        const attrScore = vehicle.scores[prioId] || 5;
        // Normalizar afinidad entre exigencia (weight) y capacidad del auto (attrScore)
        const ratio = Math.min(1, attrScore / Math.max(6, weight));
        const combined = attrScore * 0.65 + ratio * 10 * 0.35;
        weightedSum += combined * weight;
        factorScores.push({ id: prioId, weight, attrScore });
      });

      const basePct = (weightedSum / (totalWeight * 10)) * 100;

      // Ajuste financiero: leve penalización si el auto entra solo por el margen superior +15%
      const inExactBudget = vehicle.priceMin <= budget;
      const budgetPenalty = inExactBudget ? 0 : 6;
      const finalPct = Math.max(54, Math.min(98, Math.round(basePct - budgetPenalty)));

      // Identificar factores principales que impulsaron la recomendación
      const topFactors = factorScores
        .sort((a, b) => b.attrScore * b.weight - a.attrScore * a.weight)
        .map((f) => PRIORITIES.find((p) => p.id === f.id).label);

      return {
        ...vehicle,
        compatibility: finalPct,
        inExactBudget,
        topFactors,
        factorScores
      };
    });

    // Ordenar de mayor a menor compatibilidad y tomar Top 3
    scored.sort((a, b) => b.compatibility - a.compatibility);
    state.results = scored.slice(0, 3);

    // 3. Detección de tensión entre prioridades y presupuesto (HU-13)
    state.tensionInfo = evaluateTension(state.results[0], selectedEntries);
  }

  function evaluateTension(topVehicle, selectedEntries) {
    if (!topVehicle || selectedEntries.length === 0) return null;

    const prioIds = selectedEntries.map(([id]) => id);
    const hasConflictPair =
      (prioIds.includes('offroad') && prioIds.includes('ahorro')) ||
      (prioIds.includes('deportividad') && prioIds.includes('ahorro')) ||
      (prioIds.includes('offroad') && prioIds.includes('comodidad') && state.budget < 50000);

    // Encontrar la prioridad con menor peso relativo o menor desempeño en el top 1
    const sortedByGap = [...topVehicle.factorScores].sort((a, b) => {
      const gapA = a.attrScore - a.weight;
      const gapB = b.attrScore - b.weight;
      if (gapA !== gapB) return gapA - gapB;
      return a.weight - b.weight;
    });

    const weakest = sortedByGap[0];
    const weakestMeta = PRIORITIES.find((p) => p.id === weakest.id);

    // Mostrar aviso cuando compatibilidad < 86%, hay par en tensión o el top 1 excede el presupuesto exacto
    if (topVehicle.compatibility < 86 || hasConflictPair || !topVehicle.inExactBudget || weakest.attrScore <= 6) {
      const lowestWeightEntry = [...selectedEntries].sort((a, b) => a[1] - b[1])[0];
      const suggestedToYield =
        weakest.attrScore <= 6
          ? weakestMeta
          : PRIORITIES.find((p) => p.id === lowestWeightEntry[0]);

      return {
        attributeName: suggestedToYield.label,
        message: `Con tu presupuesto de ${formatPEN(state.budget)} para un ${state.bodyType}, cumplir todas tus prioridades al máximo genera fricción en el mercado peruano. Te sugerimos ceder en "${suggestedToYield.label}" para desbloquear opciones con mayor compatibilidad real.`
      };
    }

    return null;
  }

  /* ------------------------------------------------------------------------
     11. Renderizado Pantalla de Resultados (HU-12, HU-13, HU-17, HU-31, HU-42)
     ------------------------------------------------------------------------ */
  function renderResults() {
    state.selectedCompare = [];
    updateCompareButton();

    const minRange = Math.round(state.budget * 0.85);
    const maxRange = Math.round(state.budget * 1.15);

    els.resultsRangeDesc.textContent = `Buscamos entre ${formatPEN(minRange)} y ${formatPEN(maxRange)} (±15% de flexibilidad) para equilibrar tus prioridades y el mercado peruano.`;

    const prioBadges = Object.keys(state.priorities)
      .map((id) => {
        const meta = PRIORITIES.find((p) => p.id === id);
        return `<span class="badge badge-dark-outline">${meta.label}</span>`;
      })
      .join('');

    els.resultsFilterBadges.innerHTML = `
      <span class="badge badge-mint">${state.bodyType}</span>
      <span class="badge badge-mint">${formatPEN(state.budget)}</span>
      ${prioBadges}
    `;

    // Estado vacío (HU-17)
    if (state.results.length === 0) {
      els.resultsEmpty.classList.remove('hidden');
      els.resultsContent.classList.add('hidden');
      els.emptyStateReason.textContent = `No encontramos modelos de tipo "${state.bodyType}" dentro del rango ${formatPEN(minRange)} – ${formatPEN(maxRange)}. Prueba subir tu presupuesto o elegir otra carrocería sin reiniciar todo tu proceso.`;
      return;
    }

    els.resultsEmpty.classList.add('hidden');
    els.resultsContent.classList.remove('hidden');

    const bodyMeta = BODY_TYPES.find((b) => b.id === state.bodyType);
    const carSvg = bodyMeta ? bodyMeta.svg : '';

    els.resultsGrid.innerHTML = state.results
      .map((v, index) => {
        const isHigh = v.compatibility >= 80;
        const badgeClass = isHigh ? 'badge-primary' : 'badge-medium';
        const barClass = isHigh ? 'high' : 'medium';
        const budgetPill = v.inExactBudget
          ? `<span class="budget-pill in-budget">Dentro de tu monto</span>`
          : `<span class="budget-pill flex-margin">En margen +15%</span>`;

        return `
         <div class="result-card-top has-photo">
              <span class="result-rank">0${index + 1}</span>
              <img
                src="../assets/images/${v.id}.jpg"
                alt="${v.brand} ${v.model} (${v.years})"
                class="result-car-photo"
                loading="lazy"
                onerror="this.classList.add('hidden'); this.parentElement.classList.remove('has-photo'); this.nextElementSibling.classList.remove('hidden');"
              >
              <div class="result-car-svg hidden">${carSvg}</div>
              <span class="badge ${badgeClass} result-compat-pos">${v.compatibility}% compatible</span>
            </div>

            <div class="result-card-body">
              <p class="result-years">${v.years}</p>
              <h4 class="result-title">${v.brand} ${v.model}</h4>

              <div class="result-price-row">
                <span class="result-price">${formatPEN(v.priceMin)} – ${formatPEN(v.priceMax)}</span>
                ${budgetPill}
              </div>

              <div class="compat-bar" aria-label="Nivel de compatibilidad ${v.compatibility}%">
                <div class="compat-bar-fill ${barClass}" style="width: ${v.compatibility}%;"></div>
              </div>

              <p class="result-desc">${v.summary}</p>

              <div class="result-actions">
                <button type="button" class="btn btn-secondary btn-full" data-open-detail="${v.id}">
                  Ver ficha completa <span aria-hidden="true">→</span>
                </button>
                <div class="result-secondary-row">
                  <label class="compare-label">
                    <input type="checkbox" data-compare-id="${v.id}">
                    <span>Comparar</span>
                  </label>
                  <button type="button" class="btn-copy-mini" data-copy-model="${v.brand} ${v.model} ${v.years}">
                    Copiar modelo
                  </button>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    // Aviso de atributo a ceder (HU-13)
    if (state.tensionInfo) {
      els.tensionAlert.classList.remove('hidden');
      els.tensionMessage.textContent = state.tensionInfo.message;
    } else {
      els.tensionAlert.classList.add('hidden');
    }

    // Bind botones de detalle
    els.resultsGrid.querySelectorAll('[data-open-detail]').forEach((btn) => {
      btn.addEventListener('click', () => {
        openVehicleDetail(btn.dataset.openDetail);
      });
    });

    // Bind copiar modelo (HU-39)
    els.resultsGrid.querySelectorAll('[data-copy-model]').forEach((btn) => {
      btn.addEventListener('click', () => {
        copyToClipboard(btn.dataset.copyModel);
      });
    });

    // Bind checkboxes comparador (HU-31)
    els.resultsGrid.querySelectorAll('[data-compare-id]').forEach((chk) => {
      chk.addEventListener('change', () => {
        const id = chk.dataset.compareId;
        if (chk.checked) {
          if (state.selectedCompare.length >= 2) {
            chk.checked = false;
            showToast('Solo puedes comparar 2 modelos a la vez.');
            return;
          }
          state.selectedCompare.push(id);
        } else {
          state.selectedCompare = state.selectedCompare.filter((item) => item !== id);
        }
        updateCompareButton();
      });
    });
  }

  function updateCompareButton() {
    els.compareCount.textContent = String(state.selectedCompare.length);
    els.btnOpenCompare.disabled = state.selectedCompare.length !== 2;
  }

  function openCompareModal() {
    if (state.selectedCompare.length !== 2) return;
    const v1 = state.results.find((v) => v.id === state.selectedCompare[0]);
    const v2 = state.results.find((v) => v.id === state.selectedCompare[1]);
    if (!v1 || !v2) return;

    els.compareModalBody.innerHTML = `
      <table class="compare-table">
        <thead>
          <tr>
            <th>Criterio</th>
            <th>${v1.brand} ${v1.model} (${v1.years})</th>
            <th>${v2.brand} ${v2.model} (${v2.years})</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Compatibilidad</th>
            <td><strong>${v1.compatibility}%</strong></td>
            <td><strong>${v2.compatibility}%</strong></td>
          </tr>
          <tr>
            <th>Rango estimado</th>
            <td>${formatPEN(v1.priceMin)} – ${formatPEN(v1.priceMax)}</td>
            <td>${formatPEN(v2.priceMin)} – ${formatPEN(v2.priceMax)}</td>
          </tr>
          <tr>
            <th>Motor</th>
            <td>${v1.specs.motor}</td>
            <td>${v2.specs.motor}</td>
          </tr>
          <tr>
            <th>Consumo estimado</th>
            <td>${v1.consumption.main}</td>
            <td>${v2.consumption.main}</td>
          </tr>
          <tr>
            <th>Transmisión</th>
            <td>${v1.specs.caja}</td>
            <td>${v2.specs.caja}</td>
          </tr>
          <tr>
            <th>Tracción</th>
            <td>${v1.specs.traccion}</td>
            <td>${v2.specs.traccion}</td>
          </tr>
          <tr>
            <th>Soporte en Perú</th>
            <td><strong>${v1.supportLevel}</strong></td>
            <td><strong>${v2.supportLevel}</strong></td>
          </tr>
          <tr>
            <th>Mantenimiento</th>
            <td>${v1.complexMaintenance ? 'Especializado' : 'Tradicional / Accesible'}</td>
            <td>${v2.complexMaintenance ? 'Especializado' : 'Tradicional / Accesible'}</td>
          </tr>
        </tbody>
      </table>
    `;

    openModal('modal-compare');
  }

  /* ------------------------------------------------------------------------
     12. Ficha de Detalle Técnica y Soporte en Perú
         (HU-15, HU-16, HU-23, HU-39, HU-42, HU-43, HU-44)
     ------------------------------------------------------------------------ */
  function openVehicleDetail(vehicleId, overrideObj = null) {
    const vehicle =
      overrideObj ||
      state.results.find((v) => v.id === vehicleId) ||
      VEHICLES.find((v) => v.id === vehicleId);

    if (!vehicle) return;

    state.activeVehicleId = vehicle.id;
    const compat = vehicle.compatibility || 90;
    const isTop = state.results.length > 0 && state.results[0].id === vehicle.id;

    els.detailEyebrow.textContent = isTop ? 'TU MEJOR COINCIDENCIA' : 'MODELO RECOMENDADO';
    els.detailModelName.textContent = `${vehicle.brand} ${vehicle.model}`;
    els.detailYears.textContent = vehicle.years;
    els.detailPriceBadge.textContent = `${formatPEN(vehicle.priceMin)} – ${formatPEN(vehicle.priceMax)}`;
    els.detailBodyBadge.textContent = vehicle.body;
    // Foto real del vehículo en la ficha (con ocultamiento limpio si aún no existe el archivo)
    const detailBanner = document.getElementById('detail-photo-banner');
    const detailImg = document.getElementById('detail-car-img');
    if (detailBanner && detailImg) {
      detailBanner.classList.remove('hidden');
      detailImg.alt = `${vehicle.brand} ${vehicle.model} (${vehicle.years})`;
      detailImg.onerror = () => detailBanner.classList.add('hidden');
      detailImg.src = `../assets/images/${vehicle.id}.jpg`;
    }
    els.btnCopyDetailModel.dataset.copyValue = `${vehicle.brand} ${vehicle.model} ${vehicle.years}`;

    // Anillo SVG de compatibilidad (HU-42)
    const radius = 48;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (compat / 100) * circumference;
    const strokeColor = compat >= 80 ? '#DFF1E9' : '#F4A261';

    els.detailCompatRing.innerHTML = `
      <svg width="116" height="116" viewBox="0 0 116 116" aria-hidden="true">
        <circle cx="58" cy="58" r="${radius}" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="8" />
        <circle
          cx="58" cy="58" r="${radius}"
          fill="none"
          stroke="${strokeColor}"
          stroke-width="8"
          stroke-linecap="round"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${offset}"
          transform="rotate(-90 58 58)"
        />
        <text x="58" y="55" text-anchor="middle" fill="#FFFFFF" font-size="24" font-weight="800">${compat}%</text>
        <text x="58" y="73" text-anchor="middle" fill="#DFF1E9" font-size="11" font-weight="600">compatible</text>
      </svg>
    `;

    // Consumo destacado (HU-44)
    if (vehicle.consumption && vehicle.consumption.main) {
      els.detailConsumptionMain.textContent = vehicle.consumption.main;
      els.detailConsumptionBreakdown.textContent = `Urbano: ${vehicle.consumption.urban} · Carretera: ${vehicle.consumption.highway} · Mixto: ${vehicle.consumption.mixed}`;
    } else {
      els.detailConsumptionMain.textContent = 'Consumo variable según estado del motor';
      els.detailConsumptionBreakdown.textContent = 'Dato referencial no registrado en el dataset local';
    }

    // Advertencia de mantenimiento especializado (HU-43)
    if (vehicle.complexMaintenance) {
      els.detailComplexWrap.classList.remove('hidden');
      els.detailComplexReason.textContent = vehicle.complexReason;
      els.detailComplexReason.classList.add('hidden');
      els.btnToggleComplexInfo.setAttribute('aria-expanded', 'false');
    } else {
      els.detailComplexWrap.classList.add('hidden');
    }

    // Ficha técnica (HU-15)
    const specRows = [
      ['Generación / Años', vehicle.years],
      ['Motor', vehicle.specs?.motor],
      ['Potencia', vehicle.specs?.potencia],
      ['Torque', vehicle.specs?.torque],
      ['Transmisión', vehicle.specs?.caja],
      ['Combustible', vehicle.specs?.combustible],
      ['Tracción', vehicle.specs?.traccion]
    ];

    els.detailSpecsList.innerHTML = specRows
      .map(
        ([label, val]) => `
        <div class="spec-row">
          <dt>${label}</dt>
          <dd>${val || 'Dato no disponible'}</dd>
        </div>
      `
      )
      .join('');

    // Factores que influyeron en el puntaje (HU-15 CA02)
    const factors = vehicle.topFactors && vehicle.topFactors.length > 0
      ? vehicle.topFactors
      : ['Compatibilidad general', `Carrocería ${vehicle.body}`];

    els.detailMatchFactors.innerHTML = factors
      .map((f) => `<span class="chip">${f}</span>`)
      .join('');

    // Soporte en Perú (HU-16 — siempre visible, incluso si es Bajo)
    els.detailSupportText.textContent = vehicle.supportText;
    els.detailSupportLevel.textContent = `Soporte en Perú: ${vehicle.supportLevel}`;
    els.detailSupportLevel.className = '';
    if (vehicle.supportLevel === 'Alto') {
      els.detailSupportLevel.classList.add('support-level-high');
    } else if (vehicle.supportLevel === 'Medio') {
      els.detailSupportLevel.classList.add('support-level-med');
    } else {
      els.detailSupportLevel.classList.add('support-level-low');
    }

    // Tip de compra
    els.detailTipTitle.textContent = vehicle.tipTitle;
    els.detailTipText.textContent = vehicle.tipText;

    // Mostrar/ocultar botón "Volver a resultados" si vino directo de guardado
    els.btnBackToResults.classList.toggle('hidden', state.results.length === 0);

    showView('detail', true);
  }

  /* ------------------------------------------------------------------------
     13. Modales y Accesibilidad (HU-30, HU-31, HU-40)
     ------------------------------------------------------------------------ */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeAllModals() {
    [els.modalCompare, els.modalReset, els.modalLegal].forEach((m) => {
      if (m) m.classList.add('hidden');
    });
  }

  /* ------------------------------------------------------------------------
     14. Eventos Globales
     ------------------------------------------------------------------------ */
  function bindEvents() {
    // Menú responsive móvil (HU-19)
    els.mobileMenuBtn.addEventListener('click', () => {
      const isOpen = els.mainNav.classList.toggle('is-open');
      els.mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        els.mainNav.classList.remove('is-open');
        els.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Botones de inicio del diagnóstico sin duplicar estado (HU-21)
    [els.btnStartHero, els.btnStartSecondary].forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (state.isNavigating) return;
        state.isNavigating = true;
        if (state.step !== 1 && state.step !== 2 && state.step !== 3) {
          showView(1, true);
        } else {
          els.wizardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setTimeout(() => {
          state.isNavigating = false;
        }, 400);
      });
    });

    // Abrir resultado guardado en localStorage (HU-23)
    els.btnOpenSaved.addEventListener('click', () => {
      try {
        const raw = localStorage.getItem(STORAGE_SAVED_KEY);
        if (!raw) return;
        const savedObj = JSON.parse(raw);
        els.mainNav.classList.remove('is-open');
        openVehicleDetail(savedObj.id, savedObj);
      } catch {
        showToast('No se pudo recuperar el resultado guardado.');
      }
    });

    // Paso 1 -> Paso 2 (HU-01, HU-05)
    els.btnStep1Next.addEventListener('click', () => {
      if (!state.bodyType) {
        els.step1Error.textContent = 'Debes seleccionar un tipo de carrocería para continuar.';
        return;
      }
      els.step1Error.textContent = '';
      renderPriorityOptions();
      showView(2, true);
    });

    // Paso 2 -> Volver / Paso 3 (HU-04, HU-07, HU-08, HU-09)
    els.btnStep2Back.addEventListener('click', () => {
      els.step2Error.textContent = '';
      renderBodyOptions();
      showView(1, true);
    });

    els.btnStep2Next.addEventListener('click', () => {
      if (Object.keys(state.priorities).length < 1) {
        els.step2Error.textContent = 'Debes elegir al menos 1 prioridad para continuar.';
        return;
      }
      els.step2Error.textContent = '';
      syncBudgetUI(state.budget);
      showView(3, true);
    });

    // Paso 3: Presupuesto (HU-10, HU-18)
    els.budgetSlider.addEventListener('input', (e) => {
      state.budget = Number(e.target.value);
      els.step3Error.textContent = '';
      syncBudgetUI(state.budget);
      saveProgress();
    });

    els.budgetNumber.addEventListener('input', (e) => {
      const val = Number(e.target.value);
      state.budget = val;
      els.step3Error.textContent = '';
      if (!isNaN(val) && val >= 5000) {
        els.budgetSlider.value = Math.min(80000, Math.max(5000, val));
        const minRange = Math.round(val * 0.85);
        const maxRange = Math.round(val * 1.15);
        els.marginPreviewText.textContent = `Evaluaremos opciones con hasta 15% de flexibilidad (${formatPEN(minRange)} – ${formatPEN(maxRange)}) para no dejar fuera una buena oportunidad.`;
        saveProgress();
      }
    });

    els.btnStep3Back.addEventListener('click', () => {
      els.step3Error.textContent = '';
      renderPriorityOptions();
      showView(2, true);
    });

    // Calcular diagnóstico con estado de carga (HU-10, HU-11, HU-26)
    els.btnCalculate.addEventListener('click', () => {
      const amount = Number(els.budgetNumber.value);
      if (!els.budgetNumber.value || isNaN(amount) || amount < 5000) {
        els.step3Error.textContent = 'Error, ingresa un presupuesto válido (mínimo S/ 5,000).';
        els.budgetNumber.focus();
        return;
      }
      state.budget = amount;
      els.step3Error.textContent = '';
      showView('loading', true);

      setTimeout(() => {
        calculateDiagnosis();
        renderResults();
        showView('results', true);
      }, 650);
    });

    // Reajuste desde resultados y estado vacío (HU-14, HU-17)
    els.btnEditSearch.addEventListener('click', () => {
      renderPriorityOptions();
      showView(2, true);
    });

    els.btnAdjustPriorities.addEventListener('click', () => {
      renderPriorityOptions();
      showView(2, true);
    });

    els.btnEmptyBudget.addEventListener('click', () => {
      syncBudgetUI(state.budget);
      showView(3, true);
    });

    els.btnEmptyBody.addEventListener('click', () => {
      renderBodyOptions();
      showView(1, true);
    });

    // Comparador (HU-31)
    els.btnOpenCompare.addEventListener('click', openCompareModal);

    // Ficha de detalle: volver, copiar, alerta mantenimiento, guardar y reiniciar
    els.btnBackToResults.addEventListener('click', () => {
      showView('results', true);
    });

    els.btnCopyDetailModel.addEventListener('click', () => {
      const text = els.btnCopyDetailModel.dataset.copyValue || els.detailModelName.textContent;
      copyToClipboard(text);
    });

    els.btnToggleComplexInfo.addEventListener('click', () => {
      const isHidden = els.detailComplexReason.classList.toggle('hidden');
      els.btnToggleComplexInfo.setAttribute('aria-expanded', String(!isHidden));
    });

    els.btnSaveResult.addEventListener('click', () => {
      const vehicle =
        state.results.find((v) => v.id === state.activeVehicleId) ||
        VEHICLES.find((v) => v.id === state.activeVehicleId);
      if (!vehicle) return;
      try {
        localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(vehicle));
        refreshSavedButton();
        showToast('Resultado guardado en este navegador.');
      } catch {
        showToast('No se pudo guardar en el almacenamiento local.');
      }
    });

    // Reinicio completo con modal de confirmación (HU-40)
    [els.btnResetWizard, els.btnDetailRestart].forEach((btn) => {
      btn.addEventListener('click', () => openModal('modal-reset'));
    });

    els.btnConfirmReset.addEventListener('click', () => {
      state.bodyType = null;
      state.priorities = {};
      state.budget = 35000;
      state.results = [];
      state.selectedCompare = [];
      state.activeVehicleId = null;
      state.tensionInfo = null;
      clearProgress();
      els.step1Error.textContent = '';
      els.step2Error.textContent = '';
      els.step3Error.textContent = '';
      renderBodyOptions();
      renderPriorityOptions();
      syncBudgetUI(state.budget);
      closeAllModals();
      showView(1, true);
      showToast('Diagnóstico reiniciado.');
    });

    // Acordeón FAQ excluyente (HU-41)
    els.faqList.querySelectorAll('.faq-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        els.faqList.querySelectorAll('.faq-trigger').forEach((other) => {
          other.setAttribute('aria-expanded', 'false');
          const panel = other.nextElementSibling;
          if (panel) panel.hidden = true;
        });
        if (!isExpanded) {
          trigger.setAttribute('aria-expanded', 'true');
          const panel = trigger.nextElementSibling;
          if (panel) panel.hidden = false;
        }
      });
    });

    // Formulario de Contacto con validación (HU-20)
    els.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = els.contactName.value.trim();
      const email = els.contactEmail.value.trim();
      const msg = els.contactMessage.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      els.contactError.textContent = '';
      els.contactSuccess.classList.add('hidden');

      if (!name || !email || !msg) {
        els.contactError.textContent = 'Completa todos los campos obligatorios antes de enviar.';
        return;
      }
      if (!emailRegex.test(email)) {
        els.contactError.textContent = 'Ingresa un correo electrónico con formato válido.';
        els.contactEmail.focus();
        return;
      }

      els.contactSuccess.textContent = `¡Gracias, ${name}! Tu consulta fue registrada correctamente.`;
      els.contactSuccess.classList.remove('hidden');
      els.contactForm.reset();
    });

    // Modales legales del footer
    document.querySelectorAll('[data-legal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.legal;
        if (type === 'terminos') {
          els.legalModalTitle.textContent = 'Términos y Condiciones';
          els.legalModalBody.innerHTML =
            '<p>V-TEC es una herramienta informativa de pre-selección vehicular desarrollada por Taggle Inc. con fines académicos. No comercializamos vehículos, no actuamos como intermediarios financieros ni cobramos comisiones por compra o venta.</p>';
        } else {
          els.legalModalTitle.textContent = 'Aviso de Privacidad';
          els.legalModalBody.innerHTML =
            '<p>V-TEC no solicita datos bancarios ni almacena información personal en servidores externos. El progreso y resultados guardados permanecen exclusivamente en el almacenamiento local (localStorage) de tu propio navegador.</p>';
        }
        openModal('modal-legal');
      });
    });

    // Cierre de modales por botón, clic fuera o tecla Escape (HU-30)
    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', closeAllModals);
    });

    [els.modalCompare, els.modalReset, els.modalLegal].forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeAllModals();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });
  }

  /* ------------------------------------------------------------------------
     15. Inicialización
     ------------------------------------------------------------------------ */
  function init() {
    restoreProgress();
    renderBodyOptions();
    renderPriorityOptions();
    syncBudgetUI(state.budget);
    refreshSavedButton();
    bindEvents();
    showView(state.step, false);
  }

  document.addEventListener('DOMContentLoaded', init);
})();