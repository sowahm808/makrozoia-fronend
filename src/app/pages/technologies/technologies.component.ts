import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Technology {
  name: string;
  category: 'Frontend' | 'Backend' | 'Cloud' | 'DevOps' | 'AI';
  logo: string;
}

const simpleIcon = (slug: string): string =>
  `https://cdn.simpleicons.org/${slug}`;

@Component({
  standalone: true,
  selector: 'app-technologies',
  imports: [CommonModule],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.css',
})
export class TechnologiesComponent {
  readonly techs: Technology[] = [
    // Frontend
    {
      name: 'Angular',
      category: 'Frontend',
      logo: simpleIcon('angular'),
    },
    {
      name: 'React',
      category: 'Frontend',
      logo: simpleIcon('react'),
    },
    {
      name: 'Vue',
      category: 'Frontend',
      logo: simpleIcon('vuedotjs'),
    },
    {
      name: 'TypeScript',
      category: 'Frontend',
      logo: simpleIcon('typescript'),
    },

    // Backend
    {
      name: 'Node.js',
      category: 'Backend',
      logo: simpleIcon('nodedotjs'),
    },
    {
      name: 'Java',
      category: 'Backend',
      logo: simpleIcon('openjdk'),
    },
    {
      name: 'Python',
      category: 'Backend',
      logo: simpleIcon('python'),
    },
    {
      name: '.NET',
      category: 'Backend',
      logo: simpleIcon('dotnet'),
    },
    {
      name: 'PHP',
      category: 'Backend',
      logo: simpleIcon('php'),
    },
    {
      name: 'Laravel',
      category: 'Backend',
      logo: simpleIcon('laravel'),
    },
    {
      name: 'Firebase',
      category: 'Backend',
      logo: simpleIcon('firebase'),
    },

    // Cloud
    {
      name: 'AWS',
      category: 'Cloud',
      logo: 'assets/technologies/aws.svg',
    },
    {
      name: 'Azure',
      category: 'Cloud',
      logo: 'assets/technologies/azure.svg',
    },
    {
      name: 'Google Cloud',
      category: 'Cloud',
      logo: simpleIcon('googlecloud'),
    },

    // DevOps
    {
      name: 'Docker',
      category: 'DevOps',
      logo: simpleIcon('docker'),
    },
    {
      name: 'Kubernetes',
      category: 'DevOps',
      logo: simpleIcon('kubernetes'),
    },
    {
      name: 'Terraform',
      category: 'DevOps',
      logo: simpleIcon('terraform'),
    },
    {
      name: 'GitHub Actions',
      category: 'DevOps',
      logo: simpleIcon('githubactions'),
    },

    // AI model providers
    {
      name: 'OpenAI',
      category: 'AI',
      logo: 'assets/technologies/openai.svg',
    },
    {
      name: 'Anthropic',
      category: 'AI',
      logo: simpleIcon('anthropic'),
    },
    {
      name: 'Google Gemini',
      category: 'AI',
      logo: simpleIcon('googlegemini'),
    },
    {
      name: 'Mistral AI',
      category: 'AI',
      logo: simpleIcon('mistralai'),
    },
    {
      name: 'Hugging Face',
      category: 'AI',
      logo: simpleIcon('huggingface'),
    },
    {
      name: 'Ollama',
      category: 'AI',
      logo: simpleIcon('ollama'),
    },
    {
      name: 'OpenRouter',
      category: 'AI',
      logo: simpleIcon('openrouter'),
    },

    // AI orchestration
    {
      name: 'LangChain',
      category: 'AI',
      logo: simpleIcon('langchain'),
    },
    {
      name: 'LangGraph',
      category: 'AI',
      logo: simpleIcon('langgraph'),
    },
    {
      name: 'Model Context Protocol',
      category: 'AI',
      logo: simpleIcon('modelcontextprotocol'),
    },

    // AI and ML frameworks
    {
      name: 'TensorFlow',
      category: 'AI',
      logo: simpleIcon('tensorflow'),
    },
    {
      name: 'PyTorch',
      category: 'AI',
      logo: simpleIcon('pytorch'),
    },
    {
      name: 'Keras',
      category: 'AI',
      logo: simpleIcon('keras'),
    },
    {
      name: 'Scikit-learn',
      category: 'AI',
      logo: simpleIcon('scikitlearn'),
    },
    {
      name: 'ONNX',
      category: 'AI',
      logo: simpleIcon('onnx'),
    },
    {
      name: 'MLflow',
      category: 'AI',
      logo: simpleIcon('mlflow'),
    },

    // Vector databases and search
    {
      name: 'Pinecone',
      category: 'AI',
      logo: 'assets/technologies/pinecone.svg',
    },
    {
      name: 'Milvus',
      category: 'AI',
      logo: simpleIcon('milvus'),
    },
    {
      name: 'Elasticsearch',
      category: 'AI',
      logo: simpleIcon('elasticsearch'),
    },
    {
      name: 'OpenSearch',
      category: 'AI',
      logo: simpleIcon('opensearch'),
    },

    // AI development tools
    {
      name: 'Jupyter',
      category: 'AI',
      logo: simpleIcon('jupyter'),
    },
    {
      name: 'NumPy',
      category: 'AI',
      logo: simpleIcon('numpy'),
    },
    {
      name: 'Pandas',
      category: 'AI',
      logo: simpleIcon('pandas'),
    },
    {
      name: 'Gradio',
      category: 'AI',
      logo: simpleIcon('gradio'),
    },
  ];

  readonly categories: Technology['category'][] = [
    'Frontend',
    'Backend',
    'Cloud',
    'DevOps',
    'AI',
  ];

  technologiesByCategory(category: Technology['category']): Technology[] {
    return this.techs.filter((technology) => technology.category === category);
  }

  onLogoError(event: Event): void {
    const image = event.target as HTMLImageElement;

    image.onerror = null;
    image.src = 'assets/technologies/technology-placeholder.svg';
    image.classList.add('logo-fallback');
  }
}