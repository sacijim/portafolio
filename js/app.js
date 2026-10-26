/**
 * Portafolio Académico — sacijim (Maricielo Sarai Cerrón Villar)
 * Motor dinámico basado en JSON para renderizado de Unidades, Semanas, Lightbox,
 * navegación profunda por URL y funciones interactivas para el Chatbot.
 */
(function () {
  'use strict';

  var portafolioData = null;

  function escapeHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function loadPortafolioData() {
    if (portafolioData) return Promise.resolve(portafolioData);
    return fetch('data/portafolio.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Error HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        portafolioData = data;
        return data;
      })
      .catch(function (err) {
        console.warn("Error al cargar data/portafolio.json:", err); portafolioData = { estudiante: {}, cursos: {} };
        return portafolioData;
      });
  }

  window.getPortafolioData = loadPortafolioData;
  window.expandExerciseItems = expandExerciseItems;

  // ============================================================
  // NAVEGACIÓN MÓVIL COMPARTIDA
  // ============================================================
  function initNavbar() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============================================================
  // RENDERIZADO DE ELEMENTOS (IMÁGENES, ARCHIVOS, EJERCICIOS)
  // ============================================================
  function renderImageFileItem(item, baseUrl) {
    var src = item.url || ((baseUrl || '') + item.archivo);
    var fileName = item.descarga || item.archivo || src.split('/').pop();
    var alt = item.alt || item.titulo;
    var lightboxTitle = item.lightboxTitle || item.titulo;

    return (
      '<div class="file-item">' +
        '<div class="file-item__meta">' +
          '<img class="file-item__thumb" src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt) + '" loading="lazy" />' +
          '<div class="file-item__body"><strong>' + escapeHtml(item.titulo) + '</strong><small>' + escapeHtml(item.subtitulo) + '</small></div>' +
        '</div>' +
        '<div class="file-item__actions">' +
          '<a href="' + escapeHtml(src) + '" class="file-item__view" data-full="' + escapeHtml(src) + '" data-title="' + escapeHtml(lightboxTitle) + '">Visualizar</a>' +
          '<a href="' + escapeHtml(src) + '" download="' + escapeHtml(fileName) + '" class="file-item__download">Descargar</a>' +
        '</div>' +
      '</div>'
    );
  }

  function renderAttachmentFileItem(archivo) {
    var actionsHtml = '';
    if (archivo.verUrl) {
      actionsHtml += '<a href="' + escapeHtml(archivo.verUrl) + '" target="_blank" rel="noopener" class="file-item__view">' + escapeHtml(archivo.verTexto || 'Ver') + '</a>';
    }
    if (archivo.descargarUrl) {
      var extraAttrs = archivo.descargarExterno
        ? ' target="_blank" rel="noopener"'
        : (archivo.descargarNombre ? ' download="' + escapeHtml(archivo.descargarNombre) + '"' : '');
      actionsHtml += '<a href="' + escapeHtml(archivo.descargarUrl) + '"' + extraAttrs + ' class="file-item__download">' + escapeHtml(archivo.descargarTexto || 'Descargar') + '</a>';
    }

    return (
      '<div class="file-item">' +
        '<div class="file-item__meta">' +
          '<span class="file-item__icon">' + escapeHtml(archivo.icono || 'DOC') + '</span>' +
          '<div class="file-item__body"><strong>' + escapeHtml(archivo.titulo) + '</strong><small>' + escapeHtml(archivo.subtitulo) + '</small></div>' +
        '</div>' +
        '<div class="file-item__actions">' + actionsHtml + '</div>' +
      '</div>'
    );
  }

  function expandExerciseItems(semana, ejercicio) {
    if (Array.isArray(ejercicio.items)) {
      return ejercicio.items;
    }
    var metodos = ejercicio.metodos || [];
    return metodos.map(function (nombreMetodo, idx) {
      var mNum = idx + 1;
      var archivo = ejercicio.numero + '-M' + mNum + '.png';
      return {
        archivo: archivo,
        titulo: 'Método ' + mNum,
        subtitulo: nombreMetodo,
        alt: ejercicio.titulo + ', imagen M' + mNum,
        lightboxTitle: 'Semana ' + semana.numero + ' · ' + ejercicio.titulo + ' · M' + mNum
      };
    });
  }

  function renderWeekCard(semana) {
    var isOpen = Boolean(semana.abierta);
    var bodyId = 'week-' + semana.numero + '-body';
    var baseUrl = semana.baseUrl || '';
    var innerHtml = '<p class="card__desc">' + escapeHtml(semana.descripcion || 'Entregas de la semana.') + '</p>';

    if (Array.isArray(semana.archivos) && semana.archivos.length > 0) {
      innerHtml +=
        '<div class="file-list" aria-label="Entregables de la semana ' + escapeHtml(semana.numero) + '">' +
          semana.archivos.map(renderAttachmentFileItem).join('') +
        '</div>';
    }

    if (Array.isArray(semana.items) && semana.items.length > 0) {
      innerHtml +=
        '<div class="file-list" aria-label="Archivos de la semana ' + escapeHtml(semana.numero) + '">' +
          semana.items.map(function (it) { return renderImageFileItem(it, baseUrl); }).join('') +
        '</div>';
    }

    if (Array.isArray(semana.ejercicios) && semana.ejercicios.length > 0) {
      var groupsHtml = semana.ejercicios.map(function (ej, idx) {
        var resolvedItems = expandExerciseItems(semana, ej);
        var countLabel = resolvedItems.length + (resolvedItems.length === 1 ? ' imagen' : ' imágenes');
        var exId = semana.id + '-ej-' + ej.numero;
        return (
          '<details class="exercise-group"' + (ej.abierto ? ' open' : '') + ' id="' + escapeHtml(exId) + '">' +
            '<summary class="exercise-group__header">' +
              '<span class="exercise-group__title">' + escapeHtml(ej.titulo) + '</span>' +
              '<span class="exercise-group__count">' + escapeHtml(countLabel) + '</span>' +
              '<svg class="exercise-group__chevron" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>' +
            '</summary>' +
            '<div class="file-list" aria-label="Imágenes del ejercicio ' + (idx + 1) + '">' +
              resolvedItems.map(function (it) { return renderImageFileItem(it, baseUrl); }).join('') +
            '</div>' +
          '</details>'
        );
      }).join('');

      innerHtml += '<div class="exercise-list" aria-label="Ejercicios de la semana ' + escapeHtml(semana.numero) + '">' + groupsHtml + '</div>';
    }

    return (
      '<article class="card card--files week-panel' + (isOpen ? ' is-open' : '') + '" id="' + escapeHtml(semana.id) + '">' +
        '<button class="week-panel__header" type="button" aria-expanded="' + String(isOpen) + '" aria-controls="' + escapeHtml(bodyId) + '">' +
          '<span class="card__badge">' + escapeHtml(semana.badge) + '</span>' +
          '<span class="week-panel__title">' + escapeHtml(semana.titulo) + '</span>' +
          '<svg class="week-panel__chevron" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>' +
        '</button>' +
        '<div class="week-panel__body" id="' + escapeHtml(bodyId) + '">' +
          innerHtml +
        '</div>' +
      '</article>'
    );
  }

  function renderUnit(unidad, idx) {
    var isOpen = Boolean(unidad.abierta);
    var bodyId = 'body-' + (unidad.dot ? unidad.dot.toLowerCase() : ('u' + (idx + 1)));
    var semanas = Array.isArray(unidad.semanas) ? unidad.semanas : [];
    var bodyContent = '';

    if (semanas.length > 0) {
      bodyContent = '<div class="cards-grid">' + semanas.map(renderWeekCard).join('') + '</div>';
    } else {
      var emptyMsg = unidad.mensajeVacio || 'Aun no hay trabajos publicados en esta unidad.';
      bodyContent =
        '<div class="unit__empty">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true">' +
            '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />' +
            '<polyline points="14 2 14 8 20 8" />' +
          '</svg>' +
          '<p>' + escapeHtml(emptyMsg) + '</p>' +
        '</div>';
    }

    return (
      '<div class="unit' + (isOpen ? ' open' : '') + '" id="' + escapeHtml(unidad.id) + '">' +
        '<button class="unit__header" aria-expanded="' + String(isOpen) + '" aria-controls="' + escapeHtml(bodyId) + '">' +
          '<div class="unit__left">' +
            '<span class="unit__dot">' + escapeHtml(unidad.dot) + '</span>' +
            '<div>' +
              '<p class="unit__title">' + escapeHtml(unidad.titulo) + '</p>' +
              '<p class="unit__meta">' + escapeHtml(unidad.meta) + '</p>' +
            '</div>' +
          '</div>' +
          '<svg class="unit__chevron" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>' +
        '</button>' +
        '<div class="unit__body" id="' + escapeHtml(bodyId) + '">' +
          bodyContent +
        '</div>' +
      '</div>'
    );
  }

  function bindAccordions(container) {
    container.querySelectorAll('.unit__header').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var unit = btn.closest('.unit');
        var shouldOpen = !unit.classList.contains('open');

        container.querySelectorAll('.unit').forEach(function (item) {
          var itemButton = item.querySelector('.unit__header');
          var isSelected = item === unit && shouldOpen;
          item.classList.toggle('open', isSelected);
          if (itemButton) {
            itemButton.setAttribute('aria-expanded', String(isSelected));
          }
        });
      });
    });

    container.querySelectorAll('.week-panel__header').forEach(function (button) {
      button.addEventListener('click', function () {
        var panel = button.closest('.week-panel');
        var isOpen = panel.classList.contains('is-open');
        panel.classList.toggle('is-open', !isOpen);
        button.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  // ============================================================
  // ACCIONES INTERACTIVAS DE NAVEGACIÓN PROFUNDA (PARA CHATBOT)
  // ============================================================
  function focusWeekInDom(unitId, weekId, exerciseId) {
    var unitEl = unitId ? document.getElementById(unitId) : null;
    var weekEl = weekId ? document.getElementById(weekId) : null;

    if (!unitEl && weekEl) {
      unitEl = weekEl.closest('.unit');
    }

    if (unitEl) {
      document.querySelectorAll('.unit').forEach(function (u) {
        var btn = u.querySelector('.unit__header');
        var active = (u === unitEl);
        u.classList.toggle('open', active);
        if (btn) btn.setAttribute('aria-expanded', String(active));
      });
    }

    if (weekEl) {
      weekEl.classList.add('is-open');
      var wBtn = weekEl.querySelector('.week-panel__header');
      if (wBtn) wBtn.setAttribute('aria-expanded', 'true');
    }

    var targetScrollEl = weekEl || unitEl;
    if (exerciseId) {
      var exEl = document.getElementById(exerciseId);
      if (exEl) {
        exEl.open = true;
        targetScrollEl = exEl;
      }
    }

    if (targetScrollEl) {
      setTimeout(function () {
        targetScrollEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }

  window.navigateToPortfolioTarget = function (options) {
    if (!options) return;
    var targetPage = options.page || 'algoritmos.html';
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Si estamos en la misma página, ejecutamos la acción directamente sin recargar
    if (currentPath === targetPage) {
      if (options.unitId || options.weekId) {
        focusWeekInDom(options.unitId, options.weekId, options.exerciseId);
      }
      if (options.imageUrl && typeof window.openPortfolioImage === 'function') {
        window.openPortfolioImage(options.imageUrl, options.imageTitle);
      }
      return;
    }

    // Si estamos en otra página, redirigimos con parámetros para abrir automáticamente
    var params = new URLSearchParams();
    if (options.unitId) params.set('unit', options.unitId);
    if (options.weekId) params.set('week', options.weekId);
    if (options.exerciseId) params.set('ex', options.exerciseId);
    if (options.imageUrl) params.set('img', options.imageUrl);
    if (options.imageTitle) params.set('title', options.imageTitle);
    window.location.href = targetPage + '?' + params.toString();
  };

  function handleUrlDeepLinks() {
    var params = new URLSearchParams(window.location.search);
    var unitId = params.get('unit');
    var weekId = params.get('week');
    var exerciseId = params.get('ex');
    var imgUrl = params.get('img');
    var imgTitle = params.get('title');

    if (unitId || weekId || exerciseId) {
      focusWeekInDom(unitId, weekId, exerciseId);
    }
    if (imgUrl && typeof window.openPortfolioImage === 'function') {
      setTimeout(function () {
        window.openPortfolioImage(imgUrl, imgTitle || 'Vista previa');
      }, 150);
    }
  }

  // ============================================================
  // LIGHTBOX CON ZOOM REAL, ARRASTRE Y ATAJOS DE TECLADO (SIN EMOJIS)
  // ============================================================
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lightboxStage = document.getElementById('lightboxStage');
    var lightboxWrapper = document.getElementById('lightboxWrapper');
    var lightboxImage = document.getElementById('lightboxImage');
    var lightboxTitle = document.getElementById('lightboxTitle');
    var lightboxZoomLevel = document.getElementById('lightboxZoomLevel');
    var lightboxZoomIn = document.getElementById('lightboxZoomIn');
    var lightboxZoomOut = document.getElementById('lightboxZoomOut');
    var lightboxZoomReset = document.getElementById('lightboxZoomReset');
    var lightboxOpenTab = document.getElementById('lightboxOpenTab');
    var lightboxDownload = document.getElementById('lightboxDownload');
    var lightboxClose = document.getElementById('lightboxClose');
    var lightboxHint = document.getElementById('lightboxHint');

    var scale = 1;
    var baseWidth = 0;
    var baseHeight = 0;
    var isDragging = false;
    var dragMoved = false;
    var startX = 0;
    var startY = 0;
    var startScrollLeft = 0;
    var startScrollTop = 0;

    function computeBaseDimensions() {
      if (!lightboxImage.naturalWidth || !lightboxImage.naturalHeight) return;
      var availW = Math.max(lightboxStage.clientWidth - 48, 240);
      var availH = Math.max(lightboxStage.clientHeight - 48, 240);
      var fitRatio = Math.min(availW / lightboxImage.naturalWidth, availH / lightboxImage.naturalHeight, 1);
      baseWidth = Math.round(lightboxImage.naturalWidth * fitRatio);
      baseHeight = Math.round(lightboxImage.naturalHeight * fitRatio);
    }

    function applyZoom(newScale, animated) {
      scale = Math.min(Math.max(newScale, 1), 4.5);
      if (!baseWidth || !baseHeight) computeBaseDimensions();

      var prevW = lightboxWrapper.clientWidth || baseWidth || 1;
      var prevH = lightboxWrapper.clientHeight || baseHeight || 1;
      var scrollCenterXRatio = (lightboxStage.scrollLeft + lightboxStage.clientWidth / 2) / prevW;
      var scrollCenterYRatio = (lightboxStage.scrollTop + lightboxStage.clientHeight / 2) / prevH;

      var targetW = Math.round(baseWidth * scale);
      var targetH = Math.round(baseHeight * scale);

      lightboxWrapper.style.transition = animated
        ? 'width 0.2s cubic-bezier(0.25, 1, 0.5, 1), height 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
        : 'none';
      lightboxWrapper.style.width = targetW + 'px';
      lightboxWrapper.style.height = targetH + 'px';
      lightboxZoomLevel.textContent = Math.round(scale * 100) + '%';

      var isZoomed = scale > 1.05;
      lightboxWrapper.classList.toggle('is-zoomed', isZoomed);

      if (isZoomed) {
        lightboxImage.style.cursor = 'grab';
        lightboxHint.innerHTML = '<strong>Barras de desplazamiento activadas:</strong> Usa la rueda del ratón, las barras o arrastra para ver toda la hoja &middot; Haz clic para ajustar';
      } else {
        lightboxImage.style.cursor = 'zoom-in';
        lightboxHint.innerHTML = 'Haz clic en la imagen o en "Agrandar" para ampliarla &middot; Toda la hoja visible';
      }

      if (scale > 1.05) {
        setTimeout(function () {
          lightboxStage.scrollLeft = (scrollCenterXRatio * targetW) - (lightboxStage.clientWidth / 2);
          lightboxStage.scrollTop = (scrollCenterYRatio * targetH) - (lightboxStage.clientHeight / 2);
        }, animated ? 25 : 0);
      } else {
        lightboxStage.scrollLeft = 0;
        lightboxStage.scrollTop = 0;
      }
    }

    function resetZoom() {
      applyZoom(1, true);
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      scale = 1;
      baseWidth = 0;
      baseHeight = 0;
      lightboxWrapper.style.width = '';
      lightboxWrapper.style.height = '';
      lightboxImage.src = '';
      lightboxImage.alt = '';
      lightboxTitle.textContent = '';
      lightboxOpenTab.href = '';
      lightboxDownload.href = '';
    }

    function openLightbox(fullImage, title) {
      var safeTitle = title || 'Archivo del trabajo';
      function showImage() {
        computeBaseDimensions();
        applyZoom(1, false);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      }

      lightboxImage.onload = showImage;
      lightboxImage.src = fullImage;
      lightboxImage.alt = safeTitle;
      lightboxTitle.textContent = safeTitle;
      lightboxOpenTab.href = fullImage;
      lightboxDownload.href = fullImage;
      lightboxDownload.setAttribute('download', fullImage.split('/').pop());

      if (lightboxImage.complete && lightboxImage.naturalWidth) {
        showImage();
      }
    }

    window.openPortfolioImage = openLightbox;

    lightboxZoomIn.addEventListener('click', function (e) {
      e.stopPropagation();
      applyZoom(scale + 0.4, true);
    });

    lightboxZoomOut.addEventListener('click', function (e) {
      e.stopPropagation();
      applyZoom(scale - 0.4, true);
    });

    lightboxZoomReset.addEventListener('click', function (e) {
      e.stopPropagation();
      resetZoom();
    });

    lightboxWrapper.addEventListener('click', function (e) {
      e.stopPropagation();
      if (dragMoved) {
        dragMoved = false;
        return;
      }
      if (scale > 1.05) resetZoom();
      else applyZoom(2.2, true);
    });

    lightboxStage.addEventListener('pointerdown', function (e) {
      if (scale > 1.05 && e.button === 0) {
        isDragging = true;
        dragMoved = false;
        startX = e.clientX;
        startY = e.clientY;
        startScrollLeft = lightboxStage.scrollLeft;
        startScrollTop = lightboxStage.scrollTop;
        lightboxWrapper.classList.add('is-dragging');
        lightboxStage.setPointerCapture(e.pointerId);
      }
    });

    lightboxStage.addEventListener('pointermove', function (e) {
      if (isDragging) {
        var dx = e.clientX - startX;
        var dy = e.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved = true;
        lightboxStage.scrollLeft = startScrollLeft - dx;
        lightboxStage.scrollTop = startScrollTop - dy;
      }
    });

    function endDrag(e) {
      if (isDragging) {
        isDragging = false;
        lightboxWrapper.classList.remove('is-dragging');
        try {
          lightboxStage.releasePointerCapture(e.pointerId);
        } catch (err) { }
      }
    }

    lightboxStage.addEventListener('pointerup', endDrag);
    lightboxStage.addEventListener('pointercancel', endDrag);

    lightboxStage.addEventListener('wheel', function (e) {
      if (e.ctrlKey) {
        e.preventDefault();
        var delta = e.deltaY < 0 ? 0.35 : -0.35;
        applyZoom(scale + delta, true);
      }
    }, { passive: false });

    var touchDist = 0;
    var touchScale = 1;
    lightboxStage.addEventListener('touchstart', function (e) {
      if (e.touches.length === 2) {
        touchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        touchScale = scale;
      }
    }, { passive: true });

    lightboxStage.addEventListener('touchmove', function (e) {
      if (e.touches.length === 2 && touchDist > 0) {
        e.preventDefault();
        var currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        applyZoom(touchScale * (currentDist / touchDist), false);
      }
    }, { passive: false });

    lightboxStage.addEventListener('touchend', function (e) {
      if (e.touches.length < 2) touchDist = 0;
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightboxStage.addEventListener('click', function (e) {
      if (e.target === lightboxStage && scale <= 1.05 && !isDragging && !dragMoved) {
        closeLightbox();
      }
    });

    window.addEventListener('resize', function () {
      if (lightbox.classList.contains('open')) {
        computeBaseDimensions();
        applyZoom(scale, false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === '+' || e.key === '=') applyZoom(scale + 0.4, true);
      else if (e.key === '-' || e.key === '_') applyZoom(scale - 0.4, true);
      else if (e.key === '0') resetZoom();
    });

    document.addEventListener('click', function (event) {
      var viewLink = event.target.closest('.file-item__view[data-full]');
      if (!viewLink) return;
      event.preventDefault();
      var fullImage = viewLink.dataset.full || viewLink.getAttribute('href');
      var title = viewLink.dataset.title || 'Archivo del trabajo';
      openLightbox(fullImage, title);
    });
  }

  // ============================================================
  // INICIALIZACIÓN AUTOMÁTICA POR PÁGINA
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initLightbox();

    var unitsContainer = document.getElementById('unitsList');
    if (!unitsContainer) return;

    var courseKey = unitsContainer.getAttribute('data-course');
    if (!courseKey) return;

    loadPortafolioData().then(function (data) {
      var curso = data && data.cursos && data.cursos[courseKey];
      if (!curso || !Array.isArray(curso.unidades)) return;
      unitsContainer.innerHTML = curso.unidades.map(renderUnit).join('');
      bindAccordions(unitsContainer);
      handleUrlDeepLinks();
    });
  });
}());
