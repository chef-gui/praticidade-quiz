/**
 * Portão de path só: sem login (esta página é pública de propósito), a única
 * função é tirar o prefixo do caminho antes de pedir o arquivo, porque os
 * arquivos vivem na raiz da pasta de assets, sem saber que existe prefixo.
 *
 * BASE_PATH vazio (guia com endereço só dele) faz isto virar passagem direta,
 * sem nenhuma mudança de comportamento.
 */
export default {
  async fetch(request, env) {
    const base = env.BASE_PATH || "";
    if (!base) return env.ASSETS.fetch(request);

    const url = new URL(request.url);
    if (!url.pathname.startsWith(base)) return env.ASSETS.fetch(request);

    const local = url.pathname.slice(base.length) || "/";
    const destino = new URL(local + url.search, url);
    return env.ASSETS.fetch(new Request(destino, request));
  },
};
