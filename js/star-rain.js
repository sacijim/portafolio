(function () {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stars = [];
  var width = 0;
  var height = 0;
  var frameId = 0;
  var lastFrame = 0;

  if (!context) return;

  canvas.className = 'star-rain';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  function createStar(randomY) {
    var speed = 0.18 + Math.random() * 0.8;
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -Math.random() * height * 0.4,
      speed: speed,
      drift: speed * (0.18 + Math.random() * 0.3),
      length: 10 + Math.random() * 54,
      radius: 0.45 + Math.random() * 1.05,
      opacity: 0.16 + Math.random() * 0.46,
      phase: Math.random() * Math.PI * 2,
      twinkle: 0.0004 + Math.random() * 0.0012,
      color: Math.random() > 0.78 ? '197, 142, 205' : '177, 203, 239'
    };
  }

  function resize() {
    var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    stars = Array.from({ length: Math.max(38, Math.min(110, Math.round(width * height / 19000))) }, function () {
      return createStar(true);
    });

    if (prefersReducedMotion) draw(0, false);
  }

  function draw(timestamp, animate) {
    var elapsed = lastFrame ? Math.min((timestamp - lastFrame) / 16.67, 2) : 1;
    lastFrame = timestamp;
    context.clearRect(0, 0, width, height);

    stars.forEach(function (star) {
      var alpha = star.opacity * (0.68 + Math.sin(timestamp * star.twinkle + star.phase) * 0.32);
      var gradient;
      var tailX;
      var tailY;

      if (animate) {
        star.x += star.drift * elapsed;
        star.y += star.speed * elapsed;
        if (star.y > height + star.length || star.x > width + star.length) Object.assign(star, createStar(false));
      }

      tailX = star.drift * star.length * 0.28;
      tailY = star.length;
      gradient = context.createLinearGradient(star.x, star.y, star.x - tailX, star.y - tailY);
      gradient.addColorStop(0, 'rgba(' + star.color + ', ' + alpha + ')');
      gradient.addColorStop(1, 'rgba(' + star.color + ', 0)');
      context.strokeStyle = gradient;
      context.lineWidth = star.radius;
      context.beginPath();
      context.moveTo(star.x, star.y);
      context.lineTo(star.x - tailX, star.y - tailY);
      context.stroke();

      context.fillStyle = 'rgba(237, 228, 255, ' + alpha + ')';
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
    });

    if (animate && !document.hidden) frameId = window.requestAnimationFrame(function (time) { draw(time, true); });
  }

  function start() {
    if (!prefersReducedMotion && !document.hidden && !frameId) {
      frameId = window.requestAnimationFrame(function (time) {
        frameId = 0;
        draw(time, true);
      });
    }
  }

  resize();
  draw(0, false);
  if (!prefersReducedMotion) start();

  window.addEventListener('resize', function () {
    resize();
    if (!prefersReducedMotion) start();
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    } else {
      start();
    }
  });
}());