// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    const icon = hamburger.querySelector('i');

    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Scroll Progress Bar
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    progressBar.style.width = progress + '%';
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

reveals.forEach(reveal => {
    revealObserver.observe(reveal);
});

// Active Nav Link & Side Dot on Scroll
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-link');
const sideDots = document.querySelectorAll('.side-dot');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');

                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });

            sideDots.forEach(dot => {
                dot.classList.remove('active');

                if (dot.getAttribute('href') === `#${id}`) {
                    dot.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    if (section.id) {
        navObserver.observe(section);
    }
});

// Skills Filter Bar Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(button => {
            button.classList.remove('active');
        });

        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        skillCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Terminal Typing Animation
const terminalBody = document.getElementById('terminal-body');

const terminalLines = [
    { type: 'cmd', text: 'shaik@platform:~$ cat profile.txt' },
    { type: 'out', text: '--------------------------' },
    {
        type: 'out',
        text: 'Role: ',
        value: 'Cloud, DevOps, Network & Platform Engineer',
        color: 'green'
    },
    {
        type: 'out',
        text: 'Location: ',
        value: 'Kadapa, Andhra Pradesh',
        color: 'white'
    },
    {
        type: 'out',
        text: 'Open to: ',
        value: 'Bangalore, Hyderabad, Chennai, Remote',
        color: 'green'
    },
    {
        type: 'out',
        text: 'Status: ',
        value: 'Immediate Joiner (2026 Batch)',
        color: 'green'
    },
    {
        type: 'out',
        text: 'Certs: ',
        value: 'ServiceNow CSA/CAD, Salesforce Agentforce, NPTEL Cloud',
        color: 'white'
    },
    {
        type: 'out',
        text: 'In Progress: ',
        value: 'Microsoft AZ-900 | Cisco Networking Essentials',
        color: 'green'
    },
    { type: 'out', text: '--------------------------' }
];

let lineIndex = 0;

function typeTerminal() {
    if (!terminalBody) return;

    if (lineIndex < terminalLines.length) {
        const line = terminalLines[lineIndex];
        const div = document.createElement('div');

        if (line.type === 'cmd') {
            div.innerHTML = `<span class="cmd">${line.text}</span>`;
        } else {
            div.classList.add('out');

            if (line.value) {
                div.innerHTML =
                    `${line.text}<span class="${line.color}">${line.value}</span>`;
            } else {
                div.innerHTML = line.text;
            }
        }

        terminalBody.appendChild(div);
        lineIndex++;

        setTimeout(typeTerminal, 400);
    } else {
        const cursor = document.createElement('div');

        cursor.innerHTML =
            '<span class="cmd">shaik@platform:~$</span> _ <span class="cursor"></span>';

        terminalBody.appendChild(cursor);
    }
}

// Start Terminal Animation
setTimeout(typeTerminal, 1000);
