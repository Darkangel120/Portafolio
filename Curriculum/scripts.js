let lang = "es";

function t(v) {
  if (typeof v === "string") return v;
  return v[lang] || v.es || "";
}

// ── Bloques reutilizables ──────────────────────────────

function sectionH2(icono, es, en) {
  return `<div class="section-h2">
    <i class="${icono}"></i>
    <span data-es="${es}" data-en="${en}">${lang === "es" ? es : en}</span>
  </div>`;
}

function expBlockHTML(exp) {
  const hasta = exp.hasta ? t(exp.hasta) : "";
  const periodo = hasta ? `${exp.desde} – ${hasta}` : exp.desde;
  const puntos = exp.puntos
    .map((p) => `<li data-es="${p.es}" data-en="${p.en}">${t(p)}</li>`)
    .join("");
  return `
    <div class="exp-block">
      <div class="item-row">
        <div>
          <div class="item-title" data-es="${exp.titulo.es}" data-en="${exp.titulo.en}">${t(exp.titulo)}</div>
          <div class="item-sub"   data-es="${exp.empresa.es}" data-en="${exp.empresa.en}">${t(exp.empresa)}</div>
        </div>
        <div class="item-period">${periodo}</div>
      </div>
      <ul class="bullet-list">${puntos}</ul>
    </div>`;
}

function eduBlockHTML(edu) {
  const inst   = typeof edu.institucion === "string" ? edu.institucion : t(edu.institucion);
  const instEs = typeof edu.institucion === "string" ? edu.institucion : edu.institucion.es;
  const instEn = typeof edu.institucion === "string" ? edu.institucion : (edu.institucion.en || instEs);
  const hasta  = edu.hasta ? t(edu.hasta) : null;
  const periodo = hasta ? `${edu.desde} – ${hasta}` : edu.desde;
  return `
    <div class="exp-block">
      <div class="item-row">
        <div>
          <div class="item-title" data-es="${edu.titulo.es}" data-en="${edu.titulo.en}">${t(edu.titulo)}</div>
          <div class="item-sub"   data-es="${instEs}" data-en="${instEn}">${inst}</div>
        </div>
        <div class="item-period">${periodo}</div>
      </div>
    </div>`;
}

function euroRowHTML(labelEs, labelEn, valorHTML) {
  return `
    <div class="euro-row">
      <div class="euro-lbl" data-es="${labelEs}" data-en="${labelEn}">${lang === "es" ? labelEs : labelEn}</div>
      <div class="euro-val">${valorHTML}</div>
    </div>`;
}

// ── Header americana: foto + nombre + contacto + links ─

function headerAmericana(d) {
  return `
    <div class="cv-header">
      <div class="cv-photo-wrap">
        <div class="cv-photo-ring"></div>
        <div class="cv-photo-inner">
          <img src="${d.foto}" alt="${d.nombre}"
               onerror="this.classList.add('fallback-hidden');this.nextElementSibling.classList.add('show')">
          <div class="photo-fallback"><i class="fa-solid fa-user"></i></div>
        </div>
      </div>
      <div class="cv-header-right">
        <div class="cv-name">${d.nombre}</div>
        <div class="cv-title-text" data-es="${d.titulo.es}" data-en="${d.titulo.en}">${t(d.titulo)}</div>
        <div class="cv-contact-row">
          <span><i class="fa-solid fa-envelope"></i> ${d.email}</span>
          <span><i class="fa-solid fa-phone"></i> ${d.telefono}</span>
          <span><i class="fa-solid fa-location-dot"></i> ${d.ubicacion}</span>
        </div>
        <div class="cv-links-row">
          <a href="${d.portfolioURL}"><i class="fa-solid fa-address-card"></i> ${d.portfolio}</a>
          <a href="${d.githubURL}"><i class="fa-brands fa-github"></i> ${d.github}</a>
          <a href="${d.linkedinURL}"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
        </div>
      </div>
    </div>`;
}

// ── Header europea: solo foto + nombre + título ────────
// (el contacto va en la sección formal "Información Personal")

function headerEuropea(d) {
  return `
    <div class="cv-header">
      <div class="cv-photo-wrap">
        <div class="cv-photo-ring"></div>
        <div class="cv-photo-inner">
          <img src="${d.foto}" alt="${d.nombre}"
               onerror="this.classList.add('fallback-hidden');this.nextElementSibling.classList.add('show')">
          <div class="photo-fallback"><i class="fa-solid fa-user"></i></div>
        </div>
      </div>
      <div class="cv-header-right">
        <div class="cv-name">${d.nombre}</div>
        <div class="cv-title-text" data-es="${d.titulo.es}" data-en="${d.titulo.en}">${t(d.titulo)}</div>
      </div>
    </div>`;
}

// ── CV AMERICANA ───────────────────────────────────────
// Estructura: header completo → resumen → habilidades →
//             idiomas → experiencia → educación

function buildAmericana(d) {
  const skills = d.habilidadesGrid
    .map((h) => `<div class="skill-tag" data-es="${h.es}" data-en="${h.en}">${t(h)}</div>`)
    .join("");

  const idiomas = d.idiomas
    .map((i) => `
      <div class="lang-row">
        <span class="lang-name" data-es="${i.es}" data-en="${i.en}">${t(i)}</span>
        <span class="lang-level" data-es="${i.nivel}" data-en="${i.nivelEn}">${lang === "es" ? i.nivel : i.nivelEn}</span>
      </div>`)
    .join("");

  const exp = d.experiencia.map((e) => expBlockHTML(e)).join("");
  const edu = d.educacion.map((e) => eduBlockHTML(e)).join("");

  document.getElementById("cv-americana").innerHTML = `
    <div class="main-content">
      ${headerAmericana(d)}
      <div class="cv-divider"></div>

      <div class="section">
        ${sectionH2("fa-solid fa-user-tie", "Resumen Profesional", "Professional Summary")}
        <div class="highlight-box" data-es="${d.resumen.es}" data-en="${d.resumen.en}">${t(d.resumen)}</div>
      </div>

      <div class="section">
        ${sectionH2("fa-solid fa-laptop-code", "Habilidades Técnicas", "Technical Skills")}
        <div class="skills-grid">${skills}</div>
      </div>

      <div class="section">
        ${sectionH2("fa-solid fa-language", "Idiomas", "Languages")}
        <div class="lang-list">${idiomas}</div>
      </div>

      <div class="section">
        ${sectionH2("fa-solid fa-briefcase", "Experiencia", "Experience")}
        ${exp}
      </div>

      <div class="section">
        ${sectionH2("fa-solid fa-graduation-cap", "Educación", "Education")}
        ${edu}
      </div>
    </div>`;
}

// ── CV EUROPEA (Europass) ──────────────────────────────
// Estructura: etiqueta + header solo nombre/título →
//             datos personales (contacto formal) →
//             puesto deseado → experiencia → educación →
//             idiomas CEFR → digital
// Sin sección "Anexo" porque el contacto ya está arriba

// ── CV EUROPEA (Europass) ──────────────────────────────
// Experiencia y educación en bloques compactos, no en filas separadas

function euroExpCompacto(exp) {
  const hasta  = exp.hasta ? t(exp.hasta) : "";
  const periodo = hasta ? `${exp.desde} – ${hasta}` : exp.desde;
  const puntos  = exp.puntos
    .map((p) => `<li data-es="${p.es}" data-en="${p.en}">${t(p)}</li>`)
    .join("");
  return `
    <div class="euro-block">
      <div class="euro-block-header">
        <div class="euro-block-left">
          <div class="euro-block-title" data-es="${exp.titulo.es}" data-en="${exp.titulo.en}">${t(exp.titulo)}</div>
          <div class="euro-block-sub"   data-es="${exp.empresa.es}" data-en="${exp.empresa.en}">${t(exp.empresa)}</div>
        </div>
        <div class="euro-block-period">${periodo}</div>
      </div>
      <ul class="bullet-list">${puntos}</ul>
    </div>`;
}

function euroEduCompacto(edu) {
  const inst   = typeof edu.institucion === "string" ? edu.institucion : t(edu.institucion);
  const instEs = typeof edu.institucion === "string" ? edu.institucion : edu.institucion.es;
  const instEn = typeof edu.institucion === "string" ? edu.institucion : (edu.institucion.en || instEs);
  const hasta  = edu.hasta ? t(edu.hasta) : null;
  const periodo = hasta ? `${edu.desde} – ${hasta}` : edu.desde;
  return `
    <div class="euro-block">
      <div class="euro-block-header">
        <div class="euro-block-left">
          <div class="euro-block-title" data-es="${edu.titulo.es}" data-en="${edu.titulo.en}">${t(edu.titulo)}</div>
          <div class="euro-block-sub"   data-es="${instEs}" data-en="${instEn}">${inst}</div>
        </div>
        <div class="euro-block-period">${periodo}</div>
      </div>
    </div>`;
}

function buildEuropea(d) {
  const cefrFilas = d.cefrTabla.map((r) => {
    const celdas = ["comprOral","comprLect","interOral","exprOral","escritura"]
      .map((k) => {
        const v  = r[k];
        const es = typeof v === "object" ? v.es : v;
        const en = typeof v === "object" ? v.en : v;
        return `<td data-es="${es}" data-en="${en}">${lang === "es" ? es : en}</td>`;
      }).join("");
    return `<tr>
      <td data-es="${r.idioma.es}" data-en="${r.idioma.en}">${t(r.idioma)}</td>
      ${celdas}
    </tr>`;
  }).join("");

  const digital = d.habilidadesDigital
    .map((h) => `
      <div class="digital-tag">
        <i class="${h.icono}"></i>
        <span data-es="${h.es}" data-en="${h.en}">${t(h)}</span>
      </div>`).join("");

  const exp = d.experiencia.map((e) => expBlockHTML(e)).join("");
  const edu = d.educacion.map((e)   => eduBlockHTML(e)).join("");

  document.getElementById("cv-europea").innerHTML = `
    <div class="main-content">
      <div class="euro-label" data-es="CURRÍCULUM VITAE" data-en="CURRICULUM VITAE">${lang === "es" ? "CURRÍCULUM VITAE" : "CURRICULUM VITAE"}</div>
      ${headerEuropea(d)}
      <div class="cv-divider"></div>

      <div class="section">
        ${sectionH2("fa-solid fa-id-card", "Información Personal", "Personal Information")}
        <div class="euro-info-grid">
          <div class="euro-info-col">
            ${euroRowHTML("Correo electrónico", "Email", d.email)}
            ${euroRowHTML("Teléfono", "Phone", d.telefono)}
            ${euroRowHTML("Nacionalidad", "Nationality", `<span data-es="Venezolano" data-en="Venezuelan">${lang === "es" ? "Venezolano" : "Venezuelan"}</span>`)}
          </div>
          <div class="euro-info-col">
            ${euroRowHTML("Portfolio", "Portfolio", `<a href="${d.portfolioURL}">${d.portfolio}</a>`)}
            ${euroRowHTML("GitHub", "GitHub", `<a href="${d.githubURL}">${d.github}</a>`)}
            ${euroRowHTML("LinkedIn", "LinkedIn", `<a href="${d.linkedinURL}">${d.linkedin}</a>`)}
          </div>
        </div>
      </div>

      <div class="section">
        ${sectionH2("fa-solid fa-bullseye", "Puesto Deseado", "Desired Employment")}
        ${euroRowHTML("Puesto", "Position", `<strong data-es="${d.puestoDeseado.es}" data-en="${d.puestoDeseado.en}">${t(d.puestoDeseado)}</strong>`)}
      </div>

      <div class="section">
        ${sectionH2("fa-solid fa-briefcase", "Experiencia Laboral", "Work Experience")}
        ${exp}
      </div>

      <div class="section">
        ${sectionH2("fa-solid fa-graduation-cap", "Educación y Formación", "Education and Training")}
        ${edu}
      </div>

      <div class="section">
        ${sectionH2("fa-solid fa-language", "Competencia Lingüística", "Language Skills")}
        <table class="cefr-table">
          <thead><tr>
            <th data-es="Idioma"              data-en="Language">${lang==="es"?"Idioma":"Language"}</th>
            <th data-es="Comprensión oral"    data-en="Listening">${lang==="es"?"Comprensión oral":"Listening"}</th>
            <th data-es="Comprensión lectora" data-en="Reading">${lang==="es"?"Comprensión lectora":"Reading"}</th>
            <th data-es="Interacción oral"    data-en="Spoken Interaction">${lang==="es"?"Interacción oral":"Spoken Interaction"}</th>
            <th data-es="Expresión oral"      data-en="Spoken Production">${lang==="es"?"Expresión oral":"Spoken Production"}</th>
            <th data-es="Escritura"           data-en="Writing">${lang==="es"?"Escritura":"Writing"}</th>
          </tr></thead>
          <tbody>${cefrFilas}</tbody>
        </table>
      </div>

      <div class="section">
        ${sectionH2("fa-solid fa-laptop-code", "Competencia Digital", "Digital Competence")}
        <div class="digital-grid">${digital}</div>
      </div>
    </div>`;
}

// ── Control ────────────────────────────────────────────

function switchCV(cv) {
  document.querySelectorAll(".cv-wrapper").forEach((e) => e.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach((e) => e.classList.remove("active"));
  document.getElementById("cv-" + cv).classList.add("active");
  document.querySelector('[data-cv="' + cv + '"]').classList.add("active");
}

function setLang(l) {
  lang = l;
  document.getElementById("btnES").classList.toggle("active", l === "es");
  document.getElementById("btnEN").classList.toggle("active", l === "en");
  document.querySelectorAll("[data-es]").forEach((el) => {
    const v = el.getAttribute("data-" + l);
    if (v !== null) el.textContent = v;
  });
  document.getElementById("printLabel").textContent = l === "es" ? "Descargar PDF" : "Download PDF";
  document.documentElement.lang = l;
}

// ── Arranque ───────────────────────────────────────────

fetch("datos.json")
  .then((r) => r.json())
  .then((d) => {
    buildAmericana(d);
    buildEuropea(d);
  })
  .catch(() => {
    document.body.insertAdjacentHTML("beforeend", `
      <div style="color:#f87171;text-align:center;margin-top:60px;font-family:monospace;line-height:2;">
        <div style="font-size:2rem">⚠️</div>
        No se pudo cargar <strong>datos.json</strong>.<br>
        Usa <code style="background:#1a1a2e;padding:4px 10px;border-radius:6px;">npx serve .</code>
        o la extensión <strong>Live Server</strong> de VS Code.
      </div>`);
  });