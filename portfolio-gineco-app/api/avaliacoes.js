import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async function handler(req, res) {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
        return res.status(500).json({
            error: "Variáveis do Supabase não configuradas no servidor"
        });
    }

    if (req.method === "GET") {
        try {
            const { data, error } = await supabase
                .from("avaliacoes")
                .select("*")
                .eq("aprovado", true)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Erro ao buscar avaliações:", error);

                return res.status(500).json({
                    error: "Erro ao buscar avaliações"
                });
            }

            return res.status(200).json(data);
        } catch (error) {
            console.error("Erro interno ao buscar avaliações:", error);

            return res.status(500).json({
                error: "Erro interno no servidor"
            });
        }
    }

    if (req.method === "POST") {
        try {
            const { paciente_nome, comentario, nota, aprovado } = req.body;

            if (!paciente_nome || !comentario || !nota) {
                return res.status(400).json({
                    error: "Nome, comentário e nota são obrigatórios"
                });
            }

            const { data, error } = await supabase
                .from("avaliacoes")
                .insert([
                    {
                        paciente_nome: paciente_nome.trim(),
                        comentario: comentario.trim(),
                        nota: Number(nota),
                        aprovado: Boolean(aprovado)
                    }
                ])
                .select()
                .single();

            if (error) {
                console.error("Erro ao criar avaliação:", error);

                return res.status(500).json({
                    error: "Erro ao enviar avaliação"
                });
            }

            return res.status(201).json(data);
        } catch (error) {
            console.error("Erro interno ao criar avaliação:", error);

            return res.status(500).json({
                error: "Erro interno no servidor"
            });
        }
    }

    return res.status(405).json({
        error: "Método não permitido"
    });
}