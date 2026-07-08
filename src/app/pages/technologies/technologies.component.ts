import { Component } from "@angular/core";

@Component({
  standalone: true,
  template: ` <section class="page">
    <p class="eyebrow">Technology capabilities</p>
    <h1>Technologies</h1>
    <div class="pill-grid">
      @for (tech of techs; track tech) {
        <span>{{ tech }}</span>
      }
    </div>
  </section>`,
})
export class TechnologiesComponent {
  techs = [
    "Angular",
    "TypeScript",
    "Firebase",
    "Node.js",
    "Java",
    "Python",
    ".NET",
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "LLMs",
    "Vector Search",
  ];
}
