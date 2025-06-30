import { useEffect, useState } from 'react';
import './App.css';
import { FloatingChat } from './comonents/FloatingChat/FloatingChat';
import {
  Card,
  Statistic,
  Rate,
  Avatar,
  Typography,
  Row,
  Col,
  Space,
  Badge,
  Button as AntButton
} from 'antd';
import {
  RocketOutlined,
  TrophyOutlined,
  UserOutlined,
  BookOutlined,
  StarOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  TeamOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

function App() {
  const [isChatEnabled, setIsChatEnabled] = useState(false);

  const triggerChat = (event?: React.MouseEvent | MouseEvent) => {
    // Prevenir comportamiento por defecto y propagación
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log('🚀 Intentando activar chat...', { isChatEnabled, event: event?.type });

    // Estrategia 1: Buscar elemento con clase chat-window-toggle
    const chatWindowToggle = document.getElementsByClassName('chat-window-toggle')?.[0];
    if (chatWindowToggle) {
      console.log('✅ Encontrado chat-window-toggle, haciendo click...');
      (chatWindowToggle as HTMLElement).click();
      return;
    }

    // Estrategia 2: Buscar el target de n8n directamente
    const n8nTarget = document.getElementById('n8n-chat-target');
    if (n8nTarget) {
      console.log('✅ Encontrado n8n-chat-target, haciendo click...');
      (n8nTarget as HTMLElement).click();
      return;
    }

    // Estrategia 3: Buscar cualquier botón del chat
    const chatButton = document.querySelector(
      '[data-key="chat"] button, .n8n-chat button, button[class*="chat"]'
    );
    if (chatButton) {
      console.log('✅ Encontrado botón del chat, haciendo click...');
      (chatButton as HTMLElement).click();
      return;
    }

    // Estrategia 4: Intentar después de un pequeño delay (para elementos que se cargan dinámicamente)
    console.log('⏳ No se encontró elemento, intentando después de 500ms...');
    setTimeout(() => {
      const delayedToggle =
        document.getElementsByClassName('chat-window-toggle')?.[0] ||
        document.getElementById('n8n-chat-target') ||
        document.querySelector('[data-key="chat"] button, .n8n-chat button, button[class*="chat"]');

      if (delayedToggle) {
        console.log('✅ Elemento encontrado con delay, haciendo click...');
        (delayedToggle as HTMLElement).click();
      } else {
        console.error('❌ No se pudo encontrar ningún elemento del chat para activar');
        // Fallback: mostrar alerta o abrir WhatsApp/email
        alert(
          '¡Hola! El chat se está cargando. Si tienes dudas urgentes, puedes escribirnos por WhatsApp o email.'
        );
      }
    }, 500);
  };

  // Función wrapper para los botones de Ant Design
  const handleChatClick = (event: React.MouseEvent) => {
    console.log('🎯 Click detectado en botón:', event.currentTarget);
    console.log('📱 Tipo de evento:', event.type);
    console.log('🔍 Es touch device:', 'ontouchstart' in window);
    triggerChat(event);
  };

  useEffect(() => {
    console.log('🔄 Configurando detector de chat...', { isChatEnabled });

    // Función para verificar si el chat está visible
    const checkChatVisibility = () => {
      const chatWrapper = document.getElementById('n8n-chat-wrapper');
      const isVisible =
        chatWrapper &&
        chatWrapper.style.display !== 'none' &&
        chatWrapper.offsetWidth > 0 &&
        chatWrapper.offsetHeight > 0;

      console.log('👁️ Estado del chat:', { isVisible, chatWrapper });
      setIsChatEnabled(!!isVisible);

      return !!isVisible;
    };

    // Verificar estado inicial
    const initialState = checkChatVisibility();
    console.log('🎯 Estado inicial del chat:', initialState);

    // Crear un observer para detectar cambios en el DOM
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          const currentState = checkChatVisibility();
          console.log('🔍 Observer detectó cambio:', { currentState, mutation });
        }
      });
    });

    // Observar cambios en el body y en el chat wrapper si existe
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // También usar un interval para verificar periódicamente
    const intervalId = setInterval(() => {
      checkChatVisibility();
    }, 1000);

    return () => {
      console.log('🧹 Limpiando detector de chat...');
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []); // Solo ejecutar una vez al montar el componente

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)',
        minHeight: '100vh'
      }}>
      {/* Botón de Debug Temporal - Solo para testing */}
      <div
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 10000,
          background: '#ff4757',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(255, 71, 87, 0.3)'
        }}
        onClick={event => {
          console.log('🔍 ESTADO DEBUG:');
          console.log('isChatEnabled:', isChatEnabled);
          console.log('chat-window-toggle:', document.getElementsByClassName('chat-window-toggle'));
          console.log('n8n-chat-target:', document.getElementById('n8n-chat-target'));
          console.log('window.innerWidth:', window.innerWidth);
          console.log('¿Es móvil?:', window.innerWidth <= 768);
          console.log('Elemento clicked:', event.currentTarget);
          handleChatClick(event as React.MouseEvent);
        }}>
        🔍 DEBUG CHAT
      </div>

      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
          padding: '60px 16px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
          <Badge.Ribbon text="¡Nuevo!" color="volcano">
            <Title
              level={1}
              style={{
                color: 'white',
                fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                fontWeight: 900,
                marginBottom: '24px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                lineHeight: '1.2'
              }}>
              ¡Espabila, que no hay tiempo que perder! ⚡️
            </Title>
          </Badge.Ribbon>

          <Paragraph
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              maxWidth: '800px',
              margin: '0 auto 40px',
              lineHeight: '1.6',
              padding: '0 16px'
            }}>
            Decide qué quieres hacer con tu vida. Somos la academia online que te lleva directo al
            éxito, sin rodeos ni pérdidas de tiempo.{' '}
            <Text strong style={{ color: '#fbbf24' }}>
              ¡Y funciona!
            </Text>
          </Paragraph>

          <Space size="large" wrap style={{ justifyContent: 'center', width: '100%' }}>
            <AntButton
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={handleChatClick}
              style={{
                background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                border: 'none',
                height: 'clamp(50px, 8vw, 60px)',
                fontSize: 'clamp(14px, 3vw, 18px)',
                borderRadius: '30px',
                boxShadow: '0 8px 25px rgba(251, 191, 36, 0.4)',
                fontWeight: 'bold',
                padding: '0 clamp(20px, 4vw, 40px)',
                minWidth: '200px'
              }}>
              ¡Empezar ahora mismo!
            </AntButton>

            <AntButton
              size="large"
              icon={<HeartOutlined />}
              onClick={handleChatClick}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'white',
                height: 'clamp(50px, 8vw, 60px)',
                fontSize: 'clamp(14px, 3vw, 16px)',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)',
                padding: '0 clamp(20px, 4vw, 30px)',
                minWidth: '160px'
              }}>
              ¿Hablamos? 💬
            </AntButton>
          </Space>
        </div>
      </div>

      {/* Estadísticas Section */}
      <div style={{ padding: 'clamp(40px, 8vw, 60px) 16px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title
            level={2}
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(30px, 6vw, 50px)',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
            }}>
            No lo decimos nosotros...{' '}
            <span style={{ color: '#f59e0b' }}>¡Los números hablan! 📊</span>
          </Title>

          <Row gutter={[16, 24]} justify="center">
            <Col xs={24} sm={8}>
              <Card
                hoverable
                style={{
                  textAlign: 'center',
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  height: '100%'
                }}>
                <Statistic
                  title={
                    <Text style={{ fontSize: 'clamp(12px, 2.5vw, 16px)', color: '#64748b' }}>
                      Alumnos que confían en nosotros
                    </Text>
                  }
                  value={4500}
                  prefix={<TeamOutlined style={{ color: '#10b981' }} />}
                  suffix="+"
                  valueStyle={{
                    color: '#10b981',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: 'bold'
                  }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                hoverable
                style={{
                  textAlign: 'center',
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  height: '100%'
                }}>
                <Statistic
                  title={
                    <Text style={{ fontSize: 'clamp(12px, 2.5vw, 16px)', color: '#64748b' }}>
                      Profesores expertos
                    </Text>
                  }
                  value={250}
                  prefix={<UserOutlined style={{ color: '#3b82f6' }} />}
                  suffix="+"
                  valueStyle={{
                    color: '#3b82f6',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: 'bold'
                  }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                hoverable
                style={{
                  textAlign: 'center',
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  height: '100%'
                }}>
                <Statistic
                  title={
                    <Text style={{ fontSize: 'clamp(12px, 2.5vw, 16px)', color: '#64748b' }}>
                      Horas de contenido
                    </Text>
                  }
                  value={8500}
                  prefix={<ClockCircleOutlined style={{ color: '#8b5cf6' }} />}
                  suffix="+"
                  valueStyle={{
                    color: '#8b5cf6',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: 'bold'
                  }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Por qué elegirnos Section */}
      <div
        style={{
          padding: 'clamp(60px, 10vw, 80px) 16px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
        }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title
            level={2}
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(40px, 8vw, 60px)',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
            }}>
            Hola, mi nombre es <Text style={{ color: '#10b981' }}>Ucademy</Text> 🧠
          </Title>

          <Title
            level={3}
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(30px, 6vw, 40px)',
              color: '#64748b',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)'
            }}>
            Y soy la hostia porque:
          </Title>

          <Row gutter={[16, 24]}>
            <Col xs={24} lg={8}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  borderRadius: '20px',
                  border: 'none',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)'
                }}
                bodyStyle={{ padding: 'clamp(20px, 4vw, 30px)' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <Avatar
                    size={64}
                    style={{ background: 'rgba(251, 191, 36, 0.2)' }}
                    icon={<ThunderboltOutlined style={{ color: '#f59e0b' }} />}
                  />
                </div>
                <Title
                  level={4}
                  style={{
                    color: '#92400e',
                    textAlign: 'center',
                    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                    marginBottom: '16px'
                  }}>
                  Tengo un método infalible 💥
                </Title>
                <Paragraph
                  style={{
                    color: '#92400e',
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                  Para conquistarte y para que consigas lo que quieres. No estoy aquí para que
                  pierdas el tiempo. Mi enfoque está en{' '}
                  <Text strong>hacerte el camino rápido y sencillo.</Text>
                </Paragraph>
                <AntButton
                  type="primary"
                  block
                  onClick={handleChatClick}
                  style={{
                    background: '#92400e',
                    border: 'none',
                    borderRadius: '12px',
                    height: 'clamp(40px, 6vw, 45px)',
                    fontWeight: 'bold',
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }}>
                  ¿Hablamos? 🚀
                </AntButton>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  borderRadius: '20px',
                  border: 'none',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%)'
                }}
                bodyStyle={{ padding: 'clamp(20px, 4vw, 30px)' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <Avatar
                    size={64}
                    style={{ background: 'rgba(59, 130, 246, 0.2)' }}
                    icon={<HeartOutlined style={{ color: '#2563eb' }} />}
                  />
                </div>
                <Title
                  level={4}
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                    marginBottom: '16px'
                  }}>
                  También sé escuchar 👂🏻
                </Title>
                <Paragraph
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                  Puedes contarme tus dudas cuando quieras. Estoy a tu lado siempre y creo en tu
                  talento. Conmigo vas a tener el{' '}
                  <Text strong style={{ color: 'white' }}>
                    acompañamiento que necesitas.
                  </Text>
                </Paragraph>
                <AntButton
                  type="primary"
                  block
                  onClick={handleChatClick}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '12px',
                    height: 'clamp(40px, 6vw, 45px)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }}>
                  ¿Hablamos? 💙
                </AntButton>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  borderRadius: '20px',
                  border: 'none',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(135deg, #f3e8ff 0%, #8b5cf6 100%)'
                }}
                bodyStyle={{ padding: 'clamp(20px, 4vw, 30px)' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <Avatar
                    size={64}
                    style={{ background: 'rgba(139, 92, 246, 0.2)' }}
                    icon={<BookOutlined style={{ color: '#7c3aed' }} />}
                  />
                </div>
                <Title
                  level={4}
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                    marginBottom: '16px'
                  }}>
                  Y no soy tóxico, pero... 😏
                </Title>
                <Paragraph
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                  ¡Te sigo a todas partes! Podemos vernos desde tu móvil, tablet u ordenador.
                  <Text strong style={{ color: 'white' }}>
                    Acceso 24/7 donde quieras.
                  </Text>
                </Paragraph>
                <AntButton
                  type="primary"
                  block
                  onClick={handleChatClick}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '12px',
                    height: 'clamp(40px, 6vw, 45px)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }}>
                  ¿Hablamos? 💜
                </AntButton>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Elige tu camino Section */}
      <div style={{ padding: 'clamp(60px, 10vw, 80px) 16px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title
            level={2}
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(40px, 8vw, 60px)',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
            }}>
            Decide qué quieres hacer con tu vida ⚡️
          </Title>

          <Row gutter={[16, 24]}>
            {[
              {
                title: 'Acceso a Universidad 🎓',
                description: 'Prepárate para la prueba de acceso. Mayores de 25 y 45 años.',
                icon: <BookOutlined />,
                color: '#10b981',
                gradient: 'linear-gradient(135deg, #d1fae5 0%, #10b981 100%)'
              },
              {
                title: 'Oposiciones 🏛️',
                description: 'Consigue tu plaza fija. Simulacros reales y temarios actualizados.',
                icon: <TrophyOutlined />,
                color: '#3b82f6',
                gradient: 'linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%)'
              },
              {
                title: 'FP Online 📱',
                description: 'Títulos oficiales 100% online. Estudia a tu ritmo.',
                icon: <StarOutlined />,
                color: '#8b5cf6',
                gradient: 'linear-gradient(135deg, #f3e8ff 0%, #8b5cf6 100%)'
              }
            ].map((item, index) => (
              <Col xs={24} lg={8} key={index}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    borderRadius: '20px',
                    border: 'none',
                    boxShadow: '0 15px 50px rgba(0,0,0,0.1)',
                    background: item.gradient,
                    transition: 'all 0.3s ease'
                  }}
                  bodyStyle={{ padding: 'clamp(30px, 5vw, 40px) clamp(20px, 4vw, 30px)' }}>
                  <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 4vw, 24px)' }}>
                    <Avatar
                      size={window.innerWidth < 768 ? 64 : 80}
                      style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <div style={{ color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                        {item.icon}
                      </div>
                    </Avatar>
                  </div>
                  <Title
                    level={4}
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      marginBottom: '16px',
                      fontSize: 'clamp(1.1rem, 3vw, 1.25rem)'
                    }}>
                    {item.title}
                  </Title>
                  <Paragraph
                    style={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: 'clamp(14px, 2.5vw, 16px)',
                      textAlign: 'center',
                      marginBottom: 'clamp(24px, 5vw, 30px)',
                      lineHeight: '1.5'
                    }}>
                    {item.description}
                  </Paragraph>
                  <AntButton
                    type="primary"
                    size="large"
                    block
                    onClick={handleChatClick}
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderRadius: '15px',
                      height: 'clamp(45px, 7vw, 50px)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 'clamp(14px, 2.5vw, 16px)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    ¡Quiero empezar! 🚀
                  </AntButton>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Testimonios Section */}
      <div
        style={{
          padding: 'clamp(60px, 10vw, 80px) 16px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
        }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title
            level={2}
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
            }}>
            Y ellos también me quieren... 😍
          </Title>
          <Paragraph
            style={{
              textAlign: 'center',
              fontSize: 'clamp(16px, 3vw, 18px)',
              color: '#64748b',
              marginBottom: 'clamp(40px, 8vw, 60px)',
              padding: '0 16px'
            }}>
            Lo sé, soy demasiado maravilloso para ser real. 😌 Pero aquí no hay trampa ni cartón.
          </Paragraph>

          <Row gutter={[16, 24]}>
            {[
              {
                name: 'Sara González',
                comment:
                  'Temario muy bueno, las clases me están ayudando mucho y la plataforma es muy fácil de usar. Te ofrecen garantía de plaza, lo que es un punto muy importante.',
                rating: 5,
                course: 'Oposiciones'
              },
              {
                name: 'Ana Teresa Calvo',
                comment:
                  'Llevo con la academia un año preparando la oposición de maestros y he de decir que estoy muy contenta con la inversión que he hecho.',
                rating: 5,
                course: 'Educación'
              },
              {
                name: 'Víctor José Valdés',
                comment:
                  'Es una plataforma muy buena, interactiva, contestan todas tus preguntas fácilmente, y estudias en el tiempo que elijas.',
                rating: 5,
                course: 'FP Online'
              }
            ].map((testimonial, index) => (
              <Col xs={24} lg={8} key={index}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    borderRadius: '20px',
                    border: 'none',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease'
                  }}
                  bodyStyle={{ padding: 'clamp(20px, 4vw, 30px)' }}>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Avatar size={64} style={{ background: '#10b981' }}>
                      {testimonial.name.charAt(0)}
                    </Avatar>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <Rate disabled defaultValue={testimonial.rating} />
                  </div>
                  <Paragraph
                    style={{
                      fontSize: 'clamp(14px, 2.5vw, 15px)',
                      fontStyle: 'italic',
                      marginBottom: '20px',
                      lineHeight: '1.6'
                    }}>
                    "{testimonial.comment}"
                  </Paragraph>
                  <div style={{ textAlign: 'center' }}>
                    <Text strong style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }}>
                      – {testimonial.name}
                    </Text>
                    <br />
                    <Badge color="#10b981" text={testimonial.course} />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* CTA Final Section */}
      <div
        style={{
          padding: 'clamp(60px, 10vw, 80px) 16px',
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
          textAlign: 'center',
          color: 'white'
        }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title
            level={2}
            style={{
              color: 'white',
              marginBottom: '20px',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
            }}>
            Y ahora que me quieres, ¿Hablamos? 😉
          </Title>
          <Title
            level={3}
            style={{
              color: '#fbbf24',
              marginBottom: '30px',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)'
            }}>
            Únete a la educación del futuro
          </Title>
          <Paragraph
            style={{
              fontSize: 'clamp(16px, 3vw, 18px)',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '40px',
              lineHeight: '1.6',
              padding: '0 16px'
            }}>
            Somos lo que aprendemos. Y un día se nos ocurrió que había margen de mejora. Es posible
            aprender más. Más fácil y más rápido.
            <Text strong style={{ color: '#fbbf24' }}>
              {' '}
              ¡Y no vamos a parar! 🚀
            </Text>
          </Paragraph>

          <Space size="large" wrap style={{ justifyContent: 'center', width: '100%' }}>
            <AntButton
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={handleChatClick}
              style={{
                background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                border: 'none',
                height: 'clamp(50px, 8vw, 60px)',
                fontSize: 'clamp(14px, 3vw, 18px)',
                borderRadius: '30px',
                boxShadow: '0 8px 25px rgba(251, 191, 36, 0.4)',
                fontWeight: 'bold',
                padding: '0 clamp(20px, 4vw, 40px)',
                minWidth: '200px'
              }}>
              ¡Sí, quiero empezar YA! 💫
            </AntButton>

            <AntButton
              size="large"
              icon={<HeartOutlined />}
              onClick={handleChatClick}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'white',
                height: 'clamp(50px, 8vw, 60px)',
                fontSize: 'clamp(14px, 3vw, 16px)',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)',
                padding: '0 clamp(15px, 3vw, 30px)',
                minWidth: '160px'
              }}>
              Cuéntame más 🤔
            </AntButton>
          </Space>
        </div>
      </div>

      <FloatingChat webhookUrl="https://call-center.app.n8n.cloud/webhook/6b13b9a0-f409-471c-a1ba-5ae3caeb93d4/chat" />
    </div>
  );
}

export default App;
