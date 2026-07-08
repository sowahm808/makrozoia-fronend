import { Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services = [
    {
      title: 'Proof of Concept Development',
      text: 'Validate feasibility, architecture, integrations, and user workflows before committing to a larger build.',
    },
    {
      title: 'MVP Product Delivery',
      text: 'Plan, design, and ship lean first releases with the core features needed to learn from real users.',
    },
    {
      title: 'Custom Software Implementation',
      text: 'Build web applications, business platforms, APIs, dashboards, and automation tailored to operational needs.',
    },
    {
      title: 'System Integration',
      text: 'Connect internal tools, third-party platforms, data services, and cloud systems into reliable end-to-end workflows.',
    },
    {
      title: 'Cloud Migration',
      text: 'Move applications, data, and infrastructure to secure, scalable cloud environments with clear rollout plans.',
    },
    {
      title: 'Legacy Modernization',
      text: 'Refactor aging applications, reduce technical debt, improve performance, and introduce maintainable architecture.',
    },
    {
      title: 'AI Enablement',
      text: 'Add practical AI assistants, document intelligence, analytics, and automation where they improve business outcomes.',
    },
    {
      title: 'Architecture & Technical Strategy',
      text: 'Create roadmaps, evaluate platforms, define integration patterns, and guide teams toward scalable decisions.',
    },
  ];
}
