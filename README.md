# Engethermo Engenharia — Site

Site institucional da Engethermo Engenharia. Stack: **React + Vite**. Sem backend próprio, sem banco de dados.

O chat do site recebe a mensagem do visitante e o encaminha ao WhatsApp da equipe (botão "Falar com um especialista"). Não há IA nem função serverless.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Deploy

Configurado para deploy automático na Vercel a partir do GitHub (`vercel.json` já define o build). Não há variáveis de ambiente.

## Estrutura

```
client/          # Frontend React (páginas, componentes)
client/public/images/  # Imagens do site (antes hospedadas no Manus)
```
