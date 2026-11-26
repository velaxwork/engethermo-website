import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const WHATSAPP_NUMBER = '5543984111736';
const ICON_URL = '/images/icon-et-cropped_9f642670.png';

const buildWhatsAppLink = (text?: string) => {
  const message = text?.trim()
    ? `Olá, vim pelo site da Engethermo. ${text.trim()}`
    : 'Olá, vim pelo site da Engethermo e gostaria de falar com um especialista.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME: Message = {
  id: 'welcome',
  role: 'assistant',
  content: 'Bem-vindo à Engethermo Engenharia. Como podemos ajudar?',
};

const HANDOFF_TEXT =
  'Agradecemos o seu contato com a Engethermo Engenharia. Para oferecer um atendimento mais preciso e personalizado, convidamos você a falar diretamente com um de nossos especialistas pelo WhatsApp. Basta clicar no botão abaixo.';

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [sentText, setSentText] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sentText]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sentText !== null) return;

    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', content: text }]);
    setInput('');
    setSentText(text);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: HANDOFF_TEXT },
      ]);
    }, 600);
  };

  const handoffShown = messages.some((m) => m.content === HANDOFF_TEXT);

  return (
    <>
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-105 ring-1 ring-red-500/30"
        aria-label="Abrir atendimento"
      >
        {isOpen ? (
          <X className="w-5 h-5" strokeWidth={2.5} />
        ) : (
          <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-32px)] h-[520px] bg-[#1d1c1e] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white px-4 py-3 flex items-center justify-between gap-3 border-b border-red-900/60 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <img src={ICON_URL} alt="ENGETHERMO" className="w-9 h-9 object-contain" />
              </div>
              <div className="leading-tight">
                <h3 className="font-bold text-sm tracking-widest uppercase">Engethermo</h3>
                <p className="text-[10px] text-red-200/80 font-medium tracking-wide">Atendimento</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 bg-[#1d1c1e] custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-[12.5px] leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-red-600 text-white rounded-br-sm shadow-md'
                      : 'bg-[#262626] text-gray-100 border border-gray-700/60 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {handoffShown && (
              <div className="flex justify-start">
                <a
                  href={buildWhatsAppLink(sentText ?? undefined)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[12.5px] font-semibold rounded-lg shadow-md transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Falar com um especialista
                </a>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-800 px-3 py-3 bg-[#1d1c1e]">
            <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={sentText ? 'Continue pelo WhatsApp' : 'Digite sua mensagem...'}
                className="flex-1 px-3 py-2 bg-[#262626] border border-gray-700 text-white text-[12.5px] rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 placeholder-gray-500 transition-all disabled:opacity-50"
                disabled={sentText !== null}
              />
              <button
                type="submit"
                disabled={sentText !== null || !input.trim()}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center justify-center"
                aria-label="Enviar"
              >
                <Send className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
