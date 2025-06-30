import { Button } from '../Button';

export default function CTASection() {
  const isChatEnabled = true;

  const handleChatClick = () => {
    // Early return si el chat no está habilitado
    if (!isChatEnabled) {
      return;
    }

    document.getElementById('n8n-chat-target')?.click();
  };

  return (
    <section className="bg-green-100 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">¿Tienes dudas sobre qué oposición elegir?</h2>
      <p className="mb-6 text-gray-700">
        Nuestro equipo te ayuda a encontrar la opción que mejor se adapte a tu perfil.
      </p>
      <Button size="lg" onClick={handleChatClick}>
        Habla con un orientador
      </Button>
    </section>
  );
}
