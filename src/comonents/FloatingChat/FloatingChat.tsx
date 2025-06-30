// FloatingChat.tsx
import React, { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

interface FloatingChatProps {
  webhookUrl: string;
}

export const FloatingChat: React.FC<FloatingChatProps> = ({ webhookUrl }) => {
  useEffect(() => {
    if (document.getElementById('n8n-chat-target')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'n8n-chat-wrapper';

    // Configuración responsive para el wrapper
    const isMobile = window.innerWidth <= 768;
    Object.assign(wrapper.style, {
      position: 'fixed',
      bottom: isMobile ? '10px' : '20px',
      right: isMobile ? '10px' : '20px',
      left: isMobile ? '10px' : 'auto',
      width: isMobile ? 'calc(100% - 20px)' : '400px',
      height: 'fit-content',
      maxWidth: isMobile ? '100%' : '400px',
      maxHeight: isMobile ? 'calc(100vh - 100px)' : '600px',
      zIndex: '9999'
    });
    document.body.appendChild(wrapper);

    const target = document.createElement('div');
    target.id = 'n8n-chat-target';
    wrapper.appendChild(target);

    createChat({
      webhookUrl,
      target: '#n8n-chat-target',
      mode: 'window',
      showWelcomeScreen: true,
      allowFileUploads: false,
      initialMessages: [
        '¡Hola! Soy el asistente virtual de Ucademy, tengo toda la información que necesitas sobre nuestras formaciones, pregúntame todo lo que necesites. ¡Estoy aquí para resolver tus dudas!'
      ],
      i18n: {
        en: {
          title: 'Bienvenido a Ucademy!👋🏼',
          subtitle: '',
          getStarted: 'Nueva conversación',
          inputPlaceholder: 'escribe un mensaje...',
          footer: '',
          closeButtonTooltip: ''
        }
      }
    });

    // Ajustar el chat cuando cambie el tamaño de la ventana
    const handleResize = () => {
      const isMobileNow = window.innerWidth <= 768;
      Object.assign(wrapper.style, {
        bottom: isMobileNow ? '10px' : '20px',
        right: isMobileNow ? '10px' : '20px',
        left: isMobileNow ? '10px' : 'auto',
        width: isMobileNow ? 'calc(100% - 20px)' : '400px',
        height: isMobileNow ? 'calc(100vh - 100px)' : '600px',
        maxWidth: isMobileNow ? '100%' : '400px',
        maxHeight: isMobileNow ? 'calc(100vh - 100px)' : '600px'
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      wrapper.remove();
    };
  }, [webhookUrl]);

  return null;
};
