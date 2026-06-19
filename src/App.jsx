import React, { useMemo, useState } from 'react';

const views = [
  { id: 'home', label: 'Dashboard' },
  { id: 'restaurant', label: 'Locale' },
  { id: 'menu', label: 'Menù' },
  { id: 'wines', label: 'Carta vini' },
  { id: 'pairings', label: 'Abbinamenti' },
  { id: 'report', label: 'Report' },
  { id: 'customer', label: 'Cliente / QR' }
];

const dishes = [
  { category: 'Antipasti', name: 'Alici marinate', note: 'fresche, sapide, agrumate', selected: true },
  { category: 'Primi', name: 'Passatelli asciutti con vongole', note: 'mare, cremosità, sapidità', selected: true },
  { category: 'Secondi', name: 'Branzino al forno', note: 'delicato, erbe, olio EVO', selected: true },
  { category: 'Primi', name: 'Tagliatelle al ragù', note: 'strutturato, carne, tradizione', selected: false },
  { category: 'Dolci', name: 'Tenerina al cioccolato', note: 'dolce, cacao, morbida', selected: false }
];

const wines = [
  { name: 'Verdicchio dei Castelli di Jesi', winery: 'Cantina C', type: 'Bianco', price: '27€',margin: '30%', glass: true, role: 'Bottiglia tavolo' },
  { name: 'Albana Secco Romagna DOCG', winery: 'Cantina B', type: 'Bianco', price: '25€', margin: '25%', glass: true, role: 'Calice' },
  { name: 'Sangiovese di Romagna Superiore', winery: 'Cantina A', type: 'Rosso', price: '28€', margin: '35%', glass: true, role: 'Calice / bottiglia' },
  { name: 'Franciacorta Brut', winery: 'Cantina D', type: 'Bollicina', price: '48€', margin: '40%', glass: false, role: 'Premium' },
  { name: 'Chianti Classico', winery: 'Cantina E', type: 'Rosso', price: '38€', margin: '30%', glass: false, role: 'Bottiglia tavolo' }
];

const tablePairings = [
  {
    title: 'Percorso mare leggero',
    dishes: ['Alici marinate', 'Passatelli asciutti con vongole', 'Branzino al forno'],
    wine: 'Verdicchio dei Castelli di Jesi',
    reason: 'Fresco e minerale, accompagna piatti di mare delicati e sapidi senza coprirli.',
    confidence: 91,
    status: 'Consigliato'
  },
  {
    title: 'Tradizione romagnola',
    dishes: ['Tagliatelle al ragù', 'Coniglio in porchetta', 'Tagliata di manzo'],
    wine: 'Sangiovese di Romagna Superiore',
    reason: 'Rosso territoriale, fresco e saporito, adatto a primi ricchi e carni non troppo speziate.',
    confidence: 88,
    status: 'Consigliato'
  },
  {
    title: 'Scelta premium aperitivo + mare',
    dishes: ['Crostini misti', 'Alici marinate', 'Fritto misto dell’Adriatico'],
    wine: 'Franciacorta Brut',
    reason: 'Bollicina elegante, utile per aperitivo, fritti e piatti iodati.',
    confidence: 84,
    status: 'Premium'
  }
];

const glassPairings = [
  { dish: 'Tagliatelle al ragù', wine: 'Sangiovese di Romagna Superiore', note: 'calice rosso territoriale' },
  { dish: 'Branzino al forno', wine: 'Verdicchio dei Castelli di Jesi', note: 'calice bianco fresco' },
  { dish: 'Squacquerone, rucola e piadina', wine: 'Albana Secco Romagna DOCG', note: 'calice bianco locale' }
];

function IconButton({ children }) {
  return <button className="icon-button" type="button">{children}</button>;
}

function Button({ children, variant = 'primary' }) {
  return <button className={`button ${variant}`} type="button">{children}</button>;
}

function Chip({ children, tone = 'default' }) {
  return <span className={`chip ${tone}`}>{children}</span>;
}

function Card({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`card ${className}`}>
      {(title || subtitle || action) && (
        <header className="card-header">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </header>
      )}
      {children}
    </section>
  );
}

function EmptyState({ title, text, action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">＋</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}

function AppShell({ active, setActive, children }) {
  const activeView = views.find((view) => view.id === active);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">C</span>
          <div>
            <strong>CartaVinAI</strong>
            <small>Demo v1.0</small>
          </div>
        </div>
        <div className="topbar-actions">
          <Button variant="ghost">Salva bozza</Button>
          <Button>Genera report</Button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="project-card">
            <span className="project-avatar">RD</span>
            <div>
              <strong>Ristorante Demo</strong>
              <small>Romagna · fascia media</small>
            </div>
          </div>
          <nav className="nav-list" aria-label="Navigazione principale">
            {views.map((view, index) => (
              <button
                key={view.id}
                className={view.id === active ? 'active' : ''}
                onClick={() => setActive(view.id)}
                type="button"
              >
                <span className="step-number">{index + 1}</span>
                <span>{view.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="content">
          <div className="mobile-tabs">
            {views.map((view) => (
              <button
                key={view.id}
                className={view.id === active ? 'active' : ''}
                onClick={() => setActive(view.id)}
                type="button"
              >
                {view.label}
              </button>
            ))}
          </div>

          <div className="page-title">
            <div>

              <h1>{activeView?.label}</h1>
              
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}

function HomeView({ setActive }) {
  return (
    <div className="page-grid">
      <Card title="Flusso applicativo" subtitle="Qui un riepilogo dei vari passaggi da eseguire per configurare il ristorante e ottenere il report" className="span-2">
        <div className="flow-row">
          {['Locale', 'Menù', 'Carta vini', 'Abbinamenti', 'Report', 'QR'].map((item, index) => (
            <div key={item} className="flow-step">
              <span>{index + 2}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Stato progetto" subtitle="Pronto per la presentazione demo.">
        <div className="status-list">
          <div><span>Menù</span><Chip tone="green">14 piatti</Chip></div>
          <div><span>Carta vini</span><Chip tone="green">26 vini</Chip></div>
          <div><span>Proposte tavolo</span><Chip tone="green">3 generate</Chip></div>
          <div><span>Calici singolo piatto</span><Chip tone="blue">3 opzioni</Chip></div>
        </div>
      </Card>

      

      
    </div>
  );
}

function RestaurantView() {
  return (
    <div className="page-grid">
      <Card title="Dati del locale" subtitle="Pochi campi utili a contestualizzare tono e proposte." className="span-2">
        <div className="form-grid">
          <label><span>Nome locale</span><input value="Ristorante Demo Romagnolo" readOnly /></label>
          <label><span>Territorio</span><input value="Rimini / Romagna" readOnly /></label>
          <label><span>Cucina</span><input value="Tradizionale romagnola" readOnly /></label>
          <label><span>Fascia prezzo</span><input value="Media" readOnly /></label>
          <label className="wide"><span>Tono dei testi</span><input value="Semplice, caldo, non tecnico" readOnly /></label>
        </div>
      </Card>

      <Card title="Obiettivi" subtitle="Mostrati con checkbox grandi e comprensibili.">
        <div className="check-list">
          <label><input type="checkbox" checked readOnly /> Valorizzare vini locali</label>
          <label><input type="checkbox" checked readOnly /> Migliorare proposta al calice</label>
          <label><input type="checkbox" checked readOnly /> Guidare meglio il cliente</label>
          <label><input type="checkbox" readOnly /> Spingere premium</label>
        </div>
      </Card>
    </div>
  );
}

function MenuView() {
  return (
    <div className="page-grid">
      <Card
        title="Menù food"
        action={<Button variant="secondary">Importa da testo/PDF</Button>}
        
        className="span-3"
      >
        <div className="clean-table">
          <div className="table-head four"><span>Categoria</span><span>Piatto</span><span>Profilo</span><span>Stato</span></div>
          {dishes.map((dish) => (
            <div className="table-row four" key={dish.name}>
              <span>{dish.category}</span>
              <strong>{dish.name}</strong>
              <span>{dish.note}</span>
              <Chip tone={dish.selected ? 'green' : 'default'}>{dish.selected ? 'Nel menù' : 'Fuori menù'}</Chip>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function WinesView() {
  return (
    <div className="page-grid">
      <Card
        title="Carta vini"
        subtitle="Il ruolo del vino aiuta a distinguere bottiglie condivise e calici singoli."
        action={<Button variant="secondary">Importa da testo</Button>}
        className="span-3"
      >
        <div className="clean-table wines-table">
          <div className="table-head seven"><span>Vino</span><span>Cantina</span><span>Tipo</span><span>Prezzo</span><span>Margine</span><span>Calice</span><span>Ruolo</span></div>
          {wines.map((wine) => (
            <div className="table-row seven" key={wine.name}>
              <strong>{wine.name}</strong>
              <span>{wine.winery}</span>
              <span>{wine.type}</span>
              <span>{wine.price}</span>
              <span>{wine.margin}</span>
              <Chip tone={wine.glass ? 'green' : 'default'}>{wine.glass ? 'Sì' : 'No'}</Chip>
              <span>{wine.role}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PairingView() {
  return (
    <div className="page-grid">
      <Card title="Proposte bottiglia per il tavolo" subtitle="Una bottiglia consigliata per una selezione coerente di più piatti." className="span-3">
        <div className="pairing-cards">
          {tablePairings.map((pairing) => (
            <article className="pairing-card" key={pairing.title}>
              <div className="pairing-top">
                <div>
                  <Chip tone={pairing.status === 'Premium' ? 'amber' : 'green'}>{pairing.status}</Chip>
                  <h3>{pairing.title}</h3>
                </div>
                <span className="score">{pairing.confidence}</span>
              </div>
              <div className="dish-tags">
                {pairing.dishes.map((dish) => <span key={dish}>{dish}</span>)}
              </div>
              <div className="wine-choice">
                <small>Vino consigliato</small>
                <strong>{pairing.wine}</strong>
                <p>{pairing.reason}</p>
              </div>
              <div className="card-actions">
                <Button variant="ghost">Modifica</Button>
                <Button variant="secondary">Approva</Button>
              </div>
            </article>
          ))}
        </div>
      </Card>

      <Card title="Solo se il cliente vuole un calice" subtitle="Qui ha senso il consiglio per singolo piatto." className="span-3">
        <div className="clean-table">
          <div className="table-head three"><span>Piatto</span><span>Calice consigliato</span><span>Nota</span></div>
          {glassPairings.map((item) => (
            <div className="table-row three" key={item.dish}>
              <strong>{item.dish}</strong>
              <span>{item.wine}</span>
              <span>{item.note}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ReportView() {
  return (
    <div className="page-grid">
      <Card title="Report interno" subtitle="Output per titolare e sala: propone percorsi e bottiglie, non solo abbinamenti singoli." className="span-2">
        <div className="report-block">
          <h3>Sintesi</h3>
          <p>La carta copre bene piatti di mare e tradizione romagnola. La proposta più forte è guidare il tavolo verso una bottiglia condivisa, con calici opzionali per clienti che ordinano singolarmente.</p>
        </div>
        <div className="report-block highlighted">
          <h3>Proposta principale</h3>
          <p><strong>Verdicchio dei Castelli di Jesi</strong> per alici marinate, passatelli con vongole e branzino al forno.</p>
        </div>
        <div className="report-block">
          <h3>Azioni consigliate</h3>
          <ol>
            <li>Valorizzare Verdicchio come bottiglia tavolo per percorsi mare.</li>
            <li>Usare Sangiovese come bottiglia condivisa per tradizione romagnola.</li>
            <li>Mantenere i consigli singolo piatto solo sui calici.</li>
            <li>Inserire un vino dolce per dessert.</li>
          </ol>
        </div>
      </Card>

      <Card title="Anteprima struttura" subtitle="Sezioni semplici, stampabili e modificabili.">
        <div className="status-list">
          <div><span>Executive summary</span><Chip tone="green">OK</Chip></div>
          <div><span>Percorsi tavolo</span><Chip tone="green">OK</Chip></div>
          <div><span>Calici per piatto</span><Chip tone="blue">Opzionale</Chip></div>
          <div><span>Criticità carta</span><Chip tone="amber">4 note</Chip></div>
        </div>
      </Card>
    </div>
  );
}

function CustomerView() {
  return (
    <div className="page-grid">
      <Card title="Versione cliente stampabile" subtitle="Semplice: “Cosa avete ordinato?” → bottiglia consigliata per il tavolo." className="span-2">
        <div className="customer-sheet">
          <h2>I vini consigliati dalla casa</h2>
          <p>Abbiamo selezionato alcune bottiglie pensate per accompagnare più piatti dello stesso tavolo.</p>
          <div className="customer-option">
            <small>Se avete scelto piatti di mare</small>
            <strong>Verdicchio dei Castelli di Jesi</strong>
            <span>Alici marinate · Passatelli con vongole · Branzino al forno</span>
            <p>Fresco e minerale, accompagna sapidità e delicatezza senza coprire i piatti.</p>
          </div>
          <div className="customer-option">
            <small>Se avete scelto piatti della tradizione</small>
            <strong>Sangiovese di Romagna Superiore</strong>
            <span>Tagliatelle al ragù · Coniglio in porchetta · Tagliata</span>
            <p>Rosso territoriale, piacevole e versatile sui piatti più saporiti.</p>
          </div>
          <div className="customer-note">Preferite un calice? Chiedete al personale: abbiamo consigli specifici per singolo piatto.</div>
        </div>
      </Card>

      <Card title="QR mobile" subtitle="Stessa logica, ma consultabile dal tavolo.">
        <div className="phone">
          <div className="phone-bar" />
          <h3>Vini consigliati</h3>
          <p>Seleziona i piatti ordinati</p>
          <div className="search">Cerca o scegli piatti</div>
          <div className="selected-dishes">
            <span>Alici marinate</span>
            <span>Branzino al forno</span>
            <span>Passatelli vongole</span>
          </div>
          <div className="mobile-result">
            <small>Bottiglia consigliata</small>
            <strong>Verdicchio dei Castelli di Jesi</strong>
            <p>Fresco e minerale, ottimo per accompagnare il vostro percorso di mare.</p>
          </div>
          <button className="mobile-button">Vedi alternative al calice</button>
        </div>
      </Card>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState('home');

  const view = useMemo(() => {
    switch (active) {
      case 'restaurant': return <RestaurantView />;
      case 'menu': return <MenuView />;
      case 'wines': return <WinesView />;
      case 'pairings': return <PairingView />;
      case 'report': return <ReportView />;
      case 'customer': return <CustomerView />;
      default: return <HomeView setActive={setActive} />;
    }
  }, [active]);

  return (
    <AppShell active={active} setActive={setActive}>
      {view}
    </AppShell>
  );
}
