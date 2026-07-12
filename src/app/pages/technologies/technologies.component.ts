import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Technology {
  name: string;
  logo: string;
}

@Component({
  standalone: true,
  selector: 'app-technologies',
  imports: [CommonModule],
  templateUrl: './technologies.component.html',
})
export class TechnologiesComponent {
  techs: Technology[] = [
    {
      name: 'Angular',
      logo: 'https://cdn.simpleicons.org/angular/DD0031',
    },
    {
      name: 'TypeScript',
      logo: 'https://cdn.simpleicons.org/typescript/3178C6',
    },
    {
      name: 'Firebase',
      logo: 'https://cdn.simpleicons.org/firebase/FFCA28',
    },
    {
      name: 'Node.js',
      logo: 'https://cdn.simpleicons.org/nodedotjs/339933',
    },
    {
      name: 'Java',
      logo: 'https://cdn.simpleicons.org/openjdk/ED8B00',
    },
    {
      name: 'Python',
      logo: 'https://cdn.simpleicons.org/python/3776AB',
    },
    {
      name: '.NET',
      logo: 'https://cdn.simpleicons.org/dotnet/512BD4',
    },
    {
      name: 'AWS',
      logo: 'https://cdn.simpleicons.org/amazonwebservices/FF9900',
    },
    {
      name: 'Azure',
      logo: 'https://cdn.simpleicons.org/microsoftazure/0078D4',
    },
    {
      name: 'Google Cloud',
      logo: 'https://cdn.simpleicons.org/googlecloud/4285F4',
    },
    {
      name: 'Docker',
      logo: 'https://cdn.simpleicons.org/docker/2496ED',
    },
    {
      name: 'Kubernetes',
      logo: 'https://cdn.simpleicons.org/kubernetes/326CE5',
    },
    {
      name: 'Terraform',
      logo: 'https://cdn.simpleicons.org/terraform/844FBA',
    },
    {
      name: 'GitHub Actions',
      logo: 'https://cdn.simpleicons.org/githubactions/2088FF',
    },
    {
      name: 'OpenAI',
      logo: 'https://cdn.simpleicons.org/openai/412991',
    },
    {
      name: 'Pinecone',
      logo: 'https://cdn.simpleicons.org/pinecone/14B8A6',
    },
  ];
}