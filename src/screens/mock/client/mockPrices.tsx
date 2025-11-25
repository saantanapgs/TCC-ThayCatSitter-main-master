// src/mock/client/mockPrices.ts

export interface ServicePrice {
  type: "diaria" | "pernoite";
  label: string;
  price: number;
  description: string;
}

export interface ServiceRules {
  workingHours: {
    start: string; // Ex: "08:00"
    end: string; // Ex: "20:00"
  };
  intervalMinutes: number; // Ex: 60
}

export interface ContactInfo {
  name: string; // "Thay"
  whatsapp: string; // "() 99999-9999"
}

// Simula os dados de 'configs' (Configuracoes.tsx)
// No seu app real, estes dados viriam de uma API
const MOCK_PRICES: ServicePrice[] = [
  {
    type: "diaria",
    label: "Diária CatSitter",
    price: 55.0, // PreçoDiaria de Configuracoes.tsx
    description: "Visita de 1 hora para alimentação, limpeza da caixa e brincadeiras.",
  },
  {
    type: "pernoite",
    label: "Pernoite CatSitter",
    price: 120.0, // PreçoPernoite de Configuracoes.tsx
    description: "Acompanhamento noturno (pernoite) na sua casa, das 19h às 8h do dia seguinte.",
  },
];

const MOCK_RULES: ServiceRules = {
  workingHours: {
    start: "08:00", // horaInicio de Configuracoes.tsx
    end: "20:00", // horaFim de Configuracoes.tsx
  },
  intervalMinutes: 60, // intervalo de Configuracoes.tsx
};

const MOCK_CONTACT: ContactInfo = {
    name: "Thay",
    whatsapp: "(11) 99999-9999", // whatsapp de Configuracoes.tsx
}

export { MOCK_PRICES, MOCK_RULES, MOCK_CONTACT };