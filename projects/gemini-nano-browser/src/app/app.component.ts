import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  prompt!: string;
  response!: string;

  async getAIResponse() {
    this.response = 'Initializing AI...';
    // Checks if  ai capabilities are supported by the browser
    const chromeAI = await (window as any).ai?.assistant.capabilities();

    if (chromeAI) {
      // Creates session with gemini nano model.
      const session = await (window as any).ai.assistant.create();

      this.response = 'Generating Response...';
      // Execute a prompt
      this.response = await session.prompt(this.prompt);

      // Destroys the session
      await session.destroy();
    } else {
      this.response = 'Chrome Built-In AI not supported.';
    }
  }
}
