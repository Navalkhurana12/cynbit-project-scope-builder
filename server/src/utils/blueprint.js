const servicePlans = {
  'AI Automation': {
    modules: ['Workflow and trigger management', 'AI agent or assistant interface', 'Knowledge and data integration', 'Monitoring and human handoff'],
    stack: ['React dashboard', 'Node.js + Express API', 'LLM provider integration (when required)', 'MongoDB'],
  },
  'Web Development': {
    modules: ['Responsive user interface', 'User and admin workflows', 'REST API and business logic', 'Database and deployment'],
    stack: ['React + Vite', 'Node.js + Express', 'MongoDB', 'Cloud deployment'],
  },
  'Cloud Solutions': {
    modules: ['Infrastructure assessment', 'Environment and access setup', 'Deployment pipeline', 'Monitoring, backups and security'],
    stack: ['Cloud platform selected to fit requirements', 'Docker (if needed)', 'CI/CD pipeline', 'Monitoring and logging'],
  },
  'Digital Marketing': {
    modules: ['SEO and content audit', 'Campaign and conversion tracking', 'Analytics dashboard', 'Lead capture and reporting'],
    stack: ['Analytics and Search Console', 'Tag management', 'CRM integration', 'Reporting dashboard'],
  },
};

export function createBlueprint(input) {
  const plan = servicePlans[input.service] ?? servicePlans['Web Development'];
  const featureList = input.features?.length ? input.features.join(', ') : 'Core functionality to be finalized';
  const complexity = (input.features?.length ?? 0) >= 5 || input.timeline === 'Flexible' ? 'Medium–High' : 'Medium';
  return {
    summary: `A ${input.service.toLowerCase()} project to address: ${input.problem.trim()} Key requested capabilities: ${featureList}.`,
    modules: plan.modules,
    suggestedStack: plan.stack,
    complexity,
    nextSteps: [
      'Confirm user roles, workflows and acceptance criteria.',
      'Prioritize the must-have features for the first release.',
      'Review integrations, data requirements and security needs.',
      'Agree on milestones and validate the project scope.'
    ]
  };
}
