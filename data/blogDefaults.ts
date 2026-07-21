import type { BlogFaq, BlogPost, BlogSource } from './types';

/** Shared authoritative references keyed by topic keywords found in tags/title. */
const TOPIC_SOURCES: { match: RegExp; sources: BlogSource[] }[] = [
  {
    match: /osi|tcp\/?ip|layer\s*[1-7]|encapsulation/i,
    sources: [
      {
        title: 'ISO/IEC 7498-1 — OSI Basic Reference Model',
        url: 'https://www.iso.org/standard/20269.html',
        publisher: 'ISO',
      },
      {
        title: 'RFC 1122 — Requirements for Internet Hosts — Communication Layers',
        url: 'https://www.rfc-editor.org/rfc/rfc1122',
        publisher: 'IETF / RFC Editor',
      },
      {
        title: 'What Is the OSI Model?',
        url: 'https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/',
        publisher: 'Cloudflare Learning',
      },
    ],
  },
  {
    match: /ipv6|ipv4|ip address|subnet|cidr|nat|dhcp/i,
    sources: [
      {
        title: 'RFC 791 — Internet Protocol',
        url: 'https://www.rfc-editor.org/rfc/rfc791',
        publisher: 'IETF / RFC Editor',
      },
      {
        title: 'RFC 8200 — Internet Protocol, Version 6 (IPv6)',
        url: 'https://www.rfc-editor.org/rfc/rfc8200',
        publisher: 'IETF / RFC Editor',
      },
      {
        title: 'RFC 4632 — Classless Inter-domain Routing (CIDR)',
        url: 'https://www.rfc-editor.org/rfc/rfc4632',
        publisher: 'IETF / RFC Editor',
      },
      {
        title: 'IPv6 at a Glance',
        url: 'https://www.cisco.com/c/en/us/products/ios-nx-os-software/ipv6/index.html',
        publisher: 'Cisco',
      },
    ],
  },
  {
    match: /dns|domain|icann/i,
    sources: [
      {
        title: 'RFC 1034 — Domain Names: Concepts and Facilities',
        url: 'https://www.rfc-editor.org/rfc/rfc1034',
        publisher: 'IETF / RFC Editor',
      },
      {
        title: 'RFC 1035 — Domain Names: Implementation and Specification',
        url: 'https://www.rfc-editor.org/rfc/rfc1035',
        publisher: 'IETF / RFC Editor',
      },
      {
        title: 'What Does ICANN Do?',
        url: 'https://www.icann.org/resources/pages/what-2012-02-25-en',
        publisher: 'ICANN',
      },
    ],
  },
  {
    match: /tcp|udp|handshake|transport|quic|http\/?3/i,
    sources: [
      {
        title: 'RFC 793 — Transmission Control Protocol',
        url: 'https://www.rfc-editor.org/rfc/rfc793',
        publisher: 'IETF / RFC Editor',
      },
      {
        title: 'RFC 768 — User Datagram Protocol',
        url: 'https://www.rfc-editor.org/rfc/rfc768',
        publisher: 'IETF / RFC Editor',
      },
      {
        title: 'RFC 9000 — QUIC: A UDP-Based Multiplexed and Secure Transport',
        url: 'https://www.rfc-editor.org/rfc/rfc9000',
        publisher: 'IETF / RFC Editor',
      },
    ],
  },
  {
    match: /http|https|tls|ssl|certificate/i,
    sources: [
      {
        title: 'RFC 9110 — HTTP Semantics',
        url: 'https://www.rfc-editor.org/rfc/rfc9110',
        publisher: 'IETF / RFC Editor',
      },
      {
        title: 'RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3',
        url: 'https://www.rfc-editor.org/rfc/rfc8446',
        publisher: 'IETF / RFC Editor',
      },
      {
        title: 'How Does HTTPS Work?',
        url: 'https://www.cloudflare.com/learning/ssl/what-is-https/',
        publisher: 'Cloudflare Learning',
      },
    ],
  },
  {
    match: /wifi|wireless|802\.11|radio/i,
    sources: [
      {
        title: 'IEEE 802.11 Wireless LAN Standards',
        url: 'https://www.ieee802.org/11/',
        publisher: 'IEEE 802.11 Working Group',
      },
      {
        title: 'Wi-Fi Alliance — Discover Wi-Fi',
        url: 'https://www.wi-fi.org/discover-wi-fi',
        publisher: 'Wi-Fi Alliance',
      },
    ],
  },
  {
    match: /bgp|routing|router|as path|rpki/i,
    sources: [
      {
        title: 'RFC 4271 — A Border Gateway Protocol 4 (BGP-4)',
        url: 'https://www.rfc-editor.org/rfc/rfc4271',
        publisher: 'IETF / RFC Editor',
      },
      {
        title: 'What Is BGP?',
        url: 'https://www.cloudflare.com/learning/security/glossary/what-is-bgp/',
        publisher: 'Cloudflare Learning',
      },
      {
        title: 'Routing Basics',
        url: 'https://www.cisco.com/c/en/us/tech/ip/ip-routing/index.html',
        publisher: 'Cisco',
      },
    ],
  },
  {
    match: /vlan|switch|mac|ethernet|stp|spanning/i,
    sources: [
      {
        title: 'IEEE 802.1Q — Virtual Bridged Local Area Networks',
        url: 'https://1.ieee802.org/tsn/802-1q/',
        publisher: 'IEEE',
      },
      {
        title: 'Ethernet Technology',
        url: 'https://www.ieee802.org/3/',
        publisher: 'IEEE 802.3 Working Group',
      },
      {
        title: 'What Is a Switch?',
        url: 'https://www.cisco.com/c/en/us/products/switches/what-is-a-network-switch.html',
        publisher: 'Cisco',
      },
    ],
  },
  {
    match: /cable|fiber|physical|submarine|medium|media/i,
    sources: [
      {
        title: 'Submarine Cable Map',
        url: 'https://www.submarinecablemap.com/',
        publisher: 'TeleGeography',
      },
      {
        title: 'How Does the Internet Work?',
        url: 'https://www.cloudflare.com/learning/network-layer/how-does-the-internet-work/',
        publisher: 'Cloudflare Learning',
      },
    ],
  },
  {
    match: /security|encrypt|firewall|vpn|zero.?trust|attack|malware|phishing/i,
    sources: [
      {
        title: 'NIST Cybersecurity Framework',
        url: 'https://www.nist.gov/cyberframework',
        publisher: 'NIST',
      },
      {
        title: 'What Is a Firewall?',
        url: 'https://www.cisco.com/c/en/us/products/security/firewalls/what-is-a-firewall.html',
        publisher: 'Cisco',
      },
      {
        title: 'What Is Encryption?',
        url: 'https://www.cloudflare.com/learning/ssl/what-is-encryption/',
        publisher: 'Cloudflare Learning',
      },
    ],
  },
  {
    match: /cdn|load.?balanc|latency|qos|performance/i,
    sources: [
      {
        title: 'What Is a CDN?',
        url: 'https://www.cloudflare.com/learning/cdn/what-is-a-cdn/',
        publisher: 'Cloudflare Learning',
      },
      {
        title: 'Load Balancing',
        url: 'https://www.cisco.com/c/en/us/products/routers/what-is-load-balancing.html',
        publisher: 'Cisco',
      },
    ],
  },
  {
    match: /email|smtp|imap|spam|spf|dkim/i,
    sources: [
      {
        title: 'RFC 5321 — Simple Mail Transfer Protocol',
        url: 'https://www.rfc-editor.org/rfc/rfc5321',
        publisher: 'IETF / RFC Editor',
      },
      {
        title: 'RFC 7208 — Sender Policy Framework (SPF)',
        url: 'https://www.rfc-editor.org/rfc/rfc7208',
        publisher: 'IETF / RFC Editor',
      },
    ],
  },
];

const DEFAULT_SOURCES: BlogSource[] = [
  {
    title: 'RFC 1122 — Requirements for Internet Hosts — Communication Layers',
    url: 'https://www.rfc-editor.org/rfc/rfc1122',
    publisher: 'IETF / RFC Editor',
  },
  {
    title: 'How Does the Internet Work?',
    url: 'https://www.cloudflare.com/learning/network-layer/how-does-the-internet-work/',
    publisher: 'Cloudflare Learning',
  },
  {
    title: 'Networking Learning Resources',
    url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html',
    publisher: 'Cisco',
  },
];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

function topicPhrase(blog: BlogPost): string {
  const primary = blog.tags[0] || 'networking';
  return primary.toLowerCase();
}

function extractHeadings(content: string): string[] {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('## '))
    .map((line) => line.replace(/^##\s+/, ''))
    .slice(0, 6);
}

function defaultFaqForPost(blog: BlogPost): BlogFaq[] {
  const topic = topicPhrase(blog);
  const headings = extractHeadings(blog.content);
  const focus = headings[0] || blog.title;
  const second = headings[1] || blog.tags[1] || 'core concepts';
  const layerTag = blog.tags.find((t) => /layer\s*\d/i.test(t));
  const faq: BlogFaq[] = [
    {
      question: `What will I learn from “${blog.title}”?`,
      answer: `${blog.excerpt} This guide focuses on ${topic}${blog.tags.length > 1 ? ` and related topics like ${blog.tags.slice(1, 3).join(', ')}` : ''}.`,
    },
    {
      question: `Why does ${focus.replace(/\?$/, '')} matter in real networks?`,
      answer: `Understanding ${focus.replace(/\?$/, '').toLowerCase()} helps you troubleshoot issues, design clearer mental models, and connect certification theory to how production networks actually behave.`,
    },
  ];

  if (layerTag) {
    faq.push({
      question: `Which OSI layer does this article relate to?`,
      answer: `This topic is closely tied to ${layerTag}. In the OSI Model Simulator you can watch how data is encapsulated at that layer while packets move through the stack.`,
    });
  } else {
    faq.push({
      question: `How does “${blog.title}” connect to the OSI or TCP/IP models?`,
      answer: `The ideas in this article map onto the layered networking models used by engineers and certifications. Use the OSI Model Simulator to see encapsulation across layers while you study ${topic}.`,
    });
  }

  faq.push({
    question: `Where should I go next after reading about ${second.replace(/\?$/, '').toLowerCase()}?`,
    answer: `Review the Sources & references below for RFCs and vendor documentation, explore related articles on this blog, then practice with the free OSI Model Simulator at app.osi-model-simulator.roboticela.com.`,
  });

  return faq;
}

function sourcesForPost(blog: BlogPost): BlogSource[] {
  const haystack = `${blog.title} ${blog.tags.join(' ')} ${blog.excerpt} ${blog.content.slice(0, 500)}`;
  const matched: BlogSource[] = [];
  const seen = new Set<string>();

  for (const topic of TOPIC_SOURCES) {
    if (!topic.match.test(haystack)) continue;
    for (const source of topic.sources) {
      if (seen.has(source.url)) continue;
      seen.add(source.url);
      matched.push(source);
    }
  }

  const pool = matched.length > 0 ? matched : DEFAULT_SOURCES;
  // Rotate selection by slug so posts with overlapping tags don't share identical lists
  const offset = hashSlug(blog.slug) % pool.length;
  const rotated = [...pool.slice(offset), ...pool.slice(0, offset)];
  return rotated.slice(0, Math.min(6, rotated.length));
}

/** Merge explicit post metadata with tag-based defaults for FAQ and sources. */
export function enrichBlogPost(blog: BlogPost): BlogPost {
  return {
    ...blog,
    sources: blog.sources && blog.sources.length > 0 ? blog.sources : sourcesForPost(blog),
    faq: blog.faq && blog.faq.length > 0 ? blog.faq : defaultFaqForPost(blog),
  };
}
