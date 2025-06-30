import { Button } from '../Button';

export default function HeroSection() {
  return (
    <section className="text-center py-16 px-4">
      <h2 className="text-4xl font-extrabold mb-4">Prepárate con los mejores para tu futuro</h2>
      <p className="text-lg max-w-2xl mx-auto mb-6">
        Especialistas en oposiciones de todos los niveles. Accede a formaciones actualizadas,
        acompañamiento experto y una app de estudio diseñada para que apruebes.
      </p>
      <Button size="lg" onClick={() => document.getElementById('n8n-chat-target')?.click()}>
        Quiero empezar
      </Button>
    </section>
  );
}
