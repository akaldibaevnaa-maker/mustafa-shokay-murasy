/**
 * Конференция мен ғылыми жоба қорғауға арналған презентациялық слайд модулі
 */

let currentSlide = 0;
const totalSlides = 7;

function openPresentation() {
  const modal = document.getElementById("presentationModal");
  modal.classList.add("active");
  currentSlide = 0;
  showSlide(currentSlide);
  document.body.style.overflow = "hidden"; // фондық скроллды тоқтату
}

function closePresentation() {
  const modal = document.getElementById("presentationModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function showSlide(index) {
  if (index < 0) index = 0;
  if (index >= totalSlides) index = totalSlides - 1;
  currentSlide = index;

  const slides = document.querySelectorAll(".slide-card");
  slides.forEach((s, idx) => {
    s.classList.toggle("active", idx === currentSlide);
  });

  document.getElementById("slideCounter").innerText = `${currentSlide + 1} / ${totalSlides}`;
  document.getElementById("prevSlideBtn").disabled = (currentSlide === 0);
  document.getElementById("nextSlideBtn").disabled = (currentSlide === totalSlides - 1);
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    showSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  }
}

// Пернетақта батырмаларын бақылау (стрелкалар және Escape)
window.addEventListener("keydown", (e) => {
  const modal = document.getElementById("presentationModal");
  if (!modal || !modal.classList.contains("active")) return;

  if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
    nextSlide();
  } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
    prevSlide();
  } else if (e.key === "Escape") {
    closePresentation();
  }
});
