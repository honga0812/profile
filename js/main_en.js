/* ==========================================================================
   Dr. Hung-Chia Chen (陳宏佳 博士)
   Official Masterpiece Experience Controller - English Edition
   Sequence: Tech Architect -> Strategic Leader -> Media Producer -> Synergy Nexus
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Role Transition Controller
  const roleButtons = document.querySelectorAll('.role-pill-btn');
  const roleBlocks = {
    'tech': document.getElementById('roleBlockTech'),
    'strategy': document.getElementById('roleBlockStrategy'),
    'media': document.getElementById('roleBlockMedia'),
    'all': document.getElementById('roleBlockAll')
  };
  const shutter = document.getElementById('transitionShutter');
  const shutterRoleName = document.getElementById('shutterRoleName');
  const shutterSub = document.getElementById('shutterSub');
  const shutterEmblem = document.getElementById('shutterEmblem');
  const pdfDownloadBtn = document.getElementById('rolePdfDownloadBtn');

  const roleMeta = {
    'tech': {
      title: 'TECH ARCHITECT',
      sub: 'INFORMATION TECHNOLOGY & AI SYSTEMS',
      theme: 'role-tech',
      icon: '💻',
      pdf: 'downloads/Dr_Chen_Tech_AI_Portfolio_EN.pdf',
      pdfText: '📥 Download Tech & AI Portfolio (PDF)'
    },
    'strategy': {
      title: 'STRATEGIC LEADER',
      sub: 'MANAGEMENT, VENTURE & MENTORSHIP',
      theme: 'role-strategy',
      icon: '📈',
      pdf: 'downloads/Dr_Chen_Strategy_Management_Portfolio_EN.pdf',
      pdfText: '📥 Download Strategic Management Portfolio (PDF)'
    },
    'media': {
      title: 'MEDIA PRODUCER',
      sub: 'SOUND ENGINEERING & DIGITAL MEDIA',
      theme: 'role-media',
      icon: '🎵',
      pdf: 'downloads/Dr_Chen_Digital_Media_Portfolio_EN.pdf',
      pdfText: '📥 Download Sound & Media Portfolio (PDF)'
    },
    'all': {
      title: 'SYNERGY NEXUS',
      sub: 'TRIPLE-DOMAIN INTEGRATION MATRIX',
      theme: 'role-all',
      icon: '🌐',
      pdf: 'downloads/Dr_Chen_Full_Comprehensive_Portfolio_EN.pdf',
      pdfText: '📥 Download Comprehensive Portfolio (PDF)'
    }
  };

  function switchRole(selectedRole, triggerTransition = true) {
    // Update button states
    roleButtons.forEach(btn => {
      if (btn.dataset.role === selectedRole) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const meta = roleMeta[selectedRole];

    if (triggerTransition && shutter) {
      shutterRoleName.textContent = meta.title;
      shutterSub.textContent = meta.sub;
      if (shutterEmblem) shutterEmblem.textContent = meta.icon;
      shutter.classList.add('active');

      setTimeout(() => {
        applyRoleVisibility(selectedRole, meta);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 280);

      setTimeout(() => {
        shutter.classList.remove('active');
      }, 620);
    } else {
      applyRoleVisibility(selectedRole, meta);
    }
  }

  function applyRoleVisibility(selectedRole, meta) {
    // Set theme class on body, preserving lang-en
    document.body.className = `${meta.theme} lang-en`;

    // Show ONLY selected role container, hide all others
    Object.keys(roleBlocks).forEach(key => {
      const block = roleBlocks[key];
      if (!block) return;
      if (key === selectedRole) {
        block.classList.remove('hidden-role');
      } else {
        block.classList.add('hidden-role');
      }
    });

    // Update Header Download Button
    if (pdfDownloadBtn) {
      pdfDownloadBtn.href = meta.pdf;
      pdfDownloadBtn.innerHTML = `<span>${meta.pdfText}</span>`;
    }
  }

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      switchRole(role, true);
    });
  });

  // Initial Role Detection (Supports URL hash #strategy, query ?role=all, or defaults to tech)
  const urlParams = new URLSearchParams(window.location.search);
  const paramRole = urlParams.get('role');
  const hashRole = window.location.hash.replace('#', '').toLowerCase();
  const validRoles = ['tech', 'strategy', 'media', 'all'];
  const initialRole = validRoles.includes(paramRole) ? paramRole :
                      validRoles.includes(hashRole) ? hashRole : 'tech';

  switchRole(initialRole, false);

  // 2. Interactive Synergy Cases Filtering inside #roleBlockAll
  const synergyFilterBtns = document.querySelectorAll('.synergy-pill-btn');
  const synergyCards = document.querySelectorAll('.synergy-case-card');

  synergyFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      synergyFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterTag = btn.dataset.filter;
      synergyCards.forEach(card => {
        if (filterTag === 'all' || card.dataset.synergy.includes(filterTag)) {
          card.style.display = 'grid';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // Link quick jump buttons inside #roleBlockAll to switch to specific single roles
  const jumpButtons = document.querySelectorAll('[data-jump-role]');
  jumpButtons.forEach(jb => {
    jb.addEventListener('click', (e) => {
      e.preventDefault();
      const targetRole = jb.dataset.jumpRole;
      switchRole(targetRole, true);
    });
  });

  // 3. Interactive Background Canvas
  const canvas = document.getElementById('interactiveCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    for (let i = 0; i < 48; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      let strokeColor = 'rgba(2, 132, 199, 0.12)';
      let nodeColor = 'rgba(2, 132, 199, 0.45)';

      if (document.body.classList.contains('role-strategy')) {
        strokeColor = 'rgba(180, 83, 9, 0.12)';
        nodeColor = 'rgba(180, 83, 9, 0.45)';
      } else if (document.body.classList.contains('role-media')) {
        strokeColor = 'rgba(133, 77, 14, 0.12)';
        nodeColor = 'rgba(133, 77, 14, 0.45)';
      } else if (document.body.classList.contains('role-all')) {
        strokeColor = 'rgba(29, 78, 216, 0.12)';
        nodeColor = 'rgba(180, 83, 9, 0.45)';
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }
    animate();
  }
});
