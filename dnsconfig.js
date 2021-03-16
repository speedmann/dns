// Providers:

var REG_NONE = NewRegistrar('none', 'NONE');    // No registrar.
var REG_HOSTING = NewRegistrar('hosting.de', 'HOSTINGDE');    // No registrar.
var DNS_HOSTING = NewDnsProvider('hosting.de', 'HOSTINGDE');  // ISC BIND.
var REG_INWX = NewRegistrar('inwx.de', 'INWX');    // No registrar.
var DNS_INWX = NewDnsProvider('inwx.de', 'INWX');  // ISC BIND.

// MACROS
var SETUID_NS = [
	NAMESERVER("ns1.setuid.de."),
	NAMESERVER("ns2.setuid.de."),
	NAMESERVER_TTL(86400),
]

var SSL_RECORDS = [
	CAA("@","issue", "letsencrypt.org", CAA_CRITICAL),
	CAA("@","issuewild", "letsencrypt.org", CAA_CRITICAL),
	CAA("@","iodef", "mailto:cert@speedmann.de", CAA_CRITICAL),
]

var TRASH_MAIL = [
	MX("@",10, "mail.setuid.de."),
	TXT('@', "v=spf1 mx -all"),
	DMARC_BUILDER({
            policy: 'reject',
        })

]

var PROTONMAIL = [
	MX("@",10, "mail.protonmail.ch."),
	MX("@",20, "mailsec.protonmail.ch."),
	TXT('@', 'v=spf1 include:_spf.protonmail.ch mx ~all'),
	DMARC_BUILDER({
            policy: 'quarantine',
	    subdomainPolicy: "quarantine",
	    ri: "86400",
	    fo: "1",
	    rua: [
    		"mailto:mailto:2rtbqidx@ag.eu.dmarcian.com",
    		"mailto:dmarc@speedmann.de",
  	    ],
        })
	
]

var WEBSERVER1 = "46.232.249.242"

// Domains:

D("insecmail.de", REG_HOSTING
	, DnsProvider(DNS_HOSTING)
	, DefaultTTL(86400)
	, SSL_RECORDS
	, TRASH_MAIL
	, A("@", "35.156.174.53")
	, A("www", "35.156.174.53")
)

D("fiese-möps.de", REG_HOSTING
	, DnsProvider(DNS_HOSTING)
	, DefaultTTL(86400)
	, SSL_RECORDS
	, A("@", "35.156.174.53")
	, A("www", "35.156.174.53")
)

D("5sk.de", REG_INWX
	, DnsProvider(DNS_INWX,0)
	, DefaultTTL(3600)
	, SETUID_NS
	, SSL_RECORDS
	, TRASH_MAIL
	, DefaultTTL(3600)
	, A("@", WEBSERVER1)
	, A("www", WEBSERVER1)
)

D("swapoff.de", REG_INWX
	, DnsProvider(DNS_INWX,0)
	, DefaultTTL(3600)
	, SETUID_NS
	, SSL_RECORDS
	, TRASH_MAIL
	, DefaultTTL(3600)
	, A("@", WEBSERVER1)
	, A("www", WEBSERVER1)
)

D("open-mx.de", REG_INWX
	, DnsProvider(DNS_INWX,0)
	, DefaultTTL(3600)
	, SETUID_NS
	, SSL_RECORDS
	, PROTONMAIL
	, DefaultTTL(3600)
	, A("@", WEBSERVER1)
	, A("www", WEBSERVER1)
	, CNAME('protonmail._domainkey', 'protonmail.domainkey.dk3phunpwozbsvc6cmhgdjmdjf74spy3r3clitqbfjwructqana4q.domains.proton.ch.')
	, CNAME('protonmail2._domainkey', 'protonmail2.domainkey.dk3phunpwozbsvc6cmhgdjmdjf74spy3r3clitqbfjwructqana4q.domains.proton.ch.')
	, CNAME('protonmail3._domainkey', 'protonmail3.domainkey.dk3phunpwozbsvc6cmhgdjmdjf74spy3r3clitqbfjwructqana4q.domains.proton.ch.')
	, TXT('@', 'protonmail-verification=508be45f85c59248fec609e4192778a5cc1bf1ea')
)

D("b8.lv", REG_INWX
	, DnsProvider(DNS_INWX,0)
	, DefaultTTL(3600)
	, SETUID_NS
	, SSL_RECORDS
	, PROTONMAIL
	, DefaultTTL(3600)
	, A("@", WEBSERVER1)
	, A("www", WEBSERVER1)
	, CNAME('protonmail._domainkey', 'protonmail.domainkey.dxf5mnq3wgxa436j6rbptwnbofnrclitvgtsl4ickhlpfzpv3lrxa.domains.proton.ch.')
	, CNAME('protonmail2._domainkey', 'protonmail2.domainkey.dxf5mnq3wgxa436j6rbptwnbofnrclitvgtsl4ickhlpfzpv3lrxa.domains.proton.ch.')
	, CNAME('protonmail3._domainkey', 'protonmail3.domainkey.dxf5mnq3wgxa436j6rbptwnbofnrclitvgtsl4ickhlpfzpv3lrxa.domains.proton.ch.')
	, TXT('@', 'protonmail-verification=967e222534e827dee2d03be11ad03b580cf3f076')
)

D("setuid.de", REG_INWX
	, DnsProvider(DNS_INWX,0)
	, DefaultTTL(3600)
	, SETUID_NS
	, SSL_RECORDS
	, TRASH_MAIL
	, DefaultTTL(3600)
	, A('ford', '46.232.249.242')
	, A('mail', '46.232.249.242')
	, A('marvin', '89.163.148.129')
	, A('ns1', '192.174.68.104')
	, A('ns2', '176.97.158.104')
	, A('@', '46.232.249.242')
	, A('trillian', '37.120.190.16')
	, A('zaphod', '89.163.140.115')
	, AAAA('ns1', '2001:67c:1bc::104')
	, AAAA('ns2', '2001:67c:10b8::104')
)

D("speedmann.de", REG_INWX
	, DnsProvider(DNS_INWX,0)
	, DefaultTTL(3600)
	, SETUID_NS
	, SSL_RECORDS
	, PROTONMAIL
	, DefaultTTL(3600)
	, A("@", WEBSERVER1)
	, A("www", WEBSERVER1)
	, IGNORE_NAME("vpn")
	, CNAME('protonmail._domainkey', 'protonmail.domainkey.dxjhov7frtr6hzlsdj7kye7ftb5n3kdgt7effimpryae73uee66dq.domains.proton.ch.')
	, CNAME('protonmail2._domainkey', 'protonmail2.domainkey.dxjhov7frtr6hzlsdj7kye7ftb5n3kdgt7effimpryae73uee66dq.domains.proton.ch.')
	, CNAME('protonmail3._domainkey', 'protonmail3.domainkey.dxjhov7frtr6hzlsdj7kye7ftb5n3kdgt7effimpryae73uee66dq.domains.proton.ch.')
	, TXT('@', 'protonmail-verification=52e6652d0d6929052fa9c4701858c8e27de44243')
)
