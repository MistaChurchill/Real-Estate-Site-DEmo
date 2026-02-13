import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, Phone, Mic, MicOff, PhoneOff, Volume2 } from 'lucide-react';
import { SectionId, ChatMessage } from '../types';
import { generateRealEstateResponse } from '../services/geminiService';
import { GoogleGenAI, LiveServerMessage, Modality, GenerateContentResponse } from '@google/genai';

// --- Audio Utilities ---

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function createBlob(data: Float32Array) {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Component ---

const AIChat: React.FC = () => {
  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am Lux, your personal real estate assistant. How can I help you find your dream home today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Voice State
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [animateCallBtn, setAnimateCallBtn] = useState(false);
  const [showVoiceTooltip, setShowVoiceTooltip] = useState(true);

  // Refs for Chat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Refs for Audio
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isVoiceMode]);

  // Call Button Animation Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateCallBtn(true);
      setTimeout(() => setAnimateCallBtn(false), 1500);
    }, 8000); // Pulse every 8 seconds

    return () => clearInterval(interval);
  }, []);

  // --- Text Chat Logic ---

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const streamResult = await generateRealEstateResponse(userMsg.text, history);
      
      let fullText = "";
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of streamResult) {
        const contentResponse = chunk as GenerateContentResponse;
        const chunkText = contentResponse.text || '';
        fullText += chunkText;
        
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: fullText };
          return newMessages;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- Voice Chat Logic ---

  const startVoiceChat = async () => {
    setIsVoiceMode(true);
    setIsConnected(false);
    setShowVoiceTooltip(false);

    try {
      // Initialize Audio Contexts
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // Initialize Gemini Client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      // Connect to Live API
      sessionPromiseRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } },
          },
          systemInstruction: 'You are Lux, a sophisticated, warm, and helpful real estate concierge. You are speaking with a potential client. Keep responses concise, conversational, and encouraging. You are an expert on luxury properties.',
        },
        callbacks: {
          onopen: () => {
            console.log('Voice session opened');
            setIsConnected(true);

            // Process Input Audio
            if (!inputAudioContextRef.current) return;
            
            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = processor;

            processor.onaudioprocess = (e) => {
              if (isMuted) return; // Simple software mute
              
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              
              sessionPromiseRef.current?.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(processor);
            processor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Output Audio
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            
            if (base64Audio && outputAudioContextRef.current) {
               const ctx = outputAudioContextRef.current;
               nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);

               const audioBuffer = await decodeAudioData(
                 decode(base64Audio),
                 ctx,
                 24000,
                 1
               );

               const source = ctx.createBufferSource();
               source.buffer = audioBuffer;
               source.connect(ctx.destination);
               
               source.addEventListener('ended', () => {
                 audioSourcesRef.current.delete(source);
               });

               source.start(nextStartTimeRef.current);
               nextStartTimeRef.current += audioBuffer.duration;
               audioSourcesRef.current.add(source);
            }
          },
          onclose: () => {
            console.log('Voice session closed');
            endVoiceChat();
          },
          onerror: (err) => {
            console.error('Voice session error:', err);
            endVoiceChat();
          }
        }
      });

    } catch (error) {
      console.error("Failed to start voice chat", error);
      endVoiceChat();
    }
  };

  const endVoiceChat = () => {
    // Cleanup Audio Contexts
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    
    // Stop Microphone
    mediaStreamRef.current?.getTracks().forEach(track => track.stop());
    
    // Stop Processing
    if (scriptProcessorRef.current) {
        scriptProcessorRef.current.disconnect();
        scriptProcessorRef.current = null;
    }

    // Stop Playing Audio
    audioSourcesRef.current.forEach(source => source.stop());
    audioSourcesRef.current.clear();

    setIsVoiceMode(false);
    setIsConnected(false);
    nextStartTimeRef.current = 0;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Floating Button */}
      <div 
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 px-5 py-4 bg-[#AF0c15] text-white rounded-full shadow-2xl hover:bg-[#8a0910] transition-colors"
        >
          <div className="relative">
            <Sparkles className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
          <span className="font-semibold pr-1">Ask Lux AI</span>
        </button>
      </div>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right border border-slate-200 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 bg-[#AF0c15] text-white flex items-center justify-between shrink-0 relative z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-['Space_Grotesk']">Lux Assistant</h3>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isConnected && isVoiceMode ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-400'}`}></span>
                {isVoiceMode ? 'Voice Active' : 'Online'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
             {/* Voice Call Button */}
             {!isVoiceMode && (
              <div className="relative">
                 {showVoiceTooltip && (
                    <div className="absolute -bottom-10 right-0 w-max bg-[#181818] text-white text-[10px] font-bold py-1 px-3 rounded-lg shadow-lg animate-bounce z-50 pointer-events-none">
                      Have a voice chat!
                      <div className="absolute -top-1 right-3 w-2 h-2 bg-[#181818] rotate-45"></div>
                    </div>
                 )}
                 <button 
                  onClick={startVoiceChat}
                  className={`p-2 rounded-full transition-all duration-300 hover:bg-white/20 ${animateCallBtn ? 'bg-white/20 ring-2 ring-white/50' : ''}`}
                  title="Start Voice Chat"
                >
                  <Phone className={`w-5 h-5 ${animateCallBtn ? 'animate-pulse' : ''}`} />
                </button>
              </div>
             )}
             
            <button 
              onClick={() => {
                setIsOpen(false);
                if (isVoiceMode) endVoiceChat();
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative flex-1 overflow-hidden bg-slate-50">
          
          {/* VOICE MODE UI */}
          {isVoiceMode && (
            <div className="absolute inset-0 z-10 bg-[#181818] flex flex-col items-center justify-center text-white animate-in fade-in duration-500">
               {/* Background Visuals */}
               <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#AF0c15] rounded-full blur-[100px] transition-all duration-1000 ${isConnected ? 'scale-100 opacity-50' : 'scale-50 opacity-20'}`}></div>
               </div>

               <div className="relative z-10 flex flex-col items-center gap-8 w-full px-8">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold font-['Space_Grotesk']">{isConnected ? "Listening..." : "Connecting..."}</h2>
                    <p className="text-slate-400 text-sm">Speak naturally to Lux</p>
                  </div>

                  {/* Audio Visualizer */}
                  <div className="relative h-40 w-40 flex items-center justify-center">
                    <div className={`absolute inset-0 border-2 border-[#AF0c15] rounded-full transition-all duration-1000 ${isConnected ? 'animate-ping opacity-20' : 'opacity-0'}`}></div>
                    <div className={`absolute inset-4 border border-[#AF0c15] rounded-full transition-all duration-1000 delay-100 ${isConnected ? 'animate-ping opacity-30' : 'opacity-0'}`}></div>
                    <div className={`absolute inset-8 bg-gradient-to-br from-[#AF0c15] to-[#8a0910] rounded-full shadow-[0_0_30px_rgba(175,12,21,0.5)] flex items-center justify-center transition-transform duration-300 ${isConnected ? 'scale-110' : 'scale-100'}`}>
                       <Volume2 className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-6 mt-4">
                    <button 
                      onClick={toggleMute}
                      className={`p-4 rounded-full transition-all ${isMuted ? 'bg-white text-[#181818]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>
                    <button 
                      onClick={endVoiceChat}
                      className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all transform hover:scale-110 shadow-lg"
                    >
                      <PhoneOff size={28} />
                    </button>
                  </div>
               </div>
            </div>
          )}

          {/* TEXT CHAT MESSAGES */}
          <div className={`h-full overflow-y-auto p-4 space-y-4 scroll-smooth ${isVoiceMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-[#AF0c15] text-white' : 'bg-[#181818] text-white'
                  }`}
                >
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div 
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#AF0c15] text-white rounded-br-none' 
                      : 'bg-white text-[#181818] shadow-sm border border-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#181818] text-white flex items-center justify-center shrink-0">
                    <Bot size={16} />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-200">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area (Hidden during voice chat) */}
        {!isVoiceMode && (
          <div className="p-4 bg-white border-t border-slate-200 shrink-0">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about listings or locations..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#AF0c15] focus:border-transparent rounded-xl text-sm outline-none transition-all text-[#181818] placeholder-slate-400"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 p-1.5 bg-[#AF0c15] text-white rounded-lg hover:bg-[#8a0910] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              AI can make mistakes. Please verify important details.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AIChat;