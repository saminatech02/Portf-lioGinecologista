async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || "Erro na requisição");
  }

  return data;
}

export const api = {
  async getAvaliacoes() {
    return request("/api/avaliacoes");
  },

  async createAvaliacao(avaliacao) {
    return request("/api/avaliacoes", {
      method: "POST",
      body: JSON.stringify(avaliacao)
    });
  }
};