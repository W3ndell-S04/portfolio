/**
 * VALHALLA OS v4.0.2 - CORE SYSTEM
 * Operator: Wendell Soares
 */

const GITHUB_USER = "W3ndell-S04";

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

let isPanic = false;
let matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';

// --- RENDERIZAR LINKS SOCIAIS (CORRIGIDO) ---
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
    
    // Forçar renderização dos ícones após inserir o HTML
    if (window.lucide) {
        lucide.createIcons();
    }
}

// --- RENDERIZAR REPOS GITHUB (CORRIGIDO) ---
async function fetchGithubRepos() {
    const container = document.getElementById('github-projects');
    if (!container) return;

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=4`);
        const repos = await response.json();

        container.innerHTML = repos.map(repo => `
            <a href="${repo.html_url}" target="_blank" class="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-[#00FF41]/30 hover:bg-[#00FF41]/5 transition-all group">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-[#00FF41] font-mono text-[10px] font-bold truncate pr-2">${repo.name.toUpperCase()}</span>
                    <i data-lucide="external-link" class="size-3 opacity-30 group-hover:opacity-100 transition-opacity"></i>
                </div>
                <p class="text-[9px] text-gray-500 line-clamp-2 mb-3">${repo.description || 'No documentation found.'}</p>
                <div class="flex items-center gap-3 mt-auto text-[8px] font-mono opacity-40 uppercase">
                    <span>${repo.language || 'Data'}</span>
                    <span>★ ${repo.stargazers_count}</span>
                </div>
            </a>
        `).join('');
        
        // Renderizar ícones dos cards do GitHub
        if (window.lucide) {
            lucide.createIcons();
        }
    } catch (e) {
        container.innerHTML = `<p class="text-red-500 font-mono text-[10px]">GitHub API offline.</p>`;
    }
}

// --- TERMINAL ENGINE ---
const commands = {
    help: "Available: ls, cat [file], open [target], nmap, clear, status, projects",
    ls: "Files: about.txt, skills.txt, certifications.pdf, writeups/ Targets: instagram, linkedin, github, cv",
    whoami: () => `Identify: ${profile.name} // Status: Student`,
    status: () => `[SYSTEM] Up. Security: ${isPanic ? 'BREACHED' : 'STABLE'}`,
    clear: () => { document.getElementById('terminal-output').innerHTML = ""; return ""; },
    projects: () => "Fetching GitHub data... See dashboard below.",
   cd: (target) => {
        // Remove a barra "/" caso o usuário digite "cd instagram/"
        const cleanTarget = target ? target.replace('/', '') : null;
        
        const link = links.find(l => l.key === cleanTarget);
        if (link) {
            window.open(link.url, '_blank');
            return `Navegando para ${link.title}...`;
        }
        return `bash: cd: ${target}: No such directory.`;
    },
    cat: (file) => {
        if (file === "about.txt") return profile.tagline;
        if (file === "skills.txt") return "Python, Linux, Networking, PenTesting.";
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
    fetchGithubRepos();
    
    // Iniciar ícones estáticos (do header e certificações)
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