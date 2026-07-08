import { Component } from "@angular/core";

@Component({
  standalone: true,
  templateUrl: "./technologies.component.html",
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
