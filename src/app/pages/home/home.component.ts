import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <p class="eyebrow">Software solutions from idea to production</p>
      <h1>Validate, build, migrate, and modernize with a practical engineering partner.</h1>
      <p>
        Makrozoia Solutions LLC helps organizations turn business goals into secure, scalable software.
        We build proof of concepts, MVPs, production implementations, cloud migrations, and modernization
        programs that reduce risk and create measurable value.
      </p>
      <div>
        <a class="button" routerLink="/contact">Request consultation</a>
        <a class="button ghost" routerLink="/services">Explore services</a>
      </div>
    </section>

    <section class="cards">
      <article>
        <h3>POCs & MVPs</h3>
        <p>Test feasibility, validate user value, and launch focused products without overbuilding.</p>
      </article>
      <article>
        <h3>Implementation & integration</h3>
        <p>Design and deliver dependable applications, APIs, data flows, and workflow automation.</p>
      </article>
      <article>
        <h3>Migration & modernization</h3>
        <p>Move legacy systems to modern cloud-native foundations while improving performance and maintainability.</p>
      </article>
    </section>
  `,
})
export class HomeComponent {}
