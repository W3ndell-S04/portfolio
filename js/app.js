/**
 * VALHALLA OS v4.0.2 - CORE SYSTEM
 * Operator: Wendell Soares
 */

const profile = {
    name: "Wendell Soares",
    tagline: "Cybersecurity Student focused on Infrastructure, Red Teaming, and Digital Defense.",
    username: "@WENDELLS04"
};

const links = [
    { title: "Instagram", url: "https://instagram.com/wendells04", icon: "instagram", key: "instagram" },
    { title: "LinkedIn", url: "https://www.linkedin.com/in/wendell-soares/", icon: "linkedin", key: "linkedin" },
    { title: "GitHub Repos", url: "https://github.com/W3ndell-S04", icon: "github", key: "github" },
    { title: "Currículo VITAE", url: "https://drive.google.com/file/d/1xekSi3TsU8cMHBkqMcNkEbIIoWZUv0lX/view?usp=sharing", icon: "file-text", key: "cv" }
];

// --- PROJETOS DESTACADOS (LIVE DEMOS) ---
const projects = [
    {
        name: "FINFLOW",
        key: "finflow",
        url: "https://finflow-ew43.vercel.app/",
        desc: "PWA para controle financeiro, permitindo gerenciar receitas, despesas e acompanhar a organização das finanças pessoais.",
        tags: ["PWA", "FINANCEIRO"]
    },
    {
        name: "WHEY PRO ANALYZER",
        key: "whey",
        url: "https://whey-pro-analyzer.vercel.app/",
        desc: "análise nutricional e econômica de suplementos proteicos, permitindo avaliar pureza, custo-benefício e integridade dos produtos.",
        tags: ["PWA", "ANALYSIS"]
    },
    {
        name: "CALCASSI",
        key: "calcassi",
        url: "https://calcassi.vercel.app/",
        desc: "Mecanismo de cálculo especializado para estimativas técnicas rápidas.",
        tags: ["CALC", "UTILITARIO"]
    },
    {
        name: "INSTA SHADOW ANALYZER",
        key: "shadow",
        url: "https://insta-shadow-analyzer1-0.vercel.app/",
        desc: "analisar seguidores do Instagram e identificar quem você segue, mas não te segue de volta — de forma simples, rápida e segura..",
        tags: ["INSTAGRAM", "SOCIAL"]
    },
    {
        name: "BB TECH HUB",
        key: "bbhub",
        url: "https://bb-tech-hub.vercel.app/",
        desc: "Centralizador de estudos para concurso BB TI.",
        tags: ["ESTUDOS", "HUB"]
    },
    {
        name: "COLLECTION ONE",
        key: "collection",
        url: "https://collection-one-beta.vercel.app/",
        desc: "Catalogar Coleções.",
        tags: ["COLEÇÃO", "INVENTÁRIO"]
    }
];

let isPanic = false;
let matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';

// --- RENDERIZAR LINKS SOCIAIS ---
function renderSocialLinks() {
    const container = document.getElementById('links-container');
    if (!container) return;

    container.innerHTML = links.map(link => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-between p-3 bg-white/5 border border-white/5 tech-cut hover:border-[#00FF41]/40 hover:bg-[#00FF41]/5 transition-all duration-300">
            <div class="flex items-center gap-4">
                <div class="flex items-center justify-center size-10 rounded bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20 group-hover:scale-105 transition-transform">
                    <i data-lucide="${link.icon}" class="size-5"></i>
                </div>
                <span class="text-xs sm:text-sm font-mono tracking-wider group-hover:translate-x-1 transition-transform uppercase">${link.title}</span>
            </div>
            <i data-lucide="chevron-right" class="size-4 opacity-20 group-hover:opacity-100 group-hover:text-[#00FF41]"></i>
        </a>
    `).join('');
    
    if (window.lucide) {
        lucide.createIcons();
    }
}

// --- RENDERIZAR PROJETOS (LIVE DEMOS) ---
function renderFeaturedProjects() {
    const container = document.getElementById('github-projects');
    if (!container) return;

    container.innerHTML = projects.map(proj => `
        <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-[#00FF41]/40 hover:bg-[#00FF41]/5 transition-all group flex flex-col justify-between">
            <div>
                <div class="flex justify-between items-start mb-2">
                    <span class="text-[#00FF41] font-mono text-[11px] font-bold truncate pr-2">${proj.name}</span>
                    <i data-lucide="external-link" class="size-3 opacity-30 group-hover:opacity-100 group-hover:text-[#00FF41] transition-opacity shrink-0"></i>
                </div>
                <p class="text-[10px] text-gray-400 line-clamp-2 mb-3 leading-relaxed">${proj.desc}</p>
            </div>
            <div class="flex items-center gap-2 mt-auto text-[8px] font-mono opacity-50 uppercase">
                ${proj.tags.map(tag => `<span class="bg-[#00FF41]/10 text-[#00FF41] px-1.5 py-0.5 rounded border border-[#00FF41]/20">${tag}</span>`).join('')}
            </div>
        </a>
    `).join('');

    if (window.lucide) {
        lucide.createIcons();
    }
}

// --- TERMINAL ENGINE ---
const commands = {
    help: "Available: ls, cat [file], cd [target], nmap, clear, status, projects",
    ls: "Links: instagram/, linkedin/, github/, cv/ | Projects: finflow/, whey/, calcassi/, shadow/, bbhub/, collection/ | Files: about.txt, skills.txt, port-scanner-article.txt",
    whoami: () => `Identify: ${profile.name} // Status: Student`,
    status: () => `[SYSTEM] Up. Security: ${isPanic ? 'BREACHED' : 'STABLE'}`,
    clear: () => { document.getElementById('terminal-output').innerHTML = ""; return ""; },
    projects: () => "See the Live Demos dashboard below for active deployments.",
    cd: (target) => {
        if (!target) return "Usage: cd [target_directory]";
        const cleanTarget = target.replace('/', '').toLowerCase();
        
        // Buscar em Links Sociais
        const link = links.find(l => l.key === cleanTarget);
        if (link) {
            window.open(link.url, '_blank');
            return `Navegando para ${link.title}...`;
        }

        // Buscar em Projetos
        const proj = projects.find(p => p.key === cleanTarget);
        if (proj) {
            window.open(proj.url, '_blank');
            return `Abrindo projeto ${proj.name}...`;
        }

        if (cleanTarget === "artigo" || cleanTarget === "port-scanner-article.txt") {
            window.open("https://medium.com/@wendells04/criando-e-utilizando-um-port-scanner-em-python-4824d27a4755", '_blank');
            return "Redirecionando para o artigo no Medium...";
        }

        return `bash: cd: ${target}: No such directory.`;
    },
    cat: (file) => {
        if (file === "about.txt") return profile.tagline;
        if (file === "skills.txt") return "Python, Linux, Networking, PenTesting, Infrastructure & Red Teaming.";
        if (file === "port-scanner-article.txt") {
            window.open("https://medium.com/@wendells04/criando-e-utilizando-um-port-scanner-em-python-4824d27a4755", '_blank');
            return "Abrindo artigo no Medium: 'Criando e utilizando um Port Scanner em Python'...";
        }
        return `cat: ${file}: Permission denied or file not found.`;
    },
    nmap: async () => {
        const logs = ["Starting scan...", "Target: 127.0.0.1", "Port 80: HTTP", "Port 443: HTTPS", "Scan complete."];
        for(let l of logs) { await writeLog(l, "text-blue-400"); }
        return "";
    }
};

async function writeLog(text, color = "text-[#889999]") {
    const output = document.getElementById('terminal-output');
    if (!output) return;
    const p = document.createElement('p');
    p.className = `${color} leading-snug`;
    p.innerHTML = `<span class="opacity-30">#</span> ${text}`;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
    await new Promise(r => setTimeout(r, 120));
}

function initTerminal() {
    const input = document.getElementById('terminal-input');
    if (!input) return;
    
    input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            const [cmd, arg] = val.toLowerCase().split(" ");
            input.value = "";
            if (!val) return;
            await writeLog(`${val}`, "text-white");
            if (commands[cmd]) {
                const res = typeof commands[cmd] === 'function' ? await commands[cmd](arg) : commands[cmd];
                if (res) await writeLog(res, "text-[#00FF41]");
            } else {
                await writeLog(`Error: Command '${cmd}' unknown.`, "text-red-500");
            }
        }
    });
}

// --- MATRIX & UTILS ---
function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let cw = canvas.width = window.innerWidth, ch = canvas.height = window.innerHeight;
    let columns = Math.floor(cw / 18), drops = Array(columns).fill(1);
    function draw() {
        ctx.fillStyle = 'rgba(5, 8, 6, 0.15)';
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = isPanic ? '#ff0000' : '#00FF41';
        ctx.font = '15px monospace';
        drops.forEach((y, i) => {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            ctx.fillText(text, i * 18, y * 18);
            if (y * 18 > ch && Math.random() > 0.98) drops[i] = 0;
            drops[i]++;
        });
    }
    setInterval(draw, 50);
}

window.addEventListener('load', () => {
    initMatrix();
    initTerminal();
    renderSocialLinks();
    renderFeaturedProjects();
    
    if (window.lucide) {
        lucide.createIcons();
    }

    (async () => {
        await writeLog("BOOTING VALHALLA OS...", "text-[#00FF41]");
        await writeLog("STATUS: SECURE // OPERATOR: WENDELL", "text-blue-500");
    })();

    const typeWriter = (id, text, speed) => {
        let i = 0; const el = document.getElementById(id);
        if(!el) return;
        const t = () => { if(i < text.length){ el.innerHTML += text.charAt(i); i++; setTimeout(t, speed); } };
        t();
    };
    typeWriter('typewriter-name', profile.name, 80);
    setTimeout(() => typeWriter('typewriter-tagline', profile.tagline, 30), 1200);
});

// EVENTOS
document.getElementById('panic-btn')?.addEventListener('click', () => {
    isPanic = !isPanic;
    document.body.classList.toggle('panic-mode');
    const userDisplay = document.getElementById('username-display');
    if (userDisplay) userDisplay.innerText = isPanic ? "!!! SECURITY BREACH !!!" : `OPERATOR: ${profile.username}`;
    matrixChars = isPanic ? '01' : '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';
});

document.getElementById('share-btn')?.addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({ title: profile.name, url: window.location.href });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    }
});