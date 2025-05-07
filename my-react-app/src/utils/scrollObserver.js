let observer;

const handleIntersect = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
};

export const initScrollAnimations = () => {
  // Clean up existing observer if any
  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver(handleIntersect, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observe existing elements
  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });

  return observer;
};

export const observeNewElements = (parentElement) => {
  if (!observer) return;
  
  parentElement.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });
};
