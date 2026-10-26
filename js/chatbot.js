/**
 * ============================================================
 * ARIA · STUDIO DRAWER — Portafolio sacijim (portfolio_a)
 * Panel Lateral Editorial de Altura Completa + Busto SVG Animado +
 * Modo Thinking estilo Claude + Cero Paréntesis
 * ============================================================
 */
(function () {
  'use strict';

  const AZURE_API_BASE_URL = window.CHATBOT_API_URL || 'https://ai.aurx.pro';
  const PORTFOLIO_ID = 'portfolio_a';
  const DEVICE_STORAGE_KEY = 'chatbot_device_id';

  let portfolioData = null;
  let chunksIndex = [];
  let isOpen = false;
  let isPending = false;
  let lastDetectedWeek = null;
  const responseCache = new Map();

  // Ilustración vectorial de busto completo para Aria (exclusiva de sacijim)
  const ARIA_BUST_SVG = `
    <svg class="aria-bust-svg" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="ariaAura" x1="10" y1="6" x2="78" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#f5d0fe"/>
          <stop offset="50%" stop-color="#c084fc"/>
          <stop offset="100%" stop-color="#f472b6"/>
        </linearGradient>
        <linearGradient id="ariaFace" x1="26" y1="22" x2="62" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#231138"/>
          <stop offset="100%" stop-color="#140922"/>
        </linearGradient>
        <linearGradient id="ariaBody" x1="22" y1="60" x2="66" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#a855f7"/>
          <stop offset="100%" stop-color="#ec4899"/>
        </linearGradient>
      </defs>
      <!-- Halo orbital exterior -->
      <circle class="aria-svg-orbit" cx="44" cy="44" r="40" stroke="url(#ariaAura)" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.55"/>
      <!-- Hombros / cuello editorial -->
      <path d="M22 79C24 66 33 61 44 61C55 61 64 66 66 79" fill="url(#ariaBody)" opacity="0.28"/>
      <path d="M25 78C27 67 34.5 62.5 44 62.5C53.5 62.5 61 67 63 78" stroke="url(#ariaAura)" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="44" cy="68" r="3" fill="#f5d0fe"/>
      <!-- Aletas auriculares laterales -->
      <path d="M19 34L12 28V46L19 42Z" fill="#e879f9" opacity="0.85"/>
      <path d="M69 34L76 28V46L69 42Z" fill="#e879f9" opacity="0.85"/>
      <!-- Corona / diadema superior -->
      <path d="M27 24C31 15 57 15 61 24" stroke="#f5d0fe" stroke-width="2" stroke-linecap="round"/>
      <circle class="aria-svg-gem" cx="44" cy="14" r="3.2" fill="#f472b6"/>
      <!-- Cabeza y visor -->
      <rect x="21" y="20" width="46" height="37" rx="18.5" fill="url(#ariaFace)" stroke="url(#ariaAura)" stroke-width="2"/>
      <!-- Visor interior luminoso -->
      <rect x="26.5" y="27" width="35" height="19" rx="9.5" fill="#12071f" stroke="#d8b4fe" stroke-width="1.1" opacity="0.95"/>
      <!-- Ojos expresivos -->
      <g class="aria-svg-eyes">
        <ellipse cx="36.5" cy="36.5" rx="3.4" ry="4" fill="#f5d0fe"/>
        <ellipse cx="51.5" cy="36.5" rx="3.4" ry="4" fill="#f5d0fe"/>
        <circle cx="37.6" cy="35.2" r="1.2" fill="#ffffff"/>
        <circle cx="52.6" cy="35.2" r="1.2" fill="#ffffff"/>
      </g>
      <!-- Rubor y sonrisa suave -->
      <ellipse cx="31" cy="41.5" rx="2.5" ry="1.2" fill="#f472b6" opacity="0.55"/>
      <ellipse cx="57" cy="41.5" rx="2.5" ry="1.2" fill="#f472b6" opacity="0.55"/>
      <path d="M39.5 50.2C41.5 52.2 46.5 52.2 48.5 50.2" stroke="#f472b6" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `;

  const THINKING_SPARK_SVG = `
    <svg class="saci-think-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 2L12.1 7.9L18 10L12.1 12.1L10 18L7.9 12.1L2 10L7.9 7.9L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>
  `;

  const CHEVRON_SVG = `
    <svg class="saci-think-chevron" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4.5 6.2L8 9.8L11.5 6.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const ACTION_ARROW_SVG = `
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const PHASE_LABELS = {
    INTENT: 'Comprensión',
    RETRIEVAL: 'Búsqueda en portafolio',
    SYNTHESIS: 'Redacción pedagógica',
    COMMAND: 'Acción vinculada'
  };

  function getOrCreateDeviceId() {
    try {
      const existing = window.localStorage.getItem(DEVICE_STORAGE_KEY);
      if (existing && /^[a-zA-Z0-9_-]{8,128}$/.test(existing.trim())) {
        return existing.trim();
      }
      const uuid =
        typeof window.crypto !== 'undefined' && typeof window.crypto.randomUUID === 'function'
          ? window.crypto.randomUUID()
          : 'dev-' + Date.now() + '-' + Math.random().toString(36).slice(2, 12);
      window.localStorage.setItem(DEVICE_STORAGE_KEY, uuid);
      return uuid;
    } catch (_) {
      return 'dev-fallback-' + Date.now();
    }
  }

  const deviceId = getOrCreateDeviceId();

  function normalize(str) {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9_.+\-\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function stripParentheses(str) {
    return String(str || '')
      .replace(/\(\s*\)/g, '')
      .replace(/\bO\(\s*1\s*\)/gi, 'orden constante')
      .replace(/\bO\(\s*n\s*\)/gi, 'orden lineal')
      .replace(/\bO\(\s*n\s*(?:\^2|²|2)\s*\)/gi, 'orden cuadrático')
      .replace(/\bO\(\s*n\s*log\s*n\s*\)/gi, 'orden log-lineal')
      .replace(/\s*\(([^()]+)\)/g, ' · $1')
      .replace(/[()]/g, '')
      .replace(/\s+·\s+·\s+/g, ' · ')
      .replace(/[ \t]{2,}/g, ' ')
      .trim();
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatInlineMarkdown(line) {
    return escapeHtml(stripParentheses(line))
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function renderChatRichText(md) {
    const cleaned = String(md || '')
      .split('\n')
      .map(l => stripParentheses(l))
      .join('\n')
      .trim();

    if (!cleaned) return '';

    const lines = cleaned.split('\n');
    const blocks = [];
    let listItems = [];

    function flushList() {
      if (listItems.length > 0) {
        blocks.push('<ul class="saci-msg-list">' + listItems.join('') + '</ul>');
        listItems = [];
      }
    }

    lines.forEach(rawLine => {
      const line = rawLine.trim();
      if (!line) {
        flushList();
        return;
      }

      if (/^(?:[-*•]|\d+\.)\s+/.test(line)) {
        const content = line.replace(/^(?:[-*•]|\d+\.)\s+/, '');
        listItems.push('<li>' + formatInlineMarkdown(content) + '</li>');
        return;
      }

      flushList();

      if (/^#{1,3}\s+/.test(line)) {
        const headingText = line.replace(/^#{1,3}\s+/, '');
        blocks.push('<h4 class="saci-msg-heading">' + formatInlineMarkdown(headingText) + '</h4>');
        return;
      }

      blocks.push('<p class="saci-msg-p">' + formatInlineMarkdown(line) + '</p>');
    });

    flushList();
    return blocks.join('');
  }

  function emptyCommand() {
    return {
      action: 'NONE',
      description: '',
      autoExecute: false,
      params: {
        page: '',
        unitId: '',
        weekId: '',
        exerciseId: '',
        imageUrl: '',
        imageTitle: '',
        galleryId: '',
        galleryIndex: 0,
        resourceUrl: ''
      }
    };
  }

  function buildModularChunks(data) {
    const chunks = [];
    if (!data || !data.cursos) return chunks;

    Object.entries(data.cursos).forEach(([courseKey, course]) => {
      const page = course.pagina || (courseKey === 'algoritmos' ? 'algoritmos.html' : 'taller.html');
      (course.unidades || []).forEach(u => {
        (u.semanas || []).forEach(s => {
          const baseUrl = s.baseUrl || '';
          const exercisesMap = {};
          let firstImgSrc = '';

          (s.ejercicios || []).forEach((ej, idx) => {
            const ejNum = idx + 1;
            const code = ej.numero || `0${ejNum}`;
            const ejId = ej.id || `${s.id}-ej-${ejNum}`;
            const firstImg = (ej.imagenes && ej.imagenes[0])
              ? (ej.imagenes[0].src || (baseUrl + ej.imagenes[0].archivo))
              : (baseUrl && ej.metodos && ej.metodos.length ? `${baseUrl}${code}-M1.png` : '');
            if (!firstImgSrc && firstImg) firstImgSrc = firstImg;

            exercisesMap[ejNum] = {
              num: ejNum,
              id: ejId,
              titulo: stripParentheses(ej.titulo || `Ejercicio 0${ejNum}`),
              subtitulo: stripParentheses(ej.tema || ej.subtitulo || ''),
              explicacion: stripParentheses(ej.explicacion || ''),
              metodos: (ej.metodos || []).map(m => stripParentheses(m)),
              imgSrc: firstImg,
              imgTitle: stripParentheses(`${s.titulo} · ${ej.titulo || 'Ejercicio ' + code}`)
            };
          });

          (s.items || []).forEach((it, idx) => {
            const ejNum = idx + 1;
            const imgSrc = it.url || (baseUrl + (it.archivo || ''));
            if (!firstImgSrc && imgSrc) firstImgSrc = imgSrc;
            if (!exercisesMap[ejNum]) {
              exercisesMap[ejNum] = {
                num: ejNum,
                id: s.id,
                titulo: stripParentheses(it.titulo || `Ejercicio 0${ejNum}`),
                subtitulo: stripParentheses(it.subtitulo || ''),
                explicacion: stripParentheses(it.explicacion || ''),
                metodos: [],
                imgSrc,
                imgTitle: stripParentheses(`${s.titulo} · ${it.titulo || 'Captura'}`)
              };
            }
          });

          let firstDownloadUrl = '';
          let externalUrl = '';
          (s.archivos || []).forEach(arc => {
            const href = arc.descargarUrl || arc.url || '';
            if (href && !firstDownloadUrl) firstDownloadUrl = href;
            if (arc.verUrl && !externalUrl) externalUrl = arc.verUrl;
          });
          (s.recursos || []).forEach(rec => {
            const href = rec.url || (baseUrl + (rec.archivo || ''));
            if (rec.tipo === 'descarga' && !firstDownloadUrl) firstDownloadUrl = href;
            if (rec.tipo === 'enlace' && !externalUrl) externalUrl = href;
          });

          chunks.push({
            chunkId: `portfolio_a:${courseKey}:week_${s.numero}`,
            courseKey,
            courseName: stripParentheses(course.nombre || courseKey),
            page,
            unitId: u.id,
            unitTitle: stripParentheses(u.titulo),
            weekId: s.id,
            num: s.numero,
            titulo: stripParentheses(s.titulo),
            tema: stripParentheses(s.tema),
            resumen: stripParentheses(s.resumenChatbot || s.descripcion || ''),
            explicacion: stripParentheses(s.explicacionTecnica || s.resumenChatbot || s.descripcion || ''),
            firstImgSrc,
            firstDownloadUrl,
            externalUrl,
            exercisesMap
          });
        });
      });
    });

    return chunks;
  }

  function executeDomCommand(cmd) {
    if (!cmd || !cmd.action || cmd.action === 'NONE') return;
    const p = cmd.params || {};

    if (cmd.action === 'OPEN_VISUAL_VIEWER') {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      if (p.page && currentPage !== p.page && !(currentPage === '' && p.page === 'index.html')) {
        if (typeof window.navigateToPortfolioTarget === 'function') {
          window.navigateToPortfolioTarget({
            page: p.page,
            unitId: p.unitId,
            weekId: p.weekId,
            exerciseId: p.exerciseId,
            openLightboxSrc: p.imageUrl,
            openLightboxTitle: p.imageTitle
          });
          return;
        }
      }
      if (typeof window.navigateToPortfolioTarget === 'function' && (p.weekId || p.exerciseId)) {
        window.navigateToPortfolioTarget({
          page: p.page,
          unitId: p.unitId,
          weekId: p.weekId,
          exerciseId: p.exerciseId
        });
      }
      if (p.imageUrl && typeof window.openPortfolioLightbox === 'function') {
        setTimeout(() => {
          window.openPortfolioLightbox(p.imageUrl, p.imageTitle || cmd.description || 'Vista previa');
        }, 220);
      }
      return;
    }

    if (cmd.action === 'NAVIGATE_WEEK') {
      if (typeof window.navigateToPortfolioTarget === 'function') {
        window.navigateToPortfolioTarget({
          page: p.page || 'algoritmos.html',
          unitId: p.unitId,
          weekId: p.weekId,
          exerciseId: p.exerciseId
        });
      } else if (p.page) {
        window.location.href = p.page;
      }
      return;
    }

    if (cmd.action === 'DOWNLOAD_RESOURCE' && p.resourceUrl) {
      const a = document.createElement('a');
      a.href = p.resourceUrl;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }

    if (cmd.action === 'OPEN_EXTERNAL_URL' && p.resourceUrl) {
      window.open(p.resourceUrl, '_blank', 'noopener,noreferrer');
    }
  }

  function evaluateModularQuery(rawText) {
    const q = normalize(rawText);
    const cacheKey = `${lastDetectedWeek || 0}:${q}`;
    if (responseCache.has(cacheKey)) {
      return responseCache.get(cacheKey);
    }

    const est = (portfolioData && portfolioData.estudiante) || {};
    const tech = (portfolioData && portfolioData.conocimientoTecnico) || {};

    const wantsVisual = /\b(ver captura|abrir captura|abre la captura|abrir la captura|abre captura|mostrar captura|muestrame la captura|ver imagen|abrir imagen|lightbox)\b/.test(q);
    const wantsNav = /\b(ir a|llevame a|ubicar|navegar|abrir semana)\b/.test(q);
    const wantsDownload = /\b(descargar|bajar|descarga|\.rar|\.java|\.zip)\b/.test(q);
    const autoExec = wantsVisual || wantsNav || wantsDownload;

    const wMatch = q.match(/\b(?:semana|sem|s)\s*0?([1-9]|1[0-6])\b/);
    const eMatch = q.match(/\b(?:ejercicio|ej|actividad|act)\s*0?([1-5])\b/);
    let weekNum = wMatch ? parseInt(wMatch[1], 10) : null;
    let ejNum = eMatch ? parseInt(eMatch[1], 10) : null;

    if (weekNum === null) {
      if (/\b(arbol|arboles|abb|arbolexpedientes|analizadorcarpetas|inventario|busquedabinaria|inorden)\b/.test(q)) {
        weekNum = 8;
      } else if (/\b(colaalumno|invertircola)\b/.test(q)) { weekNum = 7; ejNum = ejNum || 1; }
      else if (/\b(colaatencion|atendersiguiente)\b/.test(q)) { weekNum = 7; ejNum = ejNum || 2; }
      else if (/\b(colapedidos|cancelarpedido)\b/.test(q)) { weekNum = 7; ejNum = ejNum || 3; }
      else if (/\b(cola|colas|fifo)\b/.test(q)) { weekNum = 7; }
      else if (/\b(pila|pilas|lifo|push|pop|postfija)\b/.test(q)) { weekNum = 6; }
      else if (/\b(arraylist)\b/.test(q)) { weekNum = 5; }
      else if (/\b(objetos|matrizbidimensional)\b/.test(q)) { weekNum = 4; }
      else if (/\b(paralelos|arreglounidimensional)\b/.test(q)) { weekNum = 3; }
      else if (/\b(burbuja|seleccion|insercion|ordenamiento)\b/.test(q)) { weekNum = 2; }
      else if (/\b(recursividad|hanoi|mcd|euclides)\b/.test(q)) { weekNum = 1; }
      else if (ejNum !== null && lastDetectedWeek !== null) {
        weekNum = lastDetectedWeek;
      }
    }

    if (weekNum === 8 && ejNum === null) {
      if (/\b(analizadorcarpetas|archivoinfo|directorios|carpetas)\b/.test(q)) ejNum = 1;
      else if (/\b(inventario|producto|busquedabinaria|existencias)\b/.test(q)) ejNum = 2;
      else if (/\b(arbolexpedientes|expediente|inorden|abb|altura)\b/.test(q)) ejNum = 3;
    }

    const isTaller = /\b(taller|figma|prototipo|maven|pom|tekora|azure|sql|diagrama)\b/.test(q);
    if (isTaller && weekNum === null) {
      if (/\b(azure|sql|diagrama|conceptual|relacional)\b/.test(q)) weekNum = 5;
      else if (/\b(tekora)\b/.test(q)) weekNum = 4;
      else if (/\b(maven|pom)\b/.test(q)) weekNum = 2;
      else if (/\b(figma|prototipo)\b/.test(q)) weekNum = 1;
    }

    if (weekNum !== null) {
      lastDetectedWeek = weekNum;
      const targetCourse = isTaller ? 'taller' : 'algoritmos';
      const chunk =
        chunksIndex.find(c => c.courseKey === targetCourse && c.num === weekNum) ||
        chunksIndex.find(c => c.num === weekNum);

      if (chunk) {
        if (ejNum !== null && chunk.exercisesMap[ejNum]) {
          const ej = chunk.exercisesMap[ejNum];
          const cmd = {
            action: ej.imgSrc ? 'OPEN_VISUAL_VIEWER' : 'NAVIGATE_WEEK',
            description: ej.imgSrc ? `Ver captura de ${ej.titulo}` : `Ir a ${ej.titulo}`,
            autoExecute: autoExec,
            params: {
              page: chunk.page,
              unitId: chunk.unitId,
              weekId: chunk.weekId,
              exerciseId: ej.id,
              imageUrl: ej.imgSrc,
              imageTitle: ej.imgTitle,
              galleryId: chunk.weekId,
              galleryIndex: ejNum - 1,
              resourceUrl: ej.imgSrc
            }
          };

          const methodsLine = ej.metodos.length
            ? `\n- **Métodos implementados:** \`${ej.metodos.slice(0, 8).join('`, `')}\`.`
            : '';

          const result = {
            thinking: [
              { step: 1, phase: 'INTENT', detail: `Identificada consulta puntual sobre ${chunk.titulo} · ${ej.titulo}` },
              { step: 2, phase: 'RETRIEVAL', detail: `Recuperado módulo ${chunk.chunkId} desde el índice modular` },
              { step: 3, phase: 'SYNTHESIS', detail: `Estructurada explicación técnica de ${ej.subtitulo || ej.titulo}` },
              { step: 4, phase: 'COMMAND', detail: `Preparada acción interactiva sobre ${ej.id}` }
            ],
            message: `### ${chunk.titulo} · ${ej.titulo}\n\n${ej.explicacion}\n\n- **Enfoque técnico:** ${ej.subtitulo || chunk.tema}.${methodsLine}`,
            command: cmd,
            suggested_actions: [
              { label: `Resumen de ${chunk.titulo}`, type: 'prompt', target: `Semana ${chunk.num}` }
            ]
          };
          responseCache.set(cacheKey, result);
          return result;
        }

        const cmd = {
          action: wantsVisual && chunk.firstImgSrc
            ? 'OPEN_VISUAL_VIEWER'
            : wantsDownload && chunk.firstDownloadUrl
            ? 'DOWNLOAD_RESOURCE'
            : chunk.externalUrl && isTaller
            ? 'OPEN_EXTERNAL_URL'
            : 'NAVIGATE_WEEK',
          description: wantsVisual && chunk.firstImgSrc
            ? `Ver captura de ${chunk.titulo}`
            : chunk.externalUrl && isTaller
            ? 'Abrir prototipo en Figma'
            : `Ir a la sección ${chunk.titulo}`,
          autoExecute: autoExec,
          params: {
            page: chunk.page,
            unitId: chunk.unitId,
            weekId: chunk.weekId,
            exerciseId: '',
            imageUrl: chunk.firstImgSrc,
            imageTitle: `${chunk.titulo} · ${chunk.tema}`,
            galleryId: chunk.weekId,
            galleryIndex: 0,
            resourceUrl: chunk.externalUrl || chunk.firstDownloadUrl || chunk.page
          }
        };

        const ejBullets = Object.values(chunk.exercisesMap)
          .map(e => `- **${e.titulo} · ${e.subtitulo}:** ${e.explicacion}`)
          .join('\n');

        const result = {
          thinking: [
            { step: 1, phase: 'INTENT', detail: `Analizando consulta sobre ${chunk.titulo} · ${chunk.tema}` },
            { step: 2, phase: 'RETRIEVAL', detail: `Seleccionado fragmento ${chunk.chunkId}` },
            { step: 3, phase: 'SYNTHESIS', detail: `Organizando síntesis académica y lista de actividades` },
            { step: 4, phase: 'COMMAND', detail: `Vinculando navegación hacia ${chunk.weekId}` }
          ],
          message: `### ${chunk.titulo} · ${chunk.tema}\n\n${chunk.explicacion}\n\n${ejBullets}`,
          command: cmd,
          suggested_actions: chunk.exercisesMap[1]
            ? [{ label: `Ver Ejercicio 1 de ${chunk.titulo}`, type: 'prompt', target: `Semana ${chunk.num} Ejercicio 1` }]
            : []
        };
        responseCache.set(cacheKey, result);
        return result;
      }
    }

    if (/\b(complejidad|big o|notacion|tiempo)\b/.test(q)) {
      const c = tech.complejidades || {};
      return {
        thinking: [
          { step: 1, phase: 'INTENT', detail: 'Analizando consulta sobre eficiencia y complejidad algorítmica' },
          { step: 2, phase: 'RETRIEVAL', detail: 'Recuperado módulo transversal portfolio_a:technical' },
          { step: 3, phase: 'SYNTHESIS', detail: 'Comparando costos temporales de cada entrega del curso' }
        ],
        message:
          `### Eficiencia algorítmica en las entregas\n\n` +
          `- **Recursividad en Semana 1:** ${stripParentheses(c.recursividad || 'Complejidad lineal y logarítmica según el caso base')}\n` +
          `- **Ordenamiento en Semana 2:** ${stripParentheses(c.ordenamiento || 'Comparación cuadrática en Burbuja, Selección e Inserción')}\n` +
          `- **Arreglos y ArrayList en Semanas 3 a 5:** Acceso directo en orden constante y búsquedas secuenciales en orden lineal.\n` +
          `- **Pilas y Colas en Semanas 6 y 7:** Inserción y extracción en orden constante mediante punteros o aritmética modular.`,
        command: emptyCommand(),
        suggested_actions: [{ label: 'Explorar Semana 7 · Colas', type: 'prompt', target: 'Semana 7' }]
      };
    }

    return {
      thinking: [
        { step: 1, phase: 'INTENT', detail: 'Interpretando consulta general de orientación en el portafolio' },
        { step: 2, phase: 'RETRIEVAL', detail: 'Cargado índice general de entregas portfolio_a:index' }
      ],
      message:
        `Hola, soy **Aria**, tu compañera de estudio en el portafolio de Maricielo. Puedo explicarte paso a paso cómo funciona cualquier algoritmo o abrir directamente sus capturas.\n\n` +
        `- **Algoritmos:** Semanas 1 a 7 desde recursividad hasta pilas y colas dinámicas.\n` +
        `- **Taller VII:** Configuración de dependencias con Maven y prototipos en Figma.`,
      command: emptyCommand(),
      suggested_actions: [
        { label: 'Semana 7 · Colas en Java', type: 'prompt', target: 'Explicame la semana 7 de colas' },
        { label: 'Ver captura ColaPedidos', type: 'prompt', target: 'Abre la captura del ejercicio 3 de la semana 7' }
      ]
    };
  }

  async function hydrateFromAzure(renderTurnFn) {
    const baseUrl = AZURE_API_BASE_URL.replace(/\/+$/, '');
    if (!baseUrl) return;
    try {
      const url = `${baseUrl}/api/chat/history?portfolioId=${encodeURIComponent(PORTFOLIO_ID)}&deviceId=${encodeURIComponent(deviceId)}`;
      const res = await fetch(url, { method: 'GET', headers: { Accept: 'application/json' } });
      if (!res.ok) return;
      const data = await res.json();
      if (data && Array.isArray(data.turns) && data.turns.length > 0) {
        data.turns.forEach(turn => {
          renderTurnFn(
            turn.role === 'user' ? 'user' : 'bot',
            turn.message,
            turn.thinking || [],
            turn.command || emptyCommand(),
            turn.suggested_actions || [],
            false,
            1.4
          );
        });
      }
    } catch (_) {}
  }

  async function requestChatTurn(userText) {
    const baseUrl = AZURE_API_BASE_URL.replace(/\/+$/, '');
    if (baseUrl) {
      try {
        const res = await fetch(`${baseUrl}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            portfolioId: PORTFOLIO_ID,
            deviceId,
            message: userText
          })
        });
        if (res.ok) {
          const payload = await res.json();
          if (payload && typeof payload.message === 'string') {
            return {
              thinking: Array.isArray(payload.thinking) ? payload.thinking : [],
              message: payload.message,
              command: payload.command || emptyCommand(),
              suggested_actions: Array.isArray(payload.suggested_actions) ? payload.suggested_actions : []
            };
          }
        }
      } catch (_) {}
    }
    return evaluateModularQuery(userText);
  }

  function createThinkingAccordion(thinkingSteps, elapsedSec, isLive) {
    const wrapper = document.createElement('div');
    wrapper.className = 'saci-think' + (isLive ? ' is-live is-expanded' : '');

    const headerBtn = document.createElement('button');
    headerBtn.type = 'button';
    headerBtn.className = 'saci-think__header';
    headerBtn.setAttribute('aria-expanded', isLive ? 'true' : 'false');

    const left = document.createElement('span');
    left.className = 'saci-think__title-wrap';
    left.innerHTML =
      THINKING_SPARK_SVG +
      `<span class="saci-think__label">${
        isLive
          ? 'Aria está pensando...'
          : `Pensó durante ${Number(elapsedSec || 1.2).toFixed(1)} s · ${thinkingSteps.length} pasos`
      }</span>`;

    const right = document.createElement('span');
    right.className = 'saci-think__toggle-meta';
    right.innerHTML = `<span class="saci-think__toggle-text">${isLive ? 'Ocultar' : 'Mostrar pasos'}</span>` + CHEVRON_SVG;

    headerBtn.appendChild(left);
    headerBtn.appendChild(right);

    const body = document.createElement('div');
    body.className = 'saci-think__body';

    const list = document.createElement('ol');
    list.className = 'saci-think__steps';

    thinkingSteps.forEach(t => {
      const li = document.createElement('li');
      li.className = 'saci-think__step';
      const phaseName = PHASE_LABELS[t.phase] || stripParentheses(t.phase || 'Paso');
      li.innerHTML =
        `<span class="saci-think__badge">${escapeHtml(phaseName)}</span>` +
        `<span class="saci-think__detail">${escapeHtml(stripParentheses(t.detail))}</span>`;
      list.appendChild(li);
    });

    body.appendChild(list);
    wrapper.appendChild(headerBtn);
    wrapper.appendChild(body);

    headerBtn.addEventListener('click', () => {
      const expanded = wrapper.classList.toggle('is-expanded');
      headerBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      const toggleTextEl = headerBtn.querySelector('.saci-think__toggle-text');
      if (toggleTextEl) {
        toggleTextEl.textContent = expanded ? 'Ocultar' : 'Mostrar pasos';
      }
    });

    return wrapper;
  }

  function mountGuideUI() {
    if (document.getElementById('saciGuide')) return;

    const root = document.createElement('aside');
    root.id = 'saciGuide';
    root.className = 'saci-studio';
    root.innerHTML = `
      <!-- Botón medallón vertical de personaje -->
      <button type="button" class="saci-studio__medallion" id="saciGuideFab" aria-label="Abrir cuaderno de estudio con Aria" aria-expanded="false">
        <span class="saci-studio__medallion-halo"></span>
        <span class="saci-studio__medallion-art">${ARIA_BUST_SVG}</span>
        <span class="saci-studio__medallion-tag">Consultar a Aria</span>
      </button>

      <!-- Panel Lateral de Altura Completa (Studio Drawer) -->
      <div class="saci-studio__drawer" id="saciGuideCard" role="dialog" aria-label="Panel de Estudio Aria" aria-hidden="true">
        <!-- Escenario Superior con Personaje Vectorizado e Indicador de Estado -->
        <div class="saci-studio__stage" id="saciStudioStage">
          <button type="button" class="saci-studio__close" id="saciGuideClose" aria-label="Cerrar panel">Cerrar panel ×</button>
          <div class="saci-studio__portrait">${ARIA_BUST_SVG}</div>
          <h3 class="saci-studio__title">Aria · Cuaderno de Estudio</h3>
          <p class="saci-studio__subtitle" id="saciStageStatus">Guía interactiva del portafolio de Maricielo Cerrón</p>

          <!-- Barra de acceso rápido a entregas -->
          <div class="saci-studio__ribbon" id="saciRibbon">
            <button type="button" data-q="Explicame la semana 1 de recursividad">S1 Recursión</button>
            <button type="button" data-q="Explicame la semana 2 de ordenamiento">S2 Orden</button>
            <button type="button" data-q="Explicame la semana 6 de pilas">S6 Pilas</button>
            <button type="button" data-q="Explicame la semana 7 de colas">S7 Colas</button>
            <button type="button" data-q="Explicame la semana 8 de recursividad y arbol binario">S8 Árboles</button>
            <button type="button" data-q="Que se hizo en Taller con Maven y Figma">Taller VII</button>
          </div>
        </div>

        <!-- Hilo Editorial estilo Cuaderno / Claude -->
        <div class="saci-studio__thread" id="saciGuideFeed" aria-live="polite">
          <div class="saci-studio__intro" id="saciGuideWelcome">
            <span class="saci-studio__intro-kicker">SUGERENCIAS DE ESTUDIO</span>
            <p>Selecciona un tema para que Aria lo razone paso a paso o escribe tu propia consulta abajo:</p>
            <div class="saci-studio__cards-grid">
              <button type="button" class="saci-studio__topic-card" data-q="Explicame con tus propias palabras por que en ColaAlumno de la semana 7 se usa una pila auxiliar para invertir la cola">
                <span class="saci-studio__topic-tag">ALGORITMOS · SEMANA 07</span>
                <strong>Inversión de Cola Circular con Pila</strong>
                <small>Analiza la clase ColaAlumno y su lógica FIFO a LIFO</small>
              </button>
              <button type="button" class="saci-studio__topic-card" data-q="Abre la captura del ejercicio 3 de la semana 7 y explicame ColaPedidos">
                <span class="saci-studio__topic-tag">ACCIÓN EN PÁGINA</span>
                <strong>Abrir captura de ColaPedidos</strong>
                <small>Muestra la infografía del ejercicio 3 y explica sus nodos</small>
              </button>
            </div>
          </div>
        </div>

        <!-- Compositor Editorial Flotante -->
        <form class="saci-studio__composer" id="saciGuideForm" autocomplete="off">
          <div class="saci-studio__input-box">
            <input type="text" id="saciGuideInput" placeholder="Pregúntale a Aria sobre cualquier ejercicio..." aria-label="Escribe tu consulta para Aria" />
            <button type="submit" id="saciGuideSubmit" aria-label="Enviar consulta">
              <span>Preguntar</span>
              ${ACTION_ARROW_SVG}
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(root);

    const fab = document.getElementById('saciGuideFab');
    const card = document.getElementById('saciGuideCard');
    const stage = document.getElementById('saciStudioStage');
    const stageStatus = document.getElementById('saciStageStatus');
    const ribbon = document.getElementById('saciRibbon');
    const close = document.getElementById('saciGuideClose');
    const feed = document.getElementById('saciGuideFeed');
    const welcome = document.getElementById('saciGuideWelcome');
    const form = document.getElementById('saciGuideForm');
    const input = document.getElementById('saciGuideInput');
    const submitBtn = document.getElementById('saciGuideSubmit');

    function setStageThinkingState(active) {
      if (!stage || !stageStatus) return;
      stage.classList.toggle('is-thinking', active);
      stageStatus.textContent = active
        ? 'Aria está analizando los módulos del portafolio...'
        : 'Guía interactiva del portafolio de Maricielo Cerrón';
    }

    function createLivePendingNote() {
      if (welcome && welcome.parentNode) {
        welcome.remove();
      }
      setStageThinkingState(true);

      const note = document.createElement('article');
      note.className = 'saci-note saci-note--bot is-pending';

      const liveSteps = [
        { step: 1, phase: 'INTENT', detail: 'Interpretando el sentido académico de tu pregunta' },
        { step: 2, phase: 'RETRIEVAL', detail: 'Buscando ejercicios y métodos en el portafolio de Maricielo' },
        { step: 3, phase: 'SYNTHESIS', detail: 'Estructurando una explicación clara sin paréntesis' }
      ];

      const thinkBox = createThinkingAccordion(liveSteps, 0.1, true);
      note.appendChild(thinkBox);

      const skeleton = document.createElement('div');
      skeleton.className = 'saci-msg-skeleton';
      skeleton.innerHTML = '<span class="saci-skel-line"></span><span class="saci-skel-line saci-skel-line--short"></span>';
      note.appendChild(skeleton);

      feed.appendChild(note);
      feed.scrollTop = feed.scrollHeight;

      const startTime = performance.now();
      const labelEl = thinkBox.querySelector('.saci-think__label');
      const timerId = setInterval(() => {
        const elapsed = (performance.now() - startTime) / 1000;
        if (labelEl) {
          labelEl.textContent = `Aria está pensando... ${elapsed.toFixed(1)} s`;
        }
      }, 120);

      return {
        stopAndRemove() {
          clearInterval(timerId);
          setStageThinkingState(false);
          const elapsed = Math.max(0.4, (performance.now() - startTime) / 1000);
          if (note.parentNode) note.remove();
          return elapsed;
        }
      };
    }

    function addBubble(role, text, thinking = [], command = emptyCommand(), suggestedActions = [], allowAutoExec = true, elapsedSec = 1.3) {
      if (welcome && welcome.parentNode) {
        welcome.remove();
      }

      if (role === 'user') {
        const userBanner = document.createElement('div');
        userBanner.className = 'saci-note saci-note--user';
        userBanner.innerHTML = `
          <span class="saci-note__kicker">TU CONSULTA</span>
          <p class="saci-note__user-text">${escapeHtml(stripParentheses(text))}</p>
        `;
        feed.appendChild(userBanner);
        feed.scrollTop = feed.scrollHeight;
        return;
      }

      const note = document.createElement('article');
      note.className = 'saci-note saci-note--bot';

      const noteHead = document.createElement('div');
      noteHead.className = 'saci-note__head';
      noteHead.innerHTML = `
        <span class="saci-note__head-avatar">${ARIA_BUST_SVG}</span>
        <span class="saci-note__head-name">Respuesta de Aria</span>
      `;
      note.appendChild(noteHead);

      if (Array.isArray(thinking) && thinking.length > 0) {
        const thinkAccordion = createThinkingAccordion(thinking, elapsedSec, false);
        note.appendChild(thinkAccordion);
      }

      const body = document.createElement('div');
      body.className = 'saci-guide__text';
      body.innerHTML = renderChatRichText(text);
      note.appendChild(body);

      const hasCmd = command && command.action && command.action !== 'NONE';
      const hasSug = Array.isArray(suggestedActions) && suggestedActions.length > 0;

      if (hasCmd) {
        const actionCard = document.createElement('div');
        actionCard.className = 'saci-action-card';
        const cmdBtn = document.createElement('button');
        cmdBtn.type = 'button';
        cmdBtn.className = 'saci-action-card__btn';
        cmdBtn.innerHTML = `
          <span>
            <small>ACCIÓN INTERACTIVA EN PORTAFOLIO</small>
            <strong>${escapeHtml(stripParentheses(command.description || 'Abrir entrega ahora'))}</strong>
          </span>
          ${ACTION_ARROW_SVG}
        `;
        cmdBtn.addEventListener('click', () => executeDomCommand(command));
        actionCard.appendChild(cmdBtn);
        note.appendChild(actionCard);
      }

      if (hasSug) {
        const bar = document.createElement('div');
        bar.className = 'saci-guide__links';
        suggestedActions.slice(0, 2).forEach(act => {
          const b = document.createElement('button');
          b.type = 'button';
          b.textContent = stripParentheses(act.label);
          b.addEventListener('click', () => {
            if (act.type === 'prompt') submitQuestion(act.target);
            else if (/^https?:\/\//i.test(act.target)) window.open(act.target, '_blank', 'noopener,noreferrer');
            else window.location.href = act.target;
          });
          bar.appendChild(b);
        });
        note.appendChild(bar);
      }

      feed.appendChild(note);
      feed.scrollTop = feed.scrollHeight;

      if (allowAutoExec && hasCmd && command.autoExecute) {
        executeDomCommand(command);
      }
    }

    async function submitQuestion(text) {
      const clean = String(text || '').trim();
      if (!clean || isPending) return;

      addBubble('user', clean);
      input.value = '';
      isPending = true;
      input.disabled = true;
      submitBtn.disabled = true;

      const pendingNote = createLivePendingNote();
      const res = await requestChatTurn(clean);
      const elapsedSec = pendingNote.stopAndRemove();

      isPending = false;
      input.disabled = false;
      submitBtn.disabled = false;

      addBubble('bot', res.message, res.thinking, res.command, res.suggested_actions, true, elapsedSec);
      input.focus();
    }

    function toggle(state) {
      isOpen = typeof state === 'boolean' ? state : !isOpen;
      card.classList.toggle('open', isOpen);
      card.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      fab.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) setTimeout(() => input.focus(), 60);
    }

    fab.addEventListener('click', () => toggle());
    close.addEventListener('click', () => toggle(false));

    if (welcome) {
      welcome.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-q]');
        if (btn) submitQuestion(btn.getAttribute('data-q'));
      });
    }

    if (ribbon) {
      ribbon.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-q]');
        if (btn) submitQuestion(btn.getAttribute('data-q'));
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitQuestion(input.value);
    });

    hydrateFromAzure(addBubble);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const loader = typeof window.getPortafolioData === 'function'
      ? window.getPortafolioData()
      : fetch('data/portafolio.json').then(r => r.json());

    Promise.resolve(loader)
      .then(data => {
        portfolioData = data;
        chunksIndex = buildModularChunks(data);
        mountGuideUI();
      })
      .catch(() => mountGuideUI());
  });
})();
