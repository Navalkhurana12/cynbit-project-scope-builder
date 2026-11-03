import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Bot, Check, CheckCircle2, ChevronDown, Cloud, Code2, Copy, Download, Layers3, Lightbulb, LoaderCircle, Mail, Rocket, Sparkles, WandSparkles } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const services = [
  { name: 'AI Automation', detail: 'AI agents, chatbots and intelligent workflows', icon: Bot },
  { name: 'Web Development', detail: 'Websites, dashboards and SaaS platforms', icon: Code2 },
  { name: 'Cloud Solutions', detail: 'Cloud setup, migration and deployment', icon: Cloud },
  { name: 'Digital Marketing', detail: 'SEO, analytics and lead generation', icon: Rocket },
];
const featureOptions = {
  'AI Automation': ['AI chatbot', 'Voice agent', 'Document processing', 'CRM integration', 'Workflow automation', 'Knowledge base'],
  'Web Development': ['User authentication', 'Admin dashboard', 'Payment integration', 'Search and filters', 'Analytics dashboard', 'Third-party API'],
  'Cloud Solutions': ['Cloud migration', 'CI/CD pipeline', 'Database setup', 'Monitoring and alerts', 'Backup and recovery', 'Access management'],
  'Digital Marketing': ['Technical SEO', 'Lead capture', 'Campaign tracking', 'CRM integration', 'Analytics dashboard', 'Automated reporting'],
};
const initial = { service: '', problem: '', features: [], budget: 'Not sure yet', timeline: '1–3 months', name: '', email: '', company: '' };
const steps = ['Service', 'Requirements', 'Project details', 'Contact'];

function App() {
  const [form, setForm] = useState(initial);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const toggleFeature = (feature) => update('features', form.features.includes(feature) ? form.features.filter((item) => item !== feature) : [...form.features, feature]);
  const progress = ((step + 1) / steps.length) * 100;

  const canContinue = useMemo(() => {
    if (step === 0) return Boolean(form.service);
    if (step === 1) return form.problem.trim().length >= 20;
    if (step === 2) return Boolean(form.budget && form.timeline);
    return form.name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  }, [step, form]);

  const submit = async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch(`${API}/api/projects`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: { name: form.name, email: form.email, company: form.company }, service: form.service, problem: form.problem, features: form.features, budget: form.budget, timeline: form.timeline })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to generate your project blueprint.');
      setResult(data);
    } catch (err) {
      setError(`${err.message} Make sure the backend is running on port 5000.`);
    } finally { setLoading(false); }
  };

  const summaryText = result ? [
    'CYNBIT PROJECT BLUEPRINT', `Reference: ${result.project.id}`, `Service: ${result.project.service}`,
    `Problem: ${result.project.problem}`, `Budget: ${result.project.budget}`, `Timeline: ${result.project.timeline}`,
    `Complexity: ${result.project.blueprint.complexity}`, '', 'SUGGESTED MODULES', ...result.project.blueprint.modules.map((x) => `- ${x}`),
    '', 'SUGGESTED STACK', ...result.project.blueprint.suggestedStack.map((x) => `- ${x}`),
    '', 'NEXT STEPS', ...result.project.blueprint.nextSteps.map((x, i) => `${i + 1}. ${x}`)
  ].join('\n') : '';

  const copySummary = async () => { await navigator.clipboard.writeText(summaryText); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const downloadSummary = () => {
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob); const link = document.createElement('a');
    link.href = url; link.download = `cynbit-project-blueprint-${result.project.id}.txt`; link.click(); URL.revokeObjectURL(url);
  };

  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark"><Layers3 size={20}/></span><span>CYNBIT<span className="brand-dot">.</span></span></a><div className="topbar-right"><span className="top-note"><span className="status-dot"/> Project discovery</span><a className="nav-link" href="https://www.cynbit.in/" target="_blank" rel="noreferrer">Cynbit website <ArrowRight size={14}/></a></div></header>
    <main id="top">
      <section className="hero"><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><div className="hero-content"><div className="eyebrow"><Sparkles size={14}/> PROJECT SCOPE BUILDER</div><h1>Great projects start<br/>with <span>clear thinking.</span></h1><p className="hero-copy">Tell us what you're trying to build. We'll help turn your idea into a structured project blueprint your team can act on.</p><div className="hero-points"><span><Check size={15}/> Guided discovery</span><span><Check size={15}/> Clear requirements</span><span><Check size={15}/> Actionable next steps</span></div></div><div className="hero-art"><div className="art-card art-card-back"><div className="art-mini-line short"/><div className="art-mini-line"/><div className="art-mini-line medium"/></div><div className="art-card art-card-front"><div className="art-icon"><WandSparkles size={23}/></div><div className="art-label">YOUR PROJECT BLUEPRINT</div><div className="art-title">Idea → Impact</div><div className="art-progress"><i/></div><div className="art-foot"><span>Scope clarity</span><b>In progress</b></div></div><div className="art-spark spark-a">✳</div><div className="art-spark spark-b">✦</div></div></section>

      <section className="builder-wrap"><div className="builder-intro"><div><div className="section-kicker">LET'S BUILD SOMETHING</div><h2>Define your project</h2><p>Complete four quick steps. It usually takes less than 3 minutes.</p></div><div className="step-count">STEP <b>{step + 1}</b> OF 4</div></div>
      {!result ? <div className="builder-card"><div className="stepper"><div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }}/></div><div className="step-labels">{steps.map((label, index) => <div className={`step-label ${index <= step ? 'active' : ''}`} key={label}><span className="step-number">{index < step ? <Check size={13}/> : index + 1}</span><span>{label}</span></div>)}</div></div>
      <div className="form-content">
        {step === 0 && <div className="step-panel"><div className="panel-heading"><span className="panel-icon"><Lightbulb size={19}/></span><div><h3>What are you looking to build?</h3><p>Choose the service that best matches your idea.</p></div></div><div className="service-grid">{services.map(({ name, detail, icon: Icon }) => <button type="button" key={name} className={`service-option ${form.service === name ? 'selected' : ''}`} onClick={() => update('service', name)}><span className="service-icon"><Icon size={21}/></span><span className="service-name">{name}</span><span className="service-detail">{detail}</span><span className="radio-indicator">{form.service === name && <Check size={12}/>}</span></button>)}</div></div>}
        {step === 1 && <div className="step-panel"><div className="panel-heading"><span className="panel-icon"><WandSparkles size={19}/></span><div><h3>Tell us about your idea</h3><p>What challenge are you trying to solve? Be as specific as you can.</p></div></div><label className="field-label" htmlFor="problem">Describe your business problem <span>*</span></label><textarea id="problem" value={form.problem} onChange={(e) => update('problem', e.target.value)} placeholder="For example: We manage customer enquiries manually and want an AI assistant that can answer common questions, qualify leads and send them to our CRM..." maxLength={1200}/><div className="field-foot"><span>Minimum 20 characters</span><span>{form.problem.length}/1200</span></div><div className="field-label feature-label">Which capabilities would be useful? <small>Select all that apply</small></div><div className="feature-grid">{(featureOptions[form.service] || []).map((feature) => <button type="button" key={feature} className={`feature-chip ${form.features.includes(feature) ? 'chosen' : ''}`} onClick={() => toggleFeature(feature)}>{form.features.includes(feature) ? <Check size={14}/> : <span className="empty-check"/>}{feature}</button>)}</div></div>}
        {step === 2 && <div className="step-panel"><div className="panel-heading"><span className="panel-icon"><Rocket size={19}/></span><div><h3>Set your project expectations</h3><p>This helps us understand the scale and urgency of your project.</p></div></div><label className="field-label">Estimated budget</label><div className="choice-list">{['Under ₹50,000', '₹50,000 – ₹2 lakh', '₹2 lakh – ₹5 lakh', '₹5 lakh+', 'Not sure yet'].map((item) => <button type="button" key={item} onClick={() => update('budget', item)} className={`choice-option ${form.budget === item ? 'chosen' : ''}`}><span>{item}</span><span className="radio-indicator">{form.budget === item && <Check size={12}/>}</span></button>)}</div><label className="field-label timeline-label">Expected timeline</label><div className="timeline-grid">{['Under 1 month', '1–3 months', '3–6 months', 'Flexible'].map((item) => <button type="button" key={item} onClick={() => update('timeline', item)} className={`timeline-option ${form.timeline === item ? 'chosen' : ''}`}>{item}</button>)}</div></div>}
        {step === 3 && <div className="step-panel"><div className="panel-heading"><span className="panel-icon"><Mail size={19}/></span><div><h3>Where should we send your blueprint?</h3><p>Add your contact details so the project brief can be associated with you.</p></div></div><div className="input-grid"><div className="input-group"><label className="field-label" htmlFor="name">Full name <span>*</span></label><input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" maxLength={80}/></div><div className="input-group"><label className="field-label" htmlFor="email">Work email <span>*</span></label><input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" maxLength={120}/></div><div className="input-group full"><label className="field-label" htmlFor="company">Company <small>Optional</small></label><input id="company" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Your company name" maxLength={100}/></div></div><div className="privacy-note"><CheckCircle2 size={16}/> Your details are used only to prepare and follow up on this project enquiry in this prototype.</div></div>}
      </div><div className="form-error" role="alert">{error}</div><div className="form-actions">{step > 0 ? <button className="btn-back" onClick={() => { setError(''); setStep(step - 1); }}><ArrowLeft size={16}/> Back</button> : <span className="secure-note"><CheckCircle2 size={14}/> No commitment required</span>}{step < 3 ? <button className="btn-primary" disabled={!canContinue} onClick={() => { setError(''); setStep(step + 1); }}>Continue <ArrowRight size={16}/></button> : <button className="btn-primary" disabled={!canContinue || loading} onClick={submit}>{loading ? <><LoaderCircle className="spin" size={16}/> Generating...</> : <>Generate blueprint <WandSparkles size={16}/></>}</button>}</div></div> : <div className="result-card"><div className="result-success"><span className="success-icon"><CheckCircle2 size={25}/></span><div><div className="section-kicker">YOUR BLUEPRINT IS READY</div><h3>You've got a starting point.</h3><p>{result.message}</p></div></div><div className="result-meta"><span>REFERENCE <b>{result.project.id}</b></span><span>COMPLEXITY <b>{result.project.blueprint.complexity}</b></span><span>STORAGE <b>{result.storage === 'mongodb' ? 'MongoDB' : 'Demo mode'}</b></span></div><div className="blueprint-summary"><h4>Project overview</h4><p>{result.project.blueprint.summary}</p></div><div className="result-columns"><div className="result-section"><h4><Layers3 size={16}/> Suggested modules</h4>{result.project.blueprint.modules.map((item) => <div className="result-line" key={item}><CheckCircle2 size={15}/>{item}</div>)}</div><div className="result-section"><h4><Code2 size={16}/> Suggested technology</h4>{result.project.blueprint.suggestedStack.map((item) => <div className="result-line" key={item}><CheckCircle2 size={15}/>{item}</div>)}</div></div><div className="result-section next-steps"><h4><Rocket size={16}/> Recommended next steps</h4>{result.project.blueprint.nextSteps.map((item, i) => <div className="next-line" key={item}><span>{i + 1}</span>{item}</div>)}</div><div className="result-actions"><button className="btn-primary" onClick={downloadSummary}><Download size={16}/> Download blueprint</button><button className="btn-secondary" onClick={copySummary}><Copy size={16}/> {copied ? 'Copied!' : 'Copy summary'}</button><button className="btn-text" onClick={() => { setResult(null); setStep(0); setForm(initial); }}>Start another project</button></div>{result.storage !== 'mongodb' && <p className="demo-warning">Demo storage is active. Connect MongoDB Atlas to retain submissions after the server restarts.</p>}</div>}
      </section>
      <section className="bottom-note"><div className="bottom-icon"><Sparkles size={18}/></div><div><b>Not sure where to start?</b><p>That's what this builder is for. Share what you know and we'll help structure the rest.</p></div><a href="https://www.cynbit.in/contact" target="_blank" rel="noreferrer">Talk to the team <ArrowRight size={14}/></a></section>
    </main>
    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark"><Layers3 size={17}/></span><span>CYNBIT<span className="brand-dot">.</span></span></a><span>Independent prototype concept · Built for the Cynbit website improvement assessment</span><span>© {new Date().getFullYear()} Project Builder</span></footer>
  </div>;
}

export default App;
