export const OPEN_CONTACT_FORM_EVENT = "portfolio:open-contact-form";

export function openContactForm() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_CONTACT_FORM_EVENT));
}

type ScrollableLenis = {
  scrollTo: (target: HTMLElement, options?: { offset?: number }) => void;
};

export function scrollToContactSection(lenis?: ScrollableLenis | null) {
  const element = document.getElementById("contact");
  if (!element) return false;

  if (lenis) {
    lenis.scrollTo(element, { offset: 0 });
  } else {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return true;
}

export function scrollToContactAndOpenForm(lenis?: ScrollableLenis | null) {
  scrollToContactSection(lenis);
  window.setTimeout(() => openContactForm(), 150);
}
