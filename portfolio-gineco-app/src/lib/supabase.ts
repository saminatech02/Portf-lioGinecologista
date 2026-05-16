import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos TypeScript para as tabelas
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

// Funções helper para API
export const api = {
  // Convênios
  getConvenios: async () => {
    const { data, error } = await supabase
      .from('convenios')
      .select('*')
      .eq('ativo', true)
      .order('nome');
    if (error) throw error;
    return data as Convenio[];
  },

  // Médicos
  getMedicos: async () => {
    const { data, error } = await supabase
      .from('medicos')
      .select('*')
      .eq('ativo', true)
      .order('nome');
    if (error) throw error;
    return data as Medico[];
  },

  // Avaliações
  getAvaliacoes: async () => {
    const { data, error } = await supabase
      .from('avaliacoes')
      .select('*')
      .eq('aprovado', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Avaliacao[];
  },

  createAvaliacao: async (avaliacao: Omit<Avaliacao, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('avaliacoes')
      .insert([avaliacao])
      .select();
    if (error) throw error;
    return data;
  },

  // Agendamentos
  createAgendamento: async (agendamento: Omit<Agendamento, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('agendamentos')
      .insert([agendamento])
      .select();
    if (error) throw error;
    return data;
  },

  // Pacientes
  createPaciente: async (paciente: Omit<Paciente, 'id' | 'created_at' | 'updated_at' | 'ativo'>) => {
    const { data, error } = await supabase
      .from('pacientes')
      .insert([{ ...paciente, ativo: true }])
      .select();
    if (error) throw error;
    return data;
  },
};