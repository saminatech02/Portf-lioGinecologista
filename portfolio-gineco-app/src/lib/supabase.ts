// src/lib/supabase.ts

export interface Convenio {
  id: number;
  nome: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Paciente {
  id: number;
  nome: string;
  cpf: string | null;
  email: string | null;
  telefone: string | null;
  data_nascimento: string | null;
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Medico {
  id: number;
  nome: string;
  especialidade: string | null;
  crm: string | null;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Agendamento {
  id: number;
  paciente_id: number;
  medico_id: number;
  convenio_id: number;
  data_hora: string;
  tipo_atendimento: string | null;
  status: string;
  observacoes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Avaliacao {
  id: number;
  paciente_nome: string | null;
  comentario: string;
  nota: number;
  aprovado: boolean;
  created_at: string;
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Erro na requisição");
  }

  return data as T;
}

export const api = {
  // Convênios
  getConvenios: async () => {
    return request<Convenio[]>("/api/convenios");
  },

  // Médicos
  getMedicos: async () => {
    return request<Medico[]>("/api/medicos");
  },

  // Avaliações
  getAvaliacoes: async () => {
    return request<Avaliacao[]>("/api/avaliacoes");
  },

  createAvaliacao: async (
    avaliacao: Omit<Avaliacao, "id" | "created_at">
  ) => {
    return request<Avaliacao[]>("/api/avaliacoes", {
      method: "POST",
      body: JSON.stringify(avaliacao)
    });
  },

  sendFeedbackEmail: async ({
  patientName,
  comment,
  rating,
  publish
}: {
  patientName: string;
  comment: string;
  rating: number;
  publish: boolean;
}) => {
  return request<{ status: string; message: string }>("/api/send-feedback", {
    method: "POST",
    body: JSON.stringify({
      patientName,
      comment,
      rating,
      publish
    })
  });
},

  // Agendamentos
  createAgendamento: async (
    agendamento: Omit<Agendamento, "id" | "created_at" | "updated_at">
  ) => {
    return request<Agendamento[]>("/api/agendamentos", {
      method: "POST",
      body: JSON.stringify(agendamento)
    });
  },

  // Pacientes
  createPaciente: async (
    paciente: Omit<Paciente, "id" | "created_at" | "updated_at" | "ativo">
  ) => {
    return request<Paciente[]>("/api/pacientes", {
      method: "POST",
      body: JSON.stringify(paciente)
    });
  },

  // OTP
  sendOtp: async (email: string) => {
    return request<{ status: string; message: string }>("/api/send-otp", {
      method: "POST",
      body: JSON.stringify({ email })
    });
  },

  verifyOtp: async (email: string, otp: string) => {
    return request<{ status: string; message: string }>("/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp })
    });
  }
};